<template>
  <div class="white-box">
    <div v-if="error.statusCode == 404" class="text-center py-2xl text-ls-h2">
      <div class="profilePg body"><div class="page-heading">
        <div class=""><div class="heading">
          <div class="title">صفحه مورد نظر یافت نشد</div></div> <div class="caption">از طریق منو به صفحه مورد نظر رجوع کنید</div></div> <!----></div> </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['error'],
};
</script>
