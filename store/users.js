import usersList from '~/gql/users/usersList';
import globalMutations from './mixins/globalMutations';
import {GqlStore} from "@/src/js/GqlStore";

export const state = () => ({
  list_users:[],
  globalLoading_users:false,
})

export const mutations = globalMutations

export const actions = {
  //queries
  async fetch({commit},{variables}) {
      commit('activeLoading');

      const respObj = await new GqlStore('Me',{querySchema:usersList}
      ).reqZplConnectPrj({
          vars:variables
      }).catch((respObj)=>{

      })

      const users = respObj.getResp();

    commit('fillData' , {
      stateName: 'list',
      data:users
    })
    return users
  },

}
