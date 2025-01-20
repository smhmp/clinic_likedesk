<template>
  <div class="PreviewPersonal card">
    <div class="block">
      <div class="heading">
        <div class="contentA">
          <div class="title">اطلاعات ثبت شده</div>
        </div>
      </div>
      <div class="action-list-item">
        <div class="container">
          <div class="stack">
            <div class="frame-12577">
              <div :class="['status','st_'+statAct]">
                <div :class="['label']">{{statActFa}}</div>
              </div>
            </div>
            <div class="stack2">
              <div class="labelA2">وضعیت</div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(value, key) in fieldsFa" class="action-list-item" :key="key">
        <div class="container">
          <div class="stack">
            <div class="stack2">
              <div class="value">{{getValueField(key)}}</div>
              <div class="label3">{{value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "PreviewManualKyc",
  props:{
    fieldsFa:{},
    statAct:'',
    statActFa:'',
  },
  methods: {
    getValueField(key){
      const userInfo = this.$store.state.application.userInfo;
      let res = userInfo[key];
      if(!res)return '';
      return res
    }
  },
};
</script>
