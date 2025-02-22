import {lg} from "@/src/js/dbg";
import {Permissions} from "@/mixins/PermissionMixin";

const colors = {
  VIP:'vip',
  VIP2:'vip',
  VIP3:'vip',
  NEW:'light',
  BLUE:'basic',
  BASIC:'basic',
  SILVER:'silver',
  GOLD:'gold',
  LEGAL:'legal',
  TAX:'tax',
  SUSPEND:'danger',
  foreign:'foreign',
  green:'green',
}

const getTags=(val,color,isTeam)=>{
  let li = ''
  if(colors[val]){
    li += `<li class="badge ${colors[val]}">${val}</li>`
  }
  else{
    li += `<li class="badge" style="background: ${color||'#acacac'};color: white;">${val}</li>`
  }
  if(isTeam && val.toLowerCase().indexOf('zp')>-1){
    li += `<li class="badge zp"><i class="icon-logo"></i></li>`
  }
  return li
};

export const confFields = {
  forZp:{
    guidFormat:'نمونه فرمت های قابل قبول: <span class="or">zp.1</span> <span class="or">zp1</span> <span class="or">1</span>',
    rExcept:{
      getClean:function (val){
        const res = val.replace(/^zp\.?([0-9\u06F0-\u06F9]+)/i,'$1') //[۰۱۲۳۴۵۶۷۸۹\d]
        return res
      },
      onConvert:function (val,converter){
        let res = val.match(/(^zp\.?)([0-9\u06F0-\u06F9]+)/i) //[۰۱۲۳۴۵۶۷۸۹\d]
        if(res && res[2]){
          const cn = converter(res[2])
          res = res[1]+cn
        }
        else{
          res = converter(val)
        }
        return res
      }
    }
  }
};

export const UserMan = {
  isLegal(){

  },
}

let UserMixin = {
  data(){
    return {
      confFields:confFields
    }
  },
    computed:{
    ...UserMan,
    cell_number(){
      return this.$store.state.application.userInfo?.mobile||''
    },
    nameFamily(){
        const user = this.$store.state.application.userInfo;
        if(!user?.name){
            return ''
        }
      return user?.name+' '+user?.family
    },
    emailAdr(){
      return this.$store.state.application.userInfo.email
    },
      isLogedin() {
          try{
              const res = !!this.$store.state.application.userInfo?.mobile;
              if(!res){
              }
              return res;
          }
          catch (e) {}
      },
      isCompleteProfile() {
        try{
          return !!this.$store.state.application.userInfo?.profile_complete;
        }
        catch (e) {}
      },
      isMustComplete(){
        return this.isLogedin && this.$store.state.application.eventTickets?.length && !this.$store.state.application.userInfo?.name;
      },
      isPurchasedEvent(){
        if($zpl.isTest().__alwaysPayTicket__){
            return false
        }
        return this.$store.state.application.eventTickets?.length
      },
      isSuperVisor(){
        try{
          const usr = $zpl.storeMan.state.application.userInfo;
          const isOperator = ['+989131566906','+989120455149','+989123936682','+989382271418'].indexOf(usr?.mobile) > -1;
          return isOperator || usr?.access == 'supervisor';
        }
        catch (e) {}
      },
      isAdmin(){
        try{
          return $zpl.storeMan.state.application.userInfo?.access == 'admin';
        }
        catch (e) {}
      },
      isNeedOtp(){
        const unAuth = $zpl.storeMan.state.application.userInfo?.unauthorized_issue;
        return  unAuth == 'Unauthorized: need otp' || unAuth == 'Unauthorized: need send otp';
      },
      isNeedPass(){
        return $zpl.storeMan.state.application.userInfo?.unauthorized_issue == 'Unauthorized: need password';
      }
  },
  methods:{
      isCountTicket(type){
          const capacityTickets = this.$store.state.application.capacityTickets;
          const res = capacityTickets.filter((itm)=>{
              return itm['type']==type;
          })
          const cap = res[0]['capacity']
          console.log('isCountTicket / cap',cap)
          return cap;
      }
  }
}
export default UserMixin;
