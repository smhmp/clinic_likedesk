import {langTools} from "@/src/js/langMan";
import {lg} from "@/src/js/dbg";
import Num2persian from "@/src/js/num2persian";

export const convertTools={
  toCurrency(e){
    let inp = e.target,val = inp.value;
    if(!val)return val;
    if($zpl.isAnzMode()){
        if(langTools.isFarsiNum(val)) $zpl.toastError('toCurrency / Add to-eng-num converter',{throwErr:true})
    }
    let start = inp.selectionStart,
      end = inp.selectionEnd;
    val = val.replace(/,/g, "");
    val = val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if(start < val.length - 2){
      window.setTimeout(()=>{
        inp.setSelectionRange(start, end);
      })
    }
    return val;
  },
  toCardPan(e){
    let inp = e.target,val = inp.value;
    if(!val)return val;
      if($zpl.isAnzMode()){
          if(langTools.isFarsiNum(val)) $zpl.toastError('toCardPan / Add to-eng-num converter',{throwErr:true})
      }
    let start = inp.selectionStart,
      end = inp.selectionEnd;
      let text = val.replace(/-/g, "");
      let result = [];

      while (text.length > 4) {
          result.push(text.substring(0, 4));
          text = text.substring(4);
      }
      result.push(text);
      val = result.join('-');
    if(start < val.length - 2){
      window.setTimeout(()=>{
        inp.setSelectionRange(start, end);
      })
    }
      return val;
  },
  toPersianLetter(toman){
    return Num2persian(parseFloat(toman).toString());
  }
}
