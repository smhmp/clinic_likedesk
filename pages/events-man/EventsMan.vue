<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده رویداد ها و فعالیتهای ثبت شده" title="فعالیتهای اینسایت" backPath="/profile/"/>
    <div class="ActInline card">
      <div class="page-actions">
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
      <div class="section">
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
            <div class="illustration">
              <div class="big-status">
                <div class="transaction-local">
                  <img class="group7" src="@/assets/imgs/transactions/list/group6.svg" />
                </div>
              </div>
            </div>

            <div class="stack2">
              <div class="title-and-detail">
                <div class="title6">
                  <div class="title7">۲۵,۴۰۰,۰۰۰</div>
                  <div class="currency-badge">
                    <img src="@/assets/imgs/transactions/list/rial-symbol0.svg" class="rial-symbol" />
                  </div>
                </div>
                <div class="details">
                  <div class="data3">
                    <img src="@/assets/imgs/transactions/list/bank-logo6.svg" class="bank-logo7" />
                    <div class="detail-1"><div class="title9">5859 3547 5336 2442</div></div>
                  </div>
                  <div class="data2">
                    <div class="mingcute-hashtag-fill">
                      <img src="@/assets/imgs/transactions/list/group5.svg" class="group6" />
                    </div>
                    <div class="detail-4"><div class="title8">۳۵۲۶۷۵۳۴</div></div>
                  </div>
                  <div class="data2">
                    <img
                      src="@/assets/imgs/transactions/list/ic-round-store0.svg"
                      class="ic-round-store"
                    />
                    <div class="detail-4"><div class="title8">صدا استور</div></div>
                  </div>
                  <div class="data">
                    <img
                      src="@/assets/imgs/transactions/list/date-fill0.svg"
                      class="date-fill"
                    />
                    <div class="detail-2"><div class="title8">۲۵ آبان، ۱۱:۳۵</div></div>
                  </div>
                </div>
              </div>
              <div class="actions">
                <div class="contained-button2"><div class="label2">مشاهده جزئیات</div></div>
                <div class="link"><div class="label">پیگیری این تراکنش</div></div>
              </div>
            </div>

          </div>
        </div>
        <div v-if="isTrans" class="pagination">
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
    title:'اینسایت | تراکنش‌های اینسایت'
  },
  components: {ActionInlineGroup, ActionInlineItem, AHref, Loaders },
  data() {
    return {
      loadingActBankCard:false,
      loadingActTracking:false,
      countEvents:1,
      hasTrans:false,
    };
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);


  },
  computed: {
    isTrans(){
      return this.countEvents && this.hasTrans
    },
    iconExistCard(){
      return this.countEvents > 1 ? 'multicard.svg' : this.countEvents > 0  ? 'onecard.svg' : 'emptyCard.svg';
    }
  },
  methods: {
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


