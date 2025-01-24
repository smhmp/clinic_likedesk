<template>
  <div :class="['options',{resp:!noResponsive}]">
    <div v-if="info['label']" v-for="(info,indx) in infos" :key="indx" :class="['radio-card',{'chked':curRadioId===info['uniqKey']}]" @click="onClickInp(info['uniqKey'])">
      <div :for="info['uniqKey']" class="top">
        <div class="frame">
          <div class="user-single">
            <img class="group" :src="`/svgs/${info.svgIcon}`" />
          </div>
          <div class="radio-button">
            <div class="selected">
              <div :class="[curRadioId===info['uniqKey']?'outside_chked':'outside_unchked']"></div>
              <div class="inside"></div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="label">{{info['label']}}</div>
          <div class="caption" v-html="info['guidance']"></div>
        </div>
      </div>
    </div>
    <div v-else class="radio-card-end"></div>
  </div>
</template>
<script>

export default {
  name: "RadioCard",
  props:{
    infos:{
      type:Array,
      default: []
    },
    inpName:{
      type:String,
    },
    onChked: {
      type: Function,
    },
    noResponsive:0
  },
  data() {
    return {
      curRadioId:'',
    }
  },
  mounted() {
    this.infos.forEach((info)=>{
      if(info.defChecked){
        this.curRadioId = info['uniqKey'];
      }
    })
  },
  computed: {

  },
  methods: {
    onClickInp(uniqKey){
      this.curRadioId = uniqKey;
      this.onChked(uniqKey);
    }
  },
  mixins:[],
  components: {},
};
</script>
