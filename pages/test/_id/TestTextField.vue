<template>
  <div class="dark:bg-surface-dark p-sm pb-md rounded-md grid grid-cols-2 gap-sm rtl">
    <TextField
      v-model="hint"
      class="col-span-1"
      name="test"
      label="  ltr فیلد عادی"
      rules="required"
      ltr
      hint="hint"
      copyableIcon=""
      disabled=""
      unit="راهنمایی می کنم"
    />
    <TextField
      v-model="hint"
      class="col-span-1"
      label="فیلد عادی"
      :maxlength="5"
      maxPreview
      name="a"
      loading
    />
    <TextField
      v-model="hint"
      class="col-span-1"
      label="فیلد عادی"
      :maxlength="5"
      maxPreview
      name="t1"
    />
    <TextField
      v-model="number"
      class="col-span-1"
      label="فیلد عددی"
      stepper
      type="number"
      name="t2"
      separator="comma"
      rules="required|min_amount:1000|max_amount:5000"
    />
    <TextField
      v-model="icon1"
      class="col-span-1"
      prefix-icon="Star"
      placeholder="فیلد آیکن دار"
      name="t3"
    />
    <TextField
      v-model="icon2"
      class="col-span-1"
      label="فیلد آیکن دار"
      suffix-icon="Star"
    />
    <TextField
      v-model="unit"
      type="number"
      class="col-span-1"
      separator="comma"
      label="فیلد واحد دار"
      unit="ریال"

      :mono="true"
    />
    <TextField
      v-model="limit"
      class="col-span-1"
      label="فیلد با تعداد کاراکتر محدود"
      :limit="limitNum"
    />
    <TextField
      v-model="num"
      class="col-span-1"
      label="فیلد عددی چپ چین"
      numLtr
    />
    <TextField
      v-model="url"
      class="col-span-1"
      label="فیلد غیرقابل تغییر قابل کپی"
      readonly
      ltr
      copyable
    />
    <TextField
      v-model="disabled"
      class="col-span-1"
      label="فیلد غیر فعال"
      disabled
    />
    <h1 class="col-span-2 dark:text-secondary mt-md">
      اعتبارسنجی
    </h1>
    <TextField
      v-model="helper"
      class="col-span-2"
      hint="می‌توانید در این فیلد هر چیزی بنویسید"
    />
    <TextField
      v-model="success"
      class="col-span-1 mb-lg"
      success-hint="متن با موفقیت خوانده شد"
    />
    <TextField
      v-model="error"
      class="col-span-1"
    />
  </div>
</template>
<script>
import {EventBus} from "@/plugins/event-bus";
import TextField from "@/components/test/TextField.vue";

export default {
  name: "TestTextField",
  props:{
    prop1:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      disabled: "سلام از طرف یک فیلد غیر فعال",
      hint: "vals",
      number: "",
      icon1: "",
      icon2: "",
      unit: "",
      helper: "",
      success: "",
      error: "",
      limit: "",
      limitNum: 5,
      num: "",
      url: "https://zarinp.al/376218",
    };
  },
  async created() {
    EventBus.$emit("layoutCommands",{noSidebar:true});
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
  components: {TextField},
};
</script>
