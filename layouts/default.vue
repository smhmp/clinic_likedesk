<template>
  <div :class="['layout-default',{notFound,subPage}]">
    <div class="bg-img">
      <div class="bg-img2" />
      <img class="bg-img2" src="@/assets/imgs/autohtml-all1/bg-img1.png" />
    </div>
    <div class="layout profile-master" v-if="(!loading || me.id)">
      <TopBar :onClkMenu="onOpenedSidebar"/>
      <div :class="['container2',{withoutSidebar:!reqSidebar||!showSidebar,mediumScr:$store.state.layouts.mediumScr}]">
        <div v-if="!$store.state.layouts.isProfileMounted" class="" style="opacity: 0;display: flex;flex-direction: column;flex: 1;position: relative;background: #ededed;background-clip: border-box;border-radius: 20px;margin-top: 50px;">
          <div class="" style="padding: 24px;display: flex;flex-direction: column;flex-shrink: 0;position: relative;">
            <div class="" style="height: 500px;"></div>
          </div>
        </div>
        <Nuxt/>

        <MenuDrawer :openedSidebar="openedSidebar" :onClose="onCloseSidebar"/>
        <Sidebar v-if="reqSidebar&showSidebar"/>
        <div v-if="openedSidebar" @click="onCloseSidebar" class="darkFilter sidebar"></div>

      </div>
    </div>
    <div v-if="toastMessages.freeIndx" class="toastBox">
      <toast v-if="indx !== 'freeIndx'" v-for="(eToast,indx) in toastMessages" :eToast="eToast" :key="indx"/>
    </div>
    <ModalPro :forAvatar="true" v-if="modalAvatar" @close="modalAvatar = false"/>
    <ModalPro :forLevel="curLevel" v-if="modalComplete" @close="modalComplete = false" :onGotoKyc="goToKyc"/>
    <ModalPro :forKycNeed="true" v-if="modalKycNeed" @close="modalKycNeed = false"/>
    <ModalPro :forError="true" v-if="modalError" @close="modalError = false"/>
    <ModalPro :forNotif="true" v-if="modalNotif" @close="modalNotif = false" :moreData="moreData"/>
  </div>
</template>

<script>
import toast from "~/components/toast.vue";
import Icon from "@/components/global/Icon/icon.vue";
import ConfirmModal from "@/components/modals/confirmModal.vue";
import {EventBus} from "@/plugins/event-bus";
import PermissionMixin from "@/mixins/PermissionMixin";
import ModalPro from "@/components/modals/ModalPro.vue";
import LevelMixin, {indxLevel} from "@/mixins/LevelMixin";
import Sidebar from "@/components/SidebarCo.vue";
import MenuDrawer from "@/components/MenuDrawerCo.vue";
import {$zplUi} from "@/plugins/zplUi";

export default {
  name: "default",
  components: {MenuDrawer, Sidebar, ModalPro, Icon, toast,ConfirmModal},
  data() {
    return {
      notFound: false,
      subPage: false,
      openedSidebar: false,
      showSidebar: true,
      reqSidebar: true,
      menuItems:[
        {
          name:'profile',
          title:'پروفایل',
          icon:'Mail',
        },
      ],
      modalAvatar: false,
      modalComplete: false,
      modalKycNeed: false,
      modalError: false,
      modalNotif: false,
      moreData: {
        mainTitle:'',
        descHtml(){
          return  ''
        },
        btnInf:[]
      },
    };
  },
  async created() {
    EventBus.$on('openModalPro', this.openModalPro);
    EventBus.$on('layoutCommands', this.layoutCommands);
    this.chkReloadPg();
  },
  mounted() {
    this.$zplUi.mounted()
    if(this.$zplUi.screenSize.max440){
      this.toggleSidebar(false)
    }
  },
  beforeDestroy() {
    this.$zplUi.beforeDestroy();
    EventBus.$off("openModalPro",this.openModalPro);
  },
  computed: {
    toastMessages() {
      return this.$store.state.application.toastMessage;
    },
    me() {
      return this.$store.state.application.userInfo;
    },
    portal() {
      return this.$store.state.application.portal;
    },
    switchList() {
      return this.$store.state.application.switchList;
    },
    loading() {
      return this.$store.state.application.loading;
    },
    urlPath() {
      return this.$route.path;
    },
  },
  methods: {
    async chkReloadPg(){
      this.chkSidebar();
    },
    openModalPro(type,moreData){
      if($zpl.isTest().__No_modal__){
        return
      }
      switch (type){
        case 'modalComplete':
          this.modalComplete = true;
          break;
        case 'modalAvatar':
          this.modalAvatar = true;
          break;
        case 'modalKyc':
          this.modalKycNeed = true;
          break;
        case 'modalError':
          this.modalError = true;
          break;
        case 'modalNotif':
          this.moreData = moreData;
          this.modalNotif = true;
          break;
      }
    },
    layoutCommands(commands){
      if(commands.noSidebar){
        this.showSidebar = false;
      }
    },
    toggleSidebar(stat){
      this.showSidebar = stat
      this.$nextTick(()=>{
        EventBus.$emit("toggleSidebar",stat);
      })
    },
    chkSidebar(){
      this.$store.dispatch('layouts/setMediumScr', true);
      this.reqSidebar = true;
      this.subPage = false;

      const $route = this.$route;
      if($route.name === 'form-personal___fa'
        || $route.name === 'form-tracking___fa'
        || $route.name === 'verify-email___fa'
        || $route.name === 'form-legal___fa'
        || $route.name === 'manual-kyc___fa'
      ){

        if($route.name === 'form-legal___fa' || $route.name === 'manual-kyc___fa'){

        }
        else{
          this.subPage = true;
        }
        this.reqSidebar = false;
      }

      this.notFound = !$route.name;
    },
    onOpenedSidebar(){
      this.openedSidebar = true;
    },
    onCloseSidebar(){
      this.openedSidebar = false;
    },
  },
  watch:{
    '$nuxt.$loading': {
      handler(val) {

      },
      immediate: true
    },
    '$route.query'(val){
      this.chkReloadPg();
    }
  },
  mixins:[PermissionMixin,LevelMixin],
};
</script>
