<template>
  <svg
    :class="['SVG_Arrow',myClass]"
    :style="myStyle"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M6.833 2A4.84 4.84 0 0 0 2 6.833a4.841 4.841 0 0 0 4.833 4.834 4.809 4.809 0 0 0 3.043-1.084l3.27 3.27a.5.5 0 1 0 .707-.707l-3.27-3.27a4.809 4.809 0 0 0 1.084-3.043A4.841 4.841 0 0 0 6.833 2Zm0 1a3.826 3.826 0 0 1 3.834 3.833 3.818 3.818 0 0 1-1.07 2.657.5.5 0 0 0-.107.107 3.818 3.818 0 0 1-2.657 1.07A3.826 3.826 0 0 1 3 6.833 3.826 3.826 0 0 1 6.833 3Z"></path>
  </svg>
</template>

<script>
export default {
  name: "SVG_Arrow",
  props:{
    myStyle:{
      type:String,
      default:'position: absolute;top: 11px;left: 12px;width: 19px;'
    },
    myClass:{
      type:String,
      default:''
    }
  }
};
</script>

<style>
</style>
