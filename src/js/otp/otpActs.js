import {GqlJSSdk} from "@/src/js/GqlJSSdk";
import {$zplUi} from "@/plugins/zplUi";

export const otpActs={
  elementParE:null,
  defaultTime:90,
  secondsLeft:0,
  timeCounter:0,
  start(){
    this.elementParE = document.querySelector('.resend-otp');
    this.resendOtpCode();
  },
  startTimer(){
    let secondsLeft = this.defaultTime,minLeft=0,secStr='';

    if(secondsLeft <= 120){
      otpActs.elementParE.innerHTML = `<div class="text"><span class="text">${secondsLeft}</span> ثانیه تا امکان ارسال مجدد کد</div>`;
    }
    else{
      minLeft = Math.round(secondsLeft/60);
      if(secondsLeft%60){
        secStr = `<span class="text">${secondsLeft%60}</span> ثانیه تا امکان ارسال مجدد کد`;
        if(minLeft){
          secStr = 'و '+secStr
        }
      }
      else{
        secStr = ` تا امکان ارسال مجدد کد`;
      }
      otpActs.elementParE.innerHTML = `<div class="text"><span class="text">${minLeft} دقیقه</span>${secStr}</div>`;
    }

    this.timeCounter = window.setInterval(()=>{
      if (secondsLeft < 1) {
        window.clearInterval(otpActs.timeCounter);
        otpActs.makeResendButton();
      } else {
        secondsLeft -= 1;
        if(minLeft){
          minLeft = Math.floor(secondsLeft/60);
          if(secondsLeft%60){
            secStr = `<span class="text">${secondsLeft%60}</span> ثانیه تا امکان ارسال مجدد کد`;
            if(minLeft){
              secStr = 'و '+secStr
            }
          }
          else{
            secStr = ` تا امکان ارسال مجدد کد`;
          }
          otpActs.elementParE.innerHTML = `<div class="text"><span class="text">${minLeft} دقیقه  </span>${secStr}</div>`;
        }
        else{
          otpActs.elementParE.innerHTML = `<div class="text"><span class="text">${secondsLeft}</span> ثانیه تا امکان ارسال مجدد کد</div>`;
        }
      }
    }, 1000);
  },
  makeResendButton(){
    otpActs.elementParE.innerHTML = '';
    const resendButton = `<div class="text-button resendOtpCode"><div class="label">ارسال مجدد کد</div></div>`;
    const resendButtonE = $zplUi.crtElm(resendButton);
    otpActs.elementParE.appendChild(resendButtonE);

    resendButtonE.addEventListener('click', otpActs.resendOtpCode)
  },
  resendOtpCode(){
    otpActs.loadingA('start');

    otpActs.reqOtpToEmail({
      calbFinal(){
        otpActs.loadingA('end');
        otpActs.startTimer();
      }
    });
  },
  loadingA (state) {
    const otpControlls = document.querySelector('.page-otp-controlls');

    if (state === 'start') {
      otpControlls.classList.add('loading');
    }

    if (state === 'end') {
      otpControlls.classList.remove('loading');
    }
  },
  doDestroy(){
    window.clearInterval(otpActs.timeCounter);
  }
}
