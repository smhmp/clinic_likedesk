import {ErrorHandler} from "./../js/ErrorHandler.js";

export default class RespObj{

    resp=null;
    err=null;
    baseUrl='';
    keepGoing=false;
    storeGql=null;
    queryKey='';
    respServer=false;

    constructor(baseUrl,{storeGql=null}={}) {
        this.baseUrl = baseUrl;
        this.storeGql = storeGql;
    }

    setQueryKey(queryKey){
        this.queryKey = queryKey;
    }

    setRespServer(bool){
        this.respServer = bool;
    }

    setError(err){
        this.err = err;
    }

    setResp(resp){
        this.resp = resp;
    }

    getResp(){
        let resp = this.resp;
        if(this.storeGql){
            resp = this.storeGql.getResponse(resp);
        }
        return resp;
    }

    showErr(){
      this.keepGoing = !$zpl.toastError(this.err);
    }

    getErrMsg({keepGoing = false, globalMsg = false}={}){
        this.keepGoing = keepGoing;
        let msg = '';
        const msgArr = ErrorHandler.getTrans(this.err);
        if(msgArr && msgArr.arrErrors.length){
          msg = msgArr.arrErrors[0];
        }
        else{
            msg = this.err.message
        }
        if(!msg && globalMsg){
          msg = 'خطا در برقراری ارتباط با سرور. لطفا لحظاتی دیگر مجددا تلاش نمایید.';
        }
        return msg;
    }

}
