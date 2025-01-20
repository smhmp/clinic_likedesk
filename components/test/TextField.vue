<template>
  <!-- <div> -->
  <ValidationProvider v-slot="{ errors, classes }" :name="name" :vid="vid" :rules="rules">

    <div class="zpl-textfield-group">
      <Tooltip
        ref="tooltipInfo"
        v-if="unit"
        :text="'test text'"
        position="topCenter"
        space="smallSpace"
        :indicator="true"
      >
        <div :class="['zpl-textfield', { invalid: classes.invalid }]" :disabled="disabled">
          <!-- Prefix Icon -->
          <Icon v-if="prefixIcon" :name="prefixIcon" class="zpl-textfield-icon" />
          <!-- Copy to clipboard -->
          <Tooltip
            :text="'کپی'"
            position="topCenter"
            space="smallSpace"
            class="zpl-copy-button"
            :indicator=false
          >
            <ButtonPro v-if="copyableIcon" type="default" icon="Copy" @click.native="copyToClipboard" />
          </Tooltip>

          <input
            v-model="priceModel"
            autocomplete="off"
            :class="['zpl-textfield-input','font-IRANYekanFaNum', { ltr }]"
            :disabled="disabled"
            :placeholder="placeholder"
            :name="inputName"
            :readonly="readonly"
            @focusout="onFocusOut"
            @focusin="onFocusIn"
            @keypress="onlyNumber"
            @input="updating"
            ref="textRef"
          />

          <!-- Suffix Icon -->
          <Icon v-if="suffixIcon" :name="suffixIcon" class="zpl-textfield-icon" />
          <!-- shows stepper to increase number or descrease -->
          <div v-if="stepper && type === 'number'" class="zpl-textfield-stepper">
            <button class="zpl-textfield-stepper-btn" type="button" @click="increment">
              <Icon name="filledArrowUp" />
            </button>

            <button class="zpl-textfield-stepper-btn" type="button" :disabled="value === min" @click="decrement">
              <Icon name="filledArrowDown" />
            </button>
          </div>

          <!-- unit -->
          <span v-if="unit" class="zpl-textfield-unit">
          {{ unit }}
        </span>

          <!-- unit icon -->
          <span v-if="unitIcon" class="zpl-textfield-unit">
          <Icon :name="unitIcon" />
        </span>

          <!-- Copy to clipboard -->
          <Tooltip
            :text="'کپی'"
            position="topCenter"
            space="smallSpace"
            class="zpl-copy-button"
            :indicator="false"
          >
            <ButtonPro
              v-if="copyable"
              :text="'کپی'"
              type="secondary"
              size="medium"
              @click.native="copyToClipboard"
            />
          </Tooltip>

          <!-- label -->
          <label v-if="label" :class="['zpl-textfield-label', { isInputFocused }]">
            {{ label }}
          </label>
        </div>
      </Tooltip>

      <div v-else :class="['zpl-textfield', { invalid: classes.invalid }]" :disabled="disabled">
        <!-- Prefix Icon -->
        <Icon v-if="prefixIcon" :name="prefixIcon" class="zpl-textfield-icon" />
        <!-- Copy to clipboard -->
        <Tooltip
          :text="'کپی'"
          position="topCenter"
          space="smallSpace"
          class="zpl-copy-button"
        >
          <ButtonPro v-if="copyableIcon" type="default" icon="Copy" @click.native="copyToClipboard" />
        </Tooltip>

        <input
          v-model="priceModel"
          autocomplete="off"
          :class="['zpl-textfield-input', { ltr, 'font-Mono': mono, numLtr }]"
          :disabled="disabled"
          :placeholder="placeholder"
          :name="inputName"
          :readonly="readonly"
          @focusout="onFocusOut"
          @focusin="onFocusIn"
          @keypress="onlyNumber"
          ref="textRef"
        />

        <!-- Suffix Icon -->
        <Icon v-if="suffixIcon" :name="suffixIcon" class="zpl-textfield-icon" />
        <!-- shows stepper to increase number or descrease -->
        <div v-if="stepper && type === 'number'" class="zpl-textfield-stepper">
          <button class="zpl-textfield-stepper-btn" type="button" @click="increment">
            <Icon name="filledArrowUp" />
          </button>

          <button class="zpl-textfield-stepper-btn" type="button" :disabled="value === min" @click="decrement">
            <Icon name="filledArrowDown" />
          </button>
        </div>

        <!-- unit -->
        <span v-if="unit" class="zpl-textfield-unit">
          {{ unit }}
        </span>

        <!-- unit icon -->
        <span v-if="unitIcon" class="zpl-textfield-unit">
          <Icon :name="unitIcon" />
        </span>

        <!-- Copy to clipboard -->
        <Tooltip
          :text="'کپی'"
          position="topCenter"
          space="smallSpace"
          class="zpl-copy-button"
        >
          <ButtonPro
            v-if="copyable"
            :text="'کپی'"
            type="secondary"
            size="medium"
            @click.native="copyToClipboard"
          />
        </Tooltip>

        <!-- label -->
        <label v-if="label" :class="['zpl-textfield-label', { isInputFocused }]">
          {{ label }}
        </label>
      </div>
      <div class="zpl-textfield-hint-box">
        <!-- Hint -->
        <div v-if="!!hint && !(successMessage && passed) && errors.length < 1" class="zpl-textfield-hint helper">
          <span>
            {{ hint }}
          </span>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage && passed" class="zpl-textfield-hint success">
          <Icon name="CheckmarkCircle" />
          <span>
            {{ successMessage }}
          </span>
        </div>

        <!-- Errors -->
        <div v-if="errors.length" class="zpl-textfield-hint error">
          <Icon name="warning" />
          <span>{{ errors[0] }}</span>
        </div>
        <!-- {{classes}} -->

        <!-- Max Length -->
        <span v-if="maxPreview" class="zpl-textfield-hint-maxlength"> {{ value.length }}/{{ maxlength }} </span>
      </div>
    </div>
    <!-- </div> -->
  </ValidationProvider>
</template>
<script>
import Icon from "@/components/global/Icon/icon.vue";
import Tooltip from "@/components/test/Tooltip.vue";
import ButtonPro from "~/components/test/ButtonPro.vue";

export default {
  name: "TextField",
  props:{
    disabled:{
      type:Boolean,
      default:false,
    },
    copyableIcon:{
      type:Boolean,
      default:false,
    },
    label:{
      type:String,
      default:'',
    },
    maxlength:{
      type:Number,
      default:0,
    },
    inputName:{
      type:String,
      default:'',
    },
    hint:{
      type:Boolean|String,
      default:false,
    },
    successMessage:{
      type:String,
      default:'',
    },
    unit:{
      type:String,
      default:'',
    },
    type:{
      type:String,
      default:'',
    },
    separator:{
      type:String,
      default:'',
    },
    stepper:{
      type:Boolean,
      default:false,
    },
    copyable:{
      type:Boolean,
      default:false,
    },
    readonly:{
      type:Boolean,
      default:false,
    },
    ltr:{
      type:Boolean,
      default:false,
    },
    numLtr:{
      type:Boolean,
      default:false,
    },
    maxPreview:{
      type:Boolean,
      default:false,
    },
    mono:{
      type:Boolean,
      default:false,
    },
    prefixIcon:{
      type:String,
      default:'',
    },
    suffixIcon:{
      type:String|Boolean,
      default:'',
    },
    unitIcon:{
      type:String,
      default:'',
    },
    placeholder:{
      type:String,
      default:'',
    },
    min:{
      type:String,
      default:'',
    },
    errors:{
      type:String,
      default:'',
    },
    passed:{
      type:Boolean,
      default:false,
    },
    value:{
      type:String,
      default:'',
    },
    name:{
      type:String,
      default:'',
    },
    vid:{
      type:String,
      default:'',
    },
    rules:{
      type:String|Object,
      default:'',
    },
  },
  data() {
    return {
      isInputFocused:false,
    };
  },
  async created() {
    this.isInputFocused = !!this.value.length;
  },
  mounted() {
    this.emitRef();
  },
  beforeDestroy() {

  },
  computed: {
    priceModel:{
      get(){
        return this.formattedValue();
      },
      set(value) {
        if (this.type === "number") {
          // FIXME: this couse that min_value and max_value do not work properly.
          this.$emit("input", this.toEnNumber(value).toString().replace(/,/g, ""));
        } else {
          this.$emit("input", value);
        }
      }
    },
  },
  methods: {
    onFocusIn(){
      this.isInputFocused = true;
    },

    onFocusOut(e){
      if (!this.value) {
        this.isInputFocused = false;
      }
      this.$emit("blur", e);
    },

    emitRef() {
      this.$emit("input-ref", this.$refs.textRef);
    },

    formattedValue(){
      if (this.type === "number") {
        switch (this.separator) {
          case "comma":
            return this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          case "dash":
            return this.value.replace(/\B(?=(\d{4})+(?!\d))/g, "-");
          default:
            return this.value;
        }
      } else {
        return this.value;
      }
    },

    toEnNumber(payload){
      const modifiedToEnNumber = payload
        .toString()
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => (d.charCodeAt(0) - 1632).toString())
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => (d.charCodeAt(0) - 1776).toString());

      return payload === "" ? payload : modifiedToEnNumber;
    },

    updating(){
      this.$nextTick(() => {
        (this.$refs.tooltipInfo)?.$refs.tooltipInfo?.updateStyle();
      });
    },

    onlyNumber(event) {

      if (this.type === "number") {
        if (!/\d/.test(this.toEnNumber(event.key)) && event.key !== ".") {
          return event.preventDefault();
        }
      }
      // if  there is maxlength check the value length
      if (this.maxlength) {
        if (this.value.length === this.maxlength) {
          return event.preventDefault();
        }
        return true;
      }
      return true;
    },

    increment() {
      this.isInputFocused = true;
      if (this.type === "number") {
        if (this.value.length === 0) {
          this.$emit("input", this.toEnNumber("1"));
        } else {
          const newValue = (Number(this.value) + 1).toString();
          this.$emit("input", this.toEnNumber(newValue));
        }
      }
    },

    decrement(){
      const numberValue = Number(this.value);
      if (this.type === "number" && numberValue > 0) {
        const newValue = (numberValue - 1).toString();
        this.$emit("input", this.toEnNumber(newValue));
      }
    },

    copyToClipboard() {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(this.value);

      this.copyToClipboardText = 'کپی شد';

      setTimeout(() => {
        this.copyToClipboardText = 'کپی';
      }, 1000);
    }
  },
  watch:{
    "value"(){
      if (this.value.length) {
        this.isInputFocused = true;
      }
    }
  },
  mixins:[],
  components: {ButtonPro, Tooltip, Icon},
};
</script>
