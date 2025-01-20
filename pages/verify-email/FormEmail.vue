<template>
  <div class="formEmail pgForm content">
    <page-heading caption="آدرس ایمیل جهت ورود و دریافت اطلاع‌رسانی‌ها" title="ایمیل" backPath="/profile/"/>
    <PreviewEmail
      :fieldsFa="fieldsFa"
      :statAct="statAct('email')"
      :statActFa="statActFa('email')"
      v-if="isPreview('email')"
    />
    <form v-else @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card',{loading}]">
      <div class="form">
        <TextInput
          iName="email"
          i-label="آدرس ایمیل"
          maxlength="255"
          dataRules="required,email,min:6,max:255"
          v-model="fields.email"
          ltr
        />
      </div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="saveEmail" ButtonSimple
          isLoader="1"
          :val-btn="`تایید ایمیل`"
          type="primary"
        />
        <ButtonSimple
          :onClkBtn="cancelEmail" ButtonSimple
          :val-btn="`انصراف`"
          type="secondary"
        />
      </div>
    </form>
  </div>
</template>

<script>
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import TextInput from "@/components/form/TextInput.vue";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import ValidationMixin from "@/mixins/ValidationMixin";
import moment from "moment-jalaali";
import {GqlStore} from "@/src/js/GqlStore";
import editEmail from "@/gql/FormEmail/editEmail";
import {EventBus} from "@/plugins/event-bus";
import PreviewEmail from "@/components/pages/PreviewEmail.vue";
import StatMixin from "@/mixins/StatMixin";
import {langTools} from "@/src/js/langMan";



export default {
  name: "FormEmail",
  head:{
    title:'کانکت زرین‌پال | تایید ایمیل'
  },
  components: {PreviewEmail, ButtonSimple, TextInput, Loaders },
  data() {
    return {
      fieldsFa:{
        email:'ایمیل',
      },
      fields:{
        email:'',
      },
      loading: false,
    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    const fields = this.fields;
    const userInf = this.$store.state.application.userInfo;
    fields.email = userInf.email;
    if(this.$store.state.layouts.isWithoutRequest){
      this.$store.dispatch('layouts/setWithoutRequest',false);
    }

    if(!this.isPreview('email')){
      this.readyValidForm();
    }
  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    saveEmail(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;

      if(this.isValidSubmit()){
        const fields = this.fields;

        const vars = {
          email: langTools.convertToEnNum(fields.email),
        }

        vm.loading = true;
        new GqlStore('PreferencesEdit',{querySchema:editEmail}
        ).reqZplConnectPrj({vars})
          .then(async (respObj)=>{
            const resp = respObj.getResp();
            if(resp){
              if(calbDone)calbDone(resp);
              await this.$store.dispatch('application/updateEmail');
              this.goToNextLvl();
              // this.goProfile();
            }
          })
          .catch((respObj)=>{
            /**
             * @var respObj
             * @type RespObj
             */
            vm.loading = false;
            const msg = respObj.getErrMsg();
            const emailVal = this.validators['email'];
            if(msg){
              emailVal.setErrMsg(msg);
            }
            else{
              emailVal.setErrMsg('خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.');
            }
          })
      }

    },
    goProfile(){
      this.$router.replace({path:`/profile/`});
    },
    goToNextLvl(){
      this.$router.push({path:`/verify-email/`,query:{step:2}});
    },
    cancelEmail(){
      if(this.loading)return;
      this.$router.replace({path:`/profile/`})
    },
    isValidSubmit(){
      this.readyValidForm();
      const email = this.validators['email'];

      const res1 = email.chkValidAndShow('فیلد ایمیل نمی‌تواند خالی باشد');
      if(!res1){
        return false;
      }

      return true;
    }
  },
  mixins:[ValidationMixin,StatMixin]
};
</script>


