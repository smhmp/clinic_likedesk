<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده و مدیریت اطلاعات" title="پنل کاربری"/>
    <div class="card">
      <div class="inline-message_profile">
        <div class="interface-essential-lamp-spark">
          <img class="group" src="@/assets/imgs/svg/warnInlMsg.svg" />
        </div>
        <div class="content">
          <div class="body">
        <span>
          <span class="body-span">
            برای شرکت در دورهمی
          </span>
          (<a @click="goToEvents" href="javascript:" class="body-span2">اینجا</a>)
          <span class="body-span">
             کلیک کنید.
          </span>
          (<a href="https://wa.me/qr/CTCOMKQ2KNDKO1" target="_blank" class="body-span2">پشتیبانی</a>)
        </span>
          </div>
        </div>
      </div>


      <ActionGroup
        ref="grpBaseRef"
        ttl="اطلاعات پایه"
      >
        <ActionItem frsChild
          ttl="اطلاعات شرکت در دورهمی"
          :onAct="onActPersonal"
          :loadAct="loadingActPrsn"
        />
      </ActionGroup>
      <ActionGroup
        ref="grpEmailRef"
        ttl="اطلاعات تماس"
        caption="راه‌های ارتباطی و اطلاع‌رسانی کلینیک"
      >
        <ActionItem preview frsChild midCaption="" ttl="<a href='https://wa.me/qr/CTCOMKQ2KNDKO1' target='_blank'>🔗 واتساپ پشتیبانی 📱 ۰۹۳۵۶۲۹۸۳۶۶</a>" no-act="1"/>
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
import LevelMixin from "@/mixins/LevelMixin";
import StatMixin from "@/mixins/StatMixin";
import TooltipPro from "@/components/form/TooltipPro.vue";
import ButtonSimple from "@/components/form/ButtonSimple.vue";

export default {
  name: "Profile",
  head:{
    title:'اینسایت | اطلاعات کاربری'
  },
  components: {ButtonSimple, TooltipPro, ActionGroup, ActionItem, AHref, Loaders },
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

  },
  methods: {
    goToEvents(){
      this.$router.replace({path:`/events/`});
    },
    onActPersonal(){
      this.loadingActPrsn = true;
      this.$router.push({path:`/login-register/`,query:{step:3,forEdit:1}})
    },
    chkModalWelcome(){
      const __ = $zpl.isTest().__modalNotif__
      if(__||!$zpl.getStorage('showModal_purpose_tracking'+this.zpId)){
        if(!__){
          $zpl.setStorage('showModal_purpose_tracking'+this.zpId,1)
        }
        if(__||this.$store.state.application.userInfo?.additional_identification_info?.registration?.purpose === 'tracking'){
          EventBus.$emit("openModalPro", 'modalNotif',{
            mainTitle:'به اینسایت خوش‌آمدید!',
            descHtml(){
              return  'در صورتی که به منظور پیگیری تراکنش به اینسایت مراجعه کرده‌اید، می‌توانید از بخش «پیگیری تراکنش»، اطلاعات تراکنش‌ مورد نظر خود را وارد کرده و نسبت به پیگیری اقدام نمایید.'
            },
            btnInf:[
              {
                title:'انتقال به بخش پیگیری تراکنش',
                link:'https://www.insight-clinic.com/tracking.html',
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


