<template>
  <div class="formPersonalPg pgForm content">
    <page-heading caption="اطلاعات فردی شما در اینسایت" title="مشخصات فردی" backPath="/profile/"/>
    <PreviewPersonal
      :fieldsFa="fieldsFa"
      :statAct="statAct('personal')"
      :statActFa="statActFa('personal')"
      v-if="isPreview('personal')"
    />
    <form v-else @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card',{loading}]">
      <div class="form" style="gap: 24px;">
        <RadioCard ref="radioCardRef" v-if="true" inpName="legalType" :infos="[
          {defChecked:true,label:'شخص حقیقی هستم', uniqKey:'isPerson',guidance:'شخص حقیقی به فردی اطلاق می‌شود که دارای هویت مشخص و ویژگی‌های فردی مانند نام، نام خانوادگی، تاریخ تولد، کد ملی می‌باشد.',svgIcon:'radio/person-icon.svg'},
          {label:'شخص حقوقی هستم', uniqKey:'isLegal',guidance:'شخص حقوقی به موسسات یا شرکت‌های ثبت‌شده‌ای گفته می‌شود که دارای مشخصاتی مانند تاریخ ثبت، شماره ثبت، کد ملی و کد اقتصادی هستند.',svgIcon:'radio/legal-icon.svg'},
        ]"
        :onChked="clkRadioLegal"
        />

        <TextInput
          iName="first_name"
          :i-label="hasLegalEntity?'نام صاحب امضا':'نام'"
          maxlength="255"
          dataRules="required,justLetter:fa,min:2,max:255"
          v-model="fields.first_name"
          autocomplete="on"
          dataTab="1"
        />
        <TextInput
          iName="last_name"
          :i-label="hasLegalEntity?'نام‌خانوادگی صاحب امضا':'نام‌خانوادگی'"
          maxlength="255"
          dataRules="required,justLetter:fa,min:3,max:255"
          v-model="fields.last_name"
          autocomplete="on"
          dataTab="2"
        />
        <DatePickerInline
          iName="birthday"
          ref="birthDayRef"
          dataRules="required"
          title="تاریخ تولد"
          dataTab="9"
        />
        <div class="check-box">
          <EasyChkBox uniqKey="noIrani"
                      label="اتباع غیر ایرانی هستم"
                      :defChecked="chkNoIrani"
                      v-model="chkNoIrani"
                      :tooltip="{myWidth:'188px',myLeft:'20px'}"
                      :tikError="tikError"
                      :onTik="onTik"
                      dataTab="4"
          />
<!--                      :guidance="`<pre style='text-align: center;color: #747481;font-family: IranYekanX-Medium, sans-serif;'>آیا شهروند کشور دیگر هستید؟</pre>`"-->
        </div>
        <TextInput
          v-show="!nonIran"
          iName="ssn"
          :i-label="hasLegalEntity?'کد ملی صاحب امضا':'کد ملی'"
          ltr
          caption="کد ملی حتما باید با شماره همراهی که با آن در اینسایت ثبت‌نام کرده‌اید مطابقت داشته‌ باشد."
          maxlength="10"
          dataRules="required,justNumber,max:10,ssn"
          v-model="fieldFiller('ssn').ssn"
          autocomplete="on"
          dataTab="3"
        />
        <div v-show="nonIran" class="w-full nonIranGrp2">
          <TextInput
            iName="pervasive_code"
            i-label="شناسه فراگیر"
            maxlength="12"
            ltr
            dataRules="required,justNumber,min:5,max:12"
            v-model="fields.pervasive_code"
            autocomplete="on"
            dataTab="8"
            :moreGui="{txt:'شناسه فراگیر اتباع خارجی یک کد ۱۲ رقمی است که به‌عنوان جایگزین شماره ملی برای اتباع خارجی مقیم ایران عمل می‌کند. این کد برای انجام امور اداری، اقتصادی و قانونی در ایران ضروری است.'}"
          />
        </div>
        <div v-show="nonIran" ref="nonIranRef" class="w-full nonIranGrp1">
          <!-- select -->
          <input data-localize="ملیت" hidden name="nationality" id="nationality" data-list="" data-rules="required" data-tab="5">

          <div data-sel="nationality" data-list=''></div>
          <!-- Error -->
          <div id="nationality-error" data-error="nationality" :class="['input-error',{hidden:!nationality_error}]">{{nationality_error}}</div>
        </div>
        <div v-show="nonIran" class="w-full nonIranGrp2">
          <TextInput
            iName="passport_number"
            i-label="شماره پاسپورت"
            maxlength="9"
            ltr
            dataRules="required,passport,min:5,max:9"
            to-en-num
            v-model="fields.passport_number"
            autocomplete="on"
            dataTab="6"
          />
        </div>
        <div v-show="nonIran" class="w-full nonIranGrp2">
          <DatePickerInline
            iName="expire_date"
            ref="expire_dateRef"
            dataRules="required"
            title="تاریخ انقضاء پاسپورت"
            dataTab="7"
          />
        </div>
      </div>
      <div v-show="hasLegalEntity" class="w-full legalContainer">
        <div class="form gap-24">
          <div class="description">مشخصات شرکت</div>
          <TextInput
            iName="tax_id"
            i-label="کد رهگیری مالیاتی"
            maxlength="255"
            dataRules="required,justNumber,length:10"
            v-model="fields.tax_id"
            ltr
            dataTab="1"
            :moreGui="{txt:'راهنمای دریافت کدرهگیری مالیاتی',href:'https://www.insight-clinic.com/blog/%d9%85%d8%b1%d8%a7%d8%ad%d9%84-%d8%ab%d8%a8%d8%aa%e2%80%8c%d9%86%d8%a7%d9%85-%d8%a7%d9%84%da%a9%d8%aa%d8%b1%d9%88%d9%86%db%8c%da%a9%db%8c-%d8%af%d8%b1-%d9%86%d8%b8%d8%a7%d9%85-%d9%85%d8%a7%d9%84%db%8c/'}"
            autocomplete="on"
          />
          <TextInput
            iName="company_name"
            i-label="نام حقوقی"
            dataRules="required,justLetter,min:3,max:70"
            v-model="fields.company_name"
            dataTab="2"
            autocomplete="on"
          />
          <TextInput
            iName="company_rid"
            i-label="شناسه ملی حقوقی"
            dataRules="required,justNumber,length:11"
            v-model="fields.company_rid"
            dataTab="3"
            ltr
            autocomplete="on"
            :more-gui="{txt:'شناسه ملی حقوقی یک کد یکتای ۱۱ رقمی است که پس از ثبت قانونی شرکت، برای هر شرکت یا سازمان صادر می‌شود.'}"
          />
          <DatePickerInline
            v-once
            iName="company_registered_at"
            ref="regDateRef"
            dataTab="4"
            dataRules="required"
            title="تاریخ ثبت"
          />
        </div>

      </div>
      <div v-if="general_error" class="error_msg">{{general_error}}</div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="savePersonal" ButtonSimple
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


export default {
  name: "FormPersonal",
  head:{
    title:'کلینیک اینسایت | مدارک حقوقی و اطلاعات کاربری'
  },
  components: {TooltipPro, DatePickerInline, PreviewPersonal, ButtonSimple, EasyChkBox, TextInput, AHref, Loaders,RadioCard },
  data() {
    return {
      tikError:false,
      chkNoIrani:false,
      aftTrySubmit:false,
      loading:false,
      nationality_error:'',
      general_error:'',
      fieldsFa:{
        first_name:'نام',
        last_name:'نام خانوادگی',
        ssn:'کد ملی',
        nationality:'ملیت',
        passport_number:'پاسپورت',
        expire_date:'تاریخ انقضاء پاسپورت',
        pervasive_code:'شناسه فراگیر',
        birthday:'تاریخ تولد',

        tax_id:'کد رهگیری مالیاتی',
        company_name:'نام حقوقی',
        company_rid:'شناسه ملی حقوقی',
        company_registered_at:'تاریخ ثبت',
      },
      fields:{
        first_name:'',
        last_name:'',
        ssn:'',
        nationality:'',
        passport_number:'',
        expire_date:'',
        pervasive_code:'',
        birthday:'',

        tax_id:'',
        company_name:'',
        company_rid:'',
        company_registered_at:'',
      },
      nonIran:false,
      hasLegalEntity:false,
    };
  },
  async created() {
    if(!this.isPreview('personal')){
      EventBus.$on("finalValidate", (befOtherChk,tokenValid,success)=>{
        if(!befOtherChk){
          this.aftTrySubmit = true;
          this.chkValidateTik(tokenValid);
        }
        else{
          // this.tikError = false;
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    if(!this.isPreview('personal')){
      const birthDate = this.readyBirthDate();
      const countryObj = this.readyNational();
      const expireDate = this.readyPassportDate();
      const companyRegAt = this.readyLegalDate();

      const userInf = this.$store.state.application.userInfo;
      this.fillPersonal(userInf,birthDate)
      this.fillLegal(userInf,companyRegAt)

      this.readyValidForm({
        calbReset:this.calbReset
      });
    }
  },
  computed: {

  },
  methods: {
    fillPersonal(userInf,birthDate){
      const fields = this.fields;
      fields.first_name = userInf.first_name;
      fields.last_name = userInf.last_name;

      if($zpl.isTest().__FormPersonal__init__setDate__){
        fields.ssn = '4432422866';
        birthDate.setDate({day:7,month:5,year:1368});
      }
    },
    fillLegal(userInf,companyRegAt){
      const fields = this.fields;
      if(userInf.company_rid){
        this.$refs.radioCardRef.onClickInp('isLegal')
        this.clkRadioLegal('isLegal');
        this.$nextTick(()=>{
          fields.tax_id = userInf.tax_id || '';
          fields.company_name = userInf.company_name || '';
          fields.company_rid = userInf.company_rid || '';
          if(userInf.company_registered_at){
            let res = userInf.company_registered_at.split('-');
            res = moment.jConvert.toJalaali(res[0]*1,res[1]*1,res[2]*1);
            companyRegAt.setDate({day:res.jd,month:res.jm,year:res.jy});
          }
        })
      }
    },
    readyBirthDate(){
      const schem = {
        birth_day:'',
        birth_month:'',
        birth_year:'',
      },vm=this;

      const birthDate = new DatePickerSels(new dateFaConf(),this.$refs.birthDayRef.$el,['birth_day','روز تولد','birth_month','ماه تولد','birth_year','سال تولد'],{onSelect(ttl,val){
          schem[ttl]=val;
          vm.fields.birthday = `${schem.birth_year}/${schem.birth_month}/${schem.birth_day}`;
        }});
      return birthDate;
    },
    readyPassportDate(){
      const schemPass = {
        birth_day:'',
        birth_month:'',
        birth_year:'',
      },vm=this;

      const expireDate = new DatePickerSels(new dateFaConf({yearRange:[2022,2034],isGeorgian:true}),this.$refs.expire_dateRef.$el,['birth_day','روز','birth_month','ماه','birth_year','سال'],{onSelect(ttl,val){
          schemPass[ttl]=val;
          vm.fields.expire_date = `${schemPass.birth_year}/${schemPass.birth_month}/${schemPass.birth_day}`;
        }});
      return expireDate;
    },
    readyLegalDate(){
      const schem = {
        birth_day:'',
        birth_month:'',
        birth_year:'',
      },vm=this;

      const regDateRef = this.$refs.regDateRef;

      const dateConf = new dateFaConf({
        yearRange:[1310,1403]
      });

      const companyRegAt = new DatePickerSels(dateConf,regDateRef.$el,['birth_day','روز','birth_month','ماه','birth_year','سال'],{onSelect(ttl,val){
          schem[ttl]=val;
          vm.fields.company_registered_at = `${schem.birth_year}/${schem.birth_month}/${schem.birth_day}`;
        }});

      return companyRegAt;
    },
    readyNational(){
      const vm =this;
      const dataField = document.querySelector('[data-sel="nationality"]');
      if(dataField){
        const inpSel = document.querySelector('[name="nationality"]');
        const fieldCountry = FieldObj.newField(inpSel, {mainField: true});

        const countryObj = new SelectPro(dataField,fieldCountry,'ملیت',{
          listOpts:listCountries,
          onClick:'.select-input',
          onSelect(val){
            vm.fields.nationality = val;
          },
          otherOpt:{
            optTitle:'سایر',
            optCode:'zz',
            onSelected(){
              lg.col_onKeyup('otherOpt / onSelected');
              vm.fields.nationality = 'zz';
            }
          }
        })
        const countrySeled = fieldCountry.fieldElm.getAttribute('data');
        if(countrySeled){
          countryObj.selectOpt(countrySeled)
        }
        return countryObj;
      }
    },
    clkRadioLegal(uniqKey){
      this.hasLegalEntity = uniqKey==='isLegal'
      this.$nextTick(()=>{
        this.readyValidForm();
      })
    },
    calbReset(){
      this.general_error = ''
    },
    isValidLegalField(chkReady=false){
      if(chkReady) this.readyValidForm();
      const validators = this.validators;
      const tax_id = validators['tax_id'],
        company_name = validators['company_name'];

      const res1 = tax_id.chkValidAndShow('محتوای کد رهگیری مالیاتی نمی‌تواند خالی باشد')
        ,res2 = company_name.chkValidAndShow('محتوای نام حقوقی نمی‌تواند خالی باشد');

      const  regDate = validators['company_registered_at'];

      const res3 = regDate.chkValidAndShow('تمام ورودیهای تاریخ ثبت را پر کنید');

      const company_rid = validators['company_rid'];
      const res6 = company_rid.chkValidAndShow('محتوای شناسه ملی حقوقی نمی‌تواند خالی باشد');

      if(!res1||!res2||!res3||!res6){
        return false;
      }
      return true;
    },
    isValidSubmit({calbReset=null}={}){
      this.readyValidForm({calbReset});
      let fRes = true,fRes2 = true;
      const validators = this.validators;
      const frsName = validators['first_name'],
        lstName = validators['last_name'];
      const  birthDate = validators['birthday'];

      const res1 = frsName.chkValidAndShow('محتوای نام نمی‌تواند خالی باشد')
        ,res2 = lstName.chkValidAndShow('محتوای نام خانوادگی نمی‌تواند خالی باشد');
      const res3 = birthDate.chkValidAndShow('تمام ورودیهای تاریخ تولد را پر کنید');

      if(this.nonIran){
        const passport_number = validators['passport_number'],
          nationality = validators['nationality']
        ;

        const  universalId = validators['pervasive_code'];
        const  expireDate = validators['expire_date'];

        const res4 = nationality.chkValidAndShow('ملیت را انتخاب کنید');
        const res5 = passport_number.chkValidAndShow('محتوای شماره پاسپورت نمی‌تواند خالی باشد');
        const res7 = expireDate.chkValidAndShow('تمام ورودیهای تاریخ انقضاء پاسپورت را پر کنید');

        const res8 = universalId.chkValidAndShow('محتوای شناسه فراگیر نمی‌تواند خالی باشد');

        if(!res1||!res2||!res3||!res4||!res5||!res7||!res8){
          fRes = false;
        }
      }
      else {
        const ssn = validators['ssn'];
        const res6 = ssn.chkValidAndShow('محتوای کد ملی نمی‌تواند خالی باشد');
        if(!res1||!res2||!res3||!res6){
          fRes = false;
        }
      }
      if(this.hasLegalEntity){
        fRes2 = this.isValidLegalField();
      }
      return fRes && fRes2;
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
        let bd= fields.birthday;
        bd = bd.split('/')
        bd = moment.jConvert.toGregorian(bd[0]*1,bd[1]*1,bd[2]*1);

        const vars = {
          first_name: fields.first_name,
          last_name: fields.last_name,
          is_foreign: this.nonIran,
        }

        if(this.nonIran){
          vars.passport_number = langTools.convertToEnNum(fields.passport_number);
          vars.nationality = fields.nationality;

          let bdEx= fields.expire_date;
          bdEx = bdEx.split('/')
          bdEx = {
            gy:bdEx[0],
            gm:bdEx[1],
            gd:bdEx[2],
          };
          vars.passport_expire_date= `${bdEx['gy']}-${bdEx['gm']}-${bdEx['gd']}`;

          vars.foreign_pervasive_code = langTools.convertToEnNum(fields.pervasive_code);
        }
        else{
          vars.ssn = langTools.convertToEnNum(fields.ssn);
        }
        vars.birthday= `${bd['gy']}-${bd['gm']}-${bd['gd']}`;


        if(this.hasLegalEntity){
          let bd= fields.company_registered_at;
          bd = bd.split('/')
          bd = moment.jConvert.toGregorian(bd[0]*1,bd[1]*1,bd[2]*1);

          $zpl.mergeObj.call(vars,{
            tax_id: langTools.convertToEnNum(fields.tax_id),
            company_name: langTools.convertToEnNum(fields.company_name),
            company_rid: langTools.convertToEnNum(fields.company_rid),
            company_registered_at: `${bd['gy']}-${bd['gm']}-${bd['gd']}`,
          })
        }


        vm.loading = true;
        new GqlStore('PreferencesEdit',{querySchema:editPersonal}
        ).reqZplConnectPrj({vars})
        .then((respObj)=>{
          const resp = respObj.getResp();
          if(resp){
            window.setTimeout(()=>{
              if($zpl.isTest().__FormPersonal__emit__doneForm__){
                EventBus.$emit("doneForm",'FormPersonal');
              }
              if(calbDone)calbDone(resp);
              vm.goProfile();
              vm.loading = false;
            },4000)
          }
        })
        .catch((respObj)=>{
          vm.loading = false;
          const msg = respObj.getErrMsg();
          if(msg){
            vm.general_error = msg;
          }
          else{
            vm.general_error = 'خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.'
          }
        })
      }
    },
    chkValidateTik(tokenValid){
      let validTik = true; //felan optional hast pas validation chk hamishe true hast
      if(!validTik){
        this.tikError = true;
        if(tokenValid){
          tokenValid.success = false;
        }
      }
      else{
        this.tikError = false;
      }
    },
    onTik(val) {
      this.$refs.nonIranRef.classList[val?'remove':'add']('hidden');
      // this.$refs.birthDayRef.$el.classList[val?'add':'remove']('hidden');
      this.nonIran = val;
      if(this.aftTrySubmit){
        if(val){
          this.tikError = !val;
        }
        else{
          this.chkValidateTik();
        }
      }
    },
    cancelEdit(e){
      if(this.loading)return;
      this.goProfile();
    },
    goProfile(){
      this.$router.replace({path:`/profile/`});
    },
    goNextStep(){
      if(this.hasLegalEntity){
        this.$router.replace({path:`/form-legal/`});
      }
      else{
        this.goProfile()
      }
    },
  },
  mixins:[ValidationMixin,StatMixin]
};
</script>


