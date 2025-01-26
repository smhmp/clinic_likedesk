<template>
  <div class="formEmail pgForm content">
    <page-heading caption="برای شرکت در دورهمی لطفا شماره موبایل خود را وارد کرده کلید مرحله بعد را بزنید" title="ورود / ثبت نام"/>
    <form @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card',{loading}]">
      <div class="form">
        <TextInput
          iName="mobile"
          i-label="شماره موبایل"
          maxlength="255"
          dataRules="required,mobile"
          v-model="fields.mobile"
          ltr
        />
      </div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="goToOtp" ButtonSimple
          isLoader="1"
          :val-btn="`مرحله بعد`"
          type="new"
        />
      </div>
    </form>
  </div>
</template>

<script>
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import TextInput from "@/components/form/TextInput.vue";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import ValidationMixin from "@/mixins/ValidationMixin";
import moment from "moment-jalaali";
import {GqlStore} from "@/src/js/GqlStore";
import editEmail from "@/gql/FormEmail/editEmail";
import {EventBus} from "@/plugins/event-bus";
import PreviewEmail from "@/components/pages/PreviewEmail.vue";
import StatMixin from "@/mixins/StatMixin";
import {langTools} from "@/src/js/langMan";
import {$zpl} from "@/plugins/zpl";



export default {
  name: "FormMobile",
  head:{
    title:'کلینیک اینسایت | ورو/ثبت نام'
  },
  components: {PreviewEmail, ButtonSimple, TextInput, Loaders },
  data() {
    return {
      fieldsFa:{
        mobile:'شماره موبایل',
      },
      fields:{
        mobile:'',
      },
      loading: false,
    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    const fields = this.fields;
    const userInf = this.$store.state.application.userInfo;

    const $route = this.$route;
    if($route.query.phone){
      fields.mobile = $route.query.phone;
    }

    if(this.$store.state.layouts.isWithoutRequest){
      this.$store.dispatch('layouts/setWithoutRequest',false);
    }

    this.readyValidForm();
  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    goToOtp(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;

      if(this.isValidSubmit()){
        const fields = this.fields;

        const vars = {
          mobile: langTools.convertToEnNum(fields.mobile),
        }

        vm.loading = true;

        $zpl.zplConnectPrj_v2.reqDirect({
          baseUrl:'https://reservation-api.insight-clinic.com/api/event/otp/send',
          args:vars,
        }).then(async (respObj)=>{
          const resp = respObj.getResp();
          if(resp){
            if(calbDone)calbDone(resp);
            this.goToNextLvl(fields.mobile);
          }
        })
        .catch((respObj)=>{
          /**
           * @var respObj
           * @type RespObj
           */
          vm.loading = false;
          const msg = respObj.getErrMsg();
          const mobileVal = this.validators['mobile'];
          if(msg){
            mobileVal.setErrMsg(msg);
          }
          else{
            mobileVal.setErrMsg('خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.');
          }
        })

      }

    },
    goProfile(){
      this.$router.replace({path:`/profile/`});
    },
    goToNextLvl(mobile){
      this.$router.push({path:`/login-register/`,query:{step:2,phone:mobile}});
    },
    isValidSubmit(){
      this.readyValidForm();
      const mobile = this.validators['mobile'];

      const res1 = mobile.chkValidAndShow('فیلد شماره موبایل نمی‌تواند خالی باشد');
      if(!res1){
        return false;
      }

      return true;
    }
  },
  mixins:[ValidationMixin,StatMixin]
};
</script>


