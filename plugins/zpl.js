import Vue from 'vue';
import {lg} from "@/src/js/dbg";
import zplDev from "@/plugins/zplDev";
import {ErrorHandler} from "~/src/js/ErrorHandler";
import {DirectRequest_v2} from "~/src/js/DirectRequest_v2";
import configInf from "~/configs";

const undef=(function(){})();
const isUndef=function (val){
  return val===undef;
};
const isNotDef=function (val){
  return val===undef||val===null;
};
const setColl=function (coll,ret,k){
  if(!isUndef(coll)){
    if(coll instanceof Array){
      coll.push(ret);
    }
    else if(typeof coll=='object'){
      coll[k]=ret;
    }
    else{
      coll+=ret;
    }
    return coll;
  }
};

export const $zpl={
  debug:{},
  debugging:1,
  validationFa:null,
    /**
     * @type DirectRequest_v2
     */
  zplConnectPrj_v2:null,
  TimeDelay:class{
    constructor(lastSave) {
      this.lastSaved=lastSave || (new Date()).getTime()
    }

    compT(){
      const latestT=this.lastSaved;
      const curT =(new Date()).getTime();
      const compT = curT - latestT;
      this.lastSaved = curT;
      return compT;
    }
  },
  frsSeconds:Math.floor(Date.now() / 1000),
  nuxtConfig : {
    NODE_ENV : ''
  },
  currRouter:null,
  storeMan:null,
  queryElm : document.querySelector.bind(document),
  queryElms : document.querySelectorAll.bind(document),
  getElmById : document.getElementById.bind(document),
  csl:{
    log(){},
    groupEnd(){},
    group(){},
  },
  onInitial(store){
    if(window.$zpl){
      return
    }
    this.storeMan = store
    this.nuxtConfig = store['$config']
    window.$zpl = this;
    zplDev.initial(this)
  },
  mergeObj(newObj,free=false){
      for(let k in newObj){
          if(newObj.hasOwnProperty(k)){
              this[k]=newObj[k];
          }
      }
  },
  addQueryToUrl(url,strItms){
    url+=url.indexOf('?')!==-1?'&'+strItms:'?'+strItms;
    return url
  },
  setGlobal(obj){
    for (const [key, val] of Object.entries(obj)){
      this[key] = val;
    }
  },
  win(prp,win){
    if(prp instanceof Array){
      win = window
      prp.forEach((ePrp)=>{
        win = this.win(ePrp,win)
      })
      return win
    }
    if(!win){
      win = window
    }
    try{
      return win[prp]
    }
    catch (e){
      return null
    }
  },
  infAdr(){
    const host = $zpl.getRootHost();
    let panelZplOld = '';
    let panelZplBeta = '';
    let rootApi = '';
    let rootAuth = '';
    let rootAdr = '';
    if(host.indexOf('.insight-clinic.name')>-1){
      panelZplBeta = 'https://stg-my.insight-clinic.name';
      panelZplOld = 'https://staging.insight-clinic.com';
      rootApi = configInf.reqApi.stageUrl;
      rootAuth = 'https://connect-stg.insight-clinic.name';
      rootAdr = rootAuth;
    }
    else if(host.indexOf('localhost')>-1){
      const switchSlug = $zpl.getSwitcherSlug();
      switch (switchSlug) {
        case '/demo':
          panelZplBeta = 'https://shell.hamrah.in';
          panelZplOld = 'https://v4-demo.hamrah.in';
          rootApi = configInf.reqApi.demoUrl;
          rootAuth = 'https://connect-demo.hamrah.in';
          break
        case '/stage':
          panelZplBeta = 'https://stg-my.insight-clinic.name';
          panelZplOld = 'https://staging.insight-clinic.com';
          rootApi = configInf.reqApi.stageUrl;
          rootAuth = 'https://connect-stg.insight-clinic.name';
          break
        default:
          panelZplBeta = 'https://beta.insight-clinic.com';
          panelZplOld = 'https://next.insight-clinic.com';
          rootApi = configInf.reqApi.prdUrl;
          rootAuth = 'https://connect.insight-clinic.com';
          break
      }
    }
    else if(host.indexOf('.hamrah.in')>-1){
      panelZplBeta = 'https://shell.hamrah.in';
      panelZplOld = 'https://v4-demo.hamrah.in';
      rootApi = configInf.reqApi.demoUrl;
      rootAuth = 'https://connect-demo.hamrah.in';
      rootAdr = rootAuth;
    }
    else{
      panelZplBeta = 'https://beta.insight-clinic.com';
      panelZplOld = 'https://next.insight-clinic.com';
      rootApi = configInf.reqApi.prdUrl;
      rootAuth = 'https://connect.insight-clinic.com';
      rootAdr = rootAuth;
    }

    const adrAuth = `${rootAuth}/login?client_id=2`;

    return {rootAdr:rootAdr,rootAuth:rootAuth,adrAuth:adrAuth,rootApi:rootApi,panelZplOld:panelZplOld,panelZplBeta:panelZplBeta}
  },
  toastWarning(warnMsg){
    return this.toastError(warnMsg,{asWarning:true})
  },
  toastError(error,{throwErr=false,asWarning=false}={}){
    const msg = ErrorHandler.getTrans(error);
    if(msg && msg.arrErrors.length){
      error = msg.arrErrors[0];
    }

    if(error && typeof error == "string"){
      this.toastMsg(error,{delayTime:5000,asError:!asWarning,asWarning:asWarning});
      if(throwErr){
          throw error;
      }
      return true;
    }
    return false;
  },
  toastMsg(msg,{delayTime=5000,asWarning=false,asError=false,asDone=false,justOnce='',ltr=false}={}){
    const obj = {
      type: asError?'error':(asDone?'done':(asWarning?'warn':'normal')),
      justOnce: justOnce,
      ltr,
      delayTime
    };
    if(msg.trim().indexOf('<')===0){
      obj.html = msg;
    }
    else{
      obj.message = msg;
    }
    this.storeMan.dispatch("application/alert", obj);
  },
  chkResp(resp){
    if('asDbg' in resp){// resp['asDbg'] = '1'|'0'
      this.isDbgUser(resp['asDbg'])
    }
  },
  async getBefReq(resp,queryKey,{headers,baseUrl,iQuery,vars,realName,opeName}){
    return [null,'']
  },
  async getBefReq_v2(resp,queryKey,storeGql,{headers,baseUrl,vars}){
    return [null,'']
  },
  setAftReq(resp,queryKey,isServerResp){
    this.chkResp(resp)
  },
  exceptAftReq({resp,error},queryKey,isServerResp){

  },
  isProductEnv(){
    return this.nuxtConfig.NODE_ENV === 'production'
  },
  isDevelopEnv(){
    return this.nuxtConfig.NODE_ENV === 'development'
  },
  isLocal(){
    return false
  },
  isTest(){
    return this.debugging && this.isLocal() && this.isTestDev ? this.isTestDev() : {};
  },
  isAnzMode:function (){
    return this.isLocal()|| this.isDevelopEnv() || this.isDbgUser()
  },
  isDbgUser:function (val=''){
    return this.isMode('asDbg',val)
  },
  isDemo(){
    const adr = this.getRootHost()
    return this.getSwitcherSlug() === '/demo' || adr.indexOf('.hamrah.in')>-1
  },
  isStage(){
    const adr = this.getRootHost()
    return this.getSwitcherSlug() === '/stage' || adr.indexOf('.insight-clinic.name')>-1
  },
  isMob:function (){
    return false
  },
  isMobDbg:function (){
    return this.isMob()&&this.isDbgUser()
  },
  qKey:false,
  getEvRawKey(e,evTyp='',elmLog=''){
    const keyCod = e.keyCode || e.which
    const keyStr = e.key
    const code = e.code
    let kChar = ''
    if(typeof keyStr == 'string'){
      kChar = keyStr.toLowerCase()
    }
    if(this.qKey&&kChar !== 'q'){
      zplDev.stop()
    }
    if(!kChar||!kChar.trim()||keyCod=='32'){
      if((typeof code == 'string'&&code.toLowerCase()==='space')||keyCod=='32'){
        kChar = 'space'
      }
    }
    if(evTyp === 'keydown'){
      if(elmLog){
        lg(kChar,`${elmLog}::${evTyp}/ kChar`)
      }
      if(kChar === 'q'){
        this.qKey = true
        return {char:kChar,code:keyCod|code};
      }
    }
    else{
      if(kChar === 'q'){
        this.qKey = false
      }
    }
    return {char:kChar,code:keyCod|code};
  },
  getEvStrKey({evKey='', evTyp='', e=null,flag=''}){
    if(e){
      evKey = this.getEvRawKey(e,evTyp,flag)
    }
    return evKey
  },
  isEvCommand(e,evKey,targetKey=''){
    const keyCode = e.keyCode;

    if(targetKey){
      if(evKey === targetKey){
        return true
      }
    }
    else{
      if((evKey+'').toLowerCase() === 'space'){
        return false;
      }
      else{
        if(evKey.length > 1){
          return true
        }
        else if(e&&(e.ctrlKey||(e.metaKey&&(keyCode > 65 && keyCode <= 90)))){
          return true
        }
        return false
      }
    }
  },
  getStorage(key){
    if(window.localStorage){
      return window.localStorage[key]
    }
  },
  setStorage(key,val){
    if(window.localStorage){
      if(val === false){
        if(key in window.localStorage){
          delete window.localStorage[key]
        }
      }
      else{
        window.localStorage[key] = val
      }
    }
    return val
  },
  isMode(modStr,val=''){
    const queryMod = val || this.getUrlParam(modStr)
    const befMod = this.getStorage(modStr)
    if(queryMod == '1'){
      if(!befMod){
        this.setStorage(modStr,'1')
      }
      else{
        return !!befMod
      }
    }
    else if(queryMod == '0'){
      if(befMod=='1'){
        this.setStorage(modStr,false)
      }
      else{
        return !!befMod
      }
    }
    else{
      return !!befMod
    }
    return !!this.getStorage(modStr)
  },
  replaceArray(cont,find, replace) {
    let replaceString = cont;
    for (let i = 0; i < find.length; i++) {
      replaceString = replaceString.replaceAll(find[i], replace[i]);
    }
    return replaceString;
  },
  getRootHost(){
    return window.location.origin||window.location.href
  },
  redirectUrl(url){
    try{
      window.location.replace(url);
    }
    catch (e) {
      window.location.href = url
    }
  },
  openLink(url,tagret=''){
    window.open(url, tagret)
  },
  getCurrTime(){
    return window.currentTime
  },
  isArr(arg) {
    let isArr=false;
    try{
      isArr = 'length' in arg
    }catch (e){}
    return isArr
  },
  getUrlParam:function(key){
    key = key.toLowerCase();
    let splPrms;
    const href=window.location?.href;
    if(!href) return null

    let splUrl=href.split('?');
    if(splUrl[1]){
      splPrms={};
      splUrl=splUrl[1].split('&');
      for(let i=0,ech;i<splUrl.length;i++){
        ech=splUrl[i].split('=');
        splPrms[ech[0].toLowerCase()]=ech[1];
      }
    }
    if(splPrms){
      if(key){
        return splPrms[key];
      }
      else{
        return splPrms;
      }
    }
  },
  isNum:function (arg) {
    return parseFloat(arg)===arg*1;
  },
  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  },
  prevEvery(e){
    // e.stopImmediatePropagation();
    e.stopPropagation();
    e.cancelBubble = true;
    e.preventDefault();
  },
  prevUp(e){
    e.stopPropagation();
    e.cancelBubble = true;
  },
  arrFind(arr,calb){
    let res,i;
    for (const [i, itm] of Object.entries(arr)){
    // for (i=0;i<arr.length;i++){
      res = calb(itm,i)
      if(typeof res == 'string' || typeof res == 'boolean'){
        return res;
      }
    }
  },
  objFind(obj,calb){
    let res,i=0;
    for(const k in obj){
      res = calb(obj[k],k,i);
      if(typeof res == 'string' || typeof res == 'boolean')return res;
      i++;
    }
  },
  toggReloadDelay(title,val=null){
    let jsonData;
    if(!(jsonData=this.getStorage('reloadDelay'))){
      jsonData = this.setStorage('reloadDelay',JSON.stringify({}))
    }
    jsonData = JSON.parse(jsonData)
    if(val!==null){
      jsonData[title] = val
      jsonData = this.setStorage('reloadDelay',JSON.stringify(jsonData))
    }
    return jsonData[title] || 0
  },
  reloadPage(justOnce){
    if(justOnce){
      const lastSaved = this.toggReloadDelay(justOnce)
      const tmDelay = new this.TimeDelay(parseInt(lastSaved))
      const res = tmDelay.compT()
      this.toggReloadDelay(justOnce,tmDelay.lastSaved)
      if(lastSaved){
        if(res < 30000){
          return
        }
      }
    }
    location.reload();
  },
  getSwitcherSlug(){
    return configInf.apiTarget||this.getStorage('switcherSlug')||(this.isDevelopEnv()?'/demo':'')
  },
  chkThrow(cond,msg,subj=''){},
  loopi(arr,fn,frsIndx,coll){
    if(isNotDef(arr)) zplDev.stop();
    let i,ret;
    i=frsIndx?frsIndx:0;
    for( ;i<arr.length;i++){
      ret=fn.call(this,arr[i],i);
      if(!isUndef(ret)&&!(coll=setColl(coll,ret,i))){
        return ret;
      }
    }
  },
  loopObj(obj,fn,coll){
    if(isNotDef(obj)) {
      return;
    }
    if(obj instanceof Array){
      return $zpl.loopi(obj,fn)
    }
    let k,ret;
    for(k in obj){
      if(obj.hasOwnProperty(k)){
        ret=fn.call(this,obj[k],k);
        if(!isUndef(ret)&&!(coll=setColl(coll,ret,k))){
          return ret;
        }
      }
    }
    return coll;
  }
}

export default ({ app }, inject) => {
  inject('zpl', Vue.observable($zpl))
}

