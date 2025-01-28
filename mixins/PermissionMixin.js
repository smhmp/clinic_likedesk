import {lg} from "@/src/js/dbg";

export const Permissions = {
  isSuperVisor(){
    try{
      const usr = $zpl.storeMan.state.application.userInfo;
      const isOperator = ['+989120455149','+989123936682','+989382271418'].indexOf(usr?.mobile) > -1;
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
}

let PermissionMixin = {
  computed:{
    isSuperVisor:Permissions.isSuperVisor
  }
}
export default PermissionMixin;
