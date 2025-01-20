<template>
  <modal title="گزارش پاسخ نامناسب" @close="close()" noScroll>
    <div slot="body" class="zpl-btnsModal">
      <div class="feedbackModal">
        <div class="implement-box flex flex-row gap-xs gap-y-xs" @click="selectType('DISRESPECTFUL')">
          <Icon name="Warning"/>
          <div class="implement-txt">
            <p class="terminal-title"> گزارش پاسخ نامحترمانه</p>
            <p class="terminal-subtitle">چنانچه پاسخ ارسال شده حاوی توهین مستقیم یا غیرمستقیم و یا الفاظ رکیک، کوچک و خوار کردن شما بوده است اقدام به گزارش از این طریق نمایید.</p>
          </div>
        </div>
        <div class="implement-box flex flex-row gap-xs gap-y-xs" @click="selectType('INSUFFICIENT')">
          <Icon name="Warning"/>
          <div class="implement-txt">
            <p class="terminal-title"> گزارش پاسخ نامرتبط</p>
            <p class="terminal-subtitle">چنانچه پاسخ ارسال شده، نامرتبط با پرسش‌های مطرح شده می‌باشد و یا پاسخ ارسالی بدون توجه به روند پاسخ‌های پیشین می‌باشد اقدام به گزارش از این طریق نمایید.</p>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import modal from "./modal.vue";
import Icon from "@/components/global/Icon/icon.vue";
export default {
  props: {
    title: {
      type: String,
    },
    replyId: {
      type: Number,
    },
  },
  data() {
    return {

    };
  },
  components: {Icon, modal },
  computed: {

  },
  methods: {
    close() {
      this.$emit("close");
    },
    selectType(type){
      this.$emit('onSelectTypeReport' , type)
    }
  },
};
</script>
