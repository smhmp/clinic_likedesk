<template>
  <div class="otpEmail pgForm content">
    <page-heading title="تایید شماره موبایل" hasReturn/>
    <div class="card">
      <div class="form">
        <div class="illustration-container">
          <div class="otp">
            <div class="base"></div>
            <img class="mask-group" src="@/assets/imgs/autohtml-2/OtpEmail/mask-group0.svg" />
          </div>
        </div>
        <div class="caption">
          <span>کد ارسال شده به شماره موبایل </span><span class="ltr"> {{mobile}} </span><span> را وارد کنید.</span>
        </div>
        <form  class="otp-digits" action="#" name="otp">
          <div class="otp-field">
            <input class="no-visible" id="handle" name="handle" autocomplete="one-time-code" data-type="number">
            <div class="fields">
              <input class="otp-cell input" name="digit-1" id="digit-1" data-type="number" type="number"
                     maxlength="6"
                     data-next="digit-2"
                     autocomplete="one-time-code"
                     autofocus>
              <input class="otp-cell input" name="digit-2" id="digit-2" data-type="number" type="number"
                     data-next="digit-3"
                     data-previous="digit-1"
                     maxlength="1"
                     autocomplete="off"
                     >
              <input  class="otp-cell input" name="digit-3" id="digit-3" data-type="number" type="number"
                      data-next="digit-4"
                      data-previous="digit-2"
                      maxlength="1"
                      autocomplete="off"
              >
              <input  class="otp-cell input" name="digit-4" id="digit-4" data-type="number" type="number"
                      data-next="digit-5"
                      data-previous="digit-3"
                      maxlength="1"
                      autocomplete="off"
              >
              <input  class="otp-cell input" name="digit-5" id="digit-5" data-type="number" type="number"
                      data-next="digit-6"
                      data-previous="digit-4"
                      maxlength="1"
                      autocomplete="off"
              >
              <input  class="otp-cell input" name="digit-6" id="digit-6" data-type="number" type="number"
                      data-previous="digit-5"
                      maxlength="1"
                      autocomplete="off"
              >
            </div>
            <div class="input-error statErr dRtl">
              کد وارد شده صحیح نیست، مجددا بررسی نمایید.
            </div>
          </div>
        </form>
      </div>
      <div class="page-otp-controlls">
        <div class="actions dRtl">
          <div class="text-button" @click="editMobile">
            <div class="label">ویرایش شماره موبایل</div>
          </div>
          <div class="divider">
            <div class="divider2"></div>
          </div>
          <div class="resend-otp"></div>
        </div>
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Loaders from "@/components/global/Loaders.vue";
import AHref from "@/components/global/AHref.vue";
import {otpFlow} from "@/src/js/otp/otpFlow";
import {crdMan} from "@/src/js/otp/crdMan";
import {otpActs} from "@/src/js/otp/otpActs";
import {otpMan} from "@/src/js/otp/otpMan";
import {langTools} from "@/src/js/langMan";
import {$zpl} from "@/plugins/zpl";
import {GqlJSSdk} from "@/src/js/GqlJSSdk";

export default {
  name: "OTPMobile",
  head:{
    title:'کلینیک اینسایت | تایید ایمیل'
  },
  data() {
    return {
      mobile: '',
      otp: '',
    };
  },
  async created() {
    const userInf = this.$store.state.application.userInfo;
    const $route = this.$route;
    this.mobile = userInf.mobile || $route.query.phone;
    $zpl.currRouter = this.$router;
  },
  mounted() {
    const vm = this;
    this.$store.dispatch('layouts/setProfileMounted', true);

    otpActs.reqOtpToEmail=function ({calbDone,calbFinal}){
      const vars = {
        mobile: langTools.convertToEnNum(vm.mobile),
      }

      $zpl.zplConnectPrj_v2.reqDirect({
        baseUrl:'https://reservation-api.insight-clinic.com/api/event/otp/send',
        args:vars,
      }).then(async (respObj)=>{

      })
      .catch((respObj)=>{
        respObj.showErr();
      }).finally(()=>{
        calbFinal();
      });
    };

    otpFlow.requestOtp = function (otpCode,from=''){
      if(otpMan.goingSend){
        return
      }
      otpMan.goingSend = true;
      otpFlow.loadingB('start');


      if(otpCode.length!=6){
        return
      }

      otpCode = langTools.convertToEnNum(otpCode);

      this.sendOtpCode(otpCode,{
        mobile:langTools.convertToEnNum(vm.mobile),
        calbDone(resp){
          $zpl.toastMsg('با موفقیت وارد شدید')
          $zpl.setStorage('AuthorizationKey','Bearer '+resp.data['token'])
          $zpl.currRouter.replace({path:`/events/`});
          $zpl.currRouter = null;
        },
        calbFinal(){
          otpMan.goingSend = false;
          otpFlow.loadingB('end');
        },
        calbError(){
          otpFlow.otpErr('on');
        }
      })
    };

    otpFlow.start();
    crdMan.ready_OTPCredential();
    otpFlow.domLoaded();

    otpActs.start(this);
  },
  beforeDestroy() {
    otpMan.doDestroy();
    crdMan.doDestroy();
    otpActs.doDestroy();
  },
  computed: {

  },
  methods: {
    editMobile(){
      this.$store.dispatch('layouts/setWithoutRequest', true);
      // this.$router.go(-1);
      this.$router.push({path:`/login-register/`,query:{phone:this.mobile}});
    },
  },
  watch:{

  },
  mixins:[],
  components: {AHref, Loaders },
};
</script>


