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
            <img :src="gravatar" class="iconGravatar">
          </div>
          <div class="tempFocusBox" v-if="showMenu1">
            <div class="div1 divA1" @click="onCloseMenu"></div>
            <div class="div2 drop-down-profile">
              <div class="divA2-1">
                <div class="sub-menu pointer" @click="goingToLogout">
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
        <div class="flex items-center">
          <a class="notifIcon" :href="notifUrl" target="_blank">
            <svg v-if="hasNotif" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 17.2222H5C3.895 17.2222 3 16.3769 3 15.3333V5.88889C3 4.84528 3.895 4 5 4H19C20.105 4 21 4.84528 21 5.88889V15.3333C21 16.3769 20.105 17.2222 19 17.2222H12.875L8.665 20.7592C8.02 21.3013 7 20.8687 7 20.0537V17.2222Z" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 8.5H17" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 12.5H14" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 17.2222H5C3.895 17.2222 3 16.3769 3 15.3333V5.88889C3 4.84528 3.895 4 5 4H19C20.105 4 21 4.84528 21 5.88889V15.3333C21 16.3769 20.105 17.2222 19 17.2222H12.875L8.665 20.7592C8.02 21.3013 7 20.8687 7 20.0537V17.2222Z" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7 8.5H17" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7 12.5H14" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </a>
          <div :class="['services-action',{didFocused:showMenu2}]" @mousedown="(e)=>{$zpl.prevEvery(e)}" @dblclick="(e)=>{$zpl.prevEvery(e)}" @click="onMenu2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5.5" cy="5.5" r="1.5" fill="#393946"/>
              <circle cx="12" cy="5.5" r="1.5" fill="#393946"/>
              <circle cx="18.5" cy="5.5" r="1.5" fill="#393946"/>
              <circle cx="5.5" cy="12" r="1.5" fill="#393946"/>
              <circle cx="12" cy="12" r="1.5" fill="#393946"/>
              <circle cx="18.5" cy="12" r="1.5" fill="#393946"/>
              <circle cx="5.5" cy="18.5" r="1.5" fill="#393946"/>
              <circle cx="12" cy="18.5" r="1.5" fill="#393946"/>
              <circle cx="18.5" cy="18.5" r="1.5" fill="#393946"/>
            </svg>
            <div class="tempFocusBox cube" v-if="showMenu2">
              <div class="div1" @click="onCloseCube"></div>
              <div class="div2">
                <div ref="gridBoxRef" class="div2-1"  @click="(e)=>{$zpl.prevUp(e)}">
                  <div class="services">
                    <div class="header">
                      <div class="title">خدمات زرین‌پال</div>
                    </div>
                    <div class="services-container">
                      <div class="row">
                        <a href="https://www.zarincrowd.com/" class="service-item" target="_blank">
                          <img class="service-logos" src="@/assets/imgs/services/service-logos0.svg" />
                          <div class="name">زرین‌کراد</div>
                        </a>
                        <a href="https://www.zarinpal.com/" class="service-item" target="_blank">
                          <img class="service-logos2" src="@/assets/imgs/services/service-logos1.svg" />
                          <div class="name">زرین‌پال</div>
                        </a>
                        <a href="/profile" class="service-item" target="_blank">
                          <div class="avatar">
                            <img class="image" :src="gravatar" />
                          </div>
                          <div class="name">کانکت</div>
                        </a>
                      </div>
                      <div class="row">
                        <a href="https://www.zarinbit.com/" class="service-item" target="_blank">
                          <img class="service-logos3" src="@/assets/imgs/services/service-logos2.svg" />
                          <div class="name">زرین‌بیت</div>
                        </a>
                        <a href="https://www.zarinplus.com/" class="service-item" target="_blank">
                          <img class="service-logos4" src="@/assets/imgs/services/service-logos3.svg" />
                          <div class="name">زرین‌پلاس</div>
                        </a>
                        <a href="https://neozarin.com/" class="service-item" target="_blank">
                          <img class="service-logos5" src="@/assets/imgs/services/service-logos4.svg" />
                          <div class="name">نئوزرین</div>
                        </a>
                      </div>
                      <div class="row">
                        <a href="https://www.zarindax.com/" class="service-item" target="_blank">
                          <img class="service-logos6" src="@/assets/imgs/services/service-logos5.svg" />
                          <div class="name">زرین‌دکس</div>
                        </a>
                        <a href="https://www.zarinexpress.com/" class="service-item" target="_blank">
                          <img class="service-logos7" src="@/assets/imgs/services/service-logos6.svg" />
                          <div class="name">زرین‌اکسپرس</div>
                        </a>
                        <a href="https://www.zarinlend.ir/" class="service-item" target="_blank">
                          <img class="service-logos8" src="@/assets/imgs/services/service-logos7.svg" />
                          <div class="name">زرین‌لند</div>
                        </a>
                      </div>
                      <div class="row">
                        <a href="https://www.donito.me/" class="service-item" target="_blank">
                          <img class="service-logos9" src="@/assets/imgs/services/service-logos8.svg" />
                          <div class="name">دونیتو</div>
                        </a>
                        <a href="https://ztech.ir/" class="service-item" target="_blank">
                          <img class="service-logos10" src="@/assets/imgs/services/service-logos9.svg" />
                          <div class="name">زی‌تک</div>
                        </a>
                        <a href="https://www.academyzarin.com/" class="service-item" target="_blank">
                          <img class="service-logos11" src="@/assets/imgs/services/service-logos10.svg" />
                          <div class="name">آکادمی‌زرین</div>
                        </a>
                      </div>
                    </div>
                    <div class="more-link">
                      <a href="https://www.zarinpal.com/docs/" target="_blank" class="nav-link-item">
                        <div class="lebel">مستندات فنی زرین‌پال</div>
                        <div class="code-block">
                          <img class="group" src="@/assets/imgs/services/group0.svg" />
                        </div>
                      </a>
                      <a href="https://www.zarinpal.com/aboutus.html" target="_blank" class="nav-link-item">
                        <div class="lebel">درباره زرین‌پال</div>
                        <div class="information-square">
                          <img class="group2" src="@/assets/imgs/services/group1.svg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="service-badge">
          <img
            class="connect-logo"
            src="@/assets/imgs/connect-logo.svg"
          />
        </div>
      </div>
      <div class="right">
        <div class="zarin-pal-logo">
          <div class="zarin-pal-logo2">
            <img
              class="zarin-pal-convert-type-farsi"
              src="@/assets/imgs/autohtml-all1/zarin-pal-convert-type-farsi0.svg"
            />
          </div>
          <div class="zarin-pal-logo3">
            <img
              class="zarin-pal-convert-colorful"
              src="@/assets/imgs/autohtml-all1/zarin-pal-convert-colorful0.svg"
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
              می‌توانید به پنل کاربری زرین‌پال بازگردید.
            </div>
          </div>
          <ButtonSimple
            :onClkBtn="()=>{}" ButtonSimple
            isLoader="1"
            val-btn="بازگشت به پنل کاربری زرین‌پال"
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
    notifUrl(){
      return $zpl.infAdr().panelZplBeta+'/panel/ticket'
    }
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
    goToLogout(){
      let url = ''
      url = $zpl.infAdr().rootAuth+'/logout';
      $zpl.redirectUrl(url)
    }
  },
  watch:{

  },
  mixins:[],
  components: {ButtonSimple},
};
</script>
