<template>
  <div class="w-full DatePickerInline">
    <div class="labelD">
      <div class="labelD2">{{title}}</div>
    </div>
    <div :data-name="iName" class="flex flex-row w-full" :data-localize="title" :data-rules="dataRules" :data-tab="dataTab" style="direction: rtl;">
      <div class="zpl-select-group">
        <div class="zpl-select">
          <div class="flex flex-row items-center w-full" style="text-align: right;direction: rtl;">
            <span> سال،ماه،روز </span>
            <div class="zpl-select-value"></div>
          </div>
          <label class="zpl-select-label"></label>
          <span class="zpl-select-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" class="inline-block">
                <path d="M8 10L12 14L16 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
          </span>
        </div>
        <div>
          <div class="zpl-select-list">
            <ul>
              <li class="zpl-select-item">
                <div class="info">
                  <div class="title">1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input name="birth_year" type="hidden">
      <input name="birth_month" type="hidden">
      <input name="birth_day" type="hidden">
    </div>

    <!-- Error -->
    <div id="birth_year-error" :data-error="iName" :class="['input-error',{hidden:!birth_error}]">{{birth_error}}</div>
  </div>
</template>
<script>
export default {
  name: "DatePickerInline",
  props:{
    dataTab:'',
    dataRules:'',
    iName:'',
    title:''
  },
  data() {
    return {
      birth_error:'',
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
