export class Core_GqlPrj{

  constructor({realName='',mutationSchema=null,querySchema=null,clientName='defaultClient',type=''}){
    this.realName = realName
    this.clientName = clientName
    this.type = type || (mutationSchema?'mutation':'query')

    if(realName){
      this.realName = realName;
      this.opeName = realName;
      this.gqlSchema = null;
    }
    else{
      const gqlSchema = mutationSchema || querySchema
      this.gqlSchema = gqlSchema;

      this.realName = gqlSchema['definitions'][0]['selectionSet']['selections'][0]['name']['value']
      this.opeName = gqlSchema['definitions'][0]['name']['value']
    }
  }

  getClientApollo(configApollo){
    const {apolloProvider} = $zpl.storeMan.app
    return apolloProvider.clients[configApollo.clientName];
  }

  reqZplConnectPrj({vars = null, headers = {},respObj = null}={}){
      return $zpl.zplConnectPrj_v2.reqSchema(
          {
              storeGql:this,
              vars:vars||this.getArgs()||{},
              headers,
              respObj
          }
      )
  }

  getResponse(resp){
      const res = resp?.data.data[this.realName]
    return res !== undefined? res : resp?.data.data.resource;
  }

  isAuthReq(){
    //todo must be review both: this here and old progress
    if(!(new RegExp(`^(?:portal|me|switchesAvailable)$`,'i').test(this.realName))){
      return true
    }
    else if(this.clientName === 'authClient'){
      return true
    }
    return false;
  }

  getGqlBody(){
    return this.gqlSchema['loc']['source']['body']
  }

  getUniqName(){
    return this.opeName
  }

  activeLoad(){}

  deActiveLoad(){}

  getArgs(){}
}
