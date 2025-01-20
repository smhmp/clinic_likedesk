import ElmPickerSel from "./ElmPickerSel";
import zpl from "../zpl";
import {ValidationRules} from "../validation/ValidationRules";
import FieldObj from "../FieldObj";
import SmartObj from "../SmartObj";
import {lg} from "../dbg";

import {configs} from "../types";




// type sh bayad extend beshe ke tarife methid chkRules , onChange elzami beshe va harja elmObj destruct mishe in noE oonja ham ezafe beshe
export class DatePickerSels extends SmartObj{
  yearObj:ElmPickerSel
  monthObj:ElmPickerSel
  dayObj:ElmPickerSel
  dateConf=null
  curFocus:ElmPickerSel=null
  aftFocus:ElmPickerSel=null
  configs:configs

  constructor(dateConf,secDateEl,[markDay,ttlDay,markMonth,ttlMonth,markYear,ttlYear],configs:configs){
    super();
    this.dateConf = dateConf
    this.configs = configs
    const selGrpE = secDateEl.querySelector('.zpl-select-group');
    if(!selGrpE)
      return;
    const selParent = selGrpE.parentNode;

    const fieldObj = FieldObj.newField(selParent, {mainField: true})
    fieldObj.setSmartObj(this);

    selParent.removeChild(selGrpE)
    const frstChild = selParent.childNodes[0]
    const errE = zpl.getElmById(markYear+'-error')
    ElmPickerSel.selParentE = selParent
    ElmPickerSel.frstChild = frstChild
    ElmPickerSel.errE = errE

    this.dayObj = new ElmPickerSel(this,ttlDay,markDay,selGrpE.cloneNode(true),{},configs);
    this.monthObj = new ElmPickerSel(this,ttlMonth,markMonth,selGrpE.cloneNode(true),{dayObj:this.dayObj},configs);
    this.yearObj = new ElmPickerSel(this,ttlYear,markYear,selGrpE.cloneNode(true),{dayObj:this.dayObj,monthObj:this.monthObj},configs);
    this.monthObj.yearObj = this.yearObj;
    this.dayObj.monthObj = this.yearObj;
    this.dayObj.yearObj = this.yearObj;

    this.monthObj.initSet(dateConf.monthSpc)
    this.yearObj.initSet(dateConf.yearSpc)
    this.dayObj.initSet(dateConf.daySpc)
  }

  setDate({day=0,month=0,year=0}){
    day&& this.dayObj.setOption(day);
    month&& this.monthObj.setOption(month);
    year&& this.yearObj.setOption(year);
  }

  chkRules(validateRules:ValidationRules,eRuleName){
    switch (eRuleName){
      case 'required':
          const year = this.yearObj.getVal();
          const month = this.monthObj.getVal();
          const day = this.dayObj.getVal();
          validateRules.chkRequired(year && month && day);
    }
  }

  isSubLatestFocus(){
    lg(!this.aftFocus,'DatePickerSels/isSubLatestFocus/ !aftFocus',5)
    return !this.aftFocus
  }

  onFocus(e,elmPickerSel:ElmPickerSel){
    if(!this.curFocus){
      this.doFocusCalbs(e)
      this.curFocus = elmPickerSel
      let curFocus = this.curFocus;
      if(curFocus === this.dayObj){
        this.aftFocus = this.monthObj;
      }
      else if(curFocus === this.monthObj){
        this.aftFocus = this.yearObj;
      }
      else if(curFocus === this.yearObj){
        this.aftFocus = null;
      }
    }
    lg(this.curFocus,'end//DatePickerSels/onFocus/ curFocus',5)
    lg(this.aftFocus,'end//DatePickerSels/onFocus/ aftFocus',5)
  }

  onBlur(e,elmPickerSel:ElmPickerSel){
    lg(this.curFocus,'DatePickerSels/onBlur/ curFocus',5)
    if(this.curFocus){
      this.doBlurCalbs(e)
      this.curFocus = null
    }
  }

  doFocus(e){
    if(this.curFocus){
      this.curFocus.toggleSel(e,true)
    }
    let aftFocus = this.aftFocus;
    lg(aftFocus,'DatePickerSels/doFocus/ aftFocus',5)
    if(!aftFocus){
      aftFocus = this.dayObj;
    }
    aftFocus.toggleSel(e);
  }

  doblur(e){
    let curFocus = this.curFocus
    lg(curFocus,'DatePickerSels/doblur/ curFocus',5)
    if(curFocus){
      if(!curFocus.isChildUl(e.target)){
        lg(e.target,'DatePickerSels/doblur/going --> curFocus.toggleSel/ e.target',4)
        curFocus.toggleSel(e,true);
      }
    }
    this.aftFocus = null;
  }

  doNexBefOption(e,kstr){
    this.curFocus.doNexBefOption(e,kstr)
    return true;
  }

  doEnterOption(e){
    return this.curFocus.doEnterOption(e)
  }
}
