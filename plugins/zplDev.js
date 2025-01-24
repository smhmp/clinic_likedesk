import {$lg, lg} from "@/src/js/dbg";
import configInf from "@/configs.js";
import {$zpl} from "@/plugins/zpl";

const cookie = {
  myDemoToken2:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2VkZTkxMzFjZTdhM2ViZWZhYWMzZWY5ZWMyZTU4NzRkZTBmNWM0ZjhmNzgyMDZhMDcxOTM0ZmRiMWU4ZDhiNTY5OWY5MzFjMjY5YmE5YzgiLCJpYXQiOjE3Mjk0ODkzNTkuMzAyMjc1LCJuYmYiOjE3Mjk0ODkzNTkuMzAyMjksImV4cCI6MTg4NzI1NTc1OS4xODYxMzMsInN1YiI6IjgxMjY4Iiwic2NvcGVzIjpbXX0.iwdi6nx4OmPTa-FQGOUo2QMAtztgJmGN6We0BvRD7aIVXY6_mZ5lj_b_VG0ECwT92dc4GbP5uS9Kun8e2wkeOIN7JcfIlF1wQbM11pOtmrkle_2zwHwmEUoj9ESWIemQaAitR6y9CdDRUHIhjszo2a74c0-VjmKnhHv6DBl7k88CgTMTvlIYdjrSHCroYPM8-CqwBeRqe-HOQCiMU-N8a-SnuEb88icGsoPPZcnK98bx7UjfMHfR-pS-seXZgpIVWEBakml2X7HgJUYBnsukUu_8_pEG8wylviiRuLXJbSZOgDqxHFBKmJeKflNqe1Ru4a63lcVhVjUZSij_zGLaabfqlWgcxiiCKk5fYWZ8VokmiDk7OlIzcfmL08lfUQYTxTWtLqeyuQ01uHivhW7NAOhsS6vJSXcs2lGWyJSG5NCtKxVpak6X4jEbX6RA002OU8vvXw_S_PTyQGhdy3xUwGWwEOK8E4ZMa4FNE7uq8a-8ik_EsSiLC2BsfSODHA3hPxGX60ypxunIoTWeBhp1ckrNLqxMjcBf26ClpXSVAdh9OSys3gMpCfv-hEzHVPMmLv48bTkd89_IrJEEa8SZIsyu3DKvyc7tA86FnkXVLvFw1N0v6w3QZTVGImlkPoN6ZcdneoqUMqA7oDDmqFB_bB1v_QPbyJd_MZzwlupq0so',
  myPrdToken2:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWNiOTdmMTY3OWU5NDFkNmRmMDQ4ZDg2NTVjNDM1NzY3MjMwZGM4NTY3ZjY0NDE2MmZlMTY5NWIwN2U5MmExMzZkNDAwZGQ4OGY3ZDY2ZDMiLCJpYXQiOjE3MzM3Mjg2NDMuMjQ1NzMsIm5iZiI6MTczMzcyODY0My4yNDU3MzMsImV4cCI6MTg5MTQ5NTA0My4yMDQ5ODYsInN1YiI6IjgxMjY4Iiwic2NvcGVzIjpbXX0.J3ogTEjBhEim5Ui05Ifj1w2hbRh3kia-v7NOx3QIbh1xbYYXKOfiCQUPXHuzOBEItzrg8TnXYC2WYClZenX39RW92e4L9sb6fd7iR72sZOxAVnS_ItCCQ4ksNAmz6O46ofzYzFTeSkvLyvYAHPGysFkL2riToJHMWPBb7qQ6qmTNnpmaMewuYXZ8oIF8L405a9l1Dyq7NbnNztLe-Rpq7fRGTMsrvWRBuLf3KkGMvR1IB6Udn7Aj2Z1QUU6fjMEIeo2KzKwIe7MIogs6odkSl1XUxJbaRGqMIO1XbddJ0eWqZ2mEGCDf7tGcUDquFwxEQcfJlfOTefji2OlkjGY00fdC3faM8hfDi94It81US48HBplJWdqXcx5GFoyNI0GH5owtWvWNUB4ZiLG5q-Y8favJPpgpsgmB_8AFFF8JSCG5YxidU--Z_rzCJNwmw54V2pJIgVeHyorIfSId3tGd3QlHvZbvj13g0aQxjGW4uHCeskVuEDc2ct99cnG4R4eGDVBj9PxveU3MTLxQ1X1PErvHpKlaOWRTfErUOqK0vIPw1ikuLUETfJBsseTvfhYQlfuAHDeN5C_UJiuZevv7Ap5Qfao7E3C_xTpulmVHa-nGtZij945nMSOT8txoojnsm1CcDfSNLXaEhTvPRfWfr4nf6Ts7i4t1xJ3kV-ClE6o',
  myPrdToken3:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjMxMTJmOGFkNjdiNGVjZjdmYzg4YTgwNTEyMTBlZGI1ODZjMTEwYTBkNGMxZDE0MzY0OWY1M2ZmNDA2YjZhY2ZiZGU2ZDI3MWVkMTBkYWIiLCJpYXQiOjE3MjgyMzM2MDMuMzMyNTA1LCJuYmYiOjE3MjgyMzM2MDMuMzMyNTA5LCJleHAiOjE4ODYwMDAwMDMuMjQ0NzI5LCJzdWIiOiI4MTI2OCIsInNjb3BlcyI6W119.RrjVjumid3eLM_Pt6gH3NpuB8oHtquIzgXG3G1yd4xUZ0ZKqBN7rGYiyggQh7fcLS81N4NGFGd6had0N8gYRSCa4QMtUe_WF368Jg7LeLClttytfXzRnVUA3Q2XDt9tmVhCY3Z8pg2oRA9N69ej4L5CD35aPEDRyjrBkdzBkexyv2IIYc2NOAZAiKGgTU4Q5ffOh7TAHW0tTrD2SeFeso_JK8M5NtPdPWXM8cBMSKkIF72geRlG3bhdWZmHN96cr0Mhy-ilN1pO-_5G2ssa2lwWoAaMeGIBn3AEepdiE0FdhaQ8chUosxPBr-4qhGYVSNSUPBpFLtt7xIMxcRWtIa3osC7X9jrBJ8Ilp9_pOv43AEMhm4THrtF8nPiY0SGMthPb7x5NvydsPrvjh1drDfHSwSBMCKwGll8Tuxh5-6GeV2jeXOmZ11SbhpxnL762iQ94oLI4WLt-jA3sqRkI-SJW4MTqAc93npmL8JGFCtZ4XVi-5o3ThfybeFaVkjDfhkVdNtCaYQYFdp3LhkADm1hzoS4bGIONWjg6Zu6MF4lhwdSzXkIwlIMGeb8gmP9ZiL8ylzsYBsDOVlvqIihR1ipnHkdae3ZbDCBwlKMFMQWnbUStVMLr1MT5MOFQKsoDZVhW60C76QKQ8TPxlPjuT6cCujb37j9TyPH4QQTpm-QQ',
  delCookie: function(name) {
    let date;
    date = new Date();
    date.setTime(date.getTime() - 86400000);
    document.cookie = name + "=; expires=" + date.toGMTString() + "; path=/";
  },
  setCookie:function (cname, cvalue, exdays,path) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path="+(path?path:'/');
  },
  getCookie:function (cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
}


const zplDev = {
  charsCsl:['co','nso','le'],
  isLocal:function (zpl){ //process.server ||
    if(!zpl) zpl = this
    return (zpl.isDevelopEnv() || window.location?.host.includes('localhost:')) && !this.isProduct(zpl)
  },
  isProduct:function (zpl=null,val=''){
    if(!zpl) zpl = this
    const res = zpl.isMode('asProduct',val)
    if(res){
      lg('asProduct',res,{backCol:'#be2929',force:true})
    }
    return res
  },
  initial(zpl){
    zpl.csl = zpl.win(this.charsCsl.join(''))
    if(this.isLocal(zpl)){

      if(!$lg){
        $zpl.toastMsg('source in dbg is for production mode ==> zplDev failed',{asError:true})
        return; //vaghti file dbg productioni bashe
      }

      $lg.timeDelay = new zpl.TimeDelay()

      zpl.isProduct =  this.isProduct
      zpl.isLocal =  this.isLocal

      for(const k in this.$zpl){
        zpl[k]=this.$zpl[k]
      }

      const cols = {col:'#000',backCol:'#f38fe3'}
      zpl.offlineReq = !!zpl.getStorage('offlineReq')
      zpl.offlineReqTemp = !!zpl.getStorage('offlineReqTemp')
      zpl.onlineTest = !!zpl.getStorage('onlineTest')
      zpl.refreshData = !!zpl.getStorage('refreshData')
      lg('$zpl.nuxtConfig.NODE_ENV',zpl.nuxtConfig.NODE_ENV,cols)
      lg('$zpl.offlineReq',zpl.offlineReq,cols)
      lg('$zpl.offlineReqTemp',zpl.offlineReqTemp,cols)
      lg('$zpl.onlineTest',zpl.onlineTest,cols)
      lg('$zpl.refreshData',zpl.refreshData,cols)

    }
  },
  $zpl:{
    offlineReq:false,
    offlineReqTemp:false,
    onlineTest:false,
    refreshData:false,
    switcherSlug:false,
    isTestDev(){
      const dbg = {
          __curLevel__:1,
          __isPreview__:1,
          __No_modal__:1,
        __global__isLegal__:1,
        __modal__step2Legal__:0,
        __modalNotif__:0,
        __modalCompleteLegal__:0,
        __FormPersonal__init__setDate__:0,
        __StatMixin__statAct__:1,
        __FormPersonal__emit__doneForm__:0,
        __testData_legal__(resp,wher){
            return
          resp.company_rid = '1234567890';
          resp.company_name = 'شرکت تست';
          resp.company_registered_at = '1991-06-29';
        },
      }
      return dbg;
    },
    isDbgUser:function (){
      return this.isMode('asDbg')||this.isLocal()
    },
    addRefreshData(queryKey){
      this.setStorage('-RD@'+queryKey,1)
    },
    isRefreshData(queryKey){
      return this.getStorage('-RD@'+queryKey)
    },
    async getCacheResp_v2(resp,queryKey,storeGql,{headers,baseUrl,vars}){
      const iQuery = storeGql?.getGqlBody()||''
      const opeName = storeGql?.getUniqName()||''
      return await this.getCacheResp(resp,queryKey,{headers,baseUrl,iQuery,vars,realName:storeGql?.realName,opeName})
    },
    async getCacheResp(resp,queryKey,{headers,baseUrl,iQuery,vars,realName,opeName}){
      return new Promise((resolve, reject) => {
        if(this.isLocal()){
          if(!queryKey){
            const findChar = ['\n', '\r', '\t','\s', '    ', ' ', '"', '/'];
            const replace = ['', '', '', '', '', '', '\\"', '\\/'];
            let queryClean = this.replaceArray(iQuery,findChar,replace)
            let varsClean = vars?JSON.stringify(vars):''
            if(varsClean) varsClean = this.replaceArray(varsClean,findChar,replace)
            queryKey = opeName+':'+varsClean+'@'+encodeURIComponent(baseUrl)+'@'+window.btoa(JSON.stringify(headers)+JSON.stringify(queryClean))
          }

          if(this.getStorage(queryKey)){
            if(!this.onlineTest && (!this.refreshData || this.isRefreshData(queryKey))){
              if(this.offlineReq){
                if(this.getStorage(queryKey) !== '@cannot@'){
                  try{
                    resp = JSON.parse(this.getStorage(queryKey))
                  }
                  catch (e) {
                    this.setStorage(queryKey,'@cannot@')
                  }
                }
                return window.setTimeout(()=>{
                  resolve([resp,queryKey])
                },100)
              }
              else if(!this.offlineReqTemp){
                this.setStorage(queryKey,false);
              }
            }
          }
        }
        resolve([resp,queryKey])
      })
    },
    cacheResp(resp,queryKey){
      if((this.refreshData || !this.onlineTest) && this.offlineReq && this.getStorage(queryKey) !== '@cannot@'){
        try{
          this.setStorage(queryKey,JSON.stringify(resp))
          if(this.refreshData) this.addRefreshData(queryKey);
        }
        catch (e) {
          this.setStorage(queryKey,'@cannot@')
        }
      }
    },
    async getBefReq(resp,queryKey,{headers,baseUrl,iQuery,vars,realName,opeName}){
      return await this.getCacheResp(resp,queryKey,{headers,baseUrl,iQuery,vars,realName,opeName})
    },
    async getBefReq_v2(resp,queryKey,storeGql,{headers,baseUrl,vars}){
      return await this.getCacheResp_v2(resp,queryKey,storeGql,{headers,baseUrl,vars})
    },
    setAftReq(resp,queryKey,isServerResp=false){
      this.chkResp(resp)
      if(isServerResp){
        this.cacheResp(resp,queryKey)
      }
    },
    goToSetToken(urlReq){
      const host = configInf.proxy['/api']

      let msgToast = `<p>Set Tokent ${urlReq}</p>`

      if(urlReq.indexOf('/demo')>-1){ // host.indexOf('demo')>-1 ||
        msgToast+=`<a href="https://v4-demo.hamrah.in/api/v4/docs/graphiql/backOffice" target="_blank">Demo-Link</a>`;
        window.setTimeout(()=>{
          cookie.setCookie('v4-access_token',cookie.myDemoToken2,365,'/');
          cookie.setCookie('v4-access_token',cookie.myDemoToken2,365,'/api/');
          $zpl.reloadPage('changeCookie_demo')
        },3000)
      }
      else if(urlReq.indexOf('/stage')>-1){
        msgToast+=`<a href="https://stg-my.insight-clinic.name/api/v4/docs/graphiql/backOffice" target="_blank">Stg-Link</a>`;
        window.setTimeout(()=>{
          cookie.setCookie('v4-access_token',cookie.myPrdToken2,365,'/');
          cookie.setCookie('v4-access_token',cookie.myPrdToken2,365,'/api/');
          $zpl.reloadPage('changeCookie_prd')
        },3000)
      }
      else{
        msgToast+=`<a href="https://next.insight-clinic.com/api/v4/docs/graphiql/backOffice" target="_blank">Prd-Link</a>`;
        window.setTimeout(()=>{
          cookie.setCookie('v4-access_token',cookie.myPrdToken2,365,'/');
          cookie.setCookie('v4-access_token',cookie.myPrdToken2,365,'/api/');
          $zpl.reloadPage('changeCookie_prd')
        },3000)
      }
      msgToast += `<a href="http://localhost:${configInf.server.port}/api/v4/docs/graphiql/backOffice" target="_blank">local-Link</a>`;

      this.toastMsg(msgToast,{delayTime:900000})
    },
    exceptAftReq({resp,error},queryKey,isServerResp){
      const cols = {col:'#ffffff',backCol:'#e76969'}
      lg('exceptAftReq/resp',resp,cols)
      lg('exceptAftReq/error',error,cols)
      lg('exceptAftReq/configInf',configInf,cols);

      if(!error){
        return;
      }

      if(typeof error == "object" && !(error instanceof Array) && 'response' in error){
        lg('exceptAftReq/error.response',error['response'],cols)
        const respErr = error['response']
        if(respErr?.data?.message?.indexOf('Unauthenticated')>-1){
          this.goToSetToken(respErr.config.url);
        }
        else if(respErr?.data?.errors){
          const reason = respErr['data']['errors'][0]
          lg('exceptAftReq/reason',reason,cols)
          if(reason['readable_code'] === "INVALID_GRANT" || reason['readable_code'] === "UNAUTHORIZED"){
            this.goToSetToken(respErr.config.url)
          }
        }
      }
      else if(resp){
        const errors = resp?.data?.errors
        if(errors){
          this.toastMsg(`<pre style="white-space: pre-wrap;">local: ${errors[0]['message']}</pre>`,{delayTime:3000,asError:true,justOnce:'asDev_exceptAftReq_fromResp'})
        }
      }
    },
    getRandNum(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    },
    chkThrow(cond,msg,subj=''){
      if(cond instanceof Array){
        cond.forEach((eCond,indx)=>{
          this.chkThrow(eCond,msg[indx])
        })
        return
      }
      if((typeof cond != 'function' || cond()) && cond){
        $zpl.toastMsg(`${subj}/ ${msg}`,{delayTime:90000,asError:true})
      }
    },
    stop(){
      debugger
    },
  },
}

export default zplDev
