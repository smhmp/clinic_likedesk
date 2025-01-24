<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66699 10V2.50275" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M2.5 5.83335L6.40841 1.78222C6.48033 1.70767 6.57194 1.66669 6.66667 1.66669C6.76139 1.66669 6.853 1.70767 6.92492 1.78222L10.8333 5.83335" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M13.3335 10.8334L13.3338 18.3361" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M17.4998 14.1667L13.5914 18.2178C13.5195 18.2924 13.4279 18.3334 13.3332 18.3334C13.2384 18.3334 13.1468 18.2924 13.0749 18.2178L9.1665 14.1667" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>
</template>

<script>
export default {
  props:{
    selected:false,
  },
  name: 'TrackingIcon',
};
</script>
