<template>
  <div class="top-bar">
    <div class="container">
      <div class="left">
        <div :class="['profile-action',{didFocused:showMenu1}]" @click="onMenu1">
          <div class="angle-down">
            <img class="group" src="@/assets/imgs/autohtml-all1/group0.svg" />
          </div>
          <div class="avatar">
            <div class="profile-fill">
              <img class="group2" src="@/assets/imgs/autohtml-all1/group1.svg" />
            </div>
            <img v-if="isLogedin&&gravatar" :src="gravatar" class="iconGravatar">
            <img v-else src="@/assets/imgs/autohtml-all1/group1.svg" class="iconGravatar">
          </div>
          <div class="tempFocusBox" v-if="showMenu1">
            <div class="div1 divA1" @click="onCloseMenu"></div>
            <div class="div2 drop-down-profile">
              <div class="divA2-1">
                <div class="sub-menu pointer" @click="goingToEvents">
                  <a class="logout">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 15.236V18C22 18.552 21.552 19 21 19H3C2.448 19 2 18.552 2 18V15.236C2 15.091 2.082 14.959 2.211 14.894V14.894C3.308 14.346 4 13.226 4 12V12C4 10.774 3.307 9.654 2.211 9.106V9.106C2.082 9.041 2 8.909 2 8.764V6C2 5.448 2.448 5 3 5H21C21.552 5 22 5.448 22 6V8.764C22 8.909 21.918 9.041 21.789 9.106L21.745 9.129C20.673 9.685 20 10.792 20 12V12C20 13.225 20.692 14.346 21.788 14.894H21.789C21.918 14.959 22 15.091 22 15.236Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M10 18L10 6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="1.5 3"></path>
                    </svg>
                    <span class="logout">َشرکت در دورهمی</span>
                  </a>
                </div>
                <div v-if="isLogedin" class="sub-menu pointer" @click="goingToProfile">
                  <a class="logout">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" class="inline-block"><path d="M16.6666 16.6667V16.0417C16.6666 14.0857 15.0809 12.5 13.1249 12.5H6.87492C4.91891 12.5 3.33325 14.0857 3.33325 16.0417V16.6667" stroke="#000" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path> <ellipse cx="10.0001" cy="5.83333" rx="3.33333" ry="3.33333" stroke="#000" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></ellipse></svg>
                    <span class="logout">پنل کاربری</span>
                  </a>
                </div>
                <div v-if="isLogedin" class="sub-menu pointer" @click="goingToLogout">
                  <a class="logout">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.875 9.99992H17.1437" stroke="#0A33FF" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
                      <path d="M15.1343 13.75L17.3742 10.4221C17.4562 10.2966 17.4999 10.1499 17.4999 10C17.4999 9.85008 17.4562 9.70341 17.3742 9.57792L15.1343 6.25" stroke="#0A33FF" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
                      <path d="M11.25 13.75V15C11.25 15.4973 11.0525 15.9742 10.7008 16.3258C10.3492 16.6775 9.87228 16.875 9.375 16.875H4.375C3.87772 16.875 3.40081 16.6775 3.04917 16.3258C2.69754 15.9742 2.5 15.4973 2.5 15V5C2.5 4.50272 2.69754 4.02581 3.04917 3.67417C3.40081 3.32254 3.87772 3.125 4.375 3.125H9.375C9.87228 3.125 10.3492 3.32254 10.7008 3.67417C11.0525 4.02581 11.25 4.50272 11.25 5V6.25" stroke="#0A33FF" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg>
                    <span class="logout">خروج</span>
                  </a>
                </div>
                <div class="sub-menu">
                  <div class="version">
                    <span>نسخه 1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="insight-clinic-logo" @click="goIndex">
          <div class="bitTitle">کلینیک اینسایت</div>
          <div class="insight-clinic-logo3">
            <img
              class="clinic"
              src="@/assets/imgs/autohtml-all1/clinicInsight-logo-black.svg"
            />
          </div>
        </div>
        <div class="MenuAction" @click="onClkMenu">
         <img
           class="menuburger"
           src="@/assets/imgs/svg/menu_burger.svg"
         />
        </div>
      </div>
    </div>
    <div class="topBanner banner hidden">
      <div class="inline-message">
        <div class="frame-12582">
          <div class="interface-essential-watch-clock-time">
            <img class="group" src="@/assets/imgs/svg/loadingTopBanner.svg" />
          </div>
        </div>
        <div class="frame-12581">
          <div class="frame-12580">
            <div class="title">
              <div class="title2">
                شما مراحل ارتقا سطح احراز هویت را طی کرده‌اید.
              </div>
            </div>
            <div class="body">
              نتیجه ارتقا سطح پس از بررسی به شما اطلاع‌رسانی خواهد شد. اکنون
              می‌توانید به پنل کاربری اینسایت بازگردید.
            </div>
          </div>
          <ButtonSimple
            :onClkBtn="()=>{}" ButtonSimple
            isLoader="1"
            val-btn="بازگشت به پنل کاربری اینسایت"
            type="primary"
          />
          <ButtonSimple
            :onClkBtn="()=>{}" ButtonSimple
            isLoader="1"
            val-btn="متوجه شدم"
            type="surface"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {lg} from "@/src/js/dbg";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import UserMixin from "@/mixins/UserMixin";

export default {
  name: "TopBar",
  props:{
    onClkMenu:{
      type: Function,
    }
  },
  data() {
    return {
      showMenu1:false,
      showMenu2:false,
      hasNotif:false,
      gravatar:'',
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
  computed: {

  },
  methods: {
    onMenu1(){
      this.showMenu1 = !this.showMenu1;
    },
    onMenu2(){
      this.showMenu2 = !this.showMenu2;
      if(this.showMenu2){
        this.$nextTick(()=>{
          const screen = this.$zplUi.getViewport(),
            gridBoxRefE = this.$refs.gridBoxRef;
          const gridBoxLeft = this.$zplUi.getStyles(gridBoxRefE,'left');
          const gridBoxOff = this.$zplUi.getOffSet(gridBoxRefE);
          if(screen.width < gridBoxOff.left_width){
            gridBoxRefE.style.left = gridBoxLeft.split('px')[0] - (gridBoxOff.left_width - screen.width) - 8 + 'px'
          }
        })
      }
    },
    onCloseMenu(e){
      $zpl.prevEvery(e);
      this.showMenu1=false
    },
    onCloseCube(e){
      $zpl.prevEvery(e);
      this.showMenu2=false
    },
    goingToLogout(){
      this.goToLogout();
    },
    goingToProfile(){
      this.$router.replace({path:`/profile/`});
    },
    goingToEvents(){
      this.$router.replace({path:`/events/`});
    },
    goToLogout(){
      $zpl.setStorage('AuthorizationKey','')
      let url = ''
      url = $zpl.infAdr().rootAdr+'/';
      $zpl.redirectUrl(url)
    },
    goIndex(){
      this.$router.replace({path:`/`});
    },
  },
  mixins:[UserMixin],
  components: {ButtonSimple},
};
</script>
