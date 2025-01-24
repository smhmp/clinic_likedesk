<template>
  <div class="FormTracking formPersonalPg pgForm content">
    <page-heading :caption="caption" title="پیگیری تراکنش" hasReturn/>
    <form @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card',{loading}]">
      <div class="form" style="gap: 24px;">
        <TextInput
          iName="cardPan"
          inpId="cardPan"
          ltr
          :converterFormat="(e)=>{
            return convertTools.toCardPan(e)
          }"
          :i-label="'شماره کارت'"
          dataRules="required,cardPan"
          to-en-num
          v-model="fields.cardPan"
          autocomplete="on"
          dataTab="1"
        />
        <TextInput
          iName="amount"
          inpId="amount"
          ltr
          :converterFormat="(e)=>{
            return convertTools.toCurrency(e)
          }"
          :listenKeyUp="(e)=>{

          }"
          :i-label="'مبلغ (ریال)'"
          dataRules="currency"
          to-en-num
          v-model="fields.amount"
          autocomplete="on"
          dataTab="2"
        >
          <div slot="footer" class="slot-footer">
            <svg v-show="toWordToman" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 19H4C2.895 19 2 18.105 2 17V7C2 5.895 2.895 5 4 5H20C21.105 5 22 5.895 22 7V17C22 18.105 21.105 19 20 19Z" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M5 16H7" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M17 8H19" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M13.7678 10.2322C14.7441 11.2085 14.7441 12.7915 13.7678 13.7678C12.7915 14.7441 11.2085 14.7441 10.2322 13.7678C9.25592 12.7915 9.25592 11.2085 10.2322 10.2322C11.2085 9.25592 12.7915 9.25592 13.7678 10.2322" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span class="toman">{{toWordToman}}</span>
          </div>
        </TextInput>
        <DatePickerInline
          iName="transactDate"
          ref="transactDateRef"
          dataRules="required"
          title="تاریخ انجام تراکنش"
          dataTab="3"
        />
        <TextAreaSimple
          iName="explain"
          :i-label="'توضیحات'"
          v-model="fields.explain"
          dataRules="required"
          dataTab="4"
        />
        <div class="w-full document">
          <div class="description">پیوست فایل</div>
          <MyUpload ref="MyUploadRef"
                    :onSetFileId="onSetFileId"
                    topRule
          />
        </div>
      </div>
      <div v-if="general_error" class="error_msg">{{general_error}}</div>
      <div class="button-group">
        <ButtonSimple
          :onClkBtn="sendTransTracking" ButtonSimple
          isLoader="1"
          val-btn="ارسال"
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
import ticketAdd from "@/gql/FormTracking/ticketAdd";
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
import MyUpload from "@/components/form/MyUpload.vue";
import {convertTools} from "@/src/js/convertTools";
import TextAreaSimple from "@/components/form/TextAreaSimple.vue";


export default {
  name: "FormPersonal",
  head:{
    title:'کلینیک اینسایت | پیگیری تراکنش'
  },
  components: {TextAreaSimple, MyUpload, TooltipPro, DatePickerInline, PreviewPersonal, ButtonSimple, EasyChkBox, TextInput, AHref, Loaders,RadioCard },
  data() {
    return {
      tikError:false,
      aftTrySubmit:false,
      loading:false,
      nationality_error:'',
      general_error:'',
      fieldsFa:{
        cardPan:'شماره کارت',
        amount:'مبلغ (ریال)',
        transactDate:'تاریخ انجام تراکنش',
        explain:'توضیحات',
      },
      fields:{
        cardPan:'',
        amount:'',
        transactDate:'',
        explain:'',
      },
    };
  },
  async created() {
    EventBus.$on("finalValidate", (befOtherChk,tokenValid,success)=>{
      if(!befOtherChk){
        this.aftTrySubmit = true;
      }
      else{
        // this.tikError = false;
      }
    });
  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);

    const transDate = this.readyTransDate();

    this.readyValidForm({
      calbReset:this.calbReset
    });
  },
  computed: {
    caption(){
      let str = 'جهت درخواست پیگیری تراکنش فرم زیر را تکمیل کنید. درخواست شما در قالب تیکت‌ برای پشتیبانی اینسایت ارسال خواهد شد و نتیجه از طریق پیامک و بخش‌ ';
      str+=`<a class="outLink" href="${$zpl.infAdr().panelZplBeta+'/panel/ticket/'}" target="_blank">تیکت‌ها</a>`;
      str+=` به اطلاع شما خواهد رسید.`
      return str;
    },
    convertTools() {
      return convertTools
    },
    toWordToman(){
      if(!this.fields.amount)return '';
      let iAmount= parseInt(this.fields.amount.toString().replace(/,/g, ''))

      let value= convertTools.toPersianLetter(Math.round(((iAmount)/10)))+' تومان'
      return value
    },

  },
  methods: {
    onSetFileId(fileId){
      this.file_id=fileId;
    },
    readyTransDate(){
      const schem = {
        birth_day:'',
        birth_month:'',
        birth_year:'',
      },vm=this;

      const transDate = new DatePickerSels(new dateFaConf({yearRange:[1390,1403]}),this.$refs.transactDateRef.$el,['birth_day','روز','birth_month','ماه','birth_year','سال'],{onSelect(ttl,val){
          schem[ttl]=val;
          vm.fields.transactDate = `${schem.birth_year}/${schem.birth_month}/${schem.birth_day}`;
        }});
      return transDate;
    },
    calbReset(){
      this.general_error = ''
    },
    isValidSubmit({calbReset=null}={}){
      this.readyValidForm({calbReset});
      let fRes = true;
      const validators = this.validators;
      const cardPan = validators['cardPan'],
          explain = validators['explain'];

      const res1 = cardPan.chkValidAndShow('شماره کارت نمی‌تواند خالی باشد')
        const res2 = explain.chkValidAndShow('توضیحات نمی‌تواند خالی باشد');

      if(!res1||!res2){
        fRes = false;
      }

      return fRes;
    },
    async sendTransTracking(e,{calbDone}){
      const vm = this;
      if(vm.loading)return;
      if(this.isValidSubmit({calbReset:this.calbReset})){
        let content = '';

        this.general_error = '';
        const fields = this.fields;

        /*
   شماره کارت : 4806025154526480 مبلغ: 80,000   تاریخ: 1403/10/05 این یک درخواست تستی می باشد

   " شماره کارت : 4806025154526480 مبلغ: 80,000   تاریخ:  این یک تست دیگر می باشد"

   " شماره کارت : 4806025154526480 مبلغ:    تاریخ:  in yek test mibashad"
        * */

        content += `شماره کارت : ${fields.cardPan} مبلغ: ${fields.amount}   تاریخ: ${fields.transactDate} ${fields.explain}`
        const vars = {
          content:content,
          attachment:this.file_id,
          priority:"LOW",
          ticket_department_id:3,
          title:"پیگیری تراکنش",
        }

        vm.loading = true;
        new GqlStore('ticketAdd',{querySchema:ticketAdd}
        ).reqZplConnectPrj({vars})
        .then((respObj)=>{
          const resp = respObj.getResp();
          if(resp){
            window.setTimeout(()=>{
              if(calbDone)calbDone(resp);
              vm.goProfile(resp)
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
    cancelEdit(e){
      if(this.loading)return;
      this.goProfile();
    },
    goProfile(resp){
      let ticketUrl = $zpl.infAdr().panelZplBeta+'/panel/ticket/'+resp.id
      EventBus.$emit("openModalPro", 'modalNotif',{
        mainTitle:'درخواست پیگیری تراکنش ارسال شد',
        descHtml(){
          return  'نتیجه درخواست پس از بررسی کارشناسان امور مشتریان اینسایت، از طریق تیکت به اطلاع شما خواهد رسید.'
        },
        btnInf:[
          {
            title:'مشاهده تیکت',
            link:ticketUrl,
            type:'primary'
          },
          {
            title:'متوجه شدم',
            doClose:true,
            type:'secondary'
          }
        ]
      });
      this.$router.replace({path:`/profile/`});
    },
  },
  mixins:[ValidationMixin,StatMixin]
};
</script>


