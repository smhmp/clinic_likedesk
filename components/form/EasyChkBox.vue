<template>
  <div :class="['easy-checkbox',{tikError}]">
    <span class="borderTik" @mousedown="onMousedown"></span>
    <TooltipPro v-if="label && guidance"
              :label="label"
              :guidance="guidance"
                v-bind="tooltip"
    />
    <label v-else class="label3" :for="uniqKey">{{ label }}</label>
    <input
      ref="inpRef"
      type="checkbox"
      :id="label"
      :name="uniqKey"
      v-model="curChecked"
      @input="$emit('input', $event.target.checked)"
      class="outside"
      :data-tab="dataTab"
      :data-localize="label"
    />
  </div>
</template>

<script>

import TooltipPro from "@/components/form/TooltipPro.vue";
import {$zplUi} from "@/plugins/zplUi";

export default {
  name: "EasyChkBox",
  components: {TooltipPro},
  props: {
    uniqKey:{
      type:String,
    },
    label:{
      type:String,
    },
    guidance:{
      type:String,
    },
    defChecked: {
      type: Boolean,
      default:false,
    },
    dataTab: {
      type: String,
      default:'',
    },
    tikError: {
      type: Boolean,
      default:false,
    },
    onTik: {
      type: Function,
    },
    tooltip:{}
  },
  data(){
    return {
      curChecked:false,
    }
  },
  mounted() {
    this.curChecked = this.defChecked;

    $zplUi.adev(this.$refs.inpRef,['change','keyup','keydown'], (e,evKey) => {
      const kObj = $zpl.getEvStrKey({e, evKey, evTyp:'nonIrChkBox/chkbox/'})
      if(evKey==='keydown'){
        $zpl.prevEvery(e)
        return
      }
      if(evKey==='keyup'){
        $zpl.prevEvery(e)
      }
      if(evKey==='change' || kObj.char==='enter' || kObj.char==='space'){
        this.$refs.inpRef.click();
      }
    })
  },
  methods:{
    onMousedown(e){
      $zpl.prevEvery(e);
      this.$refs.inpRef.click();
    }
  },
  watch: {
    curChecked(val){
      if(this.onTik){
        this.onTik(val)
      }
    }
  },
};
</script>
