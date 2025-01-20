<template>
  <component :is="name"/>
</template>

<script>

import TestTextField from "@/pages/test/_id/TestTextField.vue";

export default {
  name:'home',
  components: {TestTextField},
  data(){
    return {
      name:''
    }
  },
  created() {
    const router = this.$router;
    const route = this.$route;
    const name = route.params.id;
    switch (name){
      case 'textfield':
        this.name = 'TestTextField';
    }
  },
  mounted() {

  },
  computed:{

  }
}

</script>
