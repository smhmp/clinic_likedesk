import {$zpl} from "@/plugins/zpl";
export const MyConfig = {
  conf_aHref:null,
  onInitial(){
    this.conf_aHref = {
      rowTicket:$zpl.isLocal()?'':'newTab'
    }
  }
};

export const MyConfigMixin = {
  data(){
    return {
      MyConfig:MyConfig,
    }
  },
  methods:{
    isConf_aHref(subj,ifBe){
      return MyConfig.conf_aHref[subj] === ifBe
    }
  }
}
