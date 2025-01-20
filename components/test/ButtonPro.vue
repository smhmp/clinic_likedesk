<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :to="to"
    :class="['zpl-button', size, type, { icon, beforeIcon, afterIcon, loading }]"
    :disabled="disabled"
    :type="btnType"
    :href="href"
    :target="target"
  >
    <!-- shows if loading is true -->
    <div v-if="loading" class="zpl-button-loading">
      <div class="zpl-button-loading-1" />
      <div class="zpl-button-loading-2" />
    </div>

    <!-- shows if before icon exists -->
    <Icon v-if="beforeIcon" :name="beforeIcon" :class="['zpl-button-icon', { invisible: loading }]" />

    <!-- shows if before icon exists -->
    <span v-if="!!text" :class="[{ truncate }, classes, { invisible: loading }]">
      {{ text }}
    </span>

    <!-- shows if after icon exists -->
    <Icon v-if="afterIcon" :name="afterIcon" :class="['zpl-button-icon', { invisible: loading }]" />
  </component>
</template>
<script>
export default {
  name: "ButtonPro",
  props:{
    text:{
      type:String,
      default:'',
    },
    icon:{
      type:String,
      default:'',
    },
    beforeIcon:{
      type:String,
      default:'',
    },
    afterIcon:{
      type:String,
      default:'',
    },
    href:{
      type:String,
      default:'',
    },
    target:{
      type:String,
      default:'',
    },
    btnType:{
      type:String,
      default:'button',
    },
    size:{
      type:String,
      default:'',
    },
    type:{
      type:String,
      default:'primary',
    },
    disabled:{
      type:Boolean,
      default:false,
    },
    truncate:{
      type:Boolean,
      default:false,
    },
    fill:{
      type:Boolean,
      default:false,
    },
    loading:{
      type:Boolean,
      default:false,
    },
    to:{
      type:String|Object,
      default:'',
    },
    classes:{
      type:String,
      default:'',
    },

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

  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
