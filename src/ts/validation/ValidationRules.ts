// @ts-nocheck

import zpl from "../zpl";
import {langTools,langMan} from "~/src/js/langMan";
import {lg} from "~/src/js/dbg";
import {TokenEvKey} from "~/src/ts/validation/FieldValidator";
import {$zpl} from "~/plugins/zpl";
import FieldObj from "~/src/ts/FieldObj";

/**
 * ValidationRules
 * ----------------------------------------
 */
export class ValidationRules {
  msgs = {
    requiredMsg : {},
    is_required({fieldObj}){
      if(this.requiredMsg['currMsgReq']){
        return this.requiredMsg['currMsgReq'];
      }
      return "این فیلد الزامیست"
    },
    wrong_email: "لطفا ایمیل خود را به درستی وارد کنید",
    wrong_mobile : "لطفا شماره موبایل خود را به درستی وارد کنید",
    ssn_length_10 : "کد ملی 10 رقمی می باشد.",
    wrong_ssn : "کد ملی وارد شده صحیح نمی باشد",
    just_en({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName + " فقط شامل حروف انگلیسی می باشد"
    },
    just_fa({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName + " فقط شامل حروف فارسی می باشد"
    },
    more_space({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName + " نمی تواند 2 فاصله داشته باشد"
    },
    just_letter({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName + " فقط شامل حروف می باشد"
    },
    just_number({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName + " فقط شامل عدد باشد"
    },
    must_currency : "محتوای مبلغ فقط عدد می باشد",
    true_currency : "مبلغ را به درستی وارد کنید",
    pan_justNum : "محتوای شماره کارت فقط عدد می باشد",
    pan_is16 : "محتوای شماره کارت 16 رقمی می باشد",
    justLetter({xx='',fieldObj}:{fieldObj:FieldObj}){
      if(xx ==='fa'){
        return 'محتوای '+fieldObj.localizeName+" فقط شامل حروف فارسی می باشد"
      }
      return 'محتوای '+fieldObj.localizeName+" فقط شامل حروف می باشد"
    },
    passport({fieldObj}:{fieldObj:FieldObj}){
      return 'محتوای '+fieldObj.localizeName+" فقط شامل عدد و حروف انگلیسی می باشد"
    },
    less_min({xx='',fieldObj}:{fieldObj:FieldObj}){
      return 'اندازه محتوای '+fieldObj.localizeName+` نباید از ${xx} کمتر باشد`
    },
    more_max({xx='',fieldObj}:{fieldObj:FieldObj}){
      return 'اندازه محتوای '+fieldObj.localizeName+` حداکثر می تواند ${xx} باشد`
    },
    wrong_length({xx='',fieldObj}:{fieldObj:FieldObj}){
      return 'اندازه محتوای '+fieldObj.localizeName+` می بایست ${xx} باشد`
    },
  }

  issueMobile = []
  issueEmail = []
  issueRequired = []
  issueSsn = []
  issueMin = []
  issueMax = []
  issueLength = []
  issuePassport = []
  issueJustNumber = []
  issueJustLetter = []
  issueCurrency = []
  issueCardPan = []

  fieldObj = ''

  constructor(fieldObj:FieldObj,requireMsgs:string='') {
    this.fieldObj = fieldObj
    this.setRequireMsg(requireMsgs);
    this.resetAllArr();
  }

  getMsg(ruleName,args=[]){
    if(typeof this.msgs[ruleName] == 'function'){
      args[0].fieldObj = this.fieldObj;
      return this.msgs[ruleName].apply(this.msgs,args)
    }
    return this.msgs[ruleName];
  }

  resetAllArr(){
    this.issueMobile = []
    this.issueEmail = []
    this.issueRequired = []
    this.issueSsn = [];
    this.issueMin = [];
    this.issueMax = [];
    this.issueLength = [];
    this.issuePassport = [];
    this.issueJustNumber = [];
    this.issueJustLetter = [];
    this.issueCurrency = [];
    this.issueCardPan = [];
  }

  chgMsg(markMsg:string,newMsg){
    this.msgs[markMsg] = newMsg;
  }

  setRequireMsg(requireMsgs:string=''){
    this.msgs.requiredMsg['currMsgReq'] = requireMsgs;
  }

  chkRequired(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey && !tokenEvKey.isFreeChk)return;
    lg.col_onTyping('chkRequired / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey?.isKeydown,tokenEvKey?.isKeyup])
    if(!val){
      this.issueRequired.push('is_required');
    }
    else{
      this.issueRequired = [];
    }
  }

  chkEmail(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}) {
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    lg.col_onTyping('chkEmail / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])
    if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isExceptCommand())return;

    if(!zpl.isNum(val)){
      val = langTools.convertToEnNum(val);
      ///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (val.match(validRegex)) {
        this.issueEmail = [];
      }
      else{
        this.issueEmail.push('wrong_email');
      }
    }
  }

  chkMobile(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}) {
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isExceptCommand())return;
    lg.col_onTyping('chkMobile / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    val = langTools.convertToEnNum(val);
    if(zpl.isNum(val)){
      if (/^(?:(?:\+|00)98|0)\d{10}$/.test(val) || /^(?:9)\d{9}$/.test(val)) {
        this.issueMobile = [];
      }
      else{
        this.issueMobile.push('wrong_mobile');
      }
    }
  }

  chkSsn(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}) {
    if(!tokenEvKey.isFreeChk)return; //for prevent tricking
    lg.col_onTyping('chkSsn / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    const rsz = realSizeValInp(val,fullVal,tokenEvKey);
    if(!rsz)return;

    let curNum = -1,isSame=true
    fullVal = langTools.convertToEnNum(fullVal);
    let total = 0,chkCod = parseInt(fullVal[9]);
    for (let i = 0; i < fullVal.length; i++) {
      if(i == 9){
        break;
      }
      if(curNum>-1 && parseInt(fullVal[i]) != curNum){
        isSame = false
      }
      curNum = parseInt(fullVal[i])
      total += curNum * (fullVal.length - i);
    }
    if(isSame){
      this.issueSsn.push('wrong_ssn');
    }
    else{
      let s = total % 11;
      if(s<2){
        if(chkCod != s){
          this.issueSsn.push('wrong_ssn');
        }
      }
      else if(chkCod != (11-s)){
        this.issueSsn.push('wrong_ssn');
      }
    }
  }

  chkMin(val,{xx,tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(((!tokenEvKey.isFreeChk || !fullVal) && !val))return;

    const rsz = realSizeValInp(val,fullVal,tokenEvKey)
    const num = parseInt(xx)

    lg.col_onTyping('chkMin / [val,sizeVal,num,isKeydown,isKeyup]',[val,rsz,num,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(rsz < num){
        this.issueMin.push('less_min')
    }
    else{
        this.issueMin = []
    }
  }

  chkMax(val,{xx,tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(!tokenEvKey.isChgValComand()){
      if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isHled() || tokenEvKey.isCommandEv())return;
    }

    const sizeVal = realSizeValInp(val,fullVal,tokenEvKey)
    const num = parseInt(xx)

    lg.col_onTyping('chkMax / [val,sizeVal,num,isKeydown,isKeyup]',[val,sizeVal,num,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(sizeVal > num){
      this.issueMax.push('more_max');
      lg.col_HighRed('chkMax / occured');
    }
    else{
      this.issueMax = [];
    }
  }

  chkLength(val,{xx,tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(!tokenEvKey.isChgValComand()){
      if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isHled() || tokenEvKey.isCommandEv())return;
    }

    const sizeVal = realSizeValInp(val,fullVal,tokenEvKey)
    const mustLent = parseInt(xx)

    lg.col_onTyping('chkLength / [val,fullVal,sizeVal,mustLent,isKeydown,isKeyup]',[val,fullVal,sizeVal,mustLent,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(sizeVal == mustLent){
      lg.col_HighGreen('chkLength / is valid');
      this.issueLength = [];
    }
    else{
      lg.col_HighRed('chkLength / is not valid');
      this.issueLength.push('wrong_length');
    }
  }

  chkPassport(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isExceptCommand())return
    lg.col_onTyping('chkPassport / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    this.validPassport = [];
  }

  chkJustNumber(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isCommandEv())return
    lg.col_onTyping('chkJustNumber / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(langMan.chkNums(tokenEvKey.isFreeChk ? fullVal : val,{mustAll:true})){
      this.issueJustNumber = [];
    }
    else{
      this.issueJustNumber.push('just_number');
    }
  }

  chkJustLetter(val,{xx,tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(!tokenEvKey.isChgValComand()){
      if(tokenEvKey.isCommandEv())return;
    }

    lg.col_onTyping('chkJustLetter / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(tokenEvKey.isKeydown && val.toLowerCase() == 'space'){
      if(fullVal.lastIndexOf(' ') === fullVal.length-1){
        this.issueJustLetter.push('more_space');
      }
      else{
        this.issueJustLetter = [];
      }
      return;
    }
    const sensVal = tokenEvKey.isFreeChk || tokenEvKey.isKeyup || tokenEvKey.isChgValComand() ? fullVal : val
    if(!sensVal){
      this.issueJustLetter = [];
      return;
    }
    const res1 = langMan.chkNums(sensVal,{notAll:true});
    const res2 = !langTools.isSymbolChar(sensVal);
    if(res1&&res2){
      if(xx === 'fa'){
        if(langTools.isFarsiLetter(sensVal)){
          this.issueJustLetter = [];
        }
        else{
          this.issueJustLetter.push('just_fa');
        }
      }
      else{
        if(xx === 'en'){
          if(langTools.isEngWord(sensVal)){
            this.issueJustLetter = [];
          }
          else{
            this.issueJustLetter.push('just_en');
          }
        }
        else{
          this.issueJustLetter = [];
        }
      }
    }
    else{
      this.issueJustLetter.push('just_letter');
    }
  }

  chkCardPan(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(!tokenEvKey.isChgValComand()){
      if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isHled() || tokenEvKey.isCommandEv())return;
    }
    if(tokenEvKey.isChgValComand() && tokenEvKey.isKeydown){
      return;
    }
    lg.col_onTyping('chkCardPan / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    this.issueCardPan = [];
    const cln = fullVal.replaceAll('-','');
    if(tokenEvKey.isHled()){
      if(!langMan.chkNums(val,{mustAll:true,except:(char)=>char == '-'})){
        this.issueCardPan.push('pan_justNum');
      }
      return
    }
    else{
      if(cln.length === 16 && tokenEvKey.isKeyup){
        this.issueCardPan = [];
      }
      else if(cln.length > 15 && tokenEvKey.isKeydown){
        this.issueCardPan.push('pan_is16');
      }
      else if(cln.length > 16){
        this.issueCardPan.push('pan_is16');
      }
      if(!langMan.chkNums(val,{mustAll:true,except:(char)=>char == '-'})){
        this.issueCardPan.push('pan_justNum');
      }
    }
  }

  chkCurrency(val,{tokenEvKey,fullVal}:{tokenEvKey:TokenEvKey}={}){
    if(tokenEvKey.isKeyup && (!tokenEvKey.isCommandEv()||!tokenEvKey.isPaste()))return;
    if(!tokenEvKey.isChgValComand()){
      if(((!tokenEvKey.isFreeChk || !fullVal) && !val) || tokenEvKey.isHled() || tokenEvKey.isCommandEv())return;
    }
    if(tokenEvKey.isChgValComand() && tokenEvKey.isKeydown){
      return;
    }


    lg.col_onTyping('chkCurrency / [val,fullVal,isKeydown,isKeyup]',[val,fullVal,tokenEvKey.isKeydown,tokenEvKey.isKeyup])

    if(!fullVal && val == 0){
      this.issueCurrency.push('true_currency');
    }
    else if(langMan.chkNums(val,{mustAll:true,except:(char)=>char == ','})){
      this.issueCurrency = [];
    }
    else{
      this.issueCurrency.push('must_currency');
    }
  }
}



const realSizeValInp = function (val,fullVal,tokenEvKey){
  if(tokenEvKey.isKeydown){
    if(!tokenEvKey.isChgValComand()){
      return fullVal.length+val.length
    }
    else if(tokenEvKey.isEraseComand()){
      if(tokenEvKey.isHled()){
        return 0
      }
      return fullVal.length-1
    }
  }
  return fullVal.length;
}
