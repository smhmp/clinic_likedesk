import {$zpl} from "@/plugins/zpl";
import {lg} from "~/src/js/dbg";

export class ErrorHandler{

  static getTrans(errors){
    // console.dir(errors)

    let gotErrors = [];

    if(!errors){
      return {errors:errors,arrErrors:[]};
    }

    if(typeof errors == "string"){
      return {errors:errors,arrErrors:[]};
    }

    const reader = (errors)=>{

      let errorsStr = '';
      errors.forEach((eErr)=>{
        /*data : null
        fa_message : "تعداد ۳ درخواست در یک ساعت مجاز می باشد."
        locations : [{…}]
        message : "request limit."
        readable_code : "VERIFY_REQUEST_LIMIT"
        validation : []*/
        let errMsg = eErr.message;
        if(errMsg) {
          if(eErr[errMsg]){
            if(errMsg === 'validation' || eErr[errMsg] instanceof Array){
              errorsStr+= reader(eErr[errMsg]);
              return
            }
            else{
              errMsg = eErr[errMsg].message;
            }
          }
          else{
            errMsg = eErr.fa || eErr.fa_message
          }
          if(errMsg === undefined){
            errMsg = eErr.message;
          }
          gotErrors.push(errMsg)

        }
      })

      return {errors:errors,arrErrors:gotErrors}
    }


    if(errors instanceof Array){
      return reader(errors);
    }
    else{
      let gqlError

      if(typeof errors == "object" && 'response' in errors){
        const respErr = errors['response']
        if(respErr?.data?.errors){
          return reader(respErr['data']['errors']);
        }
      }
      else{
        try{
          gqlError = errors?.graphQLErrors[0];
        }
        catch (e) {
          return {errors:errors,arrErrors:[]}
        }
      }

      if(gqlError){
// handle validation error
        if (gqlError.validation&&gqlError.validation.length > 0) {
            // let formFields = vmx.state.validation.formFields;
          let validations = gqlError.validation;
          // get errors from api and sync errors with inputs
          validations.forEach((error) => {
              /*let input = formFields[error.input];
              if (!input) {
                  return;
              }*/
            // translate errors to persian
            let msg = $zpl.validationFa.messages[error.rule];
              // msg = msg.replace("{_field_}", input.name);
            let params = msg.match(/\{[a-z]+\}/);
            if (params) {
              for (let i = 0; i < params.length; i++) {
                msg = msg.replace(params[i], error.params[i]);
              }
            }
              // errorObj[error.input] = [msg];
              gotErrors.push(error.input+': '+"متغیری نامعتبر استفاده شده است!");
          });
            // vmx.dispatch("validation/setValidateErrors", errorObj);

            // if validation rule is variabledefinition
          if (gqlError.message != "validation") {
              gotErrors.push("متغیری نامعتبر استفاده شده است!");
          }
        }

// handle readable_code errors
        if (gqlError.readable_code) {
          if (gqlError.readable_code == "InternalError") {
              gotErrors.push("سیستم با مشکل مواجه شده است، لطفا با تیم فنی در ارتباط باشید");
          } else {
              gotErrors.push(gqlError.fa)
          }
        }

      }
    }

    return {errors:errors,arrErrors:gotErrors}
  }

  static getTrans_vSelf(errors){
    // console.dir(errors)

    let gotErrors = [],mobile='';

    if(errors?.response?.data){
      let dataErr = errors?.response?.data
      if(dataErr.message){
        gotErrors.push(dataErr.message)
      }
      if(dataErr.mobile){
        mobile = dataErr.mobile;
      }
    }

    return {errors:errors,arrErrors:gotErrors,mobile:mobile}
  }
}
