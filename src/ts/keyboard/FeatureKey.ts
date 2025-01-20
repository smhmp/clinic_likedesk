/**
 * Custom SELECT component
 * -----------------------------------------
 */
import zpl from "../zpl";
import FieldObj from "../FieldObj";
import {lg} from "../dbg";


export default class FeatureKey{

  static sortFields:{[key:number]: FeatureKey}={}
  static currField:FeatureKey=null
  static lent:number=0

  static setCurFocues(curField:FeatureKey){
    lg(curField,'FeatureKey/ setCurFocues',2)
    FeatureKey.currField = curField
  }

  static unSetCurFocues(befField:FeatureKey,by=''){
    if(befField === FeatureKey.currField){
      lg(by,'FeatureKey/unSetCurFocues/ by:',2)
      FeatureKey.currField = null
    }
  }

  static getCurFocused():FeatureKey{
    const res = FeatureKey.currField
    lg(res,'FeatureKey/ getCurFocused',2)
    return res
  }

  static isLatestField(e){
    const curFocused = FeatureKey.getCurFocused()
    const res =  curFocused && curFocused === curFocused.getLatestFiled() && curFocused.fieldObj.isSubLatestFocus()
    lg(res,'FeatureKey/ isLatestField',2)
    return res
  }

  tabIndx:number
  fieldObj:FieldObj

  constructor(fieldObj:FieldObj) {
    const sortNum = fieldObj.fieldElm.getAttribute('data-tab');
    this.tabIndx = parseInt(sortNum)
    this.fieldObj = fieldObj
    FeatureKey.sortFields[this.tabIndx] = this;
    ++FeatureKey.lent;
  }

  onFocus(e){
    lg(e,'FeatureKey/ onFocus',1)
    FeatureKey.setCurFocues(this)
  }

  onBlur(e){
    lg(this.fieldObj.fieldElm,'FeatureKey/onBlur/ fieldElm',2)
    FeatureKey.unSetCurFocues(this,'FeatureKey/blur '+this.tabIndx)
  }

  doFocus(e){
    this.fieldObj.doFocus(e);
  }

  doblur(e){
    this.fieldObj.doblur(e);
  }

  private getNextFiled(){
    const sorFiled = FeatureKey.sortFields;
    let tabIndx = this.tabIndx,i=0,nexField;
    nexField = sorFiled[++tabIndx]
    while (!nexField||!nexField.fieldObj.isEnable()){
      nexField = sorFiled[++tabIndx]
      i++;
      if(i>FeatureKey.lent){
        return null
      }
    }
    return nexField
  }

  private getLatestFiled(){
    const sorFiled = FeatureKey.sortFields;
    let tabIndx = this.tabIndx,i=0,latestField = sorFiled[tabIndx];
    while (true){
      if(sorFiled[tabIndx+1]){
        latestField = sorFiled[++tabIndx]
      }
      i++;
      if(i>FeatureKey.lent){
        return latestField
      }
    }
  }

  switchNextField(e){
    const sorFiled = FeatureKey.sortFields;
    let befField = sorFiled[this.tabIndx],nexField;
    if(!befField.fieldObj.isSubLatestFocus()){
      nexField = befField
    }
    else{
      nexField = this.getNextFiled()
    }
    if(nexField){
      if(befField !== nexField){
        lg(befField,'FeatureKey/switchNextField/going -> doblur/ befField',5)
        befField.doblur(e);
      }
      FeatureKey.setCurFocues(nexField)
      lg(nexField,'FeatureKey/switchNextField/going -> doFocus/ nexField',5)
      nexField.doFocus(e);
      return true;
    }
    else if(befField){
      FeatureKey.unSetCurFocues(befField,'FeatureKey/switchNextField/!nexField '+this.tabIndx)
    }
    return false
  }

  switchNextOption(e,kstr){
    lg(e,'FeatureKey/ switchNextOption',5)
    if(!this.fieldObj.isEnable()){
      FeatureKey.unSetCurFocues(this,'FeatureKey/switchNextOption/!isEnable '+this.tabIndx)
    }
    else{
      this.fieldObj.doNexBefOption(e,kstr)
    }
  }

  doEnterOption(e){
    lg(e,'FeatureKey/ doEnterOption',5)
    if(!this.fieldObj.isEnable()){
      FeatureKey.unSetCurFocues(this,'FeatureKey/doEnterOption/!isEnable '+this.tabIndx)
    }
    else{
      if(this.fieldObj.doEnterOption(e)){
        this.switchNextField(e);
      }
    }
  }

  doSpaceOption(e){
    lg(e,'FeatureKey/ doSpaceOption',5)
    if(!this.fieldObj.isEnable()){
      FeatureKey.unSetCurFocues(this,'FeatureKey/doSpaceOption/!isEnable '+this.tabIndx)
    }
    else{
      this.fieldObj.doSpaceOption(e)
    }
  }
}
