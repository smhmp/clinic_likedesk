<template>
  <ValidationObserver ref="form" tag="div">
    <form @submit.prevent="validateBeforeSubmit($event,request,validationError)" :class="[addiClass]" :autocomplete="autocomplete">
      <slot></slot>
    </form>
  </ValidationObserver>
</template>
<script>

import {EventBus} from "@/plugins/event-bus";

export default {
  props: {
    addiClass: {
      type: String,
      default:''
    },
    request: {
      type: Function,
    },
    validationError: {
      type: Function,
      default: ()=>{}
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  data(){
    return {
      tokenValid:{
        success : true
      },
    }
  },
  methods: {
    validateBeforeSubmit (ev,request,validationError) {
      //save form fields in vuex store to handle validate errors
      this.$store.commit('validation/getFormFields',this.$refs.form.fields)
      //clear validation errors if they exist berfore
      this.$store.dispatch('validation/setValidateErrors', {})

      EventBus.$emit("finalValidate", true,this.tokenValid);

      if(this.$refs.form){

        this.$refs.form.validate().then(success => {

          EventBus.$emit("finalValidate", false,this.tokenValid,success);

          if(!this.tokenValid.success){
            this.tokenValid.success = true;
            return
          }

          if (!success) {
            return validationError();
          }

          const res = request(ev);

          if(res){
            return res.then(()=>{
              // set validation errors if any error happened
              let validationErrors = this.$store.state.validation.translatedErrors;
              this.$refs.form.setErrors(validationErrors);
            });
          }
          return true;
        })
      }else {
        return request()
      }
    },
  },

};
</script>
