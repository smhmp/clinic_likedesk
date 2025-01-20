
export const state = () => ({
  isProfileMounted:false,
  isWithoutRequest:false,
  mediumScr:false
})

export const mutations = {
  setProfileMounted(states, state){
    states.isProfileMounted = state;
  },
  setWithoutRequest(states, state){
    if(this.delT){
      window.clearTimeout(this.delT);
      this.delT=0;
    }
    states.isWithoutRequest = state;
    if(state){
      this.delT = window.setTimeout(()=>{
        states.isWithoutRequest = false;
        this.delT=0;
      },3000)
    }
  },
  setMediumScr(states, state){
    states.mediumScr = state;
  }
}
export const actions = {
  setProfileMounted({commit}, state){
    commit('setProfileMounted',state)
  },
  setWithoutRequest({commit}, state){
    commit('setWithoutRequest',state)
  },
  setMediumScr({commit}, state){
    commit('setMediumScr',state)
  }
}




