<template>
  <div :class="['parent_menuDrawer',{openedSidebar}]">
    <div class="MenuDrawer" style="">
      <div class="Bgimg"></div>
      <div class="Container w-full">
        <div class="Right" style="justify-content: flex-end; align-items: center; gap: 4px; display: flex;">
          <div class="insight-clinic-logo">
            <div class="insight-clinic-logo2">
              <div class="bitTitle" style="font-size: 18px;">کلینیک اینسایت</div>
            </div>
            <div class="insight-clinic-logo3"><img src="@/assets/imgs/autohtml-all1/clinicInsight-logo-black.svg" class="clinic-convert-colorful">
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
