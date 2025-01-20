import axios from "axios";
import configInf from "@/configs";
import {$zpl} from "@/plugins/zpl";
import {lg} from "@/src/js/dbg";
import {DirectRequest_v2} from "@/src/js/DirectRequest_v2";
import "@/src/js/directive"


const gqlVersion = '/api/v4/graphql';



const argsRequest = {
  axios:axios.create({}),
  gqlVersion:gqlVersion,
  queryParams:{
    // XDEBUG_SESSION_START:'PHPSTORM'
  },
  baseUrl:`${configInf.directRoot($zpl.getRootHost())}${$zpl.getSwitcherSlug()}`,
  configs:{
    headers: {
      'Content-Type': 'application/json',
      // accept: 'application/json',
    },
    withCredentials: true,
  },
  authErr({resp, err}){
    const {rootAdr,adrAuth} = $zpl.infAdr();

    let redirectAuth = '';
    if(rootAdr){
      redirectAuth = `${adrAuth}&redirect=${rootAdr}/profile/`;
    }
    else{
      redirectAuth = '';
    }

    const getMsgGrant=()=>{
      let msg = 'نیاز به لاگین می باشد. '
      if(redirectAuth){
        msg += 'به صفحه لاگین هدایت می شوید. لطفا منتظر بمانید.'
      }
      return msg
    }

    if(!resp && !err){
      return;
    }

    if(err && typeof err == "object" && !(err instanceof Array)){
      resp = err.response || err.networkError;
    }

    if (resp && (resp.status == 401 || resp.statusText == 'Unauthorized' || resp.statusCode == 401)) {
      $zpl.toastMsg(getMsgGrant(),{asError:true,justOnce:'redirectLogin',delayTime:10000})
      lg.col_boldOrange('redirectUrl',redirectAuth);
      redirectAuth && $zpl.redirectUrl(redirectAuth)
      return
    }

    if(resp && resp?.data?.errors){
      const reason = resp['data']['errors'][0]
      if(reason['readable_code'] === "INVALID_GRANT"){
        $zpl.toastMsg(getMsgGrant(),{asError:true,justOnce:'redirectLogin',delayTime:10000})
        lg.col_boldOrange('redirectUrl',redirectAuth);
        redirectAuth && $zpl.redirectUrl(redirectAuth)
        return
      }
    }
    if (err && typeof err == "object" && !(err instanceof Array) && err.graphQLErrors && err.graphQLErrors[0] && err.graphQLErrors[0].readable_code == "AccessDenied_Client") {
      $zpl.toastMsg('کلاینت یافت نشد',{asError:true});
    }
  }
}

$zpl.zplConnectPrj_v2=new DirectRequest_v2(argsRequest);
