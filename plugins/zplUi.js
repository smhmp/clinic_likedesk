import Vue from 'vue';
import {lg} from "@/src/js/dbg";
import {zplUiDev} from "@/plugins/zplUiDev";


const toggRepoEv=(evTyp,store,keyStore,evFn=null)=>{
  let repo,repo2;
  if(!(repo=store['repoListener'])){
    repo= store['repoListener'] = {}
  }
  if(!(repo2=repo[keyStore])){
    repo2 = repo[keyStore] = {}
  }
  if(evFn){
    repo2[evTyp]=evFn
  }
  else{
      evFn=repo2[evTyp];
      delete repo2[evTyp];
  }
  return evFn
}

export const $zplUi={
  screenSize:{
    maxXXl:true,
    max968:false,
    max768:false,
    max440:false,
    max360:false,
  },
  demo(){
    let hidden = 0;
    return {
      spc1:hidden?1:0,
      spc2:hidden?0:1,
      spc3:hidden?1:0,
    }
  },
  mounted(){
    this.liveScreen()
    if(this.adev(window,"resize",()=>this.liveScreen(),{store:[this,'win_resize'],once:true})){
      zplUiDev.mounted(this)
    }
  },
  beforeDestroy(){
    this.remev(window,"resize",{store:[this,'win_resize']});
  },
  liveScreen(){
    const width = this.getInnerWidth();
    const screenSize= this.screenSize
    screenSize.max360 = width <= 360;
    screenSize.max440 = width <= 440;
    screenSize.max768 = width <= 768;
    screenSize.max968 = width <= 968;
  },
  adev(elm,evTyp,evFn,{args={},store=null,once=false}={}){
    if(once && store && toggRepoEv(evTyp,store[0],store[1])){
      if($zpl.isAnzMode()){
        $zpl.toastWarning('adev / make event more than once')
      }
      return false
    }
    if(elm instanceof Array){
      elm.forEach((eElm)=>{
        $zplUi.adev(eElm,evTyp,evFn,{args,store,once})
      });
      return;
    }
    const myEvfn = (e)=>{
      evFn(e, {evTyp,...args})
    }
    elm.addEventListener(evTyp,myEvfn)
    if(store){
      toggRepoEv(evTyp,store[0],store[1],myEvfn)
    }
    return myEvfn
  },
  remev(elm,evTyp,{evFn=null,store=null}){
    if(!evFn){
      evFn = toggRepoEv(evTyp,store[0],store[1])
    }
    elm.removeEventListener(evTyp,evFn)
  },
  hasRelation(parElm,childElem){
    if(parElm instanceof Array){
      let hasRelation = false,res
      $zpl.arrFind(parElm,(eElm)=>{
        res = this.hasRelation(eElm,childElem)
        if(res){
          hasRelation = res
        }
      })
      return hasRelation
    }

    const res = (parElm && parElm?.contains(childElem)) || parElm === childElem
    lg.col_toolsData('hasRelation/res',res,{addi:{parElm,childElem}})
    return res;
  },
  crtElm(arg){
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
  getInnerWidth(){
    return window.innerWidth
  },
  setScrollTop(top,elmScroll=null){
    if(!elmScroll) {
      window.scrollTo(0, top);
    }
    else{
      elmScroll.scrollTop = top
      if(elmScroll.scrollTop !== top){
        elmScroll.scrollTo(0, top);
      }
    }
  },
  getViewport({justTop=false, elm = null}={}) {
    let domElm,compat=false,top;
    if(!elm){
      elm = document;
      domElm = document.documentElement;
      compat = document.compatMode == 'CSS1Compat'
    }
    if(domElm){
      top = window.pageYOffset || (compat ? domElm.scrollTop : document.body.scrollTop);
    }
    else{
      top = elm.scrollTop;
    }
    if(justTop){
      return top
    }
    if(domElm){
      return {
        left : window.pageXOffset || (elm ? domElm.scrollLeft : document.body.scrollLeft),
        top : top,
        width : window.innerWidth || (elm ? domElm.clientWidth : document.body.clientWidth),
        height : window.innerHeight || (elm ? domElm.clientHeight : document.body.clientHeight)
      };
    }
    else{
      return {
        left : elm.scrollLeft,
        top : top,
        width : elm.clientWidth,
        height : elm.clientHeight
      };
    }
  },
  getStyles(elm,prop='left'){
    const style = window.getComputedStyle(elm);
    return style.getPropertyValue(prop);
  },
  getOffSet:function(elem){
    let docElem, win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    box = elem.getBoundingClientRect();
    win = (doc != null && doc == doc.window) ?
      doc :
      doc.nodeType === 9 ?
        doc.defaultView || doc.parentWindow :
        false;
    const top = box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 );
    const left = box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 );
    return {
      top: top,
      top_height: top + box.height,
      bottom: box.bottom,
      left: left,
      left_width: left + box.width,
      right: box.right,
      height: box.height,
      width: box.width,
    };
  },
  onFixedByScroll({toUp=-1,toDown=-1},calbOccurred){
    return ()=>{
      let posEdge;
      if(toUp>-1) {
        posEdge = window.scrollY + window.innerHeight
      }
      if(toDown>-1) {
        posEdge = this.getViewport({justTop:true})
      }
      if(toUp>-1){
        calbOccurred(posEdge < toUp)
      }
      else{
        calbOccurred(posEdge > toDown)
      }
    }
  },
  scrollByFocusChild(arrow,elmScroll,elm){
    let nowScroll = elmScroll.scrollTop
    if(arrow === 'arrowdown'){
      this.setScrollTop(0,elmScroll)
    }
    let posChild = elm.getClientRects()[0]
    let posPar = elmScroll.getClientRects()[0]

    let parTop = posPar.top
    let childTop = posChild.top
    const addi = elmScroll.scrollHeight > 10?10:0

    let distanceTop = Math.floor(childTop-parTop)
    // lg.col_calcMath('arrow/[nowScroll,distanceTop,parTop,childTop]',[nowScroll,distanceTop,parTop,childTop],{addi:{posChild,posPar}})
    if(arrow === 'arrowdown'){
      if(Math.floor(distanceTop+posChild.height + addi) > posPar.height){
        const scrollTop = Math.floor(nowScroll + posChild.height)
        // lg.col_calcMath('arrow/down/scrollTop',scrollTop)
        this.setScrollTop(scrollTop,elmScroll)
      }
    }
    else{
      if(childTop - parTop < 0){
        const scrollTop = Math.floor(nowScroll - posChild.height)
        // lg.col_calcMath('arrow/up/scrollTop',scrollTop)
        this.setScrollTop(scrollTop,elmScroll)
      }
    }
  },
  animateMove({deadTime=0,untilNum,token={}},calbChange){
    let start, previousTimeStamp,count;
    let done = false;
    token.wheelOccured = false;
    function step(timeStamp) {
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;

      if (previousTimeStamp !== timeStamp) {
        count = calbChange({elapsed, untilNum, count,token})
        if (count === untilNum || token.isDone) done = true;
      }

      if (!deadTime || elapsed < deadTime) {// Stop the animation after 2 seconds
        previousTimeStamp = timeStamp;
        if (!done && !token.wheelOccured) {
          window.requestAnimationFrame(step);
        }
        else if(token.callEndOccured){
            token.endOccured = true;
            calbChange({elapsed, untilNum, count,token})
        }
      }
    }

    window.requestAnimationFrame(step);
  },
  KeySens:class{
    constructor(subj='') {
      this.subj = subj
      this.keepDown = {};
      this.sensKeyUpFn = null;
      this.sensKeyDownFn = null;
    }
    getStrKey(e,evTyp){
      const keyCod = e.keyCode || e.which
      const keyStr = e.key
      const code = e.code
      let kstr = ''
      if(typeof keyStr == 'string'){
        kstr = keyStr.toLowerCase()
      }
      if(!kstr||!kstr.trim()||keyCod=='32'){
        if((typeof code == 'string'&&code.toLowerCase()==='space')||keyCod=='32'){
          kstr = 'space'
        }
      }
      if(this['dbg_getStrKey']){
        this['dbg_getStrKey'](kstr,evTyp)
      }
      return kstr
    }
    removeKeyUp(elm){
      if(this.sensKeyUpFn){
        $zplUi.remev(elm,'keyup', {evFn:this.sensKeyUpFn});
        this.sensKeyUpFn=null;
      }
    }
    removeKeyDown(elm){
      if(this.sensKeyDownFn){
        $zplUi.remev(elm,'keydown', {evFn:this.sensKeyDownFn});
        this.sensKeyDownFn=null;
      }
    }
    sensKeyDown(elm,{onEnter,onArrow,onKeydown,onEsc}={}){
      const evTyp = 'keydown'
      const fvEn = (ev)=>{
        const kstr = this.getStrKey(ev,evTyp)
        if(kstr === 'enter'){
          if(onEnter) onEnter(ev,evTyp)
        }
        else if(kstr === 'escape'){
          if(onEsc) onEsc(ev,evTyp)
        }
        else if(kstr.indexOf('arrow')>-1){
          if(onArrow) onArrow(ev,kstr,evTyp)
        }
        else {
          if(onKeydown){
            onKeydown(ev)
          }
        }
        this.keepDown[kstr] = 1
      }
      this.sensKeyDownFn = $zplUi.adev(elm,evTyp,fvEn,{once:true});
    }
    sensKeyUp(elm,{onEnter,onKeyup,onArrow,onEsc}={}){
      const evTyp = 'keyup'
      const fvEn = (ev)=>{
        const kstr = this.getStrKey(ev,evTyp)
        if(kstr === 'enter'){
          if(onEnter) onEnter(ev,evTyp)
        }
        else if(kstr === 'escape'){
          if(onEsc) onEsc(ev,evTyp)
        }
        else if(kstr.indexOf('arrow')>-1){
          if(onArrow) onArrow(ev,kstr,evTyp)
        }
        else {
          if(onKeyup){
            onKeyup(ev)
          }
        }
        this.keepDown[kstr] = 0
      }
      this.sensKeyUpFn = $zplUi.adev(elm,evTyp,fvEn,{once:true});
    }
  },
  mkKeySens(subj=''){
    return new this.KeySens(subj)
  },
  addStyle(id, href) {
    let styleElement = document.getElementById(id);
    if (!styleElement) {
      styleElement = document.createElement('link');
      styleElement.id = id;
      styleElement.href = href;
      document.body.appendChild(styleElement);
    }
  },
  removeStyle(id) {
    const styleElement = document.getElementById(id);
    if (styleElement) {
      styleElement.remove();
    }
  }
}

export default ({ app }, inject) => {
  inject('zplUi', Vue.observable($zplUi))
}

