<template>
  <Events v-if="isLogedin"/>
</template>

<script>
import Events from "@/pages/events/Events.vue";
import {Permissions} from "@/mixins/PermissionMixin";
import UserMixin from "@/mixins/UserMixin";

export default {
  name:'ProfileIndex',
  components: {Events},
  created() {
    if(!this.isLogedin){
      this.$router.replace({path:`/login-register/`})
    }
  },
  mixins:[UserMixin]
}

</script>
