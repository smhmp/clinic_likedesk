import {ISelectBirth} from "../types";
import zpl from "../zpl";
import {lg} from "../dbg";
import {DatePickerSels} from "./DatePickerSels";
import FieldObj from "../FieldObj";

import {configs} from "../types";

/**
 * datePicker Selector maker Component
 */
export default class ElmPickerSel{

  static selParentE:HTMLElement;
  static frstChild:HTMLElement;
  static errE:HTMLElement;

  ttl = ''
  /*changeCalbs=[]
  focusCalbs=[]
  blurCalbs=[]*/

  selGrpE = null
  selE = null
  selValE = null
  selValSpanE = null
  selLblE = null
  selLstE = null
  selUlE = null
  selLiE = null
  inpHiddenO:FieldObj

  showUl = true

  yearObj = null;
  monthObj = null;
  dayObj = null;

  optSeled:ISelectBirth = null;
  curOpts = null;
  datePickMan:DatePickerSels = null;
  markDate = '';
  curIndxOptSeled = -1;
  configs:configs;

  constructor(datePickMan,ttl,nameInp,selGrpE,{yearObj,monthObj,dayObj}:ElmPickerSel|any={},configs:configs) {
    this.configs = configs;
    this.datePickMan = datePickMan;
    this.ttl = ttl;
    this.markDate = nameInp;
    ElmPickerSel.selParentE.insertBefore(selGrpE,ElmPickerSel.frstChild);
    this.selGrpE = selGrpE;
    this.selE = selGrpE.querySelector('.zpl-select');
    this.selValE = selGrpE.querySelector('.zpl-select-value');
    this.selValSpanE = this.selE.querySelector('span');
    this.selLblE = selGrpE.querySelector('.zpl-select-label');
    this.selLstE = selGrpE.querySelector('.zpl-select-list');
    this.selUlE = this.selLstE.querySelector('ul');
    this.selLiE = this.selUlE.children[0];
    this.initConfs(ttl);
    this.initEvents();

    this.yearObj = yearObj;
    this.monthObj = monthObj;
    this.dayObj = dayObj;

    this.inpHiddenO = FieldObj.newField(zpl.queryElm(`input[name="${nameInp}"]`))
    selGrpE.classList.add(nameInp)
  }

  initConfs(ttl){
    this.selUlE.removeChild(this.selLiE);
    this.setTtl(ttl)
    this.toggleSel()
  }

  initEvents(){
    this.selE.addEventListener('click',(e)=>{
      zpl.prevUp(e)
      if(this !== this.datePickMan.curFocus){
        this.datePickMan.doblur(e)
      }
      this.toggleSel(e)
    })
    document.documentElement.addEventListener('click', (e)=>{
      if(this.datePickMan.curFocus === this){
        this.datePickMan.doblur(e)
      }
    });
  }

  initSet(dateSpc){
    const defVal = this.inpHiddenO.getValue();

    if(!defVal||!this.markDate.includes('_day')||!this.curOpts){
      this.curOpts = this.datePickMan.dateConf.getOpts(this.markDate,dateSpc)
      this.mkLis(this.curOpts)
    }
    if(defVal){
      this.setOption(defVal)
    }
  }

  setOption(val){
    const optSeled = this.curOpts.filter(i => i.value === parseInt(val))[0]
    this.__setVal(optSeled);
  }

  chkValidDay(validSeled,opts:ISelectBirth[],e=null){
    if(this.optSeled&&!validSeled){
      this.resetSel();
      if(e){
        this.toggleSel(e);
        return true
      }
    }
    return false
  }

  __setVal(optSeled){
    if(optSeled){
      this.optSeled = optSeled;
      this.configs?.onSelect(this.markDate,optSeled.value)
      this.toggleFocus(this.ttl)
      this.setTtl(optSeled.value)
      this.inpHiddenO.setValue(optSeled.value);
      this.selE.classList.add('has-value');
    }
  }

  getVal(){
    if(this.optSeled){
      return this.optSeled.value;
    }
    return '';
  }

  resetSel(){
    this.optSeled = null
    this.toggleFocus('')
    this.setTtl(this.ttl)
    this.inpHiddenO.setValue('');
    this.selE.classList.remove('has-value');
  }

  mkLis(opts:ISelectBirth[]){
    this.selUlE.innerHTML = ''
    const optSeld = this.optSeled
    let keepSeled = false,indx=0
    opts.forEach((opt)=>{
      const li = this.selLiE.cloneNode(true)
      li.querySelector('.title').textContent = opt.text;
      li.addEventListener('click',(e)=>{
        zpl.prevUp(e)
        this.onSelectOpt(e,opt,true)
      })
      li.addEventListener('mouseover',(e)=>{
        this.offBefHoverLi(e)
        this.onAftHoverLi(e.target)
      })
      this.selUlE.appendChild(li);
      if(optSeld && opt.text === optSeld.text){
        keepSeled = true
      }
      indx++;
    })
    return keepSeled;
  }

  setTtl(ttl){
    this.selValSpanE.textContent = ttl;
  }

  toggleFocus(ttl=''){
    this.selLblE.textContent = ttl;
    this.selLblE.classList[ttl?'add':'remove']('isSelectFocused');
  }

  toggleSel(e=null,doHide=false,liClick=false){
    if(doHide){
      this.showUl = false
    }
    else{
      this.showUl = !this.showUl;
    }
    this.selLstE.classList[this.showUl?'remove':'add']('hidden');
    this.selE.classList[this.showUl?'add':'remove']('focused');
    if(e&&!liClick){
      if(this.showUl){
        this.datePickMan.onFocus(e,this)
      }
      else{
        this.datePickMan.onBlur(e,this)
      }
    }
  }

  isChildUl(targetElm:any){
    let elm = targetElm;
    while (elm){
      if(elm === this.selUlE){
        return true;
      }
      elm = elm.parentNode;
    }
    return false;
  }

  onSelectOpt(e,optSeled:ISelectBirth,liClick=false){
    this.toggleSel(e,false,liClick);
    if(optSeled){
      if(!ElmPickerSel.errE.classList.contains('hidden')){
        ElmPickerSel.errE.classList.add('hidden')
      }
      this.datePickMan.doChangeCalbs(e)
    }
    this.__setVal(optSeled);
    let opts,args;
    if(this.markDate.includes('_year')){
      if(this.monthObj.optSeled?.value === 12){
        args = {
          optMonth:this.monthObj.optSeled,
          optYear:this.optSeled
        }
      }
    }
    else if(this.markDate.includes('_month')){
      args = {
        optMonth:this.optSeled,
        optYear:this.yearObj.optSeled
      }
    }
    if(args&&args.optMonth){
      opts = this.datePickMan.dateConf.getOpts(this.dayObj.markDate,this.datePickMan.dateConf.daySpc,args)
      this.dayObj.curOpts = opts;
      const validSeled = this.dayObj.mkLis(opts)
      return !this.dayObj.chkValidDay(validSeled,opts,e)
    }
    return true
  }

  private addTempInp(liElm){
    if(liElm){
      const inpE = document.createElement('input');
      inpE.style.cssText = 'opacity:0;width:0;height:0;';
      liElm.appendChild(inpE);
      setTimeout(() => {
        liElm.removeChild(inpE);
      }, 300);
      inpE.focus();
    }
  }

  private offBefHoverLi(e){
    const befLi = this.selUlE.childNodes[this.curIndxOptSeled]
    if(befLi){
      befLi.classList.remove('hovered')
    }
  }

  private onAftHoverLi(liElm){
    if(liElm){
      liElm.classList.add('hovered')
    }
    this.curIndxOptSeled = [...this.selUlE.childNodes].indexOf(liElm)
  }

  doNexBefOption(e,kstr){
    this.offBefHoverLi(e)
    let aftIndx;
    if(kstr === 'arrowdown'){
      aftIndx = Math.min(this.curOpts.length-1,this.curIndxOptSeled+1);
    }
    else if(kstr === 'arrowup'){
      aftIndx = Math.max(0,this.curIndxOptSeled-1);
    }

    const aftLi = this.selUlE.childNodes[aftIndx]
    this.onAftHoverLi(aftLi)
    this.addTempInp(aftLi)
    const optSeled = this.curOpts[this.curIndxOptSeled];
    this.__setVal(optSeled);
  }

  doEnterOption(e){
    let optSeled = null
    if(this.curIndxOptSeled>-1){
      optSeled = this.curOpts[this.curIndxOptSeled];
    }

    return this.onSelectOpt(e,optSeled)
  }
}
