<template>
  <div class="formPersonalPg ManualKyc pgForm content">
    <page-heading caption="از طریق فرم زیر نسبت به تکمیل مدارک خود اقدام نمایید" title="بارگذاری مدارک هویتی" backPath="/profile/"/>
    <form @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card','FormLegal',{loading}]">
      <div class="w-full kycContainer">

        <div class="document" style="height: 560px; flex-direction: column; justify-content: flex-start; align-items: flex-end; gap: 24px; display: inline-flex">
          <div class="Description" style="align-self: stretch; text-align: right; color: #2E2E38; font-size: 16px; font-family: IRANYekanX; font-weight: 600; line-height: 24px; word-wrap: break-word">مراحل احراز هویت در زرین‌پال</div>
          <div class="Description" style="align-self: stretch; text-align: right"><span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word">۱. فرم احراز هویت را از </span>
            <span style="color: #0A33FF; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word"><a href="https://cdn.zarinpal.com/files/auth.pdf" target="_blank">اینجا</a></span>
            <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word"> دانلود کنید، پرینت بگیرید و پس از مطالعه امضا کنید.<br/>۲.  اصل کارت ملی خود را در قسمت مربوطه پجسبانید و از خودتان در حالی که فرم احراز هویت را در دست گرفته‌اید عکس بگیرید.<br/>۳. از کارت کلی خود بصورت جداگانه عکس بگیرید.<br/>۴. عکس‌های گرفته شده را بارگذاری کنید.<br/><br/></span>
            <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 500; line-height: 24px; word-wrap: break-word">نکته:</span>
            <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word"> از فرم احراز هویت پرینت بگیرید یا متن آن را عینا روی کاغذ A4 بنویسید.<br/></span>
            <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 500; line-height: 24px; word-wrap: break-word">نکته:</span>
            <span style="color: #2E2E38; font-size: 14px; font-family: IRANYekanX; font-weight: 400; line-height: 24px; word-wrap: break-word"> عکس ارسالی، کاملا مشابه الگوی مورد تایید باشد.</span>
          </div>

          <div class="uploadSection">
            <MyUpload ref="MyUploadKycRef"
                      :onSetFileId="onSetFileIdKyc"
                      reqMsg=" بارگذاری فرم تکمیل شده احراز هویت الزامی است."
                      :top-rule="true"
                      :alignBottomRule="false"
                      :bottomRule="false"
                      title="فرم تکمیل شده احراز هویت"
            />
            <MyUpload ref="MyUploadSsnRef"
                      :onSetFileId="onSetFileIdSsn"
                      reqMsg=" بارگذاری تصویر کارت ملی الزامی است."
                      title="تصویر کارت ملی"
                      :alignBottomRule="false"
                      :bottomRule="false"
            />
          </div>
        </div>


        <div class="divider"></div>


        <div class="guide">
          <img class="image" src="@/assets/imgs/manualkyc/image0.png" />
          <div class="links">
            <a class="contained-button2 asBtn" href="https://www.aparat.com/v/j18748j" target="_blank">
              <div class="interface-essential-play-loading">
                <img class="group2" src="@/assets/imgs/manualkyc/group1.svg" />
              </div>
              <div class="labelGui">ویدیوی آموزشی نحوه ارسال مدارک</div>
            </a>
            <a class="contained-button2 asBtn" href="https://cdn.zarinpal.com/files/auth-sample.jpg" target="_blank">
              <div class="interface-essential-user-single-select">
                <img class="group3" src="@/assets/imgs/manualkyc/group2.svg" />
              </div>
              <div class="labelGui">نمونه عکس مورد تایید</div>
            </a>
          </div>
        </div>

      </div>
      <div v-if="general_error" class="error_msg">{{general_error}}</div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="saveKyc" ButtonSimple
          isLoader="1"
          val-btn="بارگذاری مدارک"
          type="primary"
        />
        <ButtonSimple
          :onClkBtn="cancelEdit" ButtonSimple
          val-btn="انصراف"
          type="secondary"
        />
      </div>
    </form>
  </div>
</template>
<script>
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import TextInput from "@/components/form/TextInput.vue";
import DatePickerInline from "@/components/form/DatePickerInline.vue";
import {GqlStore} from "@/src/js/GqlStore";
import UpdateDocuments from "@/gql/FormLegal/UpdateDocuments";
import ValidationMixin from "@/mixins/ValidationMixin";
import StatMixin from "@/mixins/StatMixin";
import PreviewManualKyc from "@/components/pages/PreviewManualKyc.vue";
import MyUpload from "~/components/form/MyUpload.vue";

export default {
  name: "ManualKYC",
  head:{
    title:'کانکت زرین‌پال | احراز هویت دستی'
  },
  props:{

  },
  data() {
    return {
      general_error:'',
      loading:false,
      file_id_ssn:'',
      file_id_kyc:'',
    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    if(this.isPreview('manual_kyc')){//todo todo bekhad preview beshe bayad backend in esme farzi ro tamin kone
      this.$store.dispatch('layouts/setMediumScr', true);
    }
    else{
      this.$store.dispatch('layouts/setMediumScr', false);
    }
  },
  methods: {
    onSetFileIdKyc(file_id){
      this.file_id_kyc = file_id
    },
    onSetFileIdSsn(file_id){
      this.file_id_ssn = file_id
    },
    isValidSubmit(){
      let res1=true,res2=true;
      if(!this.file_id_kyc){
        this.$refs.MyUploadKycRef.showRequire();
        res1 = false;
      }
      if(!this.file_id_ssn){
        this.$refs.MyUploadSsnRef.showRequire();
        res2 = false;
      }
      return res1 && res2;
    },
    async saveKyc(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;

      if(this.isValidSubmit()){
        this.general_error = '';
        vm.loading = true;

        const vars = {
          national_card_documents:this.file_id_ssn,
          selfie_documents:this.file_id_kyc,
        }

        new GqlStore('UpdateDocuments',{querySchema:UpdateDocuments}).reqZplConnectPrj({vars})
            .then((respObj)=>{
              const resp = respObj.getResp();
              if(resp){
                if(calbDone)calbDone(resp);
                vm.goProfile();
                vm.loading = false;
              }
            })
            .catch((respObj)=>{
              respObj.showErr();
              const err = respObj.getErrMsg();
              vm.loading = false;
              vm.general_error = 'خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.'
            })
      }
    },
    cancelEdit(){
      this.goProfile();
    },
    goProfile(){
      this.$router.replace({path:`/profile/`});
    },
  },
  mixins:[ValidationMixin,StatMixin],
  components: {MyUpload, PreviewManualKyc, DatePickerInline, TextInput, ButtonSimple},
};
</script>
