import {lg} from "./dbg";

declare global {
  interface Window {
    selectThisOption: any;
    guid: any;
    yearMAX: any;
    validForms: any;
  }
}



const zpl={
  onceCheck:{},
  queryElm : document.querySelector.bind(document),
  queryElms : document.querySelectorAll.bind(document),
  getElmById : document.getElementById.bind(document),
  isLocal(){
    return (window.location.host === 'connect.local' || this.getUrlParam('asLocal')) && !this.getUrlParam('asCli')
  },
  isAnz(key){
    return this.getUrlParam(key);
  },
  getUrlParam:function(key){
    key = key.toLowerCase();
    let splPrms;
    const href=window.location.href;

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
  crtElm(arg:string):any{
    arg = arg.trim().replace(/^[\s\n\t](.*)/g, '$1');
    if(arg[0]==='<'){
      const div = document.createElement('div')
      div.innerHTML = arg;
      return div.childNodes[0];
    }
    else{
      return document.createElement(arg)
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
  prevUp(e){
    e.stopPropagation();
    e.cancelBubble = true;
    e.preventDefault();
  },
  getEvStrKey({evKey='', evTyp='', e=null,flag=''}){
    if(e){
      evKey = this.getEvRawKey(e,evTyp,flag)
    }
    return evKey
  },
  isEvCommand(e,evKey,targetKey=''){
    if(targetKey){
      if(evKey === targetKey){
        return true
      }
    }
    else if(evKey.length > 1){
      return true
    }
    else if(e&&(e.ctrlKey||e.keyCode === 65||(e.metaKey&&(e.keyCode >= 65 && e.keyCode <= 90)))){
      return true
    }
    return false
  },
  qKey:false,
  getEvRawKey(e,evTyp='',elmLog=''){
    const keyCod = e.keyCode || e.which
    const keyStr = e.key
    const code = e.code
    let kstr = ''
    if(typeof keyStr == 'string'){
      kstr = keyStr.toLowerCase()
    }
    if(this.qKey&&kstr !== 'q'){
      zpl.stop()
    }
    if(!kstr||!kstr.trim()||keyCod=='32'){
      if((typeof code == 'string'&&code.toLowerCase()==='space')||keyCod=='32'){
        kstr = 'space'
      }
    }
    if(evTyp === 'keydown'){
      if(elmLog){
        lg(kstr,`${elmLog}::${evTyp}/ kStr`)
      }
      if(kstr === 'q'){
        this.qKey = true
        return
      }
    }
    else{
      if(kstr === 'q'){
        this.qKey = false
      }
    }
    return kstr
  },
  stop(){

  },
    getStorage(key: string){
        if(window.localStorage){
            return window.localStorage[key]
        }
    },
    setStorage(key: string, val: string | boolean){
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
    getRootHost(){
        return window.location.origin||window.location.href
    },
}

export default zpl;
