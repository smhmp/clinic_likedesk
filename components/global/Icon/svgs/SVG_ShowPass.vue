<template>
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="showPass">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="12" cy="12" r="3" :stroke="isShowPass?'#000':'#fff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
  </svg>
</template>

<script>
export default {
  name: "SVG_ShowPass",
  props:{
    isShowPass:{
      type:Boolean,
      default:false
    },
  }
};
</script>

<style>
</style>
