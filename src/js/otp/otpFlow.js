import {langMan, langTools} from "./../langMan";
import {otpMan} from "./otpMan";
import {crdMan} from "./crdMan";
import {lg} from "@/src/js/dbg";
import {GqlJSSdk} from "@/src/js/GqlJSSdk";
import {otpActs} from "@/src/js/otp/otpActs";
import {$zpl} from "@/plugins/zpl";

export const otpFlow = {
  otpInputs:null,
  inputHandle:null,
  otpErrWrapper:null,
  otpForm:null,
  otpCode:'',
  authApiUrl:'/otp',
  asSlow:false,
  validKeys:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  start(){
    this.otpInputs = document.querySelectorAll('.otp-digits .input');
    this.inputHandle = document.getElementById('handle');
    this.otpErrWrapper = document.querySelector('.otp-digits');
    this.otpForm = document.querySelector('[name="otp"]')

    this.makeEvents();
  },
  setInput(otpCode,indx,calb,clear=false){
    if(otpFlow.otpInputs[indx]){
      const eIndp = otpFlow.otpInputs[indx]
      // eIndp.setAttribute('value' , langTools.convertToEnNum(otpCode[indx]||'*'));
      eIndp.value = clear?'':langTools.convertToEnNum(otpCode[indx])||'*';
      if(!clear && !eIndp.value)return
      eIndp.focus();
      setTimeout(()=>{
        otpFlow.setInput(otpCode,clear?indx-1:indx+1,calb,clear);
        if(calb){
          if((clear && indx === 0)||(!clear && indx === 5)){
            calb();
          }
        }
      },otpFlow.asSlow?1000:1)
    }
  },
  setInputs(otpCode,calb,clear=false){
    if(otpCode){
      otpCode = Array.from(otpCode);
    }

    setTimeout(()=>{
      otpFlow.setInput(otpCode,clear?5:0,calb,clear);
    },clear?300:1)
  },
  otpErr(stat){
    if(stat === 'on'){
      otpFlow.otpErrWrapper.classList.add('hasError');
      otpFlow.setInputs('',null,true);
      otpFlow.inputHandle.value = '';
      otpMan.resetAll();
    }
    else if(otpFlow.otpErrWrapper.classList.contains('hasError')){
      otpFlow.otpErrWrapper.classList.remove('hasError');
    }
  },
  mergeInputs(){
    otpFlow.otpInputs.forEach((input, index)=>{
      if(input.value){
        otpMan.repoCodes[index] = input.value;
      }
    })
    otpFlow.otpCode = otpMan.repoCodes.join('');
    return otpFlow.otpCode;
  },
  loadingB (state) {
    const otpControlls = document.querySelector('.otpEmail');

    if (state === 'start') {
      otpControlls.classList.add('loading');
    }

    if (state === 'end') {
      otpControlls.classList.remove('loading');
    }
  },
  requestOtp(otpCode,from='') {
    if(otpMan.goingSend){
      return
    }
    otpMan.goingSend = true;
    otpFlow.loadingB('start');


    if(otpCode.length!=6){
      return
    }

    otpCode = langTools.convertToEnNum(otpCode);

    this.sendOtpCode(otpCode,{
      calbDone(){
        $zpl.toastMsg('ایمیل شما با موفقیت تایید شد')
        $zpl.currRouter.replace({path:`/profile/`});
        $zpl.currRouter = null;
      },
      calbFinal(){
        otpMan.goingSend = false;
        otpFlow.loadingB('end');
      },
      calbError(){
        otpFlow.otpErr('on');
      }
    });
  },
  sendOtpCode(otp_code,{calbDone,calbFinal,calbError}){
    otpActs.loadingA('start');
    new GqlJSSdk('VerifyEmail',{args:{otp_code:otp_code},type:'mutation'}).reqZplConnectPrj()
      .then((respObj)=>{
          const resp = respObj.getResp();
        if(resp){
          calbDone && calbDone();
        }
        else{
          calbError && calbError();
        }
      }).catch((respObj)=>{
        respObj.showErr();
      calbError && calbError();
    }).finally(()=>{
      otpActs.loadingA('end');
        calbFinal && calbFinal();
    });
  },
  makeEvents(){
    const fastTyping = {
      isOccured:false,
      worldForNext:'',
      inpId:'',
      reservedWord:'',
      doReset(){
        this.isOccured = false;
        this.worldForNext = '';
        this.inpId = '';
        this.reservedWord = '';
      },
      doOccured(inpId,keyStr){
        this.worldForNext = keyStr;
        this.isOccured = true;
        this.inpId = inpId;
        this.reservedWord = '';
      },
      doReservedIfMe(inpId){
        if(this.isOccured && this.inpId === inpId){
          this.reservedWord = this.worldForNext;
        }
        else if(this.isOccured){
          this.doReset();
        }
      },
      getReserved(inpE){
        if(this.reservedWord && this.inpId !== inpE.id){
          inpE.value = this.reservedWord;
          this.doReset()
        }
        else if(this.reservedWord && this.isOccured){
          this.doReset();
        }
      }
    }
    otpFlow.otpInputs.forEach((input, index) => {
      input.addEventListener('keydown',(e)=>{
        const keyCod = e.keyCode || e.which
        const keyStr = e.key
        const val = input.value

        if(!e.ctrlKey && val.length > 0 && !$zpl.isEvCommand(e,keyStr)){
          fastTyping.doOccured(input.id,keyStr)
          $zpl.prevEvery(e);
          return
        }

        lg([input.id,val,keyStr,keyCod],'keydown::: [id,val,keyStr,keyCod]')

        const target = e.target;
        // Move to prev input
        const prevId = input.dataset.previous
        if (keyStr.toLowerCase() === 'backspace') {
          lg('keydown::: backspace')
          input.value = '';
          otpMan.preventDoubleKeyup = {};
          if(prevId){
            const prev = document.getElementById(prevId);
            prev.select();
            /*window.setTimeout(()=>{
              prev.value = oldVal;
              prev.select();
            })*/
          }
        }
      })


      input.addEventListener('keyup', (e) => {
        const enNum = langMan.convToEnNum(e.key)
        if(enNum){
          if(!input.value){
            lg('keyup::: enNum&&!val')
            input.value = enNum;
          }
        }
        else{
          fastTyping.getReserved(input);
        }

        const keyCod = e.keyCode || e.which
        const keyStr = e.key
        const val = input.value

        lg([input.id,val,keyStr,keyCod],'keyup::: [id,val,keyStr,keyCod]')
        const target = e.target;

        if (keyStr.toLowerCase() === 'backspace'){
          lg('zpl.prevUp')
          $zpl.prevUp(e);
          return;
        }

        // Move to next input
        const isKeyValid2 = otpFlow.validKeys.includes(val)
        let nextId = target.dataset.next;
        const nextId2 = input.dataset.next;
        const isKeyValid = otpFlow.validKeys.includes(keyStr)
        if (val && ((isKeyValid && nextId) || (isKeyValid2 && nextId2 && (nextId = nextId2)))) {
          lg(val,'keyup::: next')
          otpFlow.otpErr('off');
          fastTyping.doReservedIfMe(input.id)
          const next = document.getElementById(nextId);
          next.select()
        }

        // Handling input value
        const otpCode = otpFlow.mergeInputs()

        lg(otpCode,'keyup:: otpCodes')

        if (otpCode.length == 6) {
          otpFlow.requestOtp(otpCode,'keyup')
        }
      });

      input.addEventListener('keypress', (e) => {
        const target = e.target ;
        const keyCod = e.keyCode || e.which
        const keyStr = e.key
        const val = target.value

        lg([target.id,val,keyStr,keyCod],'keypress::: [id,val,keyStr,keyCod]')


        if(!e.ctrlKey && val.length > 0 && !$zpl.isEvCommand(e,keyStr)){
          fastTyping.doReset();
          $zpl.prevEvery(e);
          return
        }

        const isKeyValid = otpFlow.validKeys.includes(keyStr)
        if (!isKeyValid && !langTools.isNumbers(val)) {
          e.preventDefault();
          return;
        }

        otpFlow.otpErr('off');

        if (e.key.toLowerCase() === 'backspace'){
          lg('zpl.prevUp')
          $zpl.prevUp(e);
          return;
        }

        // Move to next input
        const isKeyValid2 = otpFlow.validKeys.includes(val)
        let nextId = target.dataset.next;
        const nextId2 = input.dataset.next;

        if (val && keyStr === val && ((isKeyValid && nextId) || (isKeyValid2 && nextId2 && (nextId = nextId2)))) {
          lg('keypress::: next')
          otpFlow.otpErr('off');
          const next = document.getElementById(nextId);
          next.select()
        }

        if(otpMan.preventDoubleKeyup[index]){
          lg('keypress::: zpl.prevUp')
          $zpl.prevUp(e)
        }
        otpMan.preventDoubleKeyup[index] = true;
      });

      input.addEventListener('click', (e) => {
        otpMan.preventDoubleKeyup = {};
        const target = e.target;
        target.select()
      })
    });

    otpFlow.otpForm.addEventListener('paste', (ev) => {
      if(otpFlow.inputHandle.value){
        return;
      }
      otpMan.goingPaste = true;

      otpFlow.otpErr('off');

      lg('paste:::')
      const clip = ev.clipboardData.getData('text').trim();
      lg(clip,'paste::: clip')
      // Allow numbers only
      if (!/\d+/.test(clip) && !langTools.isNumbers(clip)) {
        return ev.preventDefault();
      } // Invalid. Exit here

      otpFlow.setInputs(clip,()=>{
        otpFlow.requestOtp(clip,'paste')
      })
    });
  },
  domLoaded(){
    lg('DOMContentLoaded 2');
    const inputHandle1 = document.querySelector('input[autocomplete="one-time-code"]');
    const inputHandle2 = document.getElementById('handle');

    otpMan.listenerHideInp = (flag='setInterval')=>{
      return ()=>{
        if(inputHandle2.value && inputHandle2.value.length === 6){
          otpMan.resetTimingHideInp();
          crdMan.updateValue(inputHandle2.value,`inputHandle ${flag}`)
        }
      }
    }

    inputHandle2.addEventListener('change', otpMan.listenerHideInp('change'));


    const frsInput = document.getElementById('digit-1')

    otpMan.listenerFrstInp = (flag='setInterval')=>{
      return ()=>{
        if(frsInput.value && frsInput.value.length === 6){
          otpMan.resetTimingFrstInp();
          crdMan.updateValue(frsInput.value,`frsInput ${flag}`)
        }
      }
    }

    frsInput.addEventListener('change', otpMan.listenerFrstInp('change'));


    otpMan.startListening();

    otpFlow.otpInputs[0].focus();
  }
}
