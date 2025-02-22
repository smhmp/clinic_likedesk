<template>
  <div class="modal-lock">
    <div class="modalPro modal">
      <div class="modal-body">
        <div class="Closebutton" @click="close">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="white"/>
            <path d="M14 14L26 26" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 14L14 26" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headerAvatar" v-if="forAvatar">
          <div class="avatar">
            <div class="profile-fill">
              <img class="group" src="@/assets/imgs/autohtml-2/modalPro/group0.svg" />
            </div>
          </div>
          <img class="image-1" src="@/assets/imgs/autohtml-2/modalPro/image-10.png" />
        </div>
        <div class="headerAvatar" v-else-if="forLevel">
          <svg width="152" height="144" viewBox="0 0 152 144" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="12" width="120" height="120" rx="60" fill="#E0FFF5"/>
            <path d="M98.5095 74.5009V84.5051C98.5095 90.0302 94.0305 94.5092 88.5053 94.5092H63.4949C57.9697 94.5092 53.4907 90.0302 53.4907 84.5051V59.4946C53.4907 53.9695 57.9697 49.4905 63.4949 49.4905H73.4991" stroke="#248061" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M101.01 58.5943C100.243 63.3107 96.2475 66.8261 91.4718 66.9864C86.696 67.1467 82.4736 63.9072 81.3917 59.2528C80.3099 54.5984 82.6707 49.8287 87.0276 47.8663C91.3845 45.9038 96.521 47.2966 99.2898 51.1912L91.1689 59.2795L87.7375 55.8481" stroke="#248061" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M63.4949 82.0041H88.5053" stroke="#248061" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M63.4949 71.9999H76.0001" stroke="#248061" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headerAvatar" v-else-if="forNotif">
          <img v-if="customIcon" class="customIcon" :src="customIcon" />
          <svg v-else width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" width="120" height="120" rx="60" fill="#E0F0FE"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M63.5 89.0557H58.5C55.7375 89.0557 53.5 86.9425 53.5 84.3335V60.7223C53.5 58.1133 55.7375 56.0001 58.5 56.0001H93.5C96.2625 56.0001 98.5 58.1133 98.5 60.7223V84.3335C98.5 86.9425 96.2625 89.0557 93.5 89.0557H78.1875L67.6625 97.898C66.05 99.2533 63.5 98.1719 63.5 96.1343V89.0557Z" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M63.4998 67.25H88.4998" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M63.4998 77.2501H80.9998" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headerAvatar" v-else-if="forKycNeed">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="60" fill="#E0F0FE"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M59.9999 82.5V82.5C47.5724 82.5 37.4999 72.4275 37.4999 60V60C37.4999 47.5725 47.5724 37.5 59.9999 37.5V37.5C72.4274 37.5 82.4999 47.5725 82.4999 60V60C82.4999 72.4275 72.4274 82.5 59.9999 82.5Z" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M60.0001 60V72.5" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M59.9976 50C59.6526 50 59.3726 50.28 59.3751 50.625C59.3751 50.97 59.6551 51.25 60.0001 51.25C60.3451 51.25 60.6251 50.97 60.6251 50.625C60.6251 50.28 60.3451 50 59.9976 50" stroke="#006BC9" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headerAvatar" v-else-if="forError">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="60" fill="#FFEBEB"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M60 37.5V37.5C72.4275 37.5 82.5 47.5725 82.5 60V60C82.5 72.4275 72.4275 82.5 60 82.5V82.5C47.5725 82.5 37.5 72.4275 37.5 60V60C37.5 47.5725 47.5725 37.5 60 37.5Z" stroke="#C93637" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M60.0002 61.25V48.75" stroke="#C93637" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M59.9978 70C59.6528 70 59.3728 70.28 59.3753 70.625C59.3753 70.97 59.6553 71.25 60.0003 71.25C60.3453 71.25 60.6253 70.97 60.6253 70.625C60.6253 70.28 60.3453 70 59.9978 70" stroke="#C93637" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="midContent" v-if="forAvatar">
          <div class="Title">تغییر تصویر پروفایل</div>
          <div class="Caption">
            <span>در حال حاضر می‌توانید با استفاده از سرویس </span>
            <span>Gravatar</span>
            <span> تصویر پروفایل‌ خود را تنظیم کنید و در اینسایت مشاهده کنید.</span>
          </div>
        </div>
        <div class="midContent" v-else-if="forLevel === 'BLUE'||forLevel === 'BASIC'">
          <div class="Title">تبریک! سطح شما به آبی ارتقا یافت</div>
          <div class="Caption">
            <span>مشخصات فردی شما تأیید شد. برای ارتقا به سطح نقره‌ای و دریافت درگاه پرداخت، احراز هویت ویدیویی را تکمیل کنید.</span>
          </div>
        </div>
        <div class="midContent" v-else-if="forLevel === 'SILVER'">
          <div class="Title">تبریک! سطح شما به نقره‌ای ارتقا یافت</div>
          <div class="Caption">
            <span>احراز هویت شما با موفقیت انجام شد. اکنون می‌توانید از تمام خدمات کلینیک اینسایت استفاده کنید.</span>
          </div>
        </div>
        <div class="midContent" v-else-if="forNotif">
          <div class="Title">{{moreData.mainTitle}}</div>
          <div class="Caption">
            <span v-html="moreData.descHtml()"></span>
          </div>
        </div>
        <div class="midContent" v-else-if="forKycNeed">
          <div v-if="prsnIsProcess" class="Title">مشخصات فردی در حال بررسی می باشد.</div>
          <div v-else class="Title">مشخصات فردی تکمیل نشده است.</div>
          <div class="Caption">
            <span v-if="prsnIsProcess" >پیش از احراز هویت ویدیویی، نیاز است مشخصات فردی تایید شود.</span>
            <span v-else>پیش از احراز هویت ویدیویی، نیاز است که مشخصات فردی خود را تکمیل نمایید.</span>
          </div>
        </div>
        <div class="midContent" v-else-if="forError">
          <div class="Title">خطا در دریافت اطلاعات</div>
          <div class="Caption">
            <span>متاسفانه خطای نامشخصی در دریافت اطلاعات رخ داده‌ است، لطفا با پشتیبانی تماس بگیرید.</span>
          </div>
        </div>
      </div>
      <div :class="['ModalFooter',{loading}]">
        <div v-if="forAvatar" class="Containedbutton" @click="onClickAvatar">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6 7.05005L17.5 16.95" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.55 7L7.59999 7.049L7.54999 14" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="Label">gravatar.com</div>
        </div>
        <ButtonSimple
          v-else-if="forLevel||forKycNeed||forError"
          :onClkBtn="onClickOtherLevel" ButtonSimple
          isLoader="1"
          :val-btn="forLevel === 'BLUE'||forLevel === 'BASIC'?'احراز هویت ویدیویی':
          forKycNeed?(prsnIsProcess?'متوجه شدم':'تکمیل مشخصات فردی'):
          forError?'پیشتیبانی اینسایت':
          'متوجه شدم'"
          :type="forError?'secondary':'primary'"
          isFullWidth="1"
          :isArrowLeft="forLevel === 'BLUE'||forLevel === 'BASIC'"
          :isArrowOut="forError"
        />
        <ButtonSimple
          v-else-if="forNotif" ButtonSimple
          v-for="(eBtn,indx) in moreData.btnInf"
          :disabledUntil="eBtn.disabledUntil"
          :key="indx"
          :onClkBtn="eBtn.doClose ? close : (e)=>{
            onClickOtherLevel(e,{eBtn});
          }"
          isLoader="1"
          :val-btn="eBtn.title"
          :type="eBtn.type"
          isFullWidth="1"
          :isArrowOut="eBtn.link"
        />
      </div>
    </div>
    <div @click="close" class="darkFilter modal"></div>
  </div>
</template>
<script>
import ButtonSimple from "@/components/form/ButtonSimple.vue";
import StatMixin from "@/mixins/StatMixin";

export default {
  name: "ModalPro",
  components: {ButtonSimple},
  props: {
    forAvatar:false,
    forLevel:'',
    forKycNeed:false,
    forError:false,
    forNotif:false,
    onGotoKyc:null,
    moreData:{
      disabledUntil:0,
      mainTitle:'',
      descHtml(){
        return  ''
      },
      btnInf:{
        title:'',
        link:'',
      }
    }
  },
  data(){
    return{
      loading:false
    }
  },
  computed:{
    customIcon(){
      return this.moreData.iconSvg ? `/svgs/${this.moreData.iconSvg}` : null;
    },
    prsnIsProcess(){
      return this.statAct('personal') === 'PROCESSING';
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onClickOtherLevel(e,{calbDone,eBtn=null}={}){
      if(eBtn){
        if(eBtn.doClick){
          eBtn.doClick(this)
        }
        else{
          $zpl.openLink(eBtn.link,'_blank');
        }
        this.$emit("close");
        return
      }
      if(this.forKycNeed){
        if(!this.prsnIsProcess){
          this.gotoPersonal();
        }
        this.$emit("close");
      }
      else if(this.forError){
        this.gotoSupport();
        this.$emit("close");
      }
      else if(this.forLevel === 'BLUE'||this.forLevel === 'BASIC'){
        this.loading = true
        const vm = this;
        this.onGotoKyc(e,{
          calbDone(){
            vm.loading = false;
            calbDone && calbDone();
            vm.$emit("close");
          }
        });
      }
      else{
        this.$emit("close");
      }
    },
    gotoPersonal(){
      this.$router.push({path:'/form-personal/'});
    },
    gotoSupport(){
      $zpl.openLink('https://www.insight-clinic.com/contact.html','_blank');
    },
    onClickAvatar(e){
      $zpl.openLink('https://gravatar.com','_blank')
    },
  },
  mixins:[StatMixin]
};
</script>
