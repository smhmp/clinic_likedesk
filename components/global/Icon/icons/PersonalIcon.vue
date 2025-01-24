<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6666 16.6667V16.0417C16.6666 14.0857 15.0809 12.5 13.1249 12.5H6.87492C4.91891 12.5 3.33325 14.0857 3.33325 16.0417V16.6667"
          :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="10.0001" cy="5.83333" rx="3.33333" ry="3.33333"
             :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  props:{
    selected:false,
  },
  name: 'PersonalIcon',
};
</script>
