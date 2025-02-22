<template>
  <div class="formEmail pgForm content">
    <page-heading :caption="caption" title="ورود / ثبت نام"/>
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
          :onClkBtn="goingValidate" ButtonSimple
          isLoader="1"
          :val-btn="`مرحله بعد`"
          type="secondary"
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
import {langTools} from "@/src/js/langMan";
import {$zpl} from "@/plugins/zpl";
import UrlMixin from "@/mixins/UrlMixin";
import UserMixin from "@/mixins/UserMixin";



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
      needOtp: false,
      caption:"برای شرکت در دورهمی لطفا شماره موبایل خود را وارد کرده کلید مرحله بعد را بزنید",
    };
  },
  async created() {
    this.getRemoteUrl('callbackOtp','msgCaption',{once:false,
      calb(msgCaption){
        this.needOtp = !!msgCaption;
        this.caption = msgCaption;
      },
    });
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);

    this.fillInit();

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
    fillInit(){
      const fields = this.fields;
      fields.mobile = this.cell_number;
    },
    formatPhoneNumber(phoneNumber) {
      // پاکسازی شماره: حذف تمامی کاراکترهای غیر عددی (به جز + در ابتدای شماره)
      let cleaned = phoneNumber.trim().replace(/[^+\d]/g, '');
      let countryCode = '';

      // استخراج کد کشور در صورت وجود (مثلاً +98)
      if (cleaned[0] === '+') {
        // فرض می‌کنیم کد کشور شامل ۱ تا ۳ رقم است
        let match = cleaned.match(/^(\+\d{1,3})(\d+)/);
        if (match) {
          countryCode = match[1];
          cleaned = match[2]; // باقی‌مانده شماره بعد از کد کشور
        }
      }

      let group1 = ''; // آخرین ۴ رقم
      let group2 = ''; // سه رقم قبل از group1
      let group3 = ''; // باقی‌مانده رقم‌ها (از ابتدا)

      if (cleaned.length <= 4) {
        group1 = cleaned;
      } else {
        group1 = cleaned.slice(-4);               // آخرین ۴ رقم
        let remaining = cleaned.slice(0, -4);       // رقم‌های باقیمانده قبل از آخرین ۴ رقم

        if (remaining.length <= 3) {
          group2 = remaining;
        } else {
          group2 = remaining.slice(-3);           // سه رقم آخر از بخش باقیمانده
          group3 = remaining.slice(0, -3);          // باقی‌مانده رقم‌ها از ابتدا
        }
      }

      // ساخت رشته نهایی با فاصله گذاری بین گروه‌ها
      let formatted = [group3, group2, group1].filter(Boolean).join(' ');

      // اضافه کردن کد کشور در ابتدای شماره در صورت وجود
      if (countryCode) {
        formatted = countryCode + ' ' + formatted;
      }

      return formatted;
    },
    goingValidate(e,{calbDone}){
      const fields = this.fields;
      const vm = this;
      if(!this.needOtp){
        EventBus.$emit("openModalPro", 'modalNotif',{
          mainTitle:'اطمینان از شماره موبایل وارد شده',
          descHtml(){
            return  `<div>در نظر داشته باشید: خرید شما، با این شماره موبایل ثبت خواهد شد.</div><p class="cleanMobile">${vm.formatPhoneNumber(fields.mobile)}</p>
                    <style>
                    p.cleanMobile {
    direction: ltr;
    font-weight: 700;
    font-size: 17px;
    margin-top: 10px;
}
</style>
                     `
          },
          btnInf:[
            {
              title:'بله اطمینان دارم',
              doClick(){
                vm.goToOtp(e,{calbDone})
              },
              disabledUntil:3,
              type:'primary'
            },
            {
              title:'نیاز به اصلاح دارد',
              doClose:true,
              type:'secondary'
            }
          ]
        });
      }
      else{
        this.goToOtp(e,{calbDone})
      }
    },
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
          // baseUrl:'https://reservation-api.insight-clinic.com/api/event/login',
          baseUrl:vm.needOtp
            ?'http://clinic_ticket.local/api/send-otp?XDEBUG_SESSION_START=11224'
            :'http://clinic_ticket.local/api/login?XDEBUG_SESSION_START=11224',
          args:vars,
        }).then(async (respObj)=>{
          const resp = respObj.getResp();
          if(resp){
            if(calbDone)calbDone(resp);
            if(vm.needOtp){
              this.goToNextLvl(fields.mobile);
            }
            else{
              vm.$store.dispatch("application/setMobile",resp.data['user']['mobile']);
              $zpl.setStorage('Authorization-Anony',resp.data['auth_token'])
              $zpl.toastMsg('با موفقیت وارد شدید');
              vm.$router.replace({path:`/events/`});
            }
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
  mixins:[ValidationMixin,UserMixin,UrlMixin]
};
</script>


