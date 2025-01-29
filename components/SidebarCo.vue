<template>
  <div class="side-bar">
    <div class="top-container">
      <div class="user">
        <div class="avatar2" @click="showModalAvatar">
          <div class="profile-fill2">
            <img class="group8" src="@/assets/imgs/autohtml-all1/group7.svg" />
            <img v-if="gravatar" :src="gravatar" class="gravatar">
          </div>
          <div class="edit">
            <div class="pen-edit-single">
              <img class="group9" src="@/assets/imgs/autohtml-all1/group8.svg" />
            </div>
          </div>
        </div>
        <div class="account-details">
          <div class="full-name2">{{ nameFamily }}</div>
          <div class="info">
            <div class="phone-number4">{{cell_number | persianNumbers}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-container">
      <div class="menu">
        <div class="menu-group">
          <NavLink
            :onClick="goToEvents" NavLink
            navLabel="دورهمی"
            icon="RefererIcon"
            inPage="1"
            :selected="isActivePage('events')"
          />
        </div>
        <div v-if="isLogedin" class="menu-group">
          <NavLink
            :onClick="goToProfile" NavLink
            navLabel="اطلاعات کاربری"
            icon="PanelIcon"
            inPage="1"
            :selected="isActivePage('profile')"
          />
        </div>
        <div class="divider" v-if="isLogedin">
          <div class="divider2"></div>
        </div>
        <div v-if="$zpl.isLocal()" class="menu-group">
          <NavLink
            :onClick="goTestMan" NavLink
            navLabel="تست ریکوئستها"
            icon="TrackingIcon"
            inPage="1"
            :selected="isActivePage('_test-req_')"
          />
          <NavLink
            v-if="isLogedin"
            :onClick="goEventsMan" NavLink
            navLabel=" تیکت‌های من"
            icon="TrackingIcon"
            inPage="1"
            :selected="isActivePage('events-man')"
          />
          <NavLink
            v-if="!isLogedin"
            :onClick="goLoginRegister" NavLink
            navLabel="ورود / ثبت نام"
            icon="TrackingIcon"
            inPage="1"
            :selected="isActivePage('login-register')"
          />
        </div>
        <div v-if="$zpl.isLocal()" class="divider">
          <div class="divider2"></div>
        </div>
        <div class="menu-group">
          <NavLink
            :onClick="()=>{$zpl.openLink('/')}" NavLink
            navLabel="معرفی دورهمی"
            icon="RefererIcon"
            outPage="1"
          />
          <NavLink
            :onClick="()=>{$zpl.openLink('https://wa.me/qr/CTCOMKQ2KNDKO1','_blank')}" NavLink
            navLabel="پشتیبانی  دورهمی"
            icon="RefererIcon"
            outPage="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {EventBus} from "@/plugins/event-bus";
import UserMixin from "@/mixins/UserMixin";
import NavLink from "@/components/pages/NavLink.vue";
import LevelMixin from "@/mixins/LevelMixin";

export default {
  name: "Sidebar",
  computed: {

  },
  props:{
    openedSidebar:{
      type: Boolean,
      default:false,
    },
    doCloseSidebar:{
      type: Function,
      default:null,
    }
  },
  data() {
    return {
      gravatar:''
    };
  },
  async created() {

  },
  mounted() {
    const src = this.$store.state.application.userInfo.avatar;
    if(src){
      this.gravatar = $zpl.addQueryToUrl(src,'rand='+Date.now());
    }
  },
  beforeDestroy() {

  },
  methods: {
    isActivePage(routerName){
      const $route = this.$route;
      return $route.name === routerName+ '___fa'
    },
    showModalAvatar(){
      EventBus.$emit("openModalPro", 'modalAvatar');
    },
    goToTransaction(){

    },
    goTracking(){
      this.$router.replace({path:`/form-tracking/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goEventsMan(){
      this.$router.replace({path:`/events-man/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goTestMan(){
      this.$router.replace({path:`/_test-req_/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goLoginRegister(){
      this.$router.replace({path:`/login-register/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goToProfile(){
      this.$router.replace({path:`/profile/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goToEvents(){
      this.$router.replace({path:`/events/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
  },
  watch:{

  },
  mixins:[UserMixin,LevelMixin],
  components: {NavLink},
};
</script>
