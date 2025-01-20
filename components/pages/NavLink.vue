<template>
  <div :class="['NavLink','nav-link-item',{selected}]" @click="onClick">
    <div class="left2">
      <div v-if="inPage" class="angle-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 8L10 12L14 16" :stroke="selected?'#0A33FF':'#8C8C8C'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <svg v-else-if="outPage" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L16 16" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 8L8.04286 8.042L8 14" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="lebel">{{navLabel}}</div>
    <div class="icon-container">
      <Icon :name="icon"/>
    </div>
  </div>
</template>
<script>
import Icon from "@/components/global/Icon/icon.vue";

export default {
  name: "NavLink",
  props:{
    NavLink:'',
    navLabel:'',
    onClick:null,
    inPage:0,
    outPage:0,
    selected:0,
    icon:'',
  },
  components: {Icon},
};
</script>
