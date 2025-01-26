<template>
  <div class="ContainerLanding">
    <div class="slideLand">
      <div class="sections section-intro"><div class="tint-intro-bg"></div></div>
    </div>
    <div class="bodyLanding">
      <!---->
      <div class="body containerCards">
        <div class="card">
          <div class="block">
            <!---->
            <div class="heading3">
              <div class="content">
                <div class="title2">دورهمی اینسایت - نشستی برای اینکه خودمونی و بدون فیلتر از روابط بگیم</div>
                <div class="caption4">برای شرکت و رزور جایگاه روی دکمه زیر کلیک کنید</div>
              </div>
            </div>
            <div class="ActionItem noAct frsChild preview">
              <div class="container3"><div class="stack">
                <div class="button-group">
                  <ButtonSimple
                    :onClkBtn="goingToEvents" ButtonSimple
                    isLoader="1"
                    val-btn="ثبت نام در دورهمی"
                    type="new"
                  />
                </div>
              </div></div>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="content dorehamiSec formPersonalPg">
        <div @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card','FormLegal',{loading}]">
          <div class="w-full dorehamiContainer">

            <div class="document" style="height: 560px; flex-direction: column; justify-content: flex-start; align-items: flex-end; gap: 24px; display: inline-flex">
              <div class="DescriptionA" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">
                اطلاعات بیشتر دورهمی
              </div>
              <div class="whatsAppPost">
                <div class="container">
                  <div class="event-details">
                    <p><span class="highlightRed">تاریخ:</span> ۱۵ بهمن</p>
                    <p><span class="highlightRed">ساعت:</span> ۸ تا ۱۱ شب</p>
                    <p><span class="highlightRed">محل برگزاری:</span> کافه شمرون ایران‌مال</p>
                  </div>

                  <h2>تو این دورهمی ویژه:</h2>
                  <ul>
                    <li>🔸 سخنرانی در خصوص رابطه به همراه پرسش و پاسخ</li>
                    <li>🔸 شبکه‌سازی و تعامل</li>
                    <li>🔸 میزگرد با مشارکت شما</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="DescriptionB" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">

            </div>
            <div class="DescriptionC" style="align-self: stretch; text-align: right">
              <div class="insight-message">
                <p>همونطور که می‌دونی، روابط همیشه چالش‌های خاص خودشون رو دارن. شاید بارها فکر کردی که چرا دوباره توی همون چرخه اشتباه افتادی؟ چرا همیشه از تعارضات توی روابط رنج می‌کشی و هیچ وقت نتونستی درک درست و واقعی از طرف مقابلت پیدا کنی؟ یا اصلاً چرا یک رابطه سالم نمی‌تونه همیشه سالم بمونه؟</p>
                <p>حالا تصور کن، در یک شب متفاوت، توی <strong>کافه شمرون ایران‌مال</strong>، در کنار بهترین درمانگرهای اینسایت و <strong>دکتر پارسا</strong>، می‌تونی جواب‌های سوالاتت رو پیدا کنی! 🌿</p>
              </div>
            </div>


            <div class="divider"></div>


            <div class="guide">
              <div class="videoEvent">
                <img alt="home" loading="lazy" class="cursor-pointer" src="https://tests.insight-clinic.com/img/landing/player-icon.svg">
              </div>
              <video class="">
                <source src="https://tests.insight-clinic.com/video/INTRO.mp4" type="video/mp4">
              </video>
            </div>

          </div>
          <div class="button-group">
            <ButtonSimple
              :onClkBtn="goingToEvents" ButtonSimple
              isLoader="1"
              val-btn="ثبت نام در دورهمی"
              type="new"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ButtonSimple from "@/components/form/ButtonSimple.vue";

export default {
  name: "ContainerLanding",
  props:{
    prop1:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      loading:false,
    };
  },
  async created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    goingToEvents(){
      this.$router.push({path:`/events/`});
    },
  },
  watch:{

  },
  mixins:[],
  components: {ButtonSimple},
};
</script>
