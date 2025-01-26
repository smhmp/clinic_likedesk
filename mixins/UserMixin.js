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
              return !!this.$store.state.application.userInfo?.mobile;
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
      }
  },
  methods:{

  }
}
export default UserMixin;
