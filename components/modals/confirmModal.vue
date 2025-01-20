<template>
  <modal :title="title" @close="close()">
    <div slot="body">
      <p>آیا از {{title}} اطمینان دارید؟</p>
    </div>
    <div slot="footer" class="float-left" @click="close()">
      <button class="btn secondary">لغو</button>
      <button
        class="btn danger"
        @click="$emit('confirm')"
      >
        بله
      </button>
    </div>
  </modal>
</template>
<script>
import modal from './modal.vue'
export default {
  components: { modal },
  props: {
    title: {
      type: String,
    },
  },
  methods:{
    close(){
      this.$emit('close')
    }
  }
}
</script>
