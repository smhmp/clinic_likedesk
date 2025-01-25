<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده و مدیریت رویدادهای اینسایت" title="شرکت در دورهمی" backPath="/profile/"/>
    <div class="card">
      <div v-if="isNotifBox && !hidenNotifBox" class="inline-message_profile">
        <div class="interface-essential-lamp-spark">
          <img class="group" src="@/assets/imgs/svg/warnInlMsg.svg" />
        </div>
        <div class="content">
          <div class="body">
        <span>
          <span class="body-span">
            برای شرکت در دورهمی یکی از بلیط های زیر را انتخاب کنید و دکمه خرید تیکت را بزنید.
          </span>
          (<a :href="$zpl.infAdr().panelZplBeta+'/panel'" target="_blank" class="body-span2">پشتیبانی</a>)
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
      <ProgressLevelLike/>
      <div class="ManualKyc">
        <div class="guide">
          <div class="links">
            <a class="contained-button2 asBtn" href="https://www.aparat.com/v/j18748j" target="_blank">
              <div class="labelGui">پیام تصویری خانوم دکتر تینا پارسامند</div>
              <div class="interface-essential-play-loading">
                <img class="group2" src="@/assets/imgs/manualkyc/group1.svg" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <ActionGroup
          ref="grpEmailRef"
          ttl="تماس با ما"
          caption="راه‌های ارتباطی و اطلاع‌رسانی کلینیک"
      >
        <ActionItem preview frsChild midCaption="0912....." ttl="شماره واتس اپ" no-act="1"/>
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
import ProgressLevelLike from "@/components/pages/ProgressLevelLike.vue";
import LevelMixin from "@/mixins/LevelMixin";
import StatMixin from "@/mixins/StatMixin";
import TooltipPro from "@/components/form/TooltipPro.vue";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import {Permissions} from "@/mixins/PermissionMixin";

export default {
  name: "Events",
  head:{
    title:'اینسایت | اطلاعات کاربری'
  },
  components: {ButtonSimple, TooltipPro, ProgressLevelLike, ActionGroup, ActionItem, AHref, Loaders },
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


