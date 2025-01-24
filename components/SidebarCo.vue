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
        <div class="menu-group">
          <NavLink
            :onClick="goToProfile" NavLink
            navLabel="پنل کاربری"
            icon="PanelIcon"
            inPage="1"
            :selected="isActivePage('profile')"
          />
        </div>
        <div class="divider" v-if="Permissions.isLogedin()">
          <div class="divider2"></div>
        </div>
        <div class="menu-group">
          <NavLink
            v-if="Permissions.isLogedin()"
            :onClick="goTransactions" NavLink
            navLabel="صفحه فعالیت"
            icon="TrackingIcon"
            inPage="1"
            :selected="isActivePage('transactions')"
          />
          <NavLink
            v-if="Permissions.isLogedin()"
            :onClick="goLoginRegister" NavLink
            navLabel="ورود / ثبت نام"
            icon="TrackingIcon"
            inPage="1"
            :selected="isActivePage('login-register')"
          />
        </div>
        <div class="divider">
          <div class="divider2"></div>
        </div>
        <div class="menu-group">
          <NavLink
            :onClick="()=>{$zpl.openLink($zpl.infAdr().panelZplOld+'/panel/referrer/','_blank')}" NavLink
            navLabel="ارتباط با ما"
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
import {Permissions} from "@/mixins/PermissionMixin";

export default {
  name: "Sidebar",
  computed: {
    Permissions() {
      return Permissions
    }
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
    goTransactions(){
      this.$router.replace({path:`/transactions/`});
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
