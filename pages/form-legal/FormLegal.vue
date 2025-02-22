<template>
  <div class="formPersonalPg pgForm content">
    <page-heading caption="اطلاعات کسب‌وکار‌های حقوقی" title="مشخصات حقوقی" backPath="/profile/"/>
    <PreviewLegal
      :fieldsFa="fieldsFa"
      :statAct="statAct('legal')"
      :statActFa="statActFa('legal')"
      v-if="isPreview('legal')"
    />
    <form v-else @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card','FormLegal',{loading}]">
      <div class="w-full legalContainer">
        <div class="document">
          <div class="description">معرفی‌نامه رسمی</div>
          <div class="description2">
            <div style="width: 98%;" class=""><p class="">برای ثبت حساب حقوقی، نیاز است یک <span class="bold">معرفی‌نامه‌ی رسمی</span> با <span class="bold">سربرگ شرکت</span>، به علاوه‌ی <span class="bold">مهر و امضاء مدیرعامل</span> و <span class="bold">شناسه‌ی ملی شرکت</span>، بارگذاری کنید.</p><p class="">لطفا توجه داشته باشید که معرفی‌نامه‌ خطاب به اینسایت باشد و فردی که در <span class="bold">اینسایت</span> ثبت‌نام کرده است در معرفی‌نامه به عنوان <span class="bold">رابط اداری و مالی</span> معرفی شده باشد.</p></div>
          </div>
          <MyUpload ref="MyUploadRef"
              :onSetFileId="onSetFileId"
              reqMsg=" بارگذاری مدارک حقوقی الزامی است."
              topRule
          />
        </div>

      </div>
      <div v-if="general_error" class="error_msg">{{general_error}}</div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="saveLegal" ButtonSimple
          isLoader="1"
          val-btn="ذخیره"
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
import GetLegal from "@/gql/FormLegal/GetLegal";
import StatMixin from "@/mixins/StatMixin";
import PreviewLegal from "@/components/pages/PreviewLegal.vue";
import MyUpload from "~/components/form/MyUpload.vue";
import {$zpl} from "@/plugins/zpl";

export default {
  name: "FormLegal",
  head:{
    title:'کلینیک اینسایت | مشخصات حقوقی'
  },
  props:{

  },
  data() {
    return {
      general_error:'',
      loading:false,
      fieldsFa:{
        tax_id:'کد رهگیری مالیاتی',
        company_name:'نام حقوقی',
        company_rid:'شناسه ملی حقوقی',
        company_registered_at:'تاریخ ثبت',
      },
      file_id:'',
    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    this.$store.dispatch('layouts/setMediumScr', true);
    if(!this.isPreview('legal')){

    }
  },
  methods: {
    onSetFileId(fileId){
      this.file_id=fileId;
    },
    isValidLegalField(){
      if(!this.file_id){
        this.$refs.MyUploadRef.showRequire();
        return false;
      }
      return true;
    },
    async saveLegal(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;

      if(this.isValidLegalField()){
        this.general_error = '';

        vm.loading = true;

        const vars = {
          legal_documents: this.file_id,
          has_legal_documents: true,
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
              $zpl.showRespErr(respObj);
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
  components: {MyUpload, PreviewLegal, DatePickerInline, TextInput, ButtonSimple},
};
</script>
