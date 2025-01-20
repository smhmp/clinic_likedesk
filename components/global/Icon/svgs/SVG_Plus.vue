<template>
  <svg
    :class="['color-mode-withe-color-item-add', className]"
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="g" :clip-path="`url(#clip0_${Math.floor(Math.random() * 10000)}_${Math.floor(Math.random() * 10000)})`">
      <path
        class="path"
        d="M19.0586 13H13.0586V19H11.0586V13H5.05859V11H11.0586V5H13.0586V11H19.0586V13Z"
        fill="#636E72"
      />
    </g>
    <defs class="defs">
      <clipPath class="clip-path" :id="`clip0_${Math.floor(Math.random() * 10000)}_${Math.floor(Math.random() * 10000)}`">
        <rect class="rect" fill="white" height="24" width="24" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "SVG_Plus",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>
