// @ts-nocheck

import zpl from "../zpl";
import {ValidationRules} from "./ValidationRules";
import FieldObj from "../FieldObj";
import {ilg} from "../dbg";
import {$zpl} from "~/plugins/zpl";
import {lg} from "~/src/js/dbg";
import * as pug from "pug";
const caml = zpl.camelize;

/**
 * FieldValidator
 * ----------------------------------------
 */
export default class FieldValidator {

  errE:HTMLElement|null
  fieldElm:HTMLInputElement|any
  fieldObj:FieldObj
  name:string
  validateRule:ValidationRules
  rules:string[]=[]
  static errFoucsed = false
  occ_hideErrByKeydown = false
  occ_showErrByKeydown = false
  act_errorVisibled = false
  sort_keyOuccred = 0
  timers = {}

  constructor(fieldObj:FieldObj) {
    this.errE = zpl.queryElm(`div[data-error="${fieldObj.name}"]`)
    this.fieldElm = fieldObj.fieldElm;
    this.fieldObj = fieldObj;
    if(fieldObj.isRequire){
      this.rules.push('required')
    }

    const dataRules = fieldObj.fieldElm.getAttribute('data-rules')
    if(dataRules){
      this.rules=this.rules.concat(dataRules.split(','));
    }

    this.validateRule=new ValidationRules(fieldObj);
    this.name=fieldObj.name;
  }

  resetAll(){
    this.act_errorVisibled = false;
    this.validateRule.resetAllArr(true);
  }

  chgMsg(markMsg:string,newMsg){
    this.validateRule.chgMsg(markMsg,newMsg);
  }

  private static chkColon(val,{getMark,getArgsMark}:{[key:string]:boolean}={}){
    if(getMark){
      if(val.indexOf(':')>0){
        val = val.split(':')[0]
      }
      return val;
    }
    else if(getArgsMark){
      let args={xx:''};
      if(val.indexOf(':')>0){
        val = val.split(':')
        const eRuleNameTemp = val.shift()
        args.xx = val[0];
        val = eRuleNameTemp
      }
      return [args,val]
    }
    return val;
  }

  isValid(){
    const validateRule = this.validateRule;
    for(let i=0,eRuleName;i<this.rules.length,eRuleName=this.rules[i];i++){
      if(typeof eRuleName =='string'){
        if(eRuleName.indexOf('|')>0){
          eRuleName = eRuleName.split('|')
        }
        else{
          eRuleName = [eRuleName]
        }
      }
      for(let ii=0,orRule;ii<eRuleName.length,orRule=eRuleName[ii];ii++){
        orRule = FieldValidator.chkColon(orRule,{getMark:true});
        const arrVal = validateRule[caml('issue '+orRule)]
        lg.col_HighOrange('isValid / [orRule,arrVal]',[orRule,arrVal]);
        if(arrVal.length){
          return false;
        }
      }
    }
    return true;
  }

  chkRules(tokenEvKey:TokenEvKey){
    const validateRule = this.validateRule;
    let args;
    for(let i=0,eRuleName;i<this.rules.length,eRuleName=this.rules[i];i++){
      if(eRuleName.indexOf('|')>0){
        eRuleName = eRuleName.split('|')
      }

      if(!tokenEvKey.isCommandEv() && tokenEvKey.oneChar !== null && (eRuleName === 'required')){
        continue;
      }

      let val;
      const fieldObj = this.fieldObj
      if (fieldObj.smartObj) {
          fieldObj.smartObj.chkRules(validateRule, eRuleName);
      }
      else if(this.fieldElm.nodeName.toLowerCase() === 'input' || this.fieldElm.nodeName.toLowerCase() === 'textarea'){

        if(tokenEvKey.oneChar !== null){
          val = tokenEvKey.oneChar;
        }
        else{
          val = this.fieldObj.getValue();
        }

        if(typeof eRuleName =='string'){
          eRuleName = [eRuleName]
        }
        for(let ii=0,orRule;ii<eRuleName.length,orRule=eRuleName[ii];ii++){
          [args,orRule] = FieldValidator.chkColon(orRule,{getArgsMark:true})
          args.tokenEvKey=tokenEvKey;
          args.fullVal=this.fieldObj.getValue();
          validateRule[caml('chk '+orRule)].apply(validateRule,[val,args]);
        }
      }
    }
  }

  focusField(){
    if(this.fieldElm.nodeName.toLowerCase() === 'input'){
      window.setTimeout(()=>{
          this.fieldElm.focus()
      },500)
    }
  }

  setErrMsg(msgs:string,timerMark=''){
    if(msgs){
      this.errE.innerHTML = msgs;
    }
    if(!this.fieldElm.classList.contains("hasError")){
      this.fieldElm.classList.add("hasError");
    }
    if(this.errE.classList.contains("hidden")){
      this.errE.classList.remove("hidden");
    }
    if(timerMark&&!this.timers[timerMark]){
      window.setTimeout(()=>{
        this.hideErrors('setError')
        this.timers[timerMark] = false;
      },5000)
      this.timers[timerMark] = true;
    }
  }

  showErr(requireMsgs:string=''){
    if(requireMsgs){
      this.validateRule.setRequireMsg(requireMsgs)
    }

    const validateRule = this.validateRule;
    let msgs = '',args;
    for(let i=0,eRuleName;i<this.rules.length,eRuleName=this.rules[i];i++){
      if(typeof eRuleName =='string'){
        if(eRuleName.indexOf('|')>0){
          eRuleName = eRuleName.split('|')
        }
        else{
          eRuleName = [eRuleName]
        }
      }
      let i,ii,orRule,orSubRule;
      for(i=0;i<eRuleName.length,orRule=eRuleName[i];i++){
        [args,orRule] = FieldValidator.chkColon(orRule,{getArgsMark:true})
        const issues = validateRule[caml('issue '+orRule)];
        for(ii=0;ii<issues.length,orSubRule=issues[ii];ii++){
          if(msgs){
            msgs+= '</br>'
          }
          msgs += validateRule.getMsg(orSubRule,[args])
        }
      }
    }
    this.setErrMsg(msgs)
  }

  hideErr(){
    if(this.fieldElm.classList.contains("hasError")){
      this.fieldElm.classList.remove("hasError");
    }
    this.errE.innerHTML = '';
    if(!this.errE.classList.contains("hidden")){
      this.errE.classList.add("hidden");
    }
    return true
  }

  private chkValidKeyEv(e,tokenEvKey:TokenEvKey){
    this.chkRules(tokenEvKey);
    if(!this.isValid()){
      lg.col_HighRed('chkValidKeyEv / is not valid');
      if(!tokenEvKey.isKeyup || !this.act_errorVisibled){
        if(!this.act_errorVisibled){
          this.showErr();
        }
        this.act_errorVisibled = true;
        const validateRule = this.validateRule;
        if(validateRule.issueJustLetter.length || validateRule.issueJustNumber.length || validateRule.issueMax.length|| validateRule.issueCardPan.length|| validateRule.issueCurrency.length){ //todo todo in if ro bayad khode func validator bege true hast ya na
          if(!tokenEvKey.isCommandEv()){
            $zpl.prevEvery(e);
            if(tokenEvKey.isKeydown){
              this.occ_showErrByKeydown = true;
            }
          }
        }
      }
      return false
    }
    lg.col_HighGreen('chkValidKeyEv / is valid');
    return true
  }

  chkValidKeyUp(e,oneChar:any){
    if(this.sort_keyOuccred !== 1)return
    this.sort_keyOuccred = 0;
    const tokenEvKey = new TokenEvKey(this,{e, oneChar,isKeyup:true});
    if(this.chkValidKeyEv(e,tokenEvKey)){
      this.hideErrors('keyup');
    }
    lg.col_HighGray('chkValidKeyUp / bef going resetAll / issueLength',this.validateRule.issueLength);
    this.resetAll()
  }

  chkValidKeyDown(e,oneChar:any){
    this.sort_keyOuccred = 1;
    lg.col_HighGray('chkValidKeyDown / going start');
    const tokenEvKey = new TokenEvKey(this,{e, oneChar,isKeydown:true});
    if(this.chkValidKeyEv(e,tokenEvKey,oneChar)){
      this.hideErrors('keydown')
    }
  }

  chkValidAndShow(requireMsgs:string=''){
    let res=true;
    if(requireMsgs){
      this.validateRule.setRequireMsg(requireMsgs)
    }
    this.chkRules(new TokenEvKey(this,{isFreeChk: true}));
    if(!this.isValid()){
      this.showErr()
      if(!FieldValidator.errFoucsed){
        this.focusField();
        FieldValidator.errFoucsed = true
      }
      res = false;
    }
    this.resetAll()
    return res;
  }

  hideErrors(wer:string,forKeydown=false){
    if(wer == 'setError' || wer == 'chkValidKeyDown'){

    }
    else if(wer == 'keydown'){
      this.occ_hideErrByKeydown = true;
    }
    else if(wer == 'blur'){
      if(!this.occ_showErrByKeydown){
        return
      }
    }
    else if((wer == 'keyup' || wer == 'change')){
      if(this.occ_hideErrByKeydown){
        this.occ_hideErrByKeydown = false;
        return
      }
    }

    this.occ_showErrByKeydown = false;
    if(this.hideErr()){
      FieldValidator.errFoucsed = false
    }
  }
}





export class TokenEvKey {
  isCtrlKey=false
  ev=null
  oneChar=null
  isFreeChk=false
  isKeydown=false
  isKeyup=false
  fieldValid=null

  constructor(fieldValid,{e=null, oneChar=null, isFreeChk=false,isKeydown=false,isKeyup=false}) {
    this.ev = e
    this.isCtrlKey = e && e.ctrlKey
    this.oneChar = oneChar
    this.isFreeChk = isFreeChk
    this.isKeydown = isKeydown
    this.isKeyup = isKeyup
    this.fieldValid = fieldValid
  }

  isCommandEv(){
    return this.ev && $zpl.isEvCommand(this.ev,this.oneChar)
  }

  isChgValComand(){
    return this.isPaste() || this.isEraseComand()
  }

  isEraseComand(){
    return this.oneChar === 'backspace' || this.oneChar === 'delete'
  }

  isPaste(){
    return this.isCtrlKey && (this.oneChar === 'v' || this.oneChar === 'ر')
  }

  isHled(){
    return window.getSelection && window.getSelection().type === 'Range'
  }

  isExceptCommand(){
    return this.isCtrlKey || this.isPaste() || this.oneChar === 'backspace'
  }
}
