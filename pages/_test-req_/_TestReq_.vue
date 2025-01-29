<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده تیکت ها و فعالیتهای ثبت شده" title="تیکت‌های من" backPath="/profile/"/>
    <div class="ActInline card">



      <div class="list-empty">
        <div class="content2">
          <div class="title2">test1</div>
          <div class="caption2">
            res1
          </div>
        </div>
        <div class="contained-button cursor-pointer" @click="reqGetUser">
          <div class="label2">do test1</div>
          <img class="plus" src="@/assets/imgs/transactions/plus0.svg" />
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import UserMixin, {confFields, UserMan} from "@/mixins/UserMixin";
import {lg, lgErr} from "@/src/js/dbg";
import Loaders from "@/components/global/Loaders.vue";
import AHref from "@/components/global/AHref.vue";
import {EventBus} from "@/plugins/event-bus";
import ActionInlineItem from "@/components/pages/ActionInlineItem.vue";
import ActionInlineGroup from "@/components/pages/ActionInlineGroup.vue";
import LevelMixin from "@/mixins/LevelMixin";
import StatMixin from "@/mixins/StatMixin";
import {$zpl} from "@/plugins/zpl";

export default {
  name: "_TestReq_",
  head:{
    title:'_TestReq_'
  },
  components: {ActionInlineGroup, ActionInlineItem, AHref, Loaders },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);


  },
  computed: {

  },
  methods: {
    reqGetUser(){
      $zpl.zplConnectPrj_v2.reqDirect({
        baseUrl:'http://clinic_ticket.wobo/api/?XDEBUG_SESSION_START=11224',
        configs:{
          get:1
        },
      }).then(async (respObj)=>{
        const resp = respObj.getResp();

      })
      .catch((respObj)=>{
        /**
         * @var respObj
         * @type RespObj
         */
        const msg = respObj.getErrMsg();
        if(msg){
          $zpl.toastError(msg);
        }
        else{
          $zpl.toastError(respObj.err+'');
        }
      })
    },

  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


