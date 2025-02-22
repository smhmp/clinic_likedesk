<template>
  <div class="profilePg body">
    <page-heading caption="مشاهده تیکت ها و فعالیتهای ثبت شده" title="تیکت‌های من" backPath="/profile/"/>
    <div class="ActInline card">
      <div class="content2">
        <div class="title2">محیط تست</div>
      </div>
      <div class="list-empty">
        <div class="formPersonalPg pgForm content">
          <form v-if="activeInp" @submit="(e)=>{$zpl.prevEvery(e)}" :class="['card']">
            <div class="form" style="gap: 24px;">
              <TextInput
                iName="test"
                :i-label="'test'"
                v-model="fieldFiller('test').test"
              />
            </div>
          </form>
        </div>
        <div v-if="titleReq" class="contained-button cursor-pointer" @click="onClickTestReq">
          <div class="label2">{{titleReq}}</div>
        </div>
        <div class="content2">
          <div class="title2">:تتیجه تست</div>
          <div class="caption2">
            {{resVWTest}}
          </div>
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
import TextInput from "@/components/form/TextInput.vue";

export default {
  name: "_TestReq_",
  head:{
    title:'_TestReq_'
  },
  components: {TextInput, ActionInlineGroup, ActionInlineItem, AHref, Loaders },
  data() {
    return {
      activeInp:false,
      fields: {},
      titleReq: '',
      resTest: {},
    };
  },
  created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
    this.mkSendReq();
  },
  computed: {
    resVWTest(){
      try{
        return JSON.stringify(this.resTest)
      }
      catch (e) {
        return this.resTest+''
      }
    }
  },
  methods: {
    onClickTestReq:function () {},
    async mkSendReq(){

      this.mkReq(0, 'login','post',{
        args:{mobile: "09131566906"},
        calb(resp){
          lg('token set');
          $zpl.setStorage('Authorization-Anony',resp['auth_token']);
        }
      })

      this.mkReq(0, 'logout','post');

      this.mkReq(1, 'user-info','get');

      this.mkReq(0, 'update-profile','post',{args:{mobile: "09131566906", "first_name": "حامد", "last_name": "موسوی", "gender": "male", "age": 30}});

      this.mkReq(0, 'purchase','post',{
        args:{"ticket_title": 'vip', "mobile": "09131566906"},
        calb(resp){
          lg('purchase',resp);
        }
      },);

      this.mkReq(0, 'admin/tickets','get');

      this.mkReq(0, 'my-tickets','get');

      this.mkReq(0, 'purchase-multiple','post',{args:{
          "tickets": [
            { "ticket_title": 'vip', "quantity": 1 },
            { "ticket_title": 'normal', "quantity": 2 }
          ],
          calb(resp){
            lg('purchase-multiple',resp);
          }
      }});

      //todo after purchase multiple
      const sessId ="1c0e306b-5ee1-4290-af21-d649d81a436c";
      //todo from bank
      this.mkReq(0, `update-payment-status?session_id=${sessId}&status=paid`,'get');

      this.mkReq(0, 'order-status/'+sessId,'get');

      //todo assign other user
      this.mkReq(0, 'assign-tickets','post',{args:{
        "assignments": [
          {
            "mobile": "09121112222",
            "transaction_id": "gsUJCJ44162",
            "first_name": "Ali",
            "last_name": "Rezaei",
            "gender": "male",
            "age": 30
          },
          {
            "mobile": "09332221111",
            "transaction_id": "JboQd396242",
            "first_name": "Sara",
            "last_name": "Ahmadi",
            "gender": "female",
            "age": 25
          }
        ]
      }});

      this.mkReq(0, 'admin/logs?per_page=30&page=1','get');

      this.mkSrchUser(0, 'users/search');


      this.mkReq(0, 'send-otp','post');

      this.mkReq(0, 'verify-otp','post',{
        args:{
          "otp": "481238"
        },
        calb(resp){
          lg('token valid set',resp);
          $zpl.setStorage('Authorization-Valid',resp['auth_token_short']);
        }
      });

      this.mkReq(0, 'auth/set-password','post',{
        args:{
          password:'hamed140333'
        },
      });

      this.mkReq(0, 'auth/verify-password','post',{
        args:{
          password:'hamed140333'
        },
        calb(resp){
            lg('token valid set',resp);
            $zpl.setStorage('Authorization-Valid',resp['auth_token_long']);
        }
      });


    },
    mkSrchUser(unknown,path){
      if(!unknown)return;

      this.titleReq = path;
      const vm = this;
      this.activeInp = true;
      this.onTypingTestReq = function (mobilePart){
        if (mobilePart.length < 4) return;

        clearTimeout(vm.delT);
        vm.delT=0;
        vm.delT = window.setTimeout(async ()=>{
          this.sendApiRequest(`${path}?mobile=${mobilePart}`,'get',{
            configs:{expireObj:vm,expirePrp:'delT'}
          });
        },300)
      }
    },
    mkReq(unknown,path,reqType='post', {args = {}, headers, calb, configs}={}){
      if(!unknown)return;

      this.titleReq = path;

      this.onClickTestReq = ()=>{
        if(path.indexOf('?')>-1){
          path+='&'
        }
        else{
          path+='?'
        }

        this.sendApiRequest(path,reqType, {args, headers, calb, configs});
      }
    },
    sendApiRequest(path,reqType='post', {args = {}, headers, calb, configs}={}){
      $zpl.zplConnectPrj_v2.reqDirect({
        baseUrl:`http://clinic_ticket.local/api/${path}XDEBUG_SESSION_START=11224`,
        args:args,
        configs:{
          reqType:reqType,
          headers:headers,
          ...configs,
        },
      }).then(async (respObj)=>{
        const resp = respObj.getResp();
        lg.col_onResp(`resp/ ${path}`,resp||respObj?.err);
        this.resTest = resp?.data||respObj?.err;
        calb && calb(resp?.data);
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
    fieldFiller(mark='test'){
      const vm = this
      const obj={};
      Object.defineProperty(obj, mark, {
        get: function () {
          return vm.fields[mark];
        },

        set: function (val) {
          vm.fields[mark]=val;
          if(vm.onTypingTestReq) vm.onTypingTestReq(val)
        },
        configurable: true});
      return obj;
    },
  },
  mixins:[UserMixin,LevelMixin,StatMixin]
};
</script>


