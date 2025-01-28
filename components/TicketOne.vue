<template>
  <div class="list listTrans">
    <div class="list-itemA">
      <div class="stack2">
        <div class="TicketOut">
          <div class="headerT">
            <div class="titleT">تیکت دورهمی اینسایت</div>
            <div class="seat-number">{{ `شماره صندلی: ${tickChairNum()}` }}</div>
          </div>

          <div class="contentT">
            <div class="columnT">
              <div class="rowT">
                <span class="labelT">نوع:</span>
                <span class="valueT">{{tickType()}}</span>
              </div>
              <div class="rowT">
                <span class="labelT">نام و نام خانوادگی:</span>
                <span class="valueT">{{tickNamFamil()}}</span>
              </div>
              <div class="rowT">
                <span class="labelT">شماره تیکت:</span>
                <span class="valueT">{{tickTicketNum()}}</span>
              </div>
            </div>
            <div class="columnT">
              <div class="rowT">
                <span class="labelT">کد رهگیری:</span>
                <span class="valueT">{{tickRahgiri()}}</span>
              </div>
              <div class="rowT">
                <span class="labelT">تاریخ ثبت:</span>
                <span class="valueT">{{tickDate()}}</span>
              </div>
              <div class="rowT">
                <span class="labelT">مبلغ:</span>
                <span class="valueT">{{tickPrice()}}</span>
              </div>
            </div>
          </div>

          <div class="footerT">
            <p><span class="labelT">تاریخ برگزاری دورهمی: </span> ۱۵ بهمن</p>
            <p><span class="labelT">آدرس: </span> تهران، اتوبان شهید همت(غرب)، اتوبان شهید خرازی، ایران‌مال، طبقه G3، نبش کتابخانه، مجموعه فود پلازا، میدان اصلی</p>
            <p><span class="labelT">ساعت: </span>20 تا 23</p>
            <p class="addiNote">با توجه به بزرگی فضای ایران‌مال و فاصله پارکینگ تا محل برگزاری، لطفاً حداقل نیم ساعت زودتر بیاین تا به‌موقع برسین. برنامه رأس ساعت ۲۰ شروع می‌شه و از ساعت ۱۹:۳۰ منتظر حضورتون هستیم. ممنون که همراهمون هستید.</p>
            <p class="addiNote">شماره تماس پشتیبانی: ۰۹۳۵۶۲۹۸۳۶۶</p>
          </div>
          <div v-if="false" class="actions">
            <div class="contained-button2"><div class="label2">مشاهده جزئیات</div></div>
            <div class="link"><div class="label">پیگیری این تراکنش</div></div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "TicketOne",
  props:{
    prop1:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {

    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
  },
  beforeDestroy() {

  },
  computed: {
    tickChairNum(){
      const inf = this.$store.state.application.eventTickets
      const info = JSON.parse(inf[0]['info']);
      return info['ticketNo']
    },
    tickType(){
      const inf = this.$store.state.application.eventTickets
      return inf[0]['type']
    },
    tickNamFamil(){
      return this.nameFamily
    },
    tickTicketNum(){
      const inf = this.$store.state.application.eventTickets
      const info = JSON.parse(inf[0]['info']);
      return info['ticketNo']
    },
    tickRahgiri(){
      const inf = this.$store.state.application.eventTickets
      return inf[0]['ref']
    },
    tickDate(){
      const inf = this.$store.state.application.eventTickets
      return inf[0]['order_at']
    },
    tickPrice(){
      const inf = this.$store.state.application.eventTickets
      return inf[0]['price']+'تومان'
    },
  },
  methods: {

  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
