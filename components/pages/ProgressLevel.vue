<template>
  <div :class="['level-progress',{loading,loadData}]">
    <div class="conStars">
      <img class="vector" src="@/assets/imgs/autohtml-all1/vector0.svg" />
    </div>
    <div :class="['progressSection',{toNew:prgLevel==='NEW',toBlue:prgLevel==='BLUE'||prgLevel==='BASIC',toSilver:prgLevel==='SILVER',toGold:prgLevel==='GOLD'}]">
      <div :class="['badge-profile-avtive',{happy:neerGold&&prgLevel!=='GOLD',veryHappy:prgLevel==='GOLD'}]">
        <img v-if="prgLevel==='NEW'" class="logoLevel" src="@/assets/imgs/progress/new.svg" />
        <img v-else-if="prgLevel==='BLUE'||prgLevel==='BASIC'" class="logoLevel" src="@/assets/imgs/progress/blue.svg" />
        <img v-else-if="prgLevel==='SILVER'" class="logoLevel" src="@/assets/imgs/progress/silver.svg" />
        <img v-else-if="prgLevel==='GOLD'" class="logoLevel" src="@/assets/imgs/progress/gold.svg" />
      </div>
      <div class="card2">
        <div class="heading2">
          <div class="full-name">
                  <span>
                    <span class="full-name-span">سطح احراز هویت:</span>
                    <span class="full-name-span2">{{this.curLevelFa}}</span>
                  </span>
          </div>
          <div class="caption2">
                  <span>
                    <span class="caption-2-span">سطح بعدی:</span>
                    <span class="caption-2-span2">{{ this.nextLevelFa }}</span>
                    <TooltipPro
                                center
                                myWidth="290px"
                                myLeft="36px"
                                guidance="جهت ارتقا به سطح طلایی، لازم است به صورت حضوری
به دفتر زرین‌پال مراجعه کنید. با تکمیل فرم‌ و امضا
مدارک مورد نیاز، سطح شما به طلایی ارتقا می‌یابد و از
امکانات ویژه آن بهره‌مند خواهید شد."
                    />
                  </span>
          </div>
        </div>
        <div class="lineProgresSection">

        </div>
      </div>
    </div>
    <div v-if="curLevel!=='SILVER'&&curLevel!=='GOLD'" class="action">
      <ButtonSimple
        v-if="isBtnNextLvl"
        :onClkBtn="goToPage" ButtonSimple
        isLoader="1"
        :val-btn="`ارتقا به سطح ${this.nextLevelFa}`"
        :type="curLevel==='NEW'?'new':'primary'"
        isArrowLeft="1"
      />
      <div class="caption3">{{captionTxt}}</div>
    </div>
  </div>
</template>
<script>
import {EventBus} from "@/plugins/event-bus";
import TooltipPro from "@/components/form/TooltipPro.vue";
import LevelMixin, {faLevel, indxLevel, sortLevel} from "@/mixins/LevelMixin";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import {$zplUi} from "@/plugins/zplUi";
import {lg} from "@/src/js/dbg";
import StatMixin from "@/mixins/StatMixin";



export default {
  name: "ProgressLevel",
  props:{
    stateLevel:'',
  },
  data() {
    return {
      broking:false,
      loading:false,
      prgLevel: '',
      neerGold:false,
      isFocused:true,
      repoPrgLvl:null,
      nextLevel:'',
      curLevelFa:'',
      nextLevelFa:'',
    };
  },
  created() {
    this.onSenseLevel();
    window.addEventListener('focus',this.onfocusWin)
    window.addEventListener('blur',this.onblurWin);
  },
  updated() {
    this.readyLevelFa();
  },
  mounted() {
    this.broking = false;
    this.readyLevelFa();
    this.apiChkLevel();
  },
  beforeDestroy() {
    window.removeEventListener('focus',this.onfocusWin)
    window.removeEventListener('blur',this.onblurWin)
  },
  computed: {
    captionTxt(){
      switch (this.curLevel){
        case 'NEW':
          if(this.statAct('personal') === 'PROCESSING'){
            return 'نتیجه ارتقا سطح به آبی، پس از بررسی به اطلاع شما خواهد رسید.'
          }
          return 'با تکمیل مشخصات فردی سطح شما به آبی ارتقا خواهد یافت.'
        case 'BLUE':case 'BASIC':
          if(this.statAct('kyc') === 'PROCESSING'){
            return 'نتیجه ارتقا سطح به نقره‌ای، پس از بررسی به اطلاع شما خواهد رسید.'
          }
          return 'با انجام احراز هویت سطح شما به نقره‌ای ارتقا می‌یابد.'
      }
    },
    isBtnNextLvl(){
      return this.statAct('personal') !== 'PROCESSING' && this.statAct('kyc') !== 'PROCESSING'
    }
  },
  methods: {

    setPrgLvl(){
      const {curr,bef,aft} = this.repoPrgLvl;
      this.repoPrgLvl = null;
      const vm = this;
      if(curr){
        this.prgLevel = curr;
        window.setTimeout(()=>{
          vm.broking = true;
          if(this.isNeerGold(curr)){
            window.setTimeout(()=>{
              vm.neerGold = true;
            },500);
          }
        },300);
      }
      else{
        this.prgLevel = bef;
        window.setTimeout(()=>{
          vm.prgLevel = aft;
          window.setTimeout(()=>{
            vm.broking = true;
            if(this.isNeerGold(aft)){
              window.setTimeout(()=>{
                vm.neerGold = true;
              },500);
            }
          })
        },1000)
      }
    },
    onfocusWin(){
      this.isFocused = true;
      if(this.repoPrgLvl){
        this.setPrgLvl();
      }
    },
    onblurWin(){
      this.isFocused = false;
    },
    chgLevel({curr,bef,aft}){
      this.repoPrgLvl = {curr,bef,aft};
      if(this.isFocused){
        this.setPrgLvl();
      }
    },
    goToPage(e,{calbDone}){
      const vm = this;
      this.loading = true;
      this.$nextTick(()=>{
        const next_level_step = this.$store.state.application.userInfo.next_level_step;
        switch (next_level_step){
          case  '/profile/personal':
            this.$router.push({path:'/form-personal/'});
            break
          case 'https://kyc.zarinpal.com':
            this.goToKyc(e,{
              calbDone:()=>{
                vm.loading = false;
                calbDone && calbDone();
              }
            });
            break
        }
      })
    },
    readyLevelFa(){
      this.curLevelFa  = faLevel[this.curLevel];
      if(this.nextLevel){
        this.nextLevelFa = faLevel[this.nextLevel];
      }
      else{
        this.nextLevelFa = 'شما دارای بالاترین سطح هستید.';
      }
    },
    readyNextLevel(){
      const curIndx = this.getIndxLevel(this.curLevel);
      this.nextLevel = sortLevel[curIndx+1] && sortLevel[curIndx+1]()
    },
    onSenseLevel(){
      this.readyNextLevel();
      this.readyLevelFa();
    },
  },
  watch:{
    'curLevel'(val){
      this.onSenseLevel();
    }
  },
  mixins:[LevelMixin,StatMixin],
  components: {ButtonSimple, TooltipPro},
};
</script>
