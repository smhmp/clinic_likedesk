<template>
  <div class="circle-loading">
    <div>Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'Loaders',
  props:{
    type:{
      type: String,
      default:'circle'
    }
  }
};
</script>
