import {lg} from "@/src/js/dbg";

let globalMutations = {
  fillData(state, {stateName , data}) {
    state[stateName] = data;
  },
  updateSubData(state, {stateName , value}) {
    state.data[stateName] = value;
  },
  updateProp(state, {stateName, prop , value}) {
    if(state[stateName][prop] !== null && typeof state[stateName][prop] == 'object' ){
      for(const k in state[stateName][prop]){
        if(value[k] !== undefined){
          state[stateName][prop][k] = value[k]
        }
      }
    }
    else{
      state[stateName][prop] = value;
    }
  },
  updateData(state, {stateName, data}){
    if(data.id){
      let dataID = state[stateName].findIndex((item)=>{
        return item.id == data.id;
      })
      state[stateName][dataID] = data;
    }
    else{
      for(const k in data){
        state[stateName][k] = data[k]
      }
    }
  },
  pushData(state, {stateName , data}) {
    const arrState = state[stateName]
    if(arrState instanceof Array){
      data.pushIndx = arrState.push(data);
    }
    else if('freeIndx' in arrState){
      arrState[arrState.freeIndx]=data;
      data.pushIndx = arrState.freeIndx
      arrState.freeIndx++;
    }
  },
  activeMyLoading(state,prop) {
    state[prop] = true;
  },
  deActiveMyLoading(state,prop) {
    state[prop] = false;
  },
  activeLoading(state) {
    state.globalLoading = true;
  },
  deActiveLoading(state) {
    state.globalLoading = false;
  }
}
export default globalMutations;
