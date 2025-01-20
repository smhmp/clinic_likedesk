import {otpMan} from "./otpMan";
import {otpFlow} from "./otpFlow";
import {lg} from "@/src/js/dbg";

export const crdMan = {
  updateValue(otpCode,from) {
    if(otpMan.gotit||otpMan.goingPaste){
      return
    }
    otpMan.gotit = true;
    lg([from,otpCode],'updateValue::: [from,otpCode]');

    if (otpCode.length === 6) {
      otpFlow.otpErr('off');
      otpFlow.setInputs(otpCode,()=>{
        otpFlow.requestOtp(otpCode,'updateValue')
      });
    }
  },
  domContLoaded(e){
    const inputHandle1 = document.querySelector('input[autocomplete="one-time-code"]');
    const inputHandle2 = document.getElementById('handle');
    if (!inputHandle2) {
      lg('DOMContentLoaded::: !inputHandle');
      return;
    }

    const ac = new AbortController();

    const form = inputHandle2.closest('form');
    if (form) {
      form.addEventListener('submit', e => {
        ac.abort();
      });
    }

    const options = {
      otp: {
        transport: ['sms'],
      },
      signal: ac.signal,
    };

    navigator.credentials.get(options)
      .then((credential) => {//CredentialType

        const otpCode = credential.code; //OTPCredential

        lg(otpCode,'nav.cred::: otpCode');

        if(otpCode.length === 6){
          otpFlow.setInputs(otpCode,()=>{
            otpFlow.requestOtp(otpCode,'otpCredential')
          });
        }

        lg('nav.cred::: end1');

      }).catch(err => {
      lg(err,'nav.cred::: err1');
    });
    lg('nav.cred::: end2');
  },
  ready_OTPCredential(){
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', crdMan.domContLoaded);
    }
    else {
      lg('OTPCredential::: not support');
    }
  },
  doDestroy(){
    window.removeEventListener('DOMContentLoaded', crdMan.domContLoaded);
  }
}
