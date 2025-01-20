import {$zpl} from "@/plugins/zpl";
import {$zplUi} from "@/plugins/zplUi";

export const $lg = {
  ignorPriority: 100,
  uniqNum: 0,
  delayTime:200,
  timeDelay:{compT(){return 0}},
  befGrp:0,
  curHead:''
}

const overLoadDog={}

export const lg = (str,val='', {prio=0,off=false,col='',backCol='',addi={},grp='',clzGrp='',opnGrp='',force=false}={})=>{
  if(!$zpl.isDbgUser()&&!force){
    return;
  }
  if (prio > $lg.ignorPriority) {
    return;
  }

  if(!val){
    if(val === null){
      val = 'null'
    }
    else if(val === undefined){
      val = 'undefined'
    }
  }

  let onGrp = '',isClzGrp = ''
  let resStr = '';
  let frst = false;
  if($lg.timeDelay.compT()>$lg.delayTime){
    frst = true;
    $lg.uniqNum = 0 ;
  }
  else{
    $lg.uniqNum += 1;
  }

  if(opnGrp){
    $lg.befGrp = opnGrp
  }
  else if(clzGrp){
    $lg.befGrp = ''
  }
  else if($lg.befGrp){
    if($lg.befGrp!=grp){
      isClzGrp = $lg.befGrp
      $lg.befGrp = ''

      if($lg.curHead){
        isClzGrp = `${$lg.curHead} ${isClzGrp}`;
        $lg.curHead=''
      }
    }
  }

  if(grp && !$lg.befGrp){
    onGrp = grp
    $lg.befGrp = grp

    if($lg.curHead){
      onGrp = `${$lg.curHead} ${onGrp}`;
    }
  }
  else{
    if($lg.curHead){
      str = `${$lg.curHead} ${str}`;
      $lg.curHead=''
    }
  }

  resStr += ` ${$lg.uniqNum} -- ${str}`;

  if(frst){
    const now = new Date(new Date().toLocaleString('en', {timeZone: 'Asia/Tehran'})), //https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
      hours = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();
    const cols = `color: ${'#faffae'};background: ${'#a7b0bf'};`
    let curSecs = Math.floor(Date.now() / 1000)-$zpl.frsSeconds
    const spendH = Math.floor(Math.max(curSecs/3600,0))
    curSecs = curSecs - (spendH*3600)
    const spendM = Math.floor(Math.max(curSecs/60,0))
    curSecs = curSecs - (spendM*60)
    $zpl.csl['log'](`%c ------------------< ${hours}:${minutes}:${seconds} >------------------------ `,cols);
    $zpl.csl['log'](`%c ---------Spent:---< ${spendH}|${spendM}|${curSecs} >------------------------ `,cols);
  }

  const isAddi = Object.keys(addi).length

  if(isClzGrp){
    $zpl.csl['groupEnd'](isClzGrp)
  }

  if((isAddi&&!grp)||onGrp||opnGrp){
    $zpl.csl['group'](onGrp||opnGrp)
  }

  if(off){
    $zpl.csl['log'](`%c ${resStr}: %c`,`background: ${'#e3e3e3'}; color: #ffffff`,'', val);
  }
  else{
    $zpl.csl['log'](`%c ${resStr}: %c`,`background: ${backCol||'#000'}; color: ${col||'#ffffff'}`,'', val);
  }

  if(isAddi){
    $zpl.csl['log'](`%c More: %c`,`background: ${'#e7e7e7'}; color: ${'#2f2f2f'}`,'', addi);
  }

  if((isAddi&&!grp)||clzGrp){
    $zpl.csl['groupEnd'](isClzGrp||clzGrp)
  }
};

export const lgWarn = function(ttl,cont='',warn=''){
  if(warn){
    if(overLoadDog[warn]){
      return;
    }
    overLoadDog[warn]=1;
  }

  //todo send server
  lg('Warn:::'+ttl,cont, {prio:1,backCol:'red'})
}

export const lgErr = function(ttl,cont='',uniqErr='',{addi= {}}={}){
  if(uniqErr){
    if(overLoadDog[uniqErr]){
      return;
    }
    overLoadDog[uniqErr]=1;
  }

  //todo send server
  lg('Error ---< '+ttl+' >-----',cont, {prio:1,backCol:'red',addi:addi})
}

export const lgMobile = (ttl,cont='')=>{
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

const confList = {
  col_lowYellow:{backCol:'#fff0bd',col:'#757575'},
  col_lowGray:{backCol:'#e5e5e5',col:'#757575'},
  col_lowBlue:{backCol:'#b0d9ff',col:'#757575'},
  col_lowGreen:{backCol:'#cbffce',col:'#757575'},
  col_lowRed:{backCol:'#ffc3c3',col:'#757575'},
  col_lowPurple:{backCol:'#f6d9ff',col:'#757575'},
  col_HighBrown:{backCol:'#bb9900',col:'#ffffff'},
  col_HighGray:{backCol:'#808080',col:'#ffffff'},
  col_HighBlue:{backCol:'#2671bb',col:'#ffffff'},
  col_HighGreen:{backCol:'#1a8500',col:'#ffffff'},
  col_HighRed:{backCol:'#bb0202',col:'#ffffff'},
  col_HighPurple:{backCol:'#7723cc',col:'#ffffff'},
  col_HighOrange:{backCol:'#dc5207',col:'#ffffff'},
  col_evOccured:{backCol:'#eeffcc',col:'#189a56'},
  col_goingCall:{backCol:'#eeffcc',col:'#008ac5'},
  col_moreData:{backCol:'#464646',col:'#fffee2',grp:'moreData'},
  col_toolsData:{backCol:'#1a71c5',col:'#fffee2',grp:'toolsData'},
  col_calcMath:{backCol:'#18b287',col:'#fffee2',grp:'calcMath'},
  col_onTyping:{backCol:'#5618b2',col:'#ffffff',grp:'onTyping'},
  col_onTyping2:{backCol:'#179fb2',col:'#ffffff',grp:'onTyping'},
  col_onKeyup:{backCol:'#020202',col:'#ffffff',grp:'onKeyup'},
  col_chkValid:{backCol:'#a40aa1',col:'#ffffff',grp:'chkValid'},
  col_boldOrange:{backCol:'#ff0000',col:'#ffffff',grp:'bold'},
}

for (let eCol in confList) {
  lg[eCol] = (str,val='', {prio=0,off=false,col='',backCol='',addi={},grp='',clzGrp='',opnGrp='',force=false}={})=>{
    if(eCol === 'col_evOccured'){
      str = str+'/occured'
    }
    else if(eCol === 'col_goingCall'){
      const rgx=/(.*?\/)([\w\s]+$)/
      if(rgx.test(str)){
        str = str.replace(rgx,'$1 --Going--> $2')
      }
      else{
        str = '--Going--> '+str
      }
    }
    lg(str,val,{prio,off,col,backCol,addi,grp,clzGrp,opnGrp,force,...confList[eCol]})
  }
}

lg.head = (subj)=>{
  $lg.curHead = subj
}
