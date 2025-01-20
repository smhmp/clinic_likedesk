<template>
  <div :class="['toastItem',{dirLtr,show}]">
    <div v-if="toastMessage" :class="['toast-message',toastType,{inline}]">
      <div class="content">
        <div class="warning-outline">
          <img class="group" src="@/assets/imgs/svg/group0.svg" />
        </div>
        <div class="message">
          <div class="description">{{toastMessage}}</div>
        </div>
      </div>
      <div class="action">
        <div class="toast-message-action" @click="closeSelf">
          <div class="button-label">متوجه شدم</div>
        </div>
      </div>
    </div>
    <p v-if="toastHtml" :class="['free-message',toastType]" v-html="toastHtml"></p>
  </div>
</template>
<script>
export default {
  name:'toast',
  props:{
    eToast:{
      type:Object,
      default:{},
    }
  },
  data(){
    return {
      show:false,
    }
  },
  mounted() {
    window.setTimeout(()=>{
      this.show = true;
      this.delT = window.setTimeout(()=>{
        this.show = false;
        this.delT = 0;
      },this.eToast.delayTime-400)
    },200)
  },
  methods:{
    closeSelf(){
      if(this.delT){
        window.clearTimeout(this.delT)
        this.show = false;
        window.setTimeout(()=>{
          this.$store.dispatch('application/setDeActiveToast', this.eToast);
        },1000)
      }
    }
  },
  computed:{
    inline(){
      return this.eToast.inline;
    },
    toastType(){
      return this.eToast.type;
    },
    toastMessage(){
      return this.eToast.message;
    },
    toastHtml(){
      return this.eToast.html;
    },
    dirLtr(){
      return this.eToast.ltr;
    },
  }
}
</script>
