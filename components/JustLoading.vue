<template>
  <div class="Events profilePg body">
    <div class="">
      <SVG_LoadingLines/>
    </div>

  </div>
</template>
<script>


import SVG_LoadingLines from "@/components/global/Icon/svgs/SVG_LoadingLines.vue";

export default {
  name: "JustLoading",
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
  components: {SVG_LoadingLines},
};
</script>
