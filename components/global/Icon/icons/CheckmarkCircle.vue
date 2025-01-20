<template>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill-rule="evenodd" 
      clip-rule="evenodd" 
      d="M12 22C6.47667 22 2 17.5233 2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22Z" 
      fill="currentColor"/>
    <path 
      d="M16 10L11 15L8 12" 
      class="white-stroke"
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
</svg>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CheckmarkCircle',
});
</script>
