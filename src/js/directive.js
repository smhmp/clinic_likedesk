import Vue from "vue";

Vue.directive('visible', {
  update: function (el, binding, vnode) {
    if(binding.value){
      if(el.classList.contains('hidden')) el.classList.remove('hidden')
      if(!el.classList.contains('visible')) el.classList.add('visible')
    }
    else{
      if(!el.classList.contains('hidden')) el.classList.add('hidden')
      if(el.classList.contains('visible')) el.classList.remove('visible')
    }
  }
})
