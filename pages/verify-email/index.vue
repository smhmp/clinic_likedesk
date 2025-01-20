<template>
  <div class="w-full">
    <FormEmail v-if="step_formEmail"/>
    <OTPEmail v-if="step_otpEmail"/>
  </div>
</template>

<script>
import FormEmail from "@/pages/verify-email/FormEmail.vue";
import OTPEmail from "@/pages/verify-email/OTPEmail.vue";

export default {
  name:'VerifyEmailIndex',
  components: {FormEmail,OTPEmail},
  data(){
    return{
      step_formEmail:false,
      step_otpEmail:false,
    }
  },
  async created() {
    this.chkSteps()
  },
  methods:{
    chkSteps(){
      const $route = this.$route;
      if($route.query.step == 1){
        this.step_formEmail = true;
        this.step_otpEmail = false;
      }
      else if($route.query.step == 2){
        this.step_formEmail = false;
        this.step_otpEmail = true;
      }
    }
  },
  watch:{
    '$route.query'(val){
      this.chkSteps()
    }
  }
}

</script>
