<template>
  <div class="block">
    <div v-if="loading" class="meter">
      <span style="width: 100%;"><span :class="['progress',{sec1,sec2,sec3,sec4}]"></span></span>
    </div>
    <div class="heading3">
      <div class="content">
        <div class="title2">{{ttl}}</div>
        <div class="caption4">{{caption}}</div>
      </div>
    </div>
    <slot/>
  </div>
</template>
<script>
export default {
  name: "ActionGroup",
  props:{
    ttl:{
      type:String,
      default:'',
    },
    caption:{
      type:String,
      default:'',
    },
  },
  data() {
    return {
      loading:false,
      sec1:false,
      sec2:false,
      sec3:false,
      sec4:false,
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
    setLoading(stat,{del=1,sec1=false,sec2=false,sec3=false,sec4=false,}=false){//on progress loader
      //sec1 means 1 sec delay during animation
      //sample call for on: setLoading(true,{sec1:true});
      //sample call for off: setLoading(false,{del:500});
      if(sec1) this.sec1=sec1;
      if(sec2) this.sec2=sec2;
      if(sec3) this.sec3=sec3;
      if(sec4) this.sec4=sec4;
      this.$nextTick(()=>{
        const vm = this;
        if(stat){
          this.loading = stat;
        }
        else{
          window.setTimeout(()=>{
            vm.loading = stat;
          },del||1)
        }
      })
    }
  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
