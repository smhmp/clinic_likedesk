import {lg} from "@/src/js/dbg";

export const zplUiDev={
  mounted(zplUi){
    zplUi.KeySens.prototype.dbg_getStrKey=function (kstr,evTyp){
      lg(`${evTyp}/kStr`,kstr,{backCol:'#fff3b2',col:'#000'})
      if(this.keepDown['ctrl']&&this.keepDown['q']&&kstr !== 'q'){ // for dbg
        debugger
      }
    }

    zplUi.adev(window,'error', function(err) {
      $zpl.toastMsg(err.error.message,{asError:true,delayTime:90000})
      $zpl.toastMsg(err.error.stack,{asError:true,delayTime:90000})
    },{once:true})

  }
}

