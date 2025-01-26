<template>
  <div class="formPersonalPg pgForm content">
    <page-heading v-if="$route.query.result == 'success'||$route.query.Status == 'OK'" caption="برای شرکت در دورهمی و ثبت نهایی تیکت  لطفا ورودی های زیر را پر کرده و ثبت نام خود را تکمیل نمایید" title="تکمیل ثبت نام"/>
    <page-heading v-else caption="شما می توانید اطلاعات خود را ویرایش کنید" title="ویرایش اطلاعات"/>
    <form @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card',{loading}]">
      <div class="form" style="gap: 24px;">
        <TextInput
          iName="first_name"
          :i-label="'نام'"
          maxlength="255"
          dataRules="required,justLetter:fa,min:2,max:255"
          v-model="fields.first_name"
          autocomplete="on"
          dataTab="1"
        />
        <TextInput
          iName="last_name"
          :i-label="'نام‌خانوادگی'"
          maxlength="255"
          dataRules="required,justLetter:fa,min:3,max:255"
          v-model="fields.last_name"
          autocomplete="on"
          dataTab="2"
        />
        <TextInput
          iName="age"
          :i-label="'سن'"
          ltr
          maxlength="10"
          dataRules="required,justNumber"
          v-model="fieldFiller('age').age"
          autocomplete="on"
          dataTab="3"
        />
        <div ref="genderRef" class="w-full nonIranGrp1">
          <!-- select -->
          <input data-localize="جنسیت" hidden name="gender" id="gender" data-list="" data-rules="required" data-tab="5">

          <div data-sel="gender" data-list=''></div>
          <!-- Error -->
          <div id="gender-error" data-error="gender" :class="['input-error',{hidden:!gender_error}]">{{gender_error}}</div>
        </div>
        <TextAreaSimple
          iName="explain"
          :i-label="'علت شرکت در دورهمی (اختیاری)'"
          v-model="fields.explain"
          dataTab="4"
        />
        <TextAreaSimple
          iName="questPlan"
          :i-label="'طرح سوال برای میزگرد(اختیاری)'"
          v-model="fields.questPlan"
          dataTab="4"
          caption="در این قسمت میتونید 5 سوال برامون ارسال کنید تا در میزگرد دورهمی بهش پاسخ داده بشه."
        />
      </div>
      <div v-if="general_error" class="error_msg">{{general_error}}</div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="savePersonal" ButtonSimple
          isLoader="1"
          val-btn="تکمیل ثبت نام"
          type="new"
        />
      </div>
    </form>
  </div>
</template>

<script>
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import AHref from "@/components/global/AHref.vue";
import TextInput from "~/components/form/TextInput.vue";
import EasyChkBox from "~/components/form/EasyChkBox.vue";
import {EventBus} from "~/plugins/event-bus";
import {DatePickerSels} from "@/src/ts/date/DatePickerSels.ts";
import {dateFaConf} from "@/src/ts/date/dateFaConf.ts";
import FieldObj from "@/src/ts/FieldObj.ts";
import SelectPro from "@/src/ts/SelectPro.ts";
import {GqlStore} from "@/src/js/GqlStore";
import editPersonal from "@/gql/FormPersonal/editPersonal";
import moment from "moment-jalaali";
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import PreviewPersonal from "@/components/pages/PreviewPersonal.vue";
import FieldValidator from "@/src/ts/validation/FieldValidator.ts";
import {langMan, langTools} from "@/src/js/langMan";
import StatMixin from "@/mixins/StatMixin";
import ValidationMixin from "@/mixins/ValidationMixin";
import DatePickerInline from "@/components/form/DatePickerInline.vue";
import TooltipPro from "@/components/form/TooltipPro.vue";
import RadioCard from "@/components/RadioCard.vue";
import {listCountries} from "@/src/js/personalData";
import TextAreaSimple from "@/components/form/TextAreaSimple.vue";
import {$zpl} from "@/plugins/zpl";


export default {
  name: "LoginRegister",
  head:{
    title:'کلینیک اینسایت | تکمیل ثبت نام'
  },
  components: {TextAreaSimple, TooltipPro, DatePickerInline, PreviewPersonal, ButtonSimple, EasyChkBox, TextInput, AHref, Loaders,RadioCard },
  data() {
    return {
      aftTrySubmit:false,
      loading:false,
      gender_error:'',
      general_error:'',
      fieldsFa:{
        first_name:'نام',
        last_name:'نام خانوادگی',
        age:'سن',
        gender:'جنسیت',
        explain:'علت شرکت در دورهمی',
        questPlan:'طرح سوال',
      },
      fields:{
        first_name:'',
        last_name:'',
        age:'',
        gender:'',
        explain:'',
        questPlan:'',
      },
    };
  },
  async created() {
    EventBus.$on("finalValidate", (befOtherChk,tokenValid,success)=>{
      if(!befOtherChk){
        this.aftTrySubmit = true;
      }
      else{

      }
    });
  },
  mounted() {
    //http://event.insight-clinic.com/login-register/?step=3&result=success&ref_id=64533831201&order_id=37

    this.$store.dispatch('layouts/setProfileMounted', true);
    const genderObj = this.readyGender();

    const userInf = this.$store.state.application.userInfo;

    this.readyValidForm({
      calbReset:this.calbReset
    });
  },
  computed: {

  },
  methods: {
    readyGender(){
      const vm =this;
      const dataField = document.querySelector('[data-sel="gender"]');
      if(dataField){
        const inpSel = document.querySelector('[name="gender"]');
        const fieldGender = FieldObj.newField(inpSel, {mainField: true});

        const genderObj = new SelectPro(dataField,fieldGender,'جنسیت',{
          listOpts:[{"code": "female", "text": "خانوم"},
            {"code": "male", "text": "آقا"},
            {"code": "other", "text": "سایر"},
          ], //other
          onClick:'.select-input',
          onSelect(val){
            vm.fields.gender = val;
          },
          offSearch:true
        })
        const genderSeled = fieldGender.fieldElm.getAttribute('data');
        if(genderSeled){
          genderObj.selectOpt(genderSeled)
        }
        return genderObj;
      }
    },
    calbReset(){
      this.general_error = ''
    },
    isValidLegalField(chkReady=false){
      if(chkReady) this.readyValidForm();
      const validators = this.validators;


      return true;
    },
    isValidSubmit({calbReset=null}={}){
      this.readyValidForm({calbReset});
      let fRes = true;
      const validators = this.validators;
      const frsName = validators['first_name'],
        lstName = validators['last_name'];

      const res1 = frsName.chkValidAndShow('محتوای نام نمی‌تواند خالی باشد')
        ,res2 = lstName.chkValidAndShow('محتوای نام خانوادگی نمی‌تواند خالی باشد');

      const gender = validators['gender'] ;
      const res3 = gender.chkValidAndShow('جنسیت را انتخاب کنید');
      const ssn = validators['age'];
      const res6 = ssn.chkValidAndShow('محتوای سن نمی‌تواند خالی باشد');
      if(!res1||!res2||!res3||!res6){
        fRes = false;
      }
      return fRes;
    },
    fieldFiller(mark){
      const vm = this
      const obj={};
      Object.defineProperty(obj, mark, {
        get: function () {
          const res = vm.fields[mark];
          return vm.fields[mark];
        },

        set: function (val) {
          vm.fields[mark]=val;
        },

        configurable: true});
      return obj;
    },
    async savePersonal(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;

      if(this.isValidSubmit({calbReset:this.calbReset})){
        this.general_error = '';
        const fields = this.fields;

        const vars = {
          name: fields.first_name,
          family: fields.last_name,
          gender: fields.gender,
          description: fields.explain,
          questions: fields.questPlan,
        }


          vars.age = langTools.convertToEnNum(fields.age);


        vm.loading = true;


        $zpl.zplConnectPrj_v2.reqDirect({
          baseUrl:'https://reservation-api.insight-clinic.com/api/event/user/update_user',
          args:vars,
        }).then(async (respObj)=>{
          if(calbDone)calbDone();
          const resp = respObj.getResp();
          if(resp){
            if(calbDone)calbDone(resp);
            this.goEventsMan();
            vm.loading = false;
          }
        })
        .catch((respObj)=>{
          /**
           * @var respObj
           * @type RespObj
           */
          vm.loadingGoPay = false;
          const msg = respObj.getErrMsg();
          if(msg){
            $zpl.toastError(msg);
          }
          else{
            $zpl.toastError('خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.');
          }
        })
      }
    },
    goEventsMan(){
      this.$router.replace({path:`/events-man/`});
    },
  },
  mixins:[ValidationMixin,StatMixin]
};
</script>


