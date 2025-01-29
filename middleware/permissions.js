import includes from "lodash.includes";
import {lg, lgErr} from "@/src/js/dbg";
import {MyConfig} from "@/mixins/MyConfigMixin";
import {Permissions} from "@/mixins/PermissionMixin";

export default async ({ store, route, redirect }) => {

  store.$zpl.onInitial(store)

  if(!store.state.layouts.isWithoutRequest){
    if(route.path === '/'|| route.path === '/events/'){
        store.dispatch("application/getMe");
    }
    else{
        await store.dispatch("application/getMe");
    }
    store.dispatch("application/chkTickets");
    store.dispatch("application/capacity");
  }

  MyConfig.onInitial()

  if (Permissions.isSuperVisor()) {
    return false;
  }
  else if (Permissions.isAdmin()) {
    const routeName = route.name;

    if(routeName == 'privatePage___fa'){
      return false;
    }

    const adminAccess = [
      "index___fa",
      "profile___fa",
    ];

    if(!includes(adminAccess, routeName)){
      redirect({ name: "profile___fa" })
    }
  }
    /*else if(!Permissions.isLogedin()){//todo success vali felan misparam khdoe component ha handle konand
      if (route.path !== '/') {
        return redirect('/');
      }
  }*/
};
