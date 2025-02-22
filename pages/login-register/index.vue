<template>
  <div class="w-full">
    <FormMobile v-if="step_formMobile"/>
    <OTPMobile v-else-if="step_otpMobile"/>
    <Register v-else-if="!isNeedOtp&&step_register"/>
    <JustLoading v-else/>
  </div>
</template>

<script>
import FormMobile from "@/pages/login-register/FormMobile.vue";
import OTPMobile from "@/pages/login-register/OTPMobile.vue";
import Register from "@/pages/login-register/Register.vue";
import UserMixin from "@/mixins/UserMixin";
import UrlMixin from "@/mixins/UrlMixin";

export default {
  name:'VerifyMobileIndex',
  components: {FormMobile,OTPMobile,Register},
  data(){
    return{
      step_formMobile:true,
      step_otpMobile:false,
      step_register:false,
    }
  },
  async created() {
    const $route = this.$route;
    if(this.isLogedin && $route.query.step != 3 && !$route.query.Authority){
      this.$router.replace({path:`/events/`})
    }
    else if(($route.query.result == 'failed'||$route.query.Status == 'NOK')&& ($route.query.step == 3||$route.query.Authority)){
      this.$router.replace({path:`/events/`,query:{resultPay:'failed'}})
    }
    this.chkSteps();
    if(!this.isLogedin){
      return this.goToUrl(`/login-register/`)
    }
    if(this.step_register){
      if(this.isNeedOtp){
        this.goToUrl(`/login-register/`,{remote:{
            callbackOtp:{
              callbackData:{
                path:$route.path,
                query:$route.query
              },
              msgCaption:'برای مدیریت اطلاعات شخصی لطفا شماره موبایل خود را وارد کرده کلید مرحله بعد را بزنید'
            }
          }})
      }
    }
  },
  methods:{
    chkSteps(){
      const $route = this.$route;
      if(!$route.query.step){
        this.step_formMobile = true;
        this.step_otpMobile = false;
      }
      else if($route.query.step == 2){
        this.step_formMobile = false;
        this.step_otpMobile = true;
      }
      else if($route.query.step == 3){
        this.step_formMobile = false;
        this.step_otpMobile = false;
        this.step_register = true;
      }
    }
  },
  watch:{
    '$route.query'(val){
      this.chkSteps()
    }
  },
  mixins:[UserMixin,UrlMixin]
}

</script>
