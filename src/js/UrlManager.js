import {chkKeyVal} from "@/src/js/utils";
import isEmpty from "lodash.isempty";
import {lg, lgWarn} from "@/src/js/dbg";

export class UrlManager{
  constructor(routId,vm) {
    this.statInit=false;
    this.statEvent=false;
    this.queArgs={};
    this.vm=vm;
    this.routId=routId;
    this.reason='';
    this.initSync()
  }

  initSync(){
    if (!isEmpty(this.getRoutQuery())) {
      this.updateByUrl()
    }
  }

  getRemoteQuery(key='', {spcKey=null,isVal = null, byIncl = false, once = true}={}){
    const options = this.vm.$router.options;
    const res = chkKeyVal(options,key,{spcKey,isVal,byIncl})
    if((key in options || options[key]) && once){
      delete options[key]
    }
    return res
  }

  setRemoteQuery(key,val){
    this.vm.$router.options[key]=val;
  }

  getRoutQuery(key='', {isVal = null, byIncl = false,toInt=false}={}) {
    let res = chkKeyVal(this.vm.$route.query,key, {isVal, byIncl})
    if(toInt){
      res = parseInt(res)
    }
    return res
  }

  updateByUrl(){
    const query = this.getRoutQuery()
    for(const k in query){
      if(query[k] && typeof query[k] == 'object'){
        this.queArgs[k] = 'length' in query[k]?[]:{}
        for(const kk in query[k]){
          this.queArgs[k][kk] = query[k][kk]
        }
      }
      else{
        this.queArgs[k] = query[k]
      }
    }
  }

  replicateByUrl(){
    for(const k in this.queArgs){
      delete this.queArgs[k]
    }
    this.updateByUrl(this.vm.$route.query)
  }

  goNewQuery(replace=false){
    this.onElmOccurred()
    this.goQuery(replace)
  }

  goQuery(replace){
    const routerConf = { name:this.routId, query: this.queArgs }
    this.vm.$router[replace?'replace':'push'](this.vm.localePath(routerConf))
  }

  goOutQuery(path,replace){
    this.vm.$router[replace?'replace':'push']({path:path})
  }

  fixedQuery({limit=false}){
    if(limit){
      this.reason = 'fixed_limit'
    }
    else{
      lgWarn('fixedQuery Must Have pre defined reason as defined in arguments')
      return
    }
    this.goQuery(true)
  }

  goBack(){
    this.vm.$router.go(-1)
  }

  querizeArgs(kArgs,vars){
    kArgs.forEach((eArg)=>{
      if(this.queArgs[eArg]){
        if(this.queArgs[eArg]*1 == this.queArgs[eArg]){
          vars[eArg]=parseInt(this.queArgs[eArg])
        }
        else{
          vars[eArg]=this.queArgs[eArg]
        }
      }
    })
  }

  setFilter(filterObj) {
    this.onElmOccurred()
    this.onChgFilter(filterObj)
  }

  onChgFilter(filters=null,initDom=false){
    if(!filters)return
    const queArgs = this.queArgs
    if (initDom) {
      for(const k in filters){
        if(!queArgs[k]){
          queArgs[k] = filters[k];
        }
      }
    }
    else{
      for (const [key, value] of Object.entries(filters)) {
        queArgs[key] = value;
      }
    }
  }

  get_page(){
    return this.getRoutQuery('page',{toInt:true})
  }

  set_page(page){
    this.queArgs.page = page;
  }

  resetAnyFilter({exceptUser=false}=false){

  }

  isFilter(filterNam){
    return this.queArgs[filterNam];
  }

  delFilter(filterNam){
    delete this.queArgs[filterNam];
  }

  onDomOccurred(method){
    this.statEvent=false
    this.statInit=true
  }

  onElmOccurred(){
    this.statInit=false
    this.statEvent=true
  }

  onWatchQuery(val, {onNoChg,onChg}){
    if(this.reason === 'fixed_limit'){
      this.reason = ''
      return
    }
    if(this.statInit&&!isEmpty(val)){
      lgWarn('This process may not have any problems\n' +
        'But just to be sure\n' +
        'If this process is triggered by any element, make sure you call "onElmOccurred" at the beginning of the function.\n' +
        'All events whose functions occur in the state: "After the initial dom loading process is finished" should call this function.')
      this.onElmOccurred()
      return
    }
    if(isEmpty(val)){
      if(onNoChg){
        onNoChg()
      }
      this.onElmOccurred()
    }
    else{
      if(onChg){
        onChg()
      }
    }
  }
}
