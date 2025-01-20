<template>
  <button :class="['ButtonSimple contained-button',type,{isFullWidth}]" @click="onClickBtn">
    <span class="labelBtn">{{ valBtn }}</span>
    <svg v-if="isArrowOut" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L16 16" :stroke="colDark ? '#FFFFFF':'#393946'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 8L8.04286 8.042L8 14" :stroke="colDark ? '#FFFFFF':'#393946'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else-if="isArrowLeft" class="arrow-left" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.01001 11.98H19" :stroke="colDark ? '#FFFFFF':'#393946'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.013 5.98804L4.00195 12L10.013 18.012" :stroke="colDark ? '#FFFFFF':'#393946'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div v-if="isLoader && clkedBtn" class="loaderBtn">
      <svg class="circular-loader" viewBox="25 25 50 50" >
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#FFFFFFB2" stroke-width="6" />
      </svg>
    </div>
  </button>
</template>
<script>
export default {
  props:{
    ButtonSimple:'',
    onClkBtn:null,
    valBtn:'',
    type:'', //primary , secondary
    isLoader:0,
    isArrowLeft:0,
    isFullWidth:0,
    isArrowOut:0,
  },
  data() {
    return {
      clkedBtn:false,
    };
  },
  async created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  computed: {
    colDark(){
      return this.type === 'primary' || this.type === 'new'
    }
  },
  methods: {
    onClickBtn(e){
      const vm = this;
      this.clkedBtn = true;
      this.onClkBtn(e,{
        calbDone(){
          vm.clkedBtn = false;
        }
      })
    }
  },
};
</script>
