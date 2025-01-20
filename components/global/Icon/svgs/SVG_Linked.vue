<template>
  <svg
    :class="['SVG_Linked', className]"
    :fill="color"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="g" :clip-path="clipPath">
      <path
        class="path"
        d="M17 7H13V9H17C17.7956 9 18.5587 9.31607 19.1213 9.87868C19.6839 10.4413 20 11.2044 20 12C20 12.7956 19.6839 13.5587 19.1213 14.1213C18.5587 14.6839 17.7956 15 17 15H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7ZM11 15H7C6.20435 15 5.44129 14.6839 4.87868 14.1213C4.31607 13.5587 4 12.7956 4 12C4 11.2044 4.31607 10.4413 4.87868 9.87868C5.44129 9.31607 6.20435 9 7 9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15ZM8 11H16V13H8V11Z"
        :fill="color"
      />
    </g>
    <defs class="defs">
      <clipPath class="clip-path" :id="clipPathId">
        <rect class="rect" :fill="color" height="24" width="24" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "SVG_Linked",
  props: {
    className: {
      type: String,
      default: "",
    },
    color:{
      type: String,
      default: "white",
    },
  },
  computed: {
    clipPath() {
      return `url(#${this.clipPathId})`;
    },
    clipPathId() {
      return `clip0_${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 1000)}`;
    },
  },
};
</script>
