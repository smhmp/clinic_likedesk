import GetExistUser from '~/gql/application/GetExistUser'
import GetEmail from '~/gql/FormEmail/GetEmail'
import GetUpdateUser from '~/gql/application/GetUpdateUser'
import globalMutations from './mixins/globalMutations';
import {lg, lgErr} from "@/src/js/dbg";
import {GqlJSSdk} from "@/src/js/GqlJSSdk";
import {GqlStore} from "@/src/js/GqlStore";
import {testDataLevel} from "@/mixins/LevelMixin";
import {$zpl} from "@/plugins/zpl";

export const state = () => ({
    eventTickets:null,
  userInfo:{
    id:'',
    age:'',
    gender:'',
      mobile:'',
      name:'',
      family:'',
    email:'',
      questions:'',
  },
  portal:{},
  switchList: [
  ],
  globalLoading:false,
  toastMessage:{
    freeIndx:0
  },
  toastMessageRepo:{},

})


export const mutations = {
  ...globalMutations,
  deActiveToast(states, data){
    try{
      if(data.calbDestroy){
        data.calbDestroy();
      }
      delete states.toastMessage[data.pushIndx];
      states.toastMessage.freeIndx--;
      if(data.delayDestroy){
        window.clearTimeout(data.delayDestroy)
      }
    }
    catch (err) {
      lgErr('state.toastMessage.shift()/ err',err)
    }
  }
}

export const actions = {
  async GetUpdateUser({ state, commit },calbCommit){

    let respObj = await new GqlStore('Me',{querySchema:GetUpdateUser}).reqZplConnectPrj()
    .catch((respObj)=>{
        respObj.showErr();
    });

    const resp = respObj.getResp();
    if($zpl.isTest().__testData_legal__){
      $zpl.isTest().__testData_legal__(resp,'GetUpdateUser')
    }

    commit("updateData", {
      stateName: "userInfo",
      data: resp
    });

    if($zpl.isLocal()){
      if(testDataLevel.aftTestLevel){
        commit("updateProp", {
          stateName: "userInfo",
          prop: "level",
          value: testDataLevel.aftTestLevel
        });
        commit("updateProp", {
          stateName: "userInfo",
          prop: "data_status",
          value: {
            personal:testDataLevel.statFormPersonal
          }
        });
        commit("updateProp", {
          stateName: "userInfo",
          prop: "next_level_step",
          value: testDataLevel.nextLevelStep
        });
      }
    }
  },
  async updateEmail({ state, commit }){
    let respObj = await new GqlStore('Me',{querySchema:GetEmail}
    ).reqZplConnectPrj();

    commit("updateProp", {
      stateName: "userInfo",
      prop: "email",
      value: respObj.getResp().email
    });
  },
  async getMe({ state, commit }) {

    const respObj = await $zpl.zplConnectPrj_v2.reqDirect({
      baseUrl:'https://reservation-api.insight-clinic.com/api/event/user/get_user',
      configs:{
        get:1,
      }
    });

    const resp = respObj.getResp();
    if(!resp?.data?.user){
      return
    }

    if($zpl.isTest().__testData_legal__){
      $zpl.isTest().__testData_legal__(resp,'getMe')
    }

    commit("fillData", {
      stateName: "userInfo",
      data: resp.data.user
    });
  },
    async chkTickets({ state, commit }){
      if(state.eventTickets?.length){
          return
      }
        $zpl.zplConnectPrj_v2.reqDirect({
            baseUrl:'https://reservation-api.insight-clinic.com/api/event/tickets',
            configs:{
                get:1
            },
        }).then(async (respObj)=>{
            const resp = respObj.getResp();
            if(resp){
                commit("fillData", {
                    stateName: "eventTickets",
                    data: resp.data.data.tickets
                });
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
                $zpl.toastError('خطای نامشخصی رخ داد، لطفا اطلاعات وارد شده را بررسی کنید و مجددا تلاش نمایید.');
            }
        })
    },

  alert({state,commit},{type,message='',html='',translator=null,delayTime=5000,justOnce='',ltr=false}){
    if(justOnce){
      if(state.toastMessageRepo[justOnce]){
        return
      }
      state.toastMessageRepo[justOnce]=1;
    }
    let msg = message;
    if(msg && typeof msg != 'string'){
      const respErr = msg
      msg = ''
      if(respErr['message'] === 'validation' && respErr['validation']){
        const respValid = respErr['validation']
        respValid.forEach((eValid,indx)=>{
          if(indx>0) msg += '<br>'
          if(translator){
            const ruler = translator[respValid['rule']]
            if(typeof ruler == "function"){
              msg += ruler(respValid['message'])
            }
            else{
              msg += ruler
            }
          }
          else{
            msg += respValid['message']
          }
        })
      }
      msg = msg||'مقادیر درخواستی نامعتبر می باشد'
    }

    const data = {
      type:type,
      message:msg,
      html:html,
      active:true,
      pushIndx:-1,
      ltr:ltr,
      delayTime:delayTime,
      calbDestroy(){
        if(justOnce){
          state.toastMessageRepo[justOnce]=0;
        }
      },
      delayDestroy:0,
    }

    commit('pushData', {
      stateName:'toastMessage',
      data:data
    })

    data.delayDestroy = setTimeout(()=>{
      commit('deActiveToast',data);
    }, delayTime+600) //+600 for show toast by animation
  },

  setDeActiveToast({commit}, data){
    commit('deActiveToast',data)
  },
 }



