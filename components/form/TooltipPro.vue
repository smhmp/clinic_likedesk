<template>
  <div ref="tooltipRef" :class="['tooltipPro','hasTooltip']" style="display: inline-flex;line-height: 28px;">
    <div ref="tooltipIconRef" class="initiator"
         @click="openTooltip" @mouseenter="readyTooltip" @mouseleave="unreadyTooltip"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.01001V3.01001C16.971 3.01001 21 7.03901 21 12.01V12.01C21 16.981 16.971 21.01 12 21.01V21.01C7.029 21.01 3 16.981 3 12.01V12.01C3 7.03901 7.029 3.01001 12 3.01001Z" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 12.51V7.51001" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M11.999 16.01C11.861 16.01 11.749 16.122 11.75 16.26C11.75 16.398 11.862 16.51 12 16.51C12.138 16.51 12.25 16.398 12.25 16.26C12.25 16.122 12.138 16.01 11.999 16.01" stroke="#393946" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </div>
    <div class="white-mood hidden"
         @click="closeTooltip">
    </div>
    <label v-if="label" class="cursor-pointer label3" :for="label">{{ label }}</label>
    <div :class="['contBox',{center}]" :style="(myWidth?`width: ${myWidth};`:'')+(myLeft?`left: ${myLeft};`:'')">
      <div class="guidanceBox" v-html="guidance"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TooltipPro",
  components: {},
  props: {
    label: {
      type: String,
      default: "",
    },
    myWidth: {
      type: String,
      default: "",
    },
    myLeft: {
      type: String,
      default: "",
    },
    center: {
      type: Boolean,
      default: false,
    },
    guidance: {
      type: String,
      default: "",
    },
    addiClass: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
      statTooltip:'',
      iMinWidth:242,
    }
  },
  mounted() {

  },
  methods:{
    readyTooltip(e){
      this.$refs.tooltipRef.classList.add('side_top');
    },
    unreadyTooltip(e){
      if(this.statTooltip != 'opened'){
        this.$refs.tooltipRef.classList.remove('side_top');
      }
    },
    openTooltip(e){
      if(this.statTooltip == 'opened'){
        this.closeTooltip(e)
      }
      else{
        this.statTooltip = 'opened';
        window.setTimeout(()=>{
          this.$refs.tooltipIconRef.classList.add('hovered');
        });
        this.$refs.tooltipRef.getElementsByClassName('white-mood')[0].classList.remove('hidden');
      }
    },
    closeTooltip(e){
      this.statTooltip = '';
      this.$refs.tooltipIconRef.classList.remove('hovered');
      this.$refs.tooltipRef.getElementsByClassName('white-mood')[0].classList.add('hidden');
    },
  },
  computed: {

  },
};
</script>
