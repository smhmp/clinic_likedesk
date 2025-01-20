<template>
  <div :class="['ActionItem',{noAct,frsChild:frsChild!==undefined,preview:preview!==undefined}]" @click="onClick">
    <div class="container3">
      <div :class="['angle-left',{noAct}]">
        <svg v-if="loadAct" viewBox="25 25 50 50" class="circular-loader actPrgs"><circle cx="50" cy="50" r="20" fill="none" stroke="#d9d9d9" stroke-width="3" class="loader-path"></circle></svg>
        <img v-else class="group5" src="@/assets/imgs/autohtml-all1/group4.svg" />
      </div>
      <div class="stack">
        <div class="stack2">
          <div class="label3">{{ttl}}</div>
          <div class="label3_divider"></div>
          <div class="value2">{{midCaption}}</div>
        </div>
        <div :class="['label2Parent',{visibleStat:statActFa}]">
          <div :class="['label2','st_'+statAct]">{{statActFa}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "ActionItem",
  props:{
    //'NOT_COMPLETED', 'COMPLETED', 'WAITING', 'PROCESSING', 'REJECTED'
    preview:undefined,
    frsChild:undefined,
    statAct:'',
    statActFa:'',
    onAct:null,
    noAct:false,
    loadAct:false,
    midCaption:'',
    ttl:'',
  },
  data() {
    return {

    };
  },
  async created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  computed: {

  },
  methods: {
    onClick(){
      if(this.onAct){
        this.onAct()
      }
    }
  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
