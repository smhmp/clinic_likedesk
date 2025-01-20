import FieldObj from "~/src/ts/FieldObj";
import FieldValidator from "~/src/ts/validation/FieldValidator";
import {langMan, langTools} from "~/src/js/langMan";
import {lg} from "@/src/js/dbg";
import {$zplUi} from "@/plugins/zplUi";


const ValidationMixin = {
  data(){
    return{
      validators:{},
    }
  },
  beforeDestroy() {
    /*const validators = this.validators;
    for(let k in validators){
      const eFieldValid=validators[k];

      if(eFieldValid){
        const fieldObj = eFieldValid.fieldObj;
        lg.col_lowGray('going ----> destroy event validation / fieldElm',fieldObj.fieldElm)
        if(fieldObj.smartObj){
          fieldObj.smartObj.destroyEvent();
        }
        else if(fieldObj.fieldElm.nodeName.toLowerCase() === 'input'){
          const eField = fieldObj.fieldElm
          $zplUi.remev(eField,'focus',{store:[eField,'readyValidForm_sensFocus'+fieldObj.name]})
          $zplUi.remev(eField,'blur',{store:[eField,'readyValidForm_sensBlur'+fieldObj.name]})
          $zplUi.remev(eField,'keyup',{store:[eField,'readyValidForm_sensKeyup'+fieldObj.name]})
          $zplUi.remev(eField,'keydown',{store:[eField,'readyValidForm_keydown'+fieldObj.name]})
        }
      }

    }*/
  },
  methods:{
    isAllowSensKey(name){
      return name==='first_name'||name==='last_name'
        ||name==='ssn'
        ||name==='company_rid'
        ||name==='company_name'
        ||name==='tax_id'
        ||name==='pervasive_code'
        ||name==='passport_number'
        ||name==='amount'
        ||name==='cardPan'
        ||name==='explain'
    },
    readyValidForm({calbReset=null}={}){
      const fields = $zpl.queryElms('*[data-rules]');
      const validators = this.validators;

      if(fields.length){
        for(let i=0,eField;i<fields.length,eField=fields[i];i++){
          const fieldObj = FieldObj.newField(eField, {mainField: true})

          if(!validators[fieldObj.name] || validators[fieldObj.name].fieldElm !== fieldObj.fieldElm){
            const anzOnce = !validators[fieldObj.name]
            lg.col_boldOrange('going ----> make event validation / [name,validators.fieldElm,fieldObj.fieldElm,eField]',[fieldObj.name,validators[fieldObj.name]?.fieldElm,fieldObj.fieldElm,eField])
            const fieldValid = new FieldValidator(fieldObj);
            validators[fieldObj.name] = fieldValid;

            if(fieldObj.smartObj){
              fieldObj.smartObj.addCalb_onChange(()=>{
                fieldValid.hideErrors('change');
              })
            }
            else if(eField.nodeName.toLowerCase() === 'input' || eField.nodeName.toLowerCase() === 'textarea'){

              const sensFocus=()=>{
                this.readyValidForm()
              }


              const sensBlur =(e)=>{
                const name = fieldObj.name;
                if(this.isAllowSensKey(name)){
                  window.setTimeout(()=>{
                    fieldValid.hideErrors('blur');
                  },500)
                }
              }

              const sensKeyup =(e)=>{
                const kObj = $zpl.getEvStrKey({e, evTyp:'keyup'})
                if(kObj.char === 'enter' || kObj.char === 'tab'){
                  return;
                }

                calbReset && calbReset()

                const name = fieldObj.name;
                if(this.isAllowSensKey(name)){
                  validators[name].chkValidKeyUp(e,kObj.char);
                  return;
                }

                fieldValid.hideErrors('keyup');
              };

              const sensKeydown=(e)=>{
                const kObj = $zpl.getEvStrKey({e, evTyp:'keydown'}),name = fieldObj.name,val = e.target.value;

                if(!kObj.char)return

                if(this.isAllowSensKey(name)){
                  const validObj = validators[name];

                  validObj.chkValidKeyDown(e,kObj.char)
                }
              }

              $zplUi.adev(eField,'focus',sensFocus,{store:[eField,'readyValidForm_sensFocus_'+fieldObj.name],once:true})
              $zplUi.adev(eField,'blur',sensBlur,{store:[eField,'readyValidForm_sensBlur_'+fieldObj.name],once:true})
              $zplUi.adev(eField,'keyup',sensKeyup,{store:[eField,'readyValidForm_sensKeyup_'+fieldObj.name],once:true})
              $zplUi.adev(eField,'keydown',sensKeydown,{store:[eField,'readyValidForm_keydown_'+fieldObj.name],once:true})
              /*eField.addEventListener('focus',sensFocus);
              eField.addEventListener('blur',sensBlur);
              eField.addEventListener('keyup',sensKeyup);
              // eField.addEventListener('change',sensKeyup); //todo todo in ro ekhtesasi baraye checkbox bayad paide koni
              eField.addEventListener('keydown',sensKeydown)*/
            }
          }

        }
      }
    },
  },
  watch:{

  },
}
export default ValidationMixin;
