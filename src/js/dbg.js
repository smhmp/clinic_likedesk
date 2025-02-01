import {$zpl} from "@/plugins/zpl";
import {$zplUi} from "@/plugins/zplUi";
import {$lg} from "@/src/js/dbg";

const overLoadDog={}

export const lg = (str,val=null, addi={})=>{
  if(!$zpl.isDbgUser()){
    return;
  }
  console.log(str,val)
};

export const lgWarn = function(ttl,cont=null,warn=''){
  if(warn){
    if(overLoadDog[warn]){
      return;
    }
    overLoadDog[warn]=1;
  }

  lg('Warn:::'+ttl,cont)
}

export const lgErr = function(ttl,cont=null,uniqErr='',addi= {}){
  if(uniqErr){
    if(overLoadDog[uniqErr]){
      return;
    }
    overLoadDog[uniqErr]=1;
  }
  lg('Error:::'+ttl,cont)
}

export const lgMobile = (ttl,cont=null)=>{
  if($zpl.isMobDbg()){
    const div = $zplUi.crtElm('div');
    const pre = $zplUi.crtElm('pre');
    const h3 = $zplUi.crtElm('h3');
    div.appendChild(h3)
    div.appendChild(pre)
    div.style.cssText = 'display:block;max-width:200px;max-height:200px;overflow:auto;'
    h3.style.cssText = 'display:block;max-width:200px;white-spave:no-wrap'
    h3.textContent = ttl
    pre.textContent = cont
    document.getElementById('logg').appendChild(div);
  }
}


const confList = ['col_calcMath','col_toolsData','col_lowYellow','col_lowGray','col_lowBlue','col_lowGreen','col_lowRed','col_lowPurple','col_HighBrown','col_HighGray','col_HighBlue','col_HighGreen','col_HighRed','col_HighPurple','col_HighOrange','col_evOccured','col_goingCall','col_moreData','col_onTyping','col_onKeyup','col_chkValid','col_onTyping2','col_boldOrange','col_onResp']

confList.forEach((eCol)=>{
  lg[eCol] = lg
})

lg.head=(subj)=>{}
