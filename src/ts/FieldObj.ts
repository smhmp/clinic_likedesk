/**
 * Custom SELECT component
 * -----------------------------------------
 */
import zpl from "./zpl";
import SmartObj from "./SmartObj";
import {lg} from "./dbg";


export default class FieldObj extends SmartObj{

  static repoFieldObjs={}

  name:string
  localizeName:string
  isRequire:string|boolean
  fieldElm:HTMLInputElement
  scopElm:HTMLElement|HTMLInputElement
  smartObj:SmartObj

  changeCalbs=[]
  focusCalbs=[]
  blurCalbs=[]
  enabled=true
  dataGrpObj:FieldObj=null
  dataGrpName:string

  static newField(fieldElm,{asDataGrp=false,mainField=false}:{asDataGrp?:Boolean,mainField?:Boolean}={}):FieldObj{ //todo todo asDataGrp va asDataGrp must optimize
    let name,required=false,scopElm=fieldElm;
    if(scopElm.nodeName.toLowerCase() === 'input'){
      name = scopElm.getAttribute('name');
      required = scopElm.getAttribute('required') || false;
    }
    else{
      name = scopElm.getAttribute('data-name');
      if(!name){
        let realElm;
        realElm = scopElm.querySelector('*[data-name]')
        if(realElm){
          scopElm = realElm
          name = scopElm.getAttribute('data-name');
        }
        else{
          realElm = scopElm.querySelector('input')
          if(realElm){
            scopElm = realElm
          }
          else{
            zpl.stop()
          }
          name = scopElm.getAttribute('name');
        }
      }
      required = scopElm.getAttribute('data-required') || false;
    }

    const nmField = zpl.queryElm('.nm-'+name);
    if(nmField && nmField.classList.contains('is_none')){
        required = false;
    }

    if(!name){
      zpl.stop()
    }
    lg(name,'req --> newField',1)
    let resObj;
    if(mainField){
      if(asDataGrp){
          const fieldObjGrp = new FieldObj(name,required,fieldElm,scopElm,FieldObj.repoFieldObjs[name].dataGrpObj)
          FieldObj.repoFieldObjs[name].setDataGrp(fieldObjGrp,true)
      }
      else{
        FieldObj.repoFieldObjs[name] = new FieldObj(name,required,fieldElm,scopElm,FieldObj.repoFieldObjs[name])
      }

      resObj = FieldObj.repoFieldObjs[name];
    }
    else{
      resObj = new FieldObj(name,required,fieldElm,scopElm)
    }

    resObj.localizeName = scopElm.getAttribute('data-localize');

    return resObj
  }

  static focusOut(){
    lg('doFocusOut','',1);
    const inpE = document.createElement('input');
    inpE.style.cssText = 'opacity:0;width:0;height:0;display:hidden;position:absolute;top:0;';
    document.body.appendChild(inpE);
    setTimeout(() => {
      document.body.removeChild(inpE);
    }, 1000);
    inpE.focus();
  }

  constructor(name,required=false,fieldElm,scopElm,dis:FieldObj=null) {
    super();
    this.name = name;
    this.isRequire = required;
    this.fieldElm = fieldElm;
    this.scopElm = scopElm;
    fieldElm['fieldObj'] = this
    this.setDataGrp(this);
    if(dis){
        if(dis.smartObj){
            this.setSmartObj(dis.smartObj);
        }
    }
  }

  setDataGrp(fieldObj:FieldObj,mustBe=false){
    this.dataGrpName = fieldObj.fieldElm.getAttribute('data-group');
    if(this.dataGrpName){
      this.dataGrpObj = fieldObj
    }
    else if(mustBe){
      zpl.stop()
    }
  }

  setSmartObj(elmObj){
    this.smartObj = elmObj;
    while (this.changeCalbs.length){
      elmObj.changeCalbs.push(this.changeCalbs.shift())
    }
    while (this.focusCalbs.length){
      elmObj.focusCalbs.push(this.focusCalbs.shift())
    }
    while (this.blurCalbs.length){
      elmObj.blurCalbs.push(this.blurCalbs.shift())
    }
  }

  isSubLatestFocus(){
    if(this.smartObj){
      return this.smartObj.isSubLatestFocus()
    }
    return super.isSubLatestFocus()
  }

  doFocus(e){
    lg(e,'FiledObj/doFocus/ e',1)
    if(this.smartObj){
      this.smartObj.doFocus(e)
    }
    else{
      const nodNam = this.fieldElm.nodeName.toLowerCase(),fieldElm = this.fieldElm
      lg(fieldElm,'FiledObj/doFocus/ fieldElm',1)
      if(nodNam === 'input'||nodNam === 'button'){
        fieldElm.focus()
      }
      else{
        const focusElm = fieldElm.querySelector('input')||fieldElm.querySelector('button')
        if(focusElm){
          lg(focusElm,'FiledObj/doFocus/ focusElm',1)
          focusElm.focus()
        }
        else{
          zpl.stop()
        }
      }
    }
  }

  doblur(e){
    lg(e,'FiledObj/doblur/ e',1)
    if(this.smartObj){
      this.smartObj.doblur(e)
    }
    else{
      lg('FieldObj.focusOut()','',1)
      FieldObj.focusOut()
    }
  }

  setEnable(){
    this.dataGrpObj.enabled = true
    lg(this.dataGrpObj.fieldElm,'dataGrpObj/ setEnable: '+this.name,1)
  }

  setDisable(){
    this.dataGrpObj.enabled = false
    lg(this.dataGrpObj.fieldElm,'dataGrpObj/ setDisable: '+this.name,1)
  }

  isEnable(){
    return !this.dataGrpObj||this.dataGrpObj.enabled
  }

  doNexBefOption(e,kstr){
    lg(e,'FiledObj doFocus',1)
    if(this.smartObj){
      this.smartObj.doNexBefOption(e,kstr)
      return true;
    }
    return false;
  }

  doEnterOption(e){
    if(this.smartObj){
      return this.smartObj.doEnterOption(e)
    }
    else if(this.fieldElm.nodeName.toLowerCase() === 'button'){
      lg('FieldObj/doEnterOption/ going enter button','',1)
      this.fieldElm.click()
      return false;
    }
    return true;
  }

  doSpaceOption(e){
    if(this.smartObj){
      this.smartObj.doSpaceOption(e)
      return true;
    }
    else{
      if(this.fieldElm.nodeName.toLowerCase() === 'input'&&this.fieldElm.type==='checkbox'){
        lg('FieldObj/doEnterOption/ going enter checkbox','',1)
        this.fieldElm.click()
        return true;
      }
    }
    return false;
  }

  getValue():string{
    return this.fieldElm.value
  }

  setValue(val){
    this.fieldElm.value = val
  }

  isValue(val){
    return this.fieldElm.value === val
  }
}
