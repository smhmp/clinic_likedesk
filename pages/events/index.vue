<template>
  <div>
    <Events v-if="isLogedin"/>
    <JustLoading/>
  </div>
</template>

<script>
import Events from "@/pages/events/Events.vue";
import {Permissions} from "@/mixins/PermissionMixin";
import UserMixin from "@/mixins/UserMixin";
import JustLoading from "@/components/JustLoading.vue";

export default {
  name:'ProfileIndex',
  components: {JustLoading, Events},
  created() {
    if(!this.isLogedin){
      this.$router.replace({path:`/login-register/`})
    }
  },
  mixins:[UserMixin]
}

</script>
