<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده و مدیریت اطلاعات کاربری در زرین‌پال" title="حساب کاربری زرین‌پال"/>
    <div class="card">
      <div v-if="isNotifBox && !hidenNotifBox" class="inline-message_profile">
        <div class="interface-essential-lamp-spark">
          <img class="group" src="@/assets/imgs/svg/warnInlMsg.svg" />
        </div>
        <div class="content">
          <div class="body">
        <span>
          <span class="body-span">
            پس از تکمیل اطلاعات حساب کاربری و ارتقا به سطح احراز هویت «نقره‌ای»
            ‌می‌توانید به
          </span>
          <a :href="$zpl.infAdr().panelZplBeta+'/panel'" target="_blank" class="body-span2">پنل کاربری زرین‌پال</a>
          <span class="body-span3">بازگردید.</span>
        </span>
          </div>
        </div>
        <a v-if="isClosableNotifBox" href="javascript:" @click="closeNotifBox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 6L6 18L18 6Z" fill="#393946"></path>
            <path d="M18 6L6 18" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
      </div>
      <ProgressLevel/>
      <ActionGroup v-if="dataStatus"
        ref="grpBaseRef"
        ttl="اطلاعات پایه"
        caption="اطلاعات حساب کاربری و احراز هویت"
      >
        <ActionItem frsChild
          ttl="اطلاعات حساب کاربری"
          :statAct="statAct('personal')"
          :statActFa="statActFa('personal')"
          midCaption="اطلاعات مربوط به حساب حقیقی یا حقوقی"
          :onAct="onActPersonal"
          :loadAct="loadingActPrsn"
        />
        <ActionItem
          ttl="احراز هویت"
          :statAct="statAct('kyc')"
          :statActFa="statActFa('kyc')"
          midCaption="تایید اطلاعات هویتی"
          :onAct="onActKyc"
          :noAct="isPreview('kyc') || isSilverOrMore(curLevel)"
          :loadAct="loadingActKyc"
        />
      </ActionGroup>
      <ActionGroup v-if="dataStatus"
                   ref="grpLegalRef"
                   ttl="اطلاعات تکمیلی"
                   caption="ارسال مدرک و تکمیل حساب حقوقی"
      >
        <ActionItem frsChild
            ttl="تکمیل حساب حقوقی"
            :statAct="statAct('legal')"
            :statActFa="statActFa('legal')"
            midCaption="ارسال معرفی‌نامه رسمی"
            :onAct="onActLegal"
            :loadAct="loadingActLegal"
            :noAct="isNotAllowLegal"
        />
      </ActionGroup>
      <ActionGroup
        ref="grpEmailRef"
        ttl="اطلاعات تماس"
        caption="راه‌های ارتباطی و اطلاع‌رسانی شما در زرین‌پال"
      >
        <ActionItem preview frsChild :midCaption="cell_number | persianNumbers" ttl="شماره همراه" no-act="1"/>
        <ActionItem
          ttl="ایمیل"
          :statAct="statAct('email')"
          :statActFa="statActFa('email')"
          :midCaption="emailAdr?emailAdr:'ثبت آدرس ایمیل'"
          :onAct="onActEmail"
          :loadAct="loadingActMail"
        />
      </ActionGroup>
    </div>

  </div>
</template>

<script>
import UserMixin, {confFields, UserMan} from "@/mixins/UserMixin";
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import AHref from "@/components/global/AHref.vue";
import {EventBus} from "@/plugins/event-bus";
import ActionItem from "@/components/pages/ActionItem.vue";
import ActionGroup from "@/components/pages/ActionGroup.vue";
import ProgressLevel from "@/components/pages/ProgressLevel.vue";
import LevelMixin from "@/mixins/LevelMixin";
import StatMixin from "@/mixins/StatMixin";

export default {
  name: "Profile",
  head:{
    title:'زرین‌پال | اطلاعات کاربری'
  },
  components: {ProgressLevel, ActionGroup, ActionItem, AHref, Loaders },
  data() {
    return {
      loadingActPrsn:false,
      loadingActKyc:false,
      loadingActLegal:false,
      loadingActMail:false,
      hidenNotifBox:false,
    };
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);

    this.chkModalWelcome();
  },
  created() {

  },
  beforeDestroy() {

  },
  computed: {
    isAfterBlueAndNoLegal(){
      return this.isBlueOrMore(this.curLevel) && !UserMan.isLegal()
    },
    isNotAllowLegal(){
      return this.isSilverOrMore(this.curLevel) && !this.isPreview('legal');
    },
    isNotifBox(){
      const noNotifBox = $zpl.getStorage('noNotifBox'+this.zpId);
      return !noNotifBox
    },
    isClosableNotifBox(){
      return this.isSilverOrMore()
    }
  },
  methods: {
    closeNotifBox(){
      $zpl.setStorage('noNotifBox'+this.zpId,1);
      this.hidenNotifBox = true;
    },
    onActKyc(e){
      const vm = this;
      if(!this.isPreview('kyc') && !this.isSilverOrMore(this.curLevel)){
        this.loadingActKyc = true;
        this.goToKyc(e,{
          calbFinal(){
            vm.loadingActKyc = false;
          }
        });
      }
    },
    onActPersonal(){
      this.loadingActPrsn = true;
      this.$router.push({path:`/form-personal/`})
    },
    onActEmail(){
      this.loadingActMail = true;
      this.$router.push({path:`/verify-email/`,query:{step:1}})
    },
    onActLegal(){
      if(!this.isBlueOrMore(this.curLevel)){
        $zpl.toastMsg('قبل از تکمیل حساب حقوقی، اطلاعات حساب کاربری را تکمیل نمایید.',{delayTime:9000,justOnce:'isNotAllowLegal'})
        return;
      }
      if(this.isNotAllowLegal){
        if(UserMan.isLegal()){
          if(this.isStatAct('legal','PROCESSING')){
            $zpl.toastMsg('برای اصلاح و یا ارسال مجدد مدرک حقوقی به پشتیبانی تیکت بدهید.',{delayTime:7000,justOnce:'isLegal_PROCESSING_isNotAllowLegal'})
          }
          else{
            $zpl.toastMsg('برای ارسال مدرک حقوقی به پشتیبانی تیکت بدهید.',{delayTime:7000,justOnce:'isLegal_REJECTED_isNotAllowLegal'})
          }
        }
        else{
          $zpl.toastMsg('حساب کاربری شما "حقوقی" نمی‌باشد.',{delayTime:7000,justOnce:'isNotAllowLegal'})
        }
        return;
      }
      if(this.isAfterBlueAndNoLegal){
        $zpl.toastMsg('امکان تکمیل حساب حقوقی در سطح فعلی شما وجود ندارد. با پشتیبانی تماس بگیرید.',{delayTime:12000,justOnce:'isNotAllowLegal'})
        return;
      }
      this.loadingActLegal = true;
      this.$router.push({path:`/form-legal/`})
    },
    chkModalWelcome(){
      const __ = $zpl.isTest().__modalNotif__
      if(__||!$zpl.getStorage('showModal_purpose_tracking'+this.zpId)){
        if(!__){
          $zpl.setStorage('showModal_purpose_tracking'+this.zpId,1)
        }
        if(__||this.$store.state.application.userInfo?.additional_identification_info?.registration?.purpose === 'tracking'){
          EventBus.$emit("openModalPro", 'modalNotif',{
            mainTitle:'به زرین‌پال خوش‌آمدید!',
            descHtml(){
              return  'در صورتی که به منظور پیگیری تراکنش به زرین‌پال مراجعه کرده‌اید، می‌توانید از بخش «پیگیری تراکنش»، اطلاعات تراکنش‌ مورد نظر خود را وارد کرده و نسبت به پیگیری اقدام نمایید.'
            },
            btnInf:[
              {
                title:'انتقال به بخش پیگیری تراکنش',
                link:'https://www.zarinpal.com/tracking.html',
                type:'primary'
              },
              {
                title:'متوجه شدم',
                doClose:true,
                type:'secondary'
              }
            ]
          });
        }
      }
    }
  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


