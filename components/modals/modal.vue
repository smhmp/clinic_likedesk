<template>
  <div class="zpl-modal">
    <div class="modal">
      <div class="modal-header">
        <h1>{{ title }}</h1>
        <outline-X-icon class="close-modal" @click.native="close" />
      </div>
      <div :class="['modal-body' ,{'overflow-visible':noScroll}]">
        <slot name="body" />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "عنوان",
    },
    noScroll: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
