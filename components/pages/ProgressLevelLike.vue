<template>
  <div class="cardBox">
    <div class="conStars">
      <img class="vector" src="@/assets/imgs/autohtml-all1/vector0.svg" />
    </div>
    <div ref="levelProgressRef" :class="['level-progress',{loading,loadData}]">
      <RadioCard noResponsive="1" ref="radioCardRef" v-if="true" inpName="legalType" :infos="[
          {label:'تیکت معمولی', uniqKey:'asNormal',guidance:'قیمت: 800,000 تومان',svgIcon:'radio/ticket.svg'},
          {defChecked:true,label:'تیکت VIP', uniqKey:'asVIP',guidance:'قیمت: 1000,000 تومان',svgIcon:'radio/ticket.svg'},
          {label:'تیکت CIP', uniqKey:'asCIP',guidance:'قیمت: 1200,000 تومان',svgIcon:'radio/ticket.svg'},
          {label:''},
        ]"
                 :onChked="clkRadioLegal"
      />
    </div>
    <div class="cardTitle">
      <div :class="['progressSection']">
        <div class="card2">
          <div class="heading2 hidden">
            <div class="caption2">
                  <span>
                    <span class="full-name-span">{{` تیکت ${this.nextTicket}: `}}</span>
                    <TooltipPro
                      center
                      myWidth="290px"
                      myLeft="36px"
                      guidance="جهت شرکت در دورهمی حضوری نیاز هست که یکی از این تیکت ها را خریداری نمایید."
                    />
                  </span>
            </div>
          </div>
          <div class="caption3">{{captionTxt}}</div>
        </div>
      </div>
      <div class="action">
        <ButtonSimple
          :onClkBtn="goToPay" ButtonSimple
          isLoader="1"
          :val-btn="`خرید تیکت ${this.nextTicket}`"
          :type="'new'"
        />
      </div>
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
  name: "ProgressLevelLike",
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
      nextTicket:'VIP',
    };
  },
  created() {

  },
  updated() {

  },
  mounted() {
    this.broking = false;
    this.apiChkLevel();
    const levelProgressRef = this.$refs.levelProgressRef;
    window.setTimeout(()=>{
      /*this.$zplUi.animateMove({untilNum:-1 * levelProgressRef.offsetWidth,token:{callEndOccured:true}},({count=-1,token})=>{
        if(token.endOccured){
          this.$zplUi.animateMove({untilNum:Math.round(levelProgressRef.scrollLeft/2)},({count=1,untilNum,token})=>{
            const res = levelProgressRef.scrollLeft+count
            levelProgressRef.scrollTo(res,0)
            if(res > untilNum){
              token.isDone=true
            }
            return count+1
          })
        }
        else{
          levelProgressRef.scrollTo(count,0)
          return count-3
        }
      })*/
    },1000)
  },
  beforeDestroy() {

  },
  computed: {
    captionTxt(){
      return 'با خرید این تیکت شما عضو افتخاری ما خواهید بود'
    },
  },
  methods: {
    goToPay(){},
    clkRadioLegal(uniqKey){
      if(uniqKey === 'asNormal'){
        this.nextTicket = 'معمولی';
      }
      else if(uniqKey === 'asVIP'){
        this.nextTicket = 'VIP';
      }
      else if(uniqKey === 'asCIP'){
        this.nextTicket = 'CIP';
      }
    },

  },
  watch:{
    'curLevel'(val){

    }
  },
  mixins:[LevelMixin,StatMixin],
  components: {ButtonSimple, TooltipPro},
};
</script>
