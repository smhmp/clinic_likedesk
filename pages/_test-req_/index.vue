<template>
  <_TestReq_/>
</template>

<script>
import Events from "@/pages/events/Events.vue";
import {Permissions} from "@/mixins/PermissionMixin";
import UserMixin from "@/mixins/UserMixin";
import _TestReq_ from "@/pages/_test-req_/_TestReq_.vue";

export default {
  name:'_TestReq_Index',
  components: {_TestReq_, Events},
  created() {

  },
  mixins:[UserMixin]
}

</script>
