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
                <div class="title2">شرکت در دورهمی</div>
                <div class="caption4">برای شرکت در دورهمی روی دکمه زیر کلیک کنید</div>
              </div>
            </div>
            <div class="ActionItem noAct frsChild preview">
              <div class="container3"><div class="stack">
                <div class="button-group">
                  <ButtonSimple
                    :onClkBtn="goingToEvents" ButtonSimple
                    isLoader="1"
                    val-btn="شرکت در دورهمی"
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
              <div class="Description" style="align-self: stretch; text-align: right">
                <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 500; line-height: 24px; word-wrap: break-word">زمان:</span>
                <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word">تاریخ فلان</span>
              </div>
            </div>
            <div class="Description" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">
              نحوه ثبت نام
            </div>
            <div class="Description" style="align-self: stretch; text-align: right">
              <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word">نحوه ثبت نام بسیار ساده طراحی شده، ابتدا به صفحه </span>
              <span style="color: #0A33FF; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word"><a href="https://cdn.insight-clinic.com/files/auth.pdf" target="_blank">ثبت نام</a></span>
              <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word">
وارد می شوید. سپش شماره موبایل خود را وارد کرده سپس کد ارسال شده از طریق پیامک را وارد میکنید و در نهایت اطلاعات اولیه خود را وارد می کنید تا ما بتونیم با شما ارتباط بگیریم
              </span>

              <div class="uploadSection">
                <div class="drop-zone asParentBtn" :class="{}">

                </div>
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
              val-btn="شرکت در دورهمی"
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
      background: url(~/assets/imgs/landing/bg.jpg) no-repeat center center;
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
      gap: 20px;
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
  }
}

</style>
