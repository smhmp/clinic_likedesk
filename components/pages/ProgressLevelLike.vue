<template>
  <div :class="['cardBox',{loading:loadingGoPay}]">
    <div class="conStars">
      <img class="vector" src="@/assets/imgs/autohtml-all1/vector0.svg" />
    </div>
    <div ref="levelProgressRef" :class="['level-progress',{loading,loadData}]">
      <div v-if="endEvent||iEndEvent" class="eventEnd">
        <div class="message">
          <p>از اینکه برای <span class="highlight">رشد خودتون</span> وقت می‌گذارید، خیلی خوشحالیم!</p>

          <p>این ایونت <span class="highlight">15 بهمن ماه </span> <span class="highlightRed">ظرفیتش تکمیل شد</span>  ولی قطعا در آینده نزدیک در کنار شما خواهیم بود.</p>

          <p>از همراهی شما سپاسگزاریم و امیدواریم در ایونت‌های آینده میزبان خوبی برای حضور ارزشمند شما باشیم.</p>

          <p class="footer">در کنار شماییم، با آرزوی بهترین‌ها🌱</p>
        </div>
      </div>
      <RadioCard v-else-if="$store.state.application.capacityTickets" noResponsive="1" ref="radioCardRef" inpName="legalType" :infos="RadioInfo"
                 :onChked="clkRadioLegal"
      />
    </div>
    <div v-if="!endEvent||iEndEvent" class="cardTitle">
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
          <div class="caption3">{{descTicket}}</div>
        </div>
      </div>
      <div class="action">
        <ButtonSimple
          :onClkBtn="goToPay" ButtonSimple
          isLoader="1"
          :val-btn="`رزرو تیکت ${this.nextTicket}`"
          :type="'secondary'"
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
import {$zpl} from "@/plugins/zpl";
import UserMixin from "@/mixins/UserMixin";



export default {
  name: "ProgressLevelLike",
  props:{
    stateLevel:'',
    endEvent:false,
  },
  data() {
    return {
      broking:false,
      loading:false,
      prgLevel: '',
      neerGold:false,
      loadingGoPay:false,
      isFocused:true,
      repoPrgLvl:null,
      nextLevel:'',
      curLevelFa:'',
      nextLevelFa:'',
      nextTicket:'',
      ticketType:'',
      descTicket:'',
      iEndEvent:false,
    };
  },
  created() {

  },
  updated() {

  },
  mounted() {
    this.broking = false;
    // this.apiChkLevel();
    const levelProgressRef = this.$refs.levelProgressRef;
    this.clkRadioLegal('asVIP');
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
    RadioInfo(){
      const isNormal = this.isCountTicket('normal');
      const isVip = this.isCountTicket('vip');
      const isCip = this.isCountTicket('cip');
      if(!isNormal&&!isVip&&!isCip){
        this.iEndEvent = true;
        return [];
      }
      return [
        {label:isNormal&&'تیکت معمولی', uniqKey:'asNormal',guidance:'قیمت: 800,000 تومان',svgIcon:'radio/ticket.svg'},
        {defChecked:true,label:isVip&&'تیکت VIP', uniqKey:'asVIP',guidance:'قیمت: 1000,000 تومان',svgIcon:'radio/ticket.svg'},
        {label:isCip&&'تیکت CIP', uniqKey:'asCIP',guidance:'قیمت: 1,200,000 تومان',svgIcon:'radio/ticket.svg'},
        {label:''},
      ]
    }
  },
  methods: {
    goToPay(e,{calbDone}){
      EventBus.$emit("openModalPro", 'modalNotif',{
        mainTitle:'جهت خرید لطفا با بخش پشتیبان ارتباط بگیرید',
        descHtml(){
          return  'برای خرید با بخش پشتیبانی در واتساپ یا تلگرام ارتباط باشید.'
        },
        btnInf:[
          {
            title:'ارتباط با واتساپ',
            doClick(vm){
              $zpl.openLink('https://wa.me/qr/CTCOMKQ2KNDKO1','_blank')
            },
            type:'primary'
          },
          {
            title:'متوجه شدم',
            doClose:true,
            type:'new'
          }
        ]
      });


      /*const vm = this;
      vm.loadingGoPay = true;
      $zpl.zplConnectPrj_v2.reqDirect({
        baseUrl:'https://reservation-api.insight-clinic.com/api/event/payment/request',
        args:{
          ticket_type:this.ticketType
        },
      }).then(async (respObj)=>{
        if(calbDone)calbDone();
        const resp = respObj.getResp();
        if(resp){
          $zpl.redirectUrl(resp.data['payment_url'])
        }
      })
      .catch((respObj)=>{
        /!**
         * @var respObj
         * @type RespObj
         *!/
        vm.loadingGoPay = false;
        const msg = respObj.getErrMsg();
        if(msg){
          $zpl.toastError(msg);
        }
        else{
          $zpl.toastError('خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.');
        }
      })*/
    },
    clkRadioLegal(uniqKey){
      if(uniqKey === 'asNormal'){
        this.ticketType = 'normal';
        this.nextTicket = 'معمولی';
        this.descTicket = 'جایگاه شما در سالن شماره 2 هست و از طریق ویدیو پروژکتور برنامه رو دنبال می‌کنید، اما برای شبکه‌سازی همه در کنار هم هستیم.';
      }
      else if(uniqKey === 'asVIP'){
        this.ticketType = 'vip';
        this.nextTicket = 'VIP';
        this.descTicket = 'شما در چند ردیف بعد از ردیف‌های ابتدایی قرار دارید و دید خوبی به برنامه خواهید داشت.';
      }
      else if(uniqKey === 'asCIP'){
        this.ticketType = 'cip';
        this.nextTicket = 'CIP';
        this.descTicket = 'جایگاه شما در ردیف‌های ابتدایی و نزدیک‌ترین نقطه به برنامه خواهد بود.';
      }
    },

  },
  watch:{
    'curLevel'(val){

    }
  },
  mixins:[LevelMixin,StatMixin,UserMixin],
  components: {ButtonSimple, TooltipPro},
};
</script>
