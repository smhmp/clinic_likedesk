import {lg} from "@/src/js/dbg";

export const langTools={
  strLst1:['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  strLst2:{
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  },
  strEnLst1:[0, 1, 2, 3, 4, 5, 6, 7, 8,9],
  strEnLst2 : {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9'
  },
  toFa(x){
    return x.toLocaleString('fa');
  },
  toEn(x){
    return x.toLocaleString('en');
  },
  isNumbers(val){
    let isNumber=1;
    if(!val){
      return;
    }
    this.mapType(val,(info)=>{
      if(!info.isNumber){
        isNumber = 0
        return false;
      }
      return true;
    })
    return !!isNumber;
  },
  convertToEnNum(str) {
    if(str instanceof Array){
      return str.map(function (eI) {
        return this.convertToEnNum(eI);
      });
    }
    if(str){
      for(let k in this.strLst2){
        if(this.strLst2.hasOwnProperty(k)){
          str=str.replace(new RegExp(k, 'g'),this.strLst2[k]);
        }
      }
    }
    return str;
  },
  isFarsiCode(char) {
    const charCode = char.charCodeAt(0);
    return (
      (charCode >= 0x0600 && charCode <= 0x06FF) ||
      charCode === 0xFB8A
    );
  },
  isFarsiLetter(word){
    return /[^\u0000-\u00ff]+/.test(word)
  },
  hasSpace(word){
    return /\s/.test(word)
  },
  isFarsiChar(char){
    return /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C]+/.test(char)
  },
  isSymbolChar(chars){
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(chars)
  },
  isEngWord(chars){
    return /[a-zA-Z]/.test(chars)
  },
  isPersianWord(chars){
    return /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C]+/.test(chars)
  },
  isFarsiNum(num){
    return this.strLst1.indexOf(num)!==-1||this.strLst2[num]!==undefined
  },
  isEngNum(num){
    return this.strEnLst1.indexOf(num)!==-1||this.strEnLst2[num]!==undefined
  },
  mapType(inpNums,calb) {
    const machLst=this.toFa('1234567890'),
      machEnLst=this.toEn('1234567890');

    let i=0,num;
    while((num=inpNums[i])!==undefined){
      if((machLst&&machLst.indexOf(num)!==-1)||this.strLst1.indexOf(num)!==-1||this.strLst2[num]!==undefined){
        if(calb({isNumber:true,num:'unicode'})===false){
          return;
        }
      }
      else if((machEnLst&&machEnLst.indexOf(num)!==-1)||this.isEngNum(num)){
        if(calb({isNumber:true,num:'eng'})===false){
          return;
        }
      }
      else if(this.isEngWord(num)){
        if(calb({isString:true,str:'eng'})===false){
          return;
        }
      }
      else if(this.isPersianWord(num)){
        if(calb({isString:true,str:'unicode'})===false){
          return;
        }
      }
      else{
        if(calb({isNumber:true,num:'unicode'})===false){
          return;
        }
      }
      i++;
    }
  }
};

export const langMan={
  to_fa_EnNum(val){
    return langTools.convertToEnNum(val);
  },
  isEngLetter(words,{isContain=false,notAll=false,mustAll=false}){
    let i=-1,word,isTrue=false;
    while((word=words[++i])!==undefined){
      isTrue = langTools.isEngWord(word)
      if(isTrue){
        if(isContain) return true
        if(notAll) return false
      }
      else{
        if(mustAll) return false
      }
    }
    if(isTrue){
      if(mustAll) return true
    }
    else{
      if(notAll) return true
      else if(isContain) return false
    }
    return false
  },
  isEngChars(words,{isContain=false,notAll=false,mustAll=false}){
    let i=-1,word,isTrue=false;
    while((word=words[++i])!==undefined){
      isTrue = langTools.isEngWord(word) ||
        langTools.isEngNum(word)
      if(isTrue){
        if(isContain) return true
        if(notAll) return false
      }
      else{
        if(mustAll) return false
      }
    }
    if(isTrue){
      if(mustAll) return true
    }
    else{
      if(notAll) return true
      else if(isContain) return false
    }
    return false
  },

  isFarsiNums(nums,{isContain=false,notAll=false,mustAll=false}){
    let i=-1,txt,isTrue=false;
    while((txt=nums[++i])!==undefined){
      isTrue = langTools.isFarsiNum(txt)
      if(isTrue){
        if(isContain) return true
        if(notAll) return false
      }
      else{
        if(mustAll) return false
      }
    }
    if(isTrue){
      if(mustAll) return true
    }
    else{
      if(notAll) return true
      else if(isContain) return false
    }
    return false
  },

  chkNums(nums,{isContain=false,notAll=false,mustAll=false,except=null}){
    let i=-1,txt,isNum=false;
    while((txt=nums[++i])!==undefined){
      isNum = langTools.isFarsiNum(txt) || langTools.isEngNum(txt)
      if(isNum){
        if(isContain) return true
        if(notAll) return false
      }
      else{
        if(mustAll){
          if(except){
            if(except(txt)) continue
          }
          return false
        }
      }
    }
    if(isNum){
      return true
    }
    else{
      if(notAll) return true
      else if(isContain) return false
    }
    return false
  },

  isFarsiChars(words,{isContain=false,notAll=false,mustAll=false}){
    let i=-1,txt,isTrue=false;
    while((txt=words[++i])!==undefined){
      isTrue = langTools.isFarsiLetter(txt) ||
        langTools.isFarsiChar(txt) ||
        langTools.isFarsiCode(txt)
      if(isTrue){
        if(isContain) return true
        if(notAll) return false
      }
      else{
        if(mustAll) return false
      }
    }
    if(isTrue){
      if(mustAll) return true
    }
    else{
      if(notAll) return true
      else if(isContain) return false
    }
    return false
  },

  provideInpNum(inpElm, {calbChg = null, calbIssue = null,justNum=false,onBefChk=null}={}){
    const obj={
      lVal:inpElm.value,
      stop:false,
      delTm: 0,
      hasIssue: false
    }
    const resetAll=()=>{
      obj.lVal=inpElm.value
      obj.stop = false
      obj.delTm = 0
    }
    const convFa=()=>{
      if(inpElm.value!==obj.lVal){
        obj.lVal=inpElm.value

        if(onBefChk)onBefChk(inpElm.value)

        if(!inpElm.value){
          return
        }

        if(justNum){
          if(typeof justNum == 'boolean'){
            justNum = {}
          }
          let iChk = obj.lVal,finalVal = obj.lVal

          if(justNum.rExcept){
            iChk = justNum.rExcept.getClean(iChk)
          }

          if(!langTools.isNumbers(iChk)){
            obj.hasIssue = true
            if(calbIssue) calbIssue(justNum.guidFormat||'فقط می تواند عدد باشد')
            return
          }

          if(justNum.rExcept && 'onConvert' in  justNum.rExcept){
            finalVal = justNum.rExcept.onConvert(finalVal,(val)=>{
              return this.to_fa_EnNum(val)
            })
          }
          else{
            finalVal = this.to_fa_EnNum(finalVal)
          }

          inpElm.value = finalVal
        }

        if(obj.hasIssue){
          obj.hasIssue = false
          if(calbIssue) calbIssue('')
        }

        if(calbChg) calbChg(inpElm.value);
      }
    }
    function toOffListen(){
      if(obj.delTm) window.clearTimeout(obj.delTm)
    }
    function toOnListen(){
      if(obj.stop) return
      convFa()
      obj.delTm = window.setTimeout(()=>{
        toOnListen()
      })
    }
    inpElm.converterNum = (e)=>{
      if(e.type==='blur'){
        obj.stop = true
        toOffListen()
      }
      else if(e.type==='focus'){
        resetAll()
        toOnListen()
      }
      else{
        convFa()
      }
    }
    inpElm.addEventListener('blur',inpElm.converterNum);
    inpElm.addEventListener('paste',inpElm.converterNum)
    inpElm.addEventListener('keyup',inpElm.converterNum)
    inpElm.addEventListener('focus',inpElm.converterNum)
  },

  convToEnNum(num){
    const indxFa = langTools.strLst1.indexOf(num);
    const faNum = langTools.strLst2[num]
    if(indxFa>-1||faNum){
      return faNum || langTools.strLst1[indxFa]
    }
  },
}
