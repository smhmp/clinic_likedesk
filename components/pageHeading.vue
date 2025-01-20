<template>
  <div class="page-heading">
    <div :class="[{'heading-caption':backPath||hasReturn}]">
      <div class="heading">
        <div class="title">{{title}}</div>
      </div>
      <div v-if="caption" class="caption" v-html="caption"></div>
    </div>
    <div v-if="backPath||hasReturn" class="contained-button asBtn" @click="onGoBack">
      <a :href="'javascript:'" class="arrow-right" >
        <img class="group3" src="@/assets/imgs/autohtml-2/group2.svg" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'pageHeading',
  props:{
    hasTab:{
      type:Boolean,
      default:false
    },
    hasReturn:{
      type:Boolean,
      default:false
    },
    backPath:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    },
    caption:{
      type:String,
      default:''
    }
  },
  methods:{
    onGoBack(e){
      if(this.backPath){
        this.$router.replace({path:this.backPath});
      }
      else{
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style>
.arrow-right {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  position: relative;
}
</style>
