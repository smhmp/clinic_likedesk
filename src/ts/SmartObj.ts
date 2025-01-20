import {lg} from "./dbg";
import {ValidationRules} from "./validation/ValidationRules";

export default class SmartObj{

  changeCalbs=[]
  focusCalbs=[]
  blurCalbs=[]
  smartObj:SmartObj=null

  addCalb_onChange(calbEv){
    const that = this.smartObj||this
    that.changeCalbs.push(calbEv)
  }

  addCalb_onFocus(calbEv){
    const that = this.smartObj||this
    that.focusCalbs.push(calbEv)
  }

  addCalb_onBlur(calbEv){
    const that = this.smartObj||this
    that.blurCalbs.push(calbEv)
  }

  doChangeCalbs(e){
    lg(this.changeCalbs,'SmartObj/doChangeCalbs/ changeCalbs',4)
    if(this.changeCalbs.length){
      this.changeCalbs.forEach((eCalb)=>{
        eCalb(e)
      })
    }
  }

  doFocusCalbs(e){
    lg(this.focusCalbs,'SmartObj/doFocusCalbs/ focusCalbs',4)
    if(this.focusCalbs.length){
      this.focusCalbs.forEach((eCalb)=>{
        eCalb(e)
      })
    }
  }

  doBlurCalbs(e){
    lg(this.blurCalbs,'SmartObj/doBlurCalbs/ blurCalbs',4)
    if(this.blurCalbs.length){
      this.blurCalbs.forEach((eCalb)=>{
        eCalb(e)
      })
    }
  }

  doFocus(e){
    lg(this,'SmartObj doFocus',1)
  }

  doblur(e){
    lg(this,'SmartObj doFocus',1)
  }

  isSubLatestFocus(){
    return true
  }

  doNexBefOption(e,kstr){
    return false
  }

  doEnterOption(e){
    return false
  }

  doSpaceOption(e){
    return false
  }

  destroyEvent(){ // todo todo must complete

  }

  chkRules(validateRules:ValidationRules,eRuleName){
    //sample:
    switch (eRuleName){
      case 'required':
        validateRules.chkRequired('...');
    }
  }
}
