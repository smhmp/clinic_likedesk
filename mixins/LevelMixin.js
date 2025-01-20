import {EventBus} from "~/plugins/event-bus";
import {GqlJSSdk} from "~/src/js/GqlJSSdk";
import {lg} from "~/src/js/dbg";
import {$zplUi} from "~/plugins/zplUi";
import {UserMan} from "@/mixins/UserMixin";

export const sortLevel = [
  (key)=>!key?'NEW':key==='NEW',
  (key)=>!key?'BLUE':['BLUE','BASIC'].some((eItm)=>{
    return key===eItm
  }),
  (key)=>!key?'SILVER':key==='SILVER',
  (key)=>!key?'GOLD':key==='GOLD',
]

export const indxLevel={
  'NEW':0,
  'BLUE':1,
  'SILVER':2,
  'GOLD':3,
};

export const faLevel={
  GOLD:'طلایی',
  SILVER:'نقره‌ای',
  BASIC:'آبی',
  BLUE:'آبی',
  NEW:'جدید',
  ADMIN:'ادمین',
};

export const testDataLevel = {
  //'NOT_COMPLETED', 'COMPLETED', 'WAITING', 'PROCESSING', 'REJECTED'
  aftTestLevel:'',
  statFormPersonal:'',
  nextLevelStep:'',
  listened:false,
  doneForm(subj){
    switch (subj){
      case 'FormPersonal':
        $zpl.setStorage('curLevel','NEW');
        testDataLevel.aftTestLevel='BLUE';
        testDataLevel.statFormPersonal='COMPLETED';
        testDataLevel.nextLevelStep='https://kyc.zarinpal.com';
    }
  },
  onListener(){
    if(!this.listened && $zpl.isLocal()){
      EventBus.$on('doneForm', this.doneForm);
      this.listened = true
    }
  },
}

let LevelMixin = {
  data(){
    return {
      loadData:false,
    }
  },
  created() {
    testDataLevel.onListener();
  },
  computed:{
    curLevel(){
      if($zpl.isTest().__curLevel__){
        return 'BLUE' //NEW , BLUE, SILVER, GOLD
      }
      return this.$store.state.application.userInfo.level || 'NEW'
    }
  },
  methods:{
    isNeerGold(curLevel){
      if(!curLevel){
        curLevel = this.curLevel
      }
      const numLvl = this.getIndxLevel(curLevel);
      return numLvl === indxLevel['SILVER']
    },
    isSilverOrMore(curLevel){
      if(!curLevel){
        curLevel = this.curLevel
      }
      const numLvl = this.getIndxLevel(curLevel);
      return numLvl >= indxLevel['SILVER']
    },
    isBlueOrMore(curLevel){
      if(!curLevel){
        curLevel = this.curLevel
      }
      const numLvl = this.getIndxLevel(curLevel);
      return numLvl >= indxLevel['BLUE']
    },
    isBlue(curLevel){
      if(!curLevel){
        curLevel = this.curLevel
      }
      const numLvl = this.getIndxLevel(curLevel);
      return numLvl === indxLevel['BLUE']
    },
    isChgedLevel(){
      const curLevel = this.curLevel;
      const storeLevel = $zpl.getStorage('curLevel');
      if(storeLevel){
        if(curLevel != storeLevel){
          return true;
        }
      }
      return false;
    },
    getIndxLevel(curLevel){
      const curIndx = sortLevel.findIndex((fn)=>{
        return fn(curLevel)
      });
      return curIndx;
    },
    goToKyc(e,{calbDone,calbFinal}={}){
      if(sortLevel[0](this.curLevel)){
        EventBus.$emit("openModalPro", 'modalKyc');
          calbDone && calbDone();
          calbFinal && calbFinal();
      }
      else{
        new GqlJSSdk('KycUrl').reqZplConnectPrj()
          .then((respObj)=>{
              const kycUrl = respObj.getResp();
            if(kycUrl){
              if(calbDone)calbDone()
              window.location.href = kycUrl;
            }
            else{
              // $zpl.toastMsg('لطفا با پشتیبان تماس بگیرید',{asError:true,delayTime:9000});
              EventBus.$emit("openModalPro", 'modalError');
              if(calbDone)calbDone();
            }
          }).catch((respObj)=>{
              respObj.showErr();
          }).finally(()=>{
            calbFinal && calbFinal();
        });
      }
    },
    getCurrPrgLevel(){
      const curLevel = this.curLevel;
      lg.col_boldOrange('getCurrPrgLevel / curLevel',curLevel);
      const indxLvl = this.getIndxLevel(curLevel)
      if(indxLvl !== indxLevel['NEW']){
        const storeLevel = $zpl.getStorage('curLevel');
        return storeLevel || 'NEW'
      }
      return 'NEW';
    },
    apiChkLevel(){
      const vm = this;
      this.loadData=true;

      $zpl.storeMan.dispatch("application/GetUpdateUser").then(()=>{

        this.repoPrgLvl = {curr:this.getCurrPrgLevel()};
        this.setPrgLvl();

        const isChgedLevel = this.isChgedLevel(this.curLevel);
        if(isChgedLevel){
          window.setTimeout(()=>{
            vm.loadData=false;
          },1000)
        }
        else{
          vm.loadData=false;
        }
        vm.$nextTick(()=>{
          vm.chkModalLevel();
        })
      });
    },
    async chkModalLevel(){
      const curLevel = this.curLevel;
      const storeLevel = $zpl.getStorage('curLevel');

      const showModalSt2Legal = function (){
        EventBus.$emit("openModalPro", 'modalNotif',{
          iconSvg:'legaldoc.svg',
          mainTitle:'ارسال مدرک و تکمیل حساب حقوقی',
          descHtml(){
            return  'جهت ثبت و تکمیل حساب حقوقی، لطفا از طریق بخش تکمیل حساب حقوقی، معرفی‌نامه رسمی شرکت با شرایط ذکر شده را بارگذاری نمایید.'
          },
          btnInf:[
            {
              title:'تکمیل حساب حقوقی',
              doClick(vm){
                vm.$router.replace({path:`/form-legal/`});
              },
              type:'primary'
            },
          ]
        });
      }

      if($zpl.isTest().__modal__step2Legal__){
        showModalSt2Legal()
      }

      let showModal = false;

      if(storeLevel){
        if(curLevel != storeLevel){
          const curIndx = this.getIndxLevel(curLevel)
          if(curIndx !== indxLevel['NEW']){
            if(curIndx < indxLevel['GOLD'] ){
              showModal = true;
              if(sortLevel[1](curLevel) && UserMan.isLegal()){
                showModalSt2Legal();
              }
              else{
                EventBus.$emit('openModalPro', 'modalComplete');
              }
            }
            this.chgLevel({bef:storeLevel,aft:curLevel})
          }
          $zpl.setStorage('curLevel',curLevel)
        }
        else{
          this.chgLevel({curr:curLevel})
        }
      }
      else{
        this.chgLevel({curr:curLevel})
        $zpl.setStorage('curLevel',curLevel)
      }
      if(!showModal){
        this.chkModalCompleteLegal();
      }
    },
    chkModalCompleteLegal(){
      const vm = this;
      const __ = $zpl.isTest().__modalCompleteLegal__;
      const currStat = this.statAct('legal');
      const isRem = $zpl.getStorage('showModal_complete_legal'+vm.zpId) == currStat;
      if(!isRem){
        const isLegal = UserMan.isLegal();
        const isBlue = this.isBlue(this.curLevel);
        if(__||(isLegal&&isBlue&&(currStat=='NOT_COMPLETED'||currStat=='REJECTED'))){
          EventBus.$emit("openModalPro", 'modalNotif',{
            mainTitle:'یادآوری ارسال مدرک حقوقی',
            descHtml(){
              return  'جهت تکمیل حساب حقوقی، لطفا از طریق "تکمیل حساب حقوقی" با شرایط ذکر شده معرفی نامه رسمی را بارگذاری نمایید.'
            },
            btnInf:[
              {
                title:'تکمیل حساب حقوقی',
                doClick(vmProgress){
                  vmProgress.$router.replace({path:`/form-legal/`});
                },
                type:'primary'
              },
              {
                title:'متوجه شدم',
                doClick(vmProgress,doClose){
                  // $zpl.setStorage('showModal_complete_legal'+vm.zpId,currStat);
                },
                type:'secondary'
              }
            ]
          });
        }
      }
    },
  },
}
export default LevelMixin;
