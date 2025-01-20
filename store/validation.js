
export const state = () => ({
  formFields:[],
  translatedErrors:{}
})

export const mutations = {
  getFormFields(state, fields){
    state.formFields = fields;
  },
  fillTranslatedErrors(state, errors){
    state.translatedErrors = errors;
  }
}
export const actions = {
  setValidateErrors({commit}, errors){
    commit('fillTranslatedErrors',errors)
  }
}




