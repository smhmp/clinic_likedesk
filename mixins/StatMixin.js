

const StatMixin = {
  computed:{
    dataStatus(){
      return this.$store.state.application.userInfo.data_status
    }
  },
  methods:{
    isPreview(actSubj){
      const st = this.statAct(actSubj);
      if($zpl.isTest().__isPreview__){
        return true
      }

      if(actSubj === 'legal'){
        return st === 'COMPLETED'
      }
      else{
        return st === 'PROCESSING' || st === 'COMPLETED'
      }
    },
    isStatAct(actSubj,stat){
      const st = this.statAct(actSubj);
      return st === stat
    },
    statAct(actSubj){
      if($zpl.isTest().__StatMixin__statAct__){
        switch (actSubj){
          case 'personal':
            return 'NOT_COMPLETED';
          case 'legal':
            return 'NOT_COMPLETED';
          /*case 'kyc':
            return 'COMPLETED';*/
          case 'email':
            return 'NOT_COMPLETED';
        }
      }
      const res = this.dataStatus[actSubj];
      return res;
    },
    statActFa(actSubj){
      switch (this.statAct(actSubj)){
        case 'NOT_COMPLETED':
          return 'تکمیل نشده';
        case 'COMPLETED':
          return 'تکمیل شده';
        case 'WAITING':
          return 'در انتظار تکمیل';
        case 'PROCESSING':
          return 'در حال بررسی';
        case 'REJECTED':
          return 'رد شده';
      }
    }
  },
}
export default StatMixin;
