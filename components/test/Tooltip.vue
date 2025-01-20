<template>
  <div class="zpl-tooltip-container" ref="tooltipBtn">
    <slot />
    <div ref="tooltip">
      <div v-if="toggle" :class="['zpl-tooltip', position, space, size]" :style="[style]">
        <div :class="['zpl-tooltip-indicator', position]">
          <slot />
        </div>
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tooltip",
  props:{
    text:{
      type:String,
      default:'',
    },
    position:{
      type:String,
      default:'bottomLeft',
    },
    space:{
      type:String,
      default:'smallSpace',
    },
    size:{
      type:String,
      default:'large',
    },
    trigger:{
      type:String,
      default:'',
    },
    indicator:{
      type:Boolean,
      default:true,
    },
    hideTooltip:{
      type:Boolean,
      default:false,
    },
    buttonRef:{
      type:Object,
      default:null,
    },
    tooltipRef:{
      type:Object,
      default:null,
    },
  },
  data() {
    return {
      toggle : false,
      windowWidth: window.innerWidth,
      style : {
        top: "",
        left: "",
      },

    };
  },
  async created() {

  },
  mounted() {
    document.addEventListener("scroll", this.updateStyle);

    window.addEventListener("resize", this.onResize);
    if (this.getScrollParent(this.buttonRef)) {
      this.getScrollParent(this.buttonRef).addEventListener("scroll", this.updateStyle);
    }
    this.triggerHandler();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    if (this.tooltipRef) {
      this.tooltipRef.parentNode.removeChild(this.tooltipRef);
    }
    this.toggle = false;
  },
  computed: {

  },
  methods: {
    updateStyle(){
      // get the position of button and set it to tooltip
      const distance = this.space === "smallSpace" ? 8 : 16;
      if (this.buttonRef) {
        const { height, top, left, width } = this.buttonRef?.children[0]?.getBoundingClientRect();
        const tooltipWidth = this.tooltipRef?.children[0]?.getBoundingClientRect().width;
        const tooltipHeight = this.tooltipRef?.children[0]?.getBoundingClientRect().height;

        if (this.position === "left") {
          this.$set(this.style, "left", `${left - tooltipWidth - distance}px`);
          this.$set(this.style, "top", `${top + height / 2 - tooltipHeight / 2}px`);
        }
        switch (this.position) {
          case "left":
            this.$set(this.style, "left", `${left - tooltipWidth - distance}px`);
            this.$set(this.style, "top", `${top + height / 2 - tooltipHeight / 2}px`);
            break;
          case "right":
            this.$set(this.style, "left", `${left + width + distance}px`);
            this.$set(this.style, "top", `${top}px`);
            break;
          case "bottomRight":
            this.$set(this.style, "left", `${left + width - tooltipWidth}px`);
            this.$set(this.style, "top", `${top + height + distance}px`);
            break;
          case "bottomCenter":
            this.$set(this.style, "left", `${left + width / 2 - tooltipWidth / 2}px`);
            this.$set(this.style, "top", `${top + height + distance}px`);
            break;
          case "bottomLeft":
            this.$set(this.style, "left", `${left}px`);
            this.$set(this.style, "top", `${top + height + distance}px`);
            break;
          case "topRight":
            this.$set(this.style, "left", `${left + width - tooltipWidth}px`);
            this.$set(this.style, "top", `${top - tooltipHeight - distance}px`);
            break;
          case "topCenter":
            this.$set(this.style, "left", `${left + width / 2 - tooltipWidth / 2}px`);
            this.$set(this.style, "top", `${top - tooltipHeight - distance}px`);
            break;
          case "topLeft":
            this.$set(this.style, "left", `${left}px`);
            this.$set(this.style, "top", `${top - tooltipHeight - distance}px`);
            break;
          default:
            this.$set(this.style, "left", `${left - tooltipWidth - distance}px`);
            this.$set(this.style, "top", `${top}px`);
        }

        // if left space is smaller than menu width so open menue on right
        // if (menuWidth > left) {
        //   this.$set(this.style, 'left', `${left}px`);
        // } else {
        //   this.$set(this.style, 'left', `${left - menuWidth + width}px`);
        // }
      }
    },

    onButtonTrigger(){
      if (this.hideTooltip) {
        this.toggle = false;
      } else {
        this.toggle = !this.toggle;
      }
    },

    getScrollParent(node){
      if (node === null) {
        return null;
      }
      if (node.scrollHeight > node.clientHeight) {
        return node;
      }

      return this.getScrollParent(node.parentNode);
    },

    outsideTrigger(e){
      // close tooltip
      if (!this.buttonRef?.children[0].contains(e.target)) {
        this.$nextTick(() => {
          this.toggle = false;
        });
      }
    },

    onResize(){
      this.$nextTick(() => {
        // update position of menue when window is resizing
        this.windowWidth = window.innerWidth;
        if (this.toggle) {
          this.updateStyle();
        }
      });
    },

    click() {
      console.log("clik");
    },

    selectId(id){
      console.log(id)
    },

    triggerHandler() {
      if (this.trigger === "hover") {
        document.documentElement.addEventListener("mouseover", this.outsideTrigger, false);
        this.buttonRef.children[0].addEventListener("mouseenter", this.onButtonTrigger, false);
      } else if (this.trigger === "click") {
        this.buttonRef.children[0].addEventListener(
          "click",
          () => {
            this.onButtonTrigger();
            // hide tooltip after 1500ms
            setTimeout(
              () => {
                this.toggle = false;
              },
              1500,
              this,
            );
          },
          false,
        );
        document.documentElement.addEventListener("click", this.outsideTrigger, false);
      }
    },

  },
  watch:{

  },
  mixins:[],
  components: {},
};
</script>
