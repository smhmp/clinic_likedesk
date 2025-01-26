import {$zpl} from "@/plugins/zpl";
import {lg, lgErr} from "@/src/js/dbg";
import {ErrorHandler} from "@/src/js/ErrorHandler";
import RespObj from "~/src/js/RespObj";


export class DirectRequest_v2{
  constructor({axios,baseUrl,gqlVersion,configs,queryParams={},authErr=(err)=>{}}) {
    this.axios = axios
    this.baseUrl = baseUrl
    this.gqlVersion = gqlVersion
    this.configs = configs
    this.queryParams = queryParams
    this.authErr = authErr
  }

  addHeader(key,val){
    this.configs.headers[key] = val
  }

  async reqQuery_apollo(
    {
      querySchema,
      variables,
      clientName = "defaultClient",
      fetchPolicy = "no-cache",
      headers = {},
        storeGql = {}
    }
  ){
      storeGql.activeLoad();

    let client = storeGql.getClientApollo({clientName});

    try {
      let res = await client.query({
        query: querySchema,
        variables: variables,
        fetchPolicy: fetchPolicy,
        context: {
          headers: {...this.configs.headers,...headers},
        },
      });


        storeGql.deActiveLoad();

      return storeGql.getResponse(res)
    } catch (errors) {
      lgErr('doQuery/error',errors,'',{addi:{
          reqBody:querySchema['loc']['source']['body'],
              storeGql:storeGql,
        }})

        storeGql.deActiveLoad();

      const msg = ErrorHandler.getTrans(errors);
      if(msg && msg.arrErrors.length)
        return msg.arrErrors[0];
      return errors
    }
  }

  async reqMutate_apollo(
    {
      mutationSchema,
      variables = {},
      headers={},
        storeGql = {}
    }){

      storeGql.activeLoad();

    let client = storeGql.getClientApollo();

    try{
      let res = await client.mutate(
        {
          mutation:mutationSchema,
          variables: variables,
          context:{
            headers: {...this.configs.headers,...headers},
          },
        }
      )

        storeGql.deActiveLoad();

      return storeGql.getResponse(res)
    } catch(errors) {
      lgErr('doQuery/error',errors,'',{addi:{
          reqBody:mutationSchema['loc']['source']['body'],
              storeGql:storeGql,
        }})

        storeGql.deActiveLoad();

      const msg = ErrorHandler.getTrans(errors);
      if(msg && msg.arrErrors.length)
        return msg.arrErrors[0];
      return errors
    }
  }

  __getQuery(){
      let queryStr='';
      if(Object.keys(this.queryParams).length){
          queryStr='';
          for(const k in this.queryParams){
              if(queryStr){
                  queryStr+='&'
              }
              queryStr+=`${k}=${this.queryParams[k]}`;
          }
          if(queryStr){
              queryStr='?'+queryStr
          }
      }
      return queryStr;
  }

  async __tryReq({resolve, headers, baseUrl, respObj, args},{storeGql=null,activeLoad=null,deActiveLoad=null,configs=null}){
      if(!baseUrl){
          baseUrl = this.baseUrl + (storeGql? this.gqlVersion :'')
      }

      let resp=null,queryKey='',argBef={headers:headers,baseUrl:baseUrl};

      if(storeGql){
          storeGql.activeLoad();
          argBef.vars=args.variables;
      }
      else{
          activeLoad && activeLoad();
          argBef.vars=args;
      }

      [resp,queryKey] = await $zpl.getBefReq_v2(resp,queryKey,storeGql,argBef)

      respObj.setQueryKey(queryKey);

      if(!configs){
          configs = {...this.configs};
          configs.headers = {...configs.headers,...headers}
      }
      if(!configs.headers){
          configs.headers={};
      }

      configs.headers.Authorization=$zpl.getStorage('AuthorizationKey')||'Nothing';

      /*lg('gqlQuery/isDevelopment/reqSchema',{
        configs:configs,
        opeName:opeName,
        realName:realName,
        reqInf:args
      },{col:'#fff',backCol:'#6c10bb'})*/

      if(resp === null){
          let queryStr=this.__getQuery();

          respObj.setRespServer(true);

          let reqType = 'post';
          if(configs['get']){
            reqType = 'get';
          }

          try{
              if(reqType==='get'){
                  resp = await this.axios.get(baseUrl+queryStr,configs);
              }
              else{
                  resp = await this.axios.post(baseUrl+queryStr,args,configs);
              }

            respObj.setResp(resp);
          }
          catch (e) {
            respObj.setError(e)
          }
      }
      else{
        respObj.setResp(resp);
      }

      $zpl.setAftReq(resp,queryKey,respObj.respServer)

      if(storeGql){
          storeGql.deActiveLoad();
      }
      else{
          deActiveLoad && deActiveLoad();
      }

      await resolve(respObj);
      if(!respObj.keepGoing){
          return
      }

      this.toastErr(respObj);
  }

  async __catchErr(err,{reject, respObj, args},{storeGql=null,deActiveLoad=null}){
      respObj.setError(err);
      const resp = respObj.getResp();

      lgErr('doQuery/error',err,'',{addi:{
              reqInf:args,
              storeGql:storeGql,
          }});

      this.authErr({resp,err})

      if(storeGql){
          storeGql.deActiveLoad();
      }
      else{
          deActiveLoad && deActiveLoad();
      }

      $zpl.exceptAftReq({resp,error:err},respObj.queryKey,respObj.respServer);

      await reject(respObj);
      if(!respObj.keepGoing){
          return
      }

      this.toastErr(respObj);
  }

  async reqSchema({storeGql, vars={},headers={},baseUrl='',respObj=null}){
      return new Promise(async (resolve, reject) => {

          respObj = respObj || new RespObj(baseUrl,{storeGql});

          const iQuery = storeGql.getGqlBody();

          const args = {
              query: iQuery,
          }
          if(Object.keys(vars).length){
              args.variables= vars;
          }

          try{
              await this.__tryReq({resolve, headers, baseUrl, respObj, args},{storeGql});
          }
          catch (err){
              await this.__catchErr(err,{reject, respObj, args},{storeGql})
          }
      })
  }

  reqDirect({args={},headers={},configs={},baseUrl='',activeLoad=null,deActiveLoad=null,respObj=null,}){

      return new Promise(async (resolve, reject) => {

          respObj = respObj || new RespObj(baseUrl);

          try{
              await this.__tryReq({resolve, headers, baseUrl, respObj, args},{activeLoad,deActiveLoad,configs});
          }
          catch (err){
              await this.__catchErr(err,{reject, respObj, args},{deActiveLoad})
          }
      });
  }

  toastErr(respObj) {
      let msg = respObj.getErrMsg({globalMsg:true});
      $zpl.toastError(msg);
  }
}
