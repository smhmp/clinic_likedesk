<template>
  <div :class="['parent_menuDrawer',{openedSidebar}]">
    <div class="MenuDrawer" style="">
      <div class="Bgimg" style="">
        <img src="@/assets/imgs/autohtml-all1/bg-img1.png" class="bg-img2" style=""></div>
      <div class="Container" style="">
        <div class="Right" style="justify-content: flex-end; align-items: center; gap: 4px; display: flex;">
          <div class="zarin-pal-logo">
            <div class="zarin-pal-logo2"><img src="@/assets/imgs/autohtml-all1/zarin-pal-convert-type-farsi0.svg" class="zarin-pal-convert-type-farsi">
            </div>
            <div class="zarin-pal-logo3"><img src="@/assets/imgs/autohtml-all1/zarin-pal-convert-colorful0.svg" class="zarin-pal-convert-colorful">
            </div>
          </div>
          <div class="MenuAction" @click="onClickMenu"
               style="height: 40px; padding: 8px; border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex;">
           <img
             class="menuburger"
             src="@/assets/imgs/svg/menu_burger.svg"
           />
          </div>
        </div>
      </div>
      <Sidebar :openedSidebar="openedSidebar" :doCloseSidebar="doCloseSidebar"/>
    </div>
  </div>
</template>
<script>

import Sidebar from "@/components/SidebarCo.vue";

export default {
  name: "MenuDrawer",
  props:{
    onClose:null,
    openedSidebar:false,
  },
  data() {
    return {};
  },
  async created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  computed: {},
  methods: {
    doCloseSidebar(){
      this.onClose && this.onClose();
    },
    onClickMenu(){
      this.onClose && this.onClose();
    }
  },
  watch: {},
  mixins: [],
  components: {Sidebar},
};
</script>
