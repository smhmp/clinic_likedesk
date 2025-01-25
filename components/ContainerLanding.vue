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
              <div class="Description" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">
                اطلاعات بیشتر دورهمی
              </div>
              <div class="whatsAppPost">
                <div class="container">
                  <div class="event-details">
                    <p><span class="highlight">تاریخ:</span> ۱۵ بهمن</p>
                    <p><span class="highlight">ساعت:</span> ۸ تا ۱۱ شب</p>
                    <p><span class="highlight">محل برگزاری:</span> کافه شمرون ایران‌مال</p>
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
            <div class="Description" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">

            </div>
            <div class="Description" style="align-self: stretch; text-align: right">
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






























<style>
.theme-1-4 .top-bar{
  z-index: 9;
  .container{
    background: #fff9f3;
    max-width: 100%;
  }
}
.ContainerLanding{
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;

  .slideLand{
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
    height: 340px;
    overflow: hidden;

    .slidePosition {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: absolute;
      top: -326px;

      .sections {
        display: block;
        overflow: hidden;
        position: relative;
      }


    }

    .section-intro {
      background: url(~/assets/imgs/landing/dorehami1.jpg) no-repeat center center;
      background-size: cover;
      height: 666px;
      top: 0px;
      position: relative;
      width: 100%;

      .tint-intro-bg {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 0;
        background-color: rgb(137 137 82 / 40%);
        text-align: center;
        opacity: 0.5;
      }
    }
  }

  .bodyLanding {
    display: flex;
    flex-direction: column;
    gap: 0px;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;
    max-width: 1200px;
    position: relative;
    padding: 0px 0px 0px 0px;

    .containerCards {
      display: flex
    ;
      flex-direction: column;
      gap: 24px;
      align-items: flex-end;
      justify-content: flex-start;
      flex: 1;
      position: relative;

      .card {
        background: #fff9f3a3;
        /* border-radius: 12px; */
        padding: 24px;
        display: flex
      ;
        flex-direction: column;
        gap: 40px;
        align-items: flex-start;
        justify-content: flex-start;
        align-self: stretch;
        flex-shrink: 0;
        position: relative;
        /* min-height: 100%; */
        width: 100%;

        .block {
          flex-direction: column;
          gap: 0px;
          align-items: flex-end;
          justify-content: flex-start;
          align-self: stretch;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;

          .heading3 {
            padding: 24px 24px 16px 24px;
            display: flex
          ;
            flex-direction: row;
            gap: 16px;
            align-items: flex-start;
            justify-content: flex-end;
            align-self: stretch;
            flex-shrink: 0;
            position: relative;

            .content {
              display: flex
            ;
              flex-direction: column;
              gap: 8px;
              align-items: flex-start;
              justify-content: flex-start;
              flex: 1;
              position: relative;
            }
          }

          .title2 {
            color: var(--title_all);
            text-align: right;
            font-family: "IranYekanX-DemiBold", sans-serif;
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
            position: relative;
            align-self: stretch;
          }

          .caption4 {
            color: var(--caption_all);
            text-align: right;
            font-family: "IranYekanX-Medium", sans-serif;
            font-size: 12px;
            line-height: 24px;
            font-weight: 500;
            position: relative;
            align-self: stretch;
          }


          .ActionItem {
            padding: 0px 24px 0px 0px;
            display: flex
          ;
            flex-direction: row;
            gap: 24px;
            align-items: flex-start;
            justify-content: flex-end;
            align-self: stretch;
            flex-shrink: 0;
            position: relative;
            cursor: pointer;

            .container3 {
              border-style: solid;
              border-color: #eeeef1;
              border-color: var(--border-divider, #eeeef1);
              border-width: 0px 0px 1px 0px;
              padding: 24px 0px 24px 24px;
              display: flex
            ;
              flex-direction: row;
              gap: 16px;
              align-items: center;
              justify-content: flex-end;
              flex: 1;
              position: relative;

              .stack {
                display: flex
              ;
                flex-direction: row;
                gap: 16px;
                align-items: center;
                justify-content: flex-end;
                flex: 1;
                position: relative;
                direction: rtl;
              }
            }

            &:last-child .container3 {
              border: none;
            }
          }
          .ActionItem.noAct {
            cursor: auto;
          }

          .ActionItem.frsChild {
            border-style: solid;
            border-color: var(--box-act-border);
            border-width: 1px 0px 0px 0px;
          }


        }
      }
    }









    .dorehamiContainer {
      display: flex;
      flex-direction: column;
      gap: 0px;
      direction: rtl;
    }

    .dorehamiSec {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
    }

    .dorehamiSec * {
      box-sizing: border-box;
    }

    .dorehamiSec .document {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: flex-end;
      justify-content: flex-start;
      flex: 1;
      position: relative;
    }

    .dorehamiSec .divider {
      margin-top: 0;
      border-style: solid;
      border-color: #eeeef1;
      border-color: #eeeef1;
      border-color: var(--border-divider, #eeeef1);
      border-width: 0 1px 0 0;
      align-self: stretch;
      flex-shrink: 0;
      width: 2px;
      position: relative;
      transform-origin: 0;
      transform: none;
      height: 100%;
    }

    .dorehamiSec .guide {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
    }

    .dorehamiSec .card {
      border-radius: 4px;
      margin-top: 22px;
    }

    .videoEvent {
      display: flex;
      justify-content: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 99999;
      align-items: center;
    }

    .videoEvent img {
      width: 100px;
      height: 100px;
      display: block;
    }






    .whatsAppPost {
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
      direction: rtl;
      width: 100%;
      padding: 0 30px;

      .container {
        max-width: 600px;
        margin: 30px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      h1 {
        text-align: center;
        color: #2c3e50;
      }

      .event-details {
        margin-bottom: 20px;
      }

      .event-details p {
        margin: 10px 0;
      }

      .highlight {
        color: #e74c3c;
        font-weight: bold;
      }

      ul {
        list-style-type: disc;
        margin: 20px 0;
        padding-left: 20px;
      }

      ul li {
        margin-bottom: 10px;
        list-style: none;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
        color: #888;
      }
    }

    .insight-message {
      margin: 16px 0;
      padding: 15px;
      background-color: #eafaf1;
      border-left: 5px solid #27ae60;
      border-radius: 5px;
      line-height: 1.8;
    }

    .insight-message p {
      margin: 10px 0;
    }

    .insight-message strong {
      color: #27ae60;
    }
  }
}

</style>
