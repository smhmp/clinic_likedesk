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
      <div v-for="(value, key) in fieldsFa" class="action-list-item" :key="key" v-if="getValueField(key) !== null">
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
</template>
<script>

import moment from "moment-jalaali";
import {listCountries} from "@/src/js/personalData";
import {UserMan} from "@/mixins/UserMixin";

export default {
  name: "PreviewPersonal",
  props:{
    fieldsFa:{},
    statAct:'',
    statActFa:'',
  },
  methods: {
    isValidValue(key){
      const res = this.getValueField(key);
      if(res !== undefined){
        return true
      }
      return false
    },
    getValueField(key){
      const userInfo = this.$store.state.application.userInfo;
      let res;
      switch (key){
        case 'birthday':
          res = userInfo[key];
          if(!res)return '';
          res = res.split('-');
          res = moment.jConvert.toJalaali(res[0]*1,res[1]*1,res[2]*1);
          res = res.jy+'/'+res.jm+'/'+res.jd
          return res;
        case 'ssn':
          if(this.isNonIran)return null;
          res = userInfo[key];
          if(!res)return '';
          return res;
        case 'passport_number':
          if(!this.isNonIran)return null;
          res = userInfo?.additional_identification_info?.passport?.passport_number;
          if(!res)return '';
          return res;
        case 'nationality':
          if(!this.isNonIran)return null;
          res = userInfo?.additional_identification_info?.passport?.nationality;
          if(!res)return '';
          let nationalName = '';
          if(res === 'zz'){
            nationalName = 'سایر'
          }
          else{
            $zpl.loopi(listCountries,(eInf)=>{
              if(eInf.code === res){
                nationalName = eInf.text;
                return false;
              }
            })
          }
          return nationalName;
        case 'expire_date':
          if(!this.isNonIran)return null;
          res = userInfo?.additional_identification_info?.passport?.expire_date;
          if(!res)return '';
          return res;
        case 'pervasive_code':
          if(!this.isNonIran)return null;
          res = userInfo.ssn;
          if(!res)return '';
          return res;
        case 'company_registered_at':
          if(!UserMan.isLegal())return null;
          res = userInfo[key];
          if(!res)return '';
          res = res.split('-');
          res = moment.jConvert.toJalaali(res[0]*1,res[1]*1,res[2]*1);
          res = res.jy+'/'+res.jm+'/'+res.jd
          return res;
        case 'company_rid':case 'company_name':
          if(!UserMan.isLegal())return null;
          res = userInfo[key];
          if(!res)return '';
          return res;
        default:
          res = userInfo[key];
          if(!res)return '';
          return res;
      }
    }
  },
  computed:{
    isNonIran(){
      const userInfo = this.$store.state.application.userInfo;
      return !!userInfo?.additional_identification_info?.passport?.passport_number
    },
  }
};
</script>
