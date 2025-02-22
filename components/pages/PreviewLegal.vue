<template>
  <div class="PreviewPersonal card">
    <div class="block">
      <div class="heading">
        <div class="contentA">
          <div class="title">اطلاعات ثبت شده</div>
        </div>
      </div>
      <div class="action-list-item">
        <div class="container">
          <div class="stack">
            <div class="frame-12577">
              <div :class="['status','st_'+statAct]">
                <div :class="['label']">{{statActFa}}</div>
              </div>
            </div>
            <div class="stack2">
              <div class="labelA2">وضعیت</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loadingInf" class="container loadingInf">
        <div class="stack">
          <div class="stack2">
            <svg viewBox="25 25 50 50" class="circular-loader prgs previewPage"><circle cx="50" cy="50" r="20" fill="none" stroke="#d9d9d9" stroke-width="3" class="loader-path"></circle></svg>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(value, key) in fieldsFa" class="action-list-item" :key="key">
          <div class="container">
            <div class="stack">
              <div class="stack2">
                <div class="value">{{getValueField(key)}}</div>
                <div class="label3">{{value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import moment from "moment-jalaali";
import {GqlStore} from "@/src/js/GqlStore";
import GetLegal from "@/gql/FormLegal/GetLegal";
import {$zpl} from "@/plugins/zpl";

export default {
  name: "PreviewLegal",
  props:{
    fieldsFa:{},
    statAct:'',
    statActFa:'',
  },
  data(){
    return {
      loadingInf:true,
      legalInf:null,
    }
  },
  mounted() {
    this.readyLegaInf();
  },
  methods: {
    readyLegaInf(){
      const vm = this;
      this.loadingInf = true;
      new GqlStore('Me',{querySchema:GetLegal}
      ).reqZplConnectPrj().then((respObj)=>{
        vm.legalInf = respObj.getResp();
        vm.loadingInf = false;
      }).catch((respObj)=>{
        $zpl.showRespErr(respObj);
      });
    },
    getValueField(key){
      const legalInf = this.legalInf;
      let res = legalInf?.[key];
      if(!res) return ''
      if(key === 'company_registered_at'){
        res = res.split('-');
        res = moment.jConvert.toJalaali(res[0]*1,res[1]*1,res[2]*1);
        res = res.jy+'/'+res.jm+'/'+res.jd
      }
      return res
    }
  },
};
</script>
