export const otpMan = {
  preventDoubleKeyup :{},
  repoCodes : [],
  gotit:false,
  goingSend:false,
  goingPaste:false,
  timingHidenInp:0,
  timingFrsInp:0,
  listenerFrstInp: null ,
  listenerHideInp: null ,
  resetAll(){
    this.preventDoubleKeyup = {};
    this.repoCodes = [];
    this.gotit = false;
    this.goingSend = false;
    this.goingPaste = false;
    this.startListening();
  },
  resetTimingHideInp(){
    if(this.timingHidenInp){
      window.clearTimeout(this.timingHidenInp);
      this.timingHidenInp = 0;
    }
  },
  resetTimingFrstInp(){
    if(this.timingFrsInp){
      window.clearTimeout(this.timingFrsInp)
    }
    this.timingFrsInp = 0;
  },
  startListening(){
    otpMan.resetTimingHideInp();
    otpMan.resetTimingFrstInp();

    otpMan.timingHidenInp = window.setInterval(otpMan.listenerHideInp(),300)
    otpMan.timingFrsInp = window.setInterval(otpMan.listenerFrstInp(),300)
  },
  doDestroy(){
    otpMan.resetTimingHideInp();
    otpMan.resetTimingFrstInp()
  },
}
