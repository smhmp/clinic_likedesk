<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8846 15.1923C12.8846 16.4668 13.9178 17.5 15.1923 17.5C16.4668 17.5 17.5 16.4668 17.5 15.1923C17.5 13.9178 16.4668 12.8846 15.1923 12.8846C13.9178 12.8846 12.8846 13.9178 12.8846 15.1923Z" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10"/>
    <path d="M7.69223 4.80769C7.69223 6.0822 8.72542 7.11538 9.99992 7.11538C11.2744 7.11539 12.3076 6.0822 12.3076 4.80769C12.3076 3.53319 11.2744 2.5 9.99992 2.5C8.72542 2.5 7.69223 3.53319 7.69223 4.80769Z" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10"/>
    <path d="M2.50009 15.1923C2.50009 16.4668 3.53328 17.5 4.80779 17.5C6.08229 17.5 7.11548 16.4668 7.11548 15.1923C7.11548 13.9178 6.08229 12.8846 4.80779 12.8846C3.53328 12.8846 2.50009 13.9178 2.50009 15.1923Z" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10"/>
    <path d="M15.1924 12.8846L15.1924 11.7308C15.1924 11.2717 15.01 10.8315 14.6855 10.5069C14.3609 10.1823 13.9206 10 13.4616 10L6.53854 10C6.07951 10 5.63928 10.1823 5.3147 10.5069C4.99012 10.8315 4.80777 11.2717 4.80777 11.7308L4.80777 12.8846" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M10 7.11536L10 9.99997" :stroke="selected?'#fff':'#000'" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>
</template>

<script>
export default {
  props:{
    selected:false,
  },
  name: 'RefererIcon',
};
</script>
