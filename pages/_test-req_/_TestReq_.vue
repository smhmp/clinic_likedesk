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
      // this.goReq('purchase','post',{"ticket_id": 1, "user_mobile": "09131566906"});
      // this.goReq('update-profile','post',{mobile: "09131566906", "first_name": "حامد", "last_name": "موسوی", "gender": "male", "age": 30});

      // this.goReq('login','post',{mobile: "09131566906"},{},(resp)=>{
      //   lg('token set');
      //   $zpl.setStorage('AuthorizationKey2',resp['auth_token']);
      // });

      // this.goReq('logout','post');
      // this.goReq('admin/tickets','get');
      // this.goReq('my-tickets','get');

      // this.goReq('purchase-multiple','post',{
      //   "tickets": [
      //     { "ticket_title": 'vip', "quantity": 1 },
      //     { "ticket_title": 'normal', "quantity": 2 }
      //   ]
      // });

      //todo from bank
      // const sessId ='2fbd1554-2bc7-4cd2-83a5-d6827c5877a8';
      // this.goReq(`update-payment-status?session_id=${sessId}&status=paid`,'get');

      // this.goReq('order-status/2fbd1554-2bc7-4cd2-83a5-d6827c5877a8','get');

      this.goReq('assign-tickets','post',{
        "assignments": [
          {
            "mobile": "09121112222",
            "ticket_id": 1,
            "first_name": "Ali",
            "last_name": "Rezaei",
            "gender": "male",
            "age": 30
          },
          {
            "mobile": "09332221111",
            "ticket_id": 2,
            "first_name": "Sara",
            "last_name": "Ahmadi",
            "gender": "female",
            "age": 25
          }
        ]
      });

    },
    goReq(path,reqType='post',args={},headers,calb){
      if(path.indexOf('?')>-1){
        path+='&'
      }
      else{
        path+='?'
      }

      $zpl.zplConnectPrj_v2.reqDirect({
        baseUrl:`http://clinic_ticket.local/api/${path}XDEBUG_SESSION_START=11224`,
        args:args,
        configs:{
          reqType:reqType,
          headers:headers
        },
      }).then(async (respObj)=>{
        const resp = respObj.getResp().data;
        lg.col_onResp(`resp/ ${path}`,resp);
        if(resp.stat){
          calb && calb(resp);
        }
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
    }
  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


