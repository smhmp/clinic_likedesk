<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده تیکت ها و فعالیتهای ثبت شده" title="تیکت‌های من" backPath="/profile/"/>
    <div class="ActInline card">
      <div class="page-actions" v-if="!tempDisable">
        <div class="action">
          <div class="fluent-emoji-credit-card">
            <div class="warning2">
              <img class="group5" :src="`/svgs/events/${iconExistCard}`" />
            </div>
          </div>
          <div class="stack">
            <div class="label">رویدادها</div>
            <div class="value">{{countEvents}} رویداد در انتظار برگزاری</div>
          </div>
          <div class="angle-left">
            <img class="group4" src="@/assets/imgs/transactions/group3.svg" />
          </div>
        </div>
        <div class="action" @click="goTracking">
          <div class="warning">
            <div class="fluent-emoji-bookmark-tabs">
              <img class="group2" src="@/assets/imgs/transactions/group1.svg" />
            </div>
          </div>
          <div class="stack">
            <div class="label">پیگیری رویداد برگزار شده</div>
            <div class="value">ارسال پیام به پشتیبانی</div>
          </div>
          <div class="angle-left">
            <img class="group" src="@/assets/imgs/transactions/group0.svg" />
          </div>
        </div>
      </div>
      <div v-if="!isMustComplete" class="section">
        <div class="heading">
          <div class="content">
            <div class="title">تیکت های خریداری شده</div>
            <div class="caption">
              تیکت هایی که برای شرکت در دورهمی و یا رویداد های اینسایت خریداری شده.
            </div>
          </div>
          <div v-if="isTrans" class="srch-contained-button">
            <div class="search">
              <img class="group5" src="@/assets/imgs/transactions/srchbtn.svg">
            </div>
          </div>
        </div>


        <div v-if="!hasTrans && countEvents" class="list-empty">
          <div class="error">
            <div class="card-add">
              <img class="group6" src="@/assets/imgs/transactions/group5.svg" />
            </div>
          </div>
          <div class="content2">
            <div class="title2">از صفحه دورهمی تیکت مورد نظر خود را انتخاب و خریداری نمایید</div>
            <div class="caption2">
              به منظور مشاهده تیکت های خریداری شده، لطفا از طریق صفحه
              <a href="javascript:">دورهمی</a>
              تیکت مورد نظر خود را انتخاب کنید
            </div>
          </div>
          <div class="contained-button cursor-pointer" @click="goToEvents">
            <div class="label2">خریداری تیکت دورهمی</div>
            <img class="plus" src="@/assets/imgs/transactions/plus0.svg" />
          </div>
        </div>
        <div v-else-if="!countEvents" class="list-empty">
          <div class="error">
            <div class="card-add">
              <img class="group6" src="@/assets/imgs/transactions/srchicon.svg" />
            </div>
          </div>
          <div class="content2">
            <div class="title2">در حال حاضر رویدادی برای برگزاری موجود نمی باشد</div>
            <div class="caption2">
صمیمانه از پیگیری شما سپاسگذارم
            </div>
          </div>
          <div class="contained-button">
            <div class="label2">مشاهده صفحه دورهمی</div>
            <img class="plus" src="@/assets/imgs/transactions/plus0.svg" />
          </div>
        </div>


        <div v-if="isTrans" class="list listTrans">
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
                  <p><span class="labelT">تاریخ برگزاری دورهمی:</span> ۱۵ بهمن</p>
                  <p><span class="labelT">آدرس:</span> تهران، اتوبان شهید همت(غرب)، اتوبان شهید خرازی، ایران‌مال، طبقه G3، نبش کتابخانه، مجموعه فود پلازا، میدان اصلی</p>
                </div>
                <div v-if="false" class="actions">
                  <div class="contained-button2"><div class="label2">مشاهده جزئیات</div></div>
                  <div class="link"><div class="label">پیگیری این تراکنش</div></div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div v-if="!tempDisable&&isTrans" class="pagination">
          <div class="contained-button3">
            <div class="angle-right">
              <img class="group15" src="@/assets/imgs/transactions/list/group14.svg" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="pages">
            <div class="contained-button3">
              <div class="label2">۱</div>
            </div>
            <div class="contained-button4">
              <div class="label3">۲</div>
            </div>
            <div class="contained-button3">
              <div class="label2">۳</div>
            </div>
            <div class="contained-button3">
              <div class="label2">۴</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="contained-button3">
            <div class="angle-left2">
              <img class="group14" src="@/assets/imgs/transactions/list/group13.svg" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import UserMixin, {confFields, UserMan} from "@/mixins/UserMixin";
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import AHref from "@/components/global/AHref.vue";
import {EventBus} from "@/plugins/event-bus";
import ActionInlineItem from "@/components/pages/ActionInlineItem.vue";
import ActionInlineGroup from "@/components/pages/ActionInlineGroup.vue";
import LevelMixin from "@/mixins/LevelMixin";
import StatMixin from "@/mixins/StatMixin";

export default {
  name: "EventsMan",
  head:{
    title:'اینسایت | تیکت های اینسایت'
  },
  components: {ActionInlineGroup, ActionInlineItem, AHref, Loaders },
  data() {
    return {
      loadingActBankCard:false,
      loadingActTracking:false,
      countEvents:1,
      tempDisable:true,
    };
  },
  created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);

    window.setTimeout(()=>{
      if(this.isMustComplete){
        EventBus.$emit("openModalPro", 'modalNotif',{
          mainTitle:'لطفا فرم اطلاعات اولیه را پر کنید',
          descHtml(){
            return  'برای مشاهده تیکت ابتدا نیاز هست که فرم اولیه را تکمیل کنید.'
          },
          btnInf:[
            {
              title:'تکمیل اطلاعات',
              doClick(vm){
                vm.$router.replace({path:`/login-register/`,query:{step:3,forEdit:1}});
              },
              type:'primary'
            },
          ]
        });
      }
    },1000)
  },
  computed: {
    hasTrans(){
      return this.$store.state.application.eventTickets
    },
    isTrans(){
      return this.countEvents && this.hasTrans
    },
    iconExistCard(){
      return this.countEvents > 1 ? 'multicard.svg' : this.countEvents > 0  ? 'onecard.svg' : 'emptyCard.svg';
    }
  },
  methods: {
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
    goTracking(){
      this.$router.push({path:`/form-tracking/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
    goToEvents(){
      this.$router.replace({path:`/events/`});
      this.doCloseSidebar && this.doCloseSidebar();
    },
  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


