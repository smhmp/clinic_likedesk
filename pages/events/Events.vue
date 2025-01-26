<template>
  <div class="Events profilePg body">
    <page-heading caption="رزرو جایگاه دورهمی" title="شرکت در دورهمی" backPath="/profile/"/>
    <div class="card">
      <div v-if="!endEvent" class="inline-message_profile">
        <div class="interface-essential-lamp-spark">
          <img class="group" src="@/assets/imgs/svg/warnInlMsg.svg" />
        </div>
        <div class="content">
          <div class="body">
            <span>
              <span v-if="isPurchasedEvent" class="body-span">
                شما یک تیکت با موفقیت خریداری کرده اید، و از قسمت <a href="javascript:" @click="goEventsMan" class="body-span2 cursor-pointer">(فعالیتها)</a> قابل مشاهده است. به زودی خرید چند تایی تیکت فعال خواهد شد
              </span>
              <span v-else class="body-span">
                برای شرکت در دورهمی یکی از تیکت های زیر را انتخاب کرده، دکمه رزرو تیکت را بزنید.
              </span>
              (<a href="https://wa.me/qr/CTCOMKQ2KNDKO1" target="_blank" class="body-span2">پشتیبانی</a>)
            </span>
          </div>
        </div>
      </div>
      <ProgressLevelLike v-if="!isPurchasedEvent" :endEvent="endEvent"/>
      <div class="ManualKyc">
        <div class="guide">
          <div class="links">
            <a class="contained-button2 asBtn" href="/" target="_blank">
              <div class="labelGui">مشاهده اطلاعات و جزئیات دورهمی</div>
              <div class="interface-essential-play-loading">
                <img class="group2" src="@/assets/imgs/manualkyc/group1.svg" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <ActionGroup
          ref="grpEmailRef"
          ttl="ارتباط با پشتیبانی"
          caption="در صورت نیاز به راهنمایی بیشتر میتونید با بخش پشتیبانی در واتساپ یا تلگرام در ارتباط باشید."
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
      endEvent:false,
      loadingActPrsn:false,
      loadingActKyc:false,
      loadingActLegal:false,
      loadingActMail:false,
      hidenNotifBox:false,
    };
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);

    const $route = this.$route;
    if($route.query.resultPay == 'failed'){
      EventBus.$emit("openModalPro", 'modalNotif',{
        mainTitle:'خرید شما موفقیت آمیز نبود',
        descHtml(){
          return  'لطفا مجددا تلاش نمایید.'
        },
        btnInf:[
          {
            title:'متوجه شدم',
            doClose:true,
            type:'secondary'
          }
        ]
      });
    }
  },
  created() {

  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    goEventsMan(){
      this.$router.replace({path:`/events-man/`});
    },
  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


