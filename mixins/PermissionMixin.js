import {lg} from "@/src/js/dbg";

export const Permissions = {
  isSuperVisor(){
    try{
      return $zpl.storeMan.state.application.userInfo?.access == 'supervisor';
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
