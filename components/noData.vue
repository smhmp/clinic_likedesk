<template>
  <div class="text-center py-xl bg-background">اطلاعاتی جهت نمایش وجود ندارد</div>
</template>
<script>
export default {
  name: "noData",
  props:{
    prop1:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {

    };
  },
  async created() {

  },
  mounted() {
    this.$store.dispatch('layouts/setProfileMounted', true);
  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {

  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
