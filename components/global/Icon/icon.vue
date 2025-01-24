<template>
  <component :is="name" :selected="selected" role="img" class="inline-block" />
</template>

<script>
import Warning from "@/components/global/Icon/icons/Warning.vue";
import SendMail from "@/components/global/Icon/icons/SendMail.vue";
import Delete from "@/components/global/Icon/icons/Delete.vue";
import Tag from "@/components/global/Icon/icons/Tag.vue";
import Category from "@/components/global/Icon/icons/Category.vue";
import SwitchIcon from "@/components/global/Icon/icons/SwitchIcon.vue";
import FilledArrowDown from "@/components/global/Icon/icons/FilledArrowDown.vue";
import FilledArrowUp from "@/components/global/Icon/icons/FilledArrowUp.vue";
import CheckmarkCircle from "@/components/global/Icon/icons/CheckmarkCircle.vue";
import Star from "@/components/global/Icon/icons/Star.vue";
import PanelIcon from "@/components/global/Icon/icons/PanelIcon.vue";
import RefererIcon from "@/components/global/Icon/icons/RefererIcon.vue";
import TransactionIcon from "@/components/global/Icon/icons/TransactionIcon.vue";
import PersonalIcon from "@/components/global/Icon/icons/PersonalIcon.vue";
import TrackingIcon from "@/components/global/Icon/icons/TrackingIcon.vue";
export default {
  components : {
    Star,
    CheckmarkCircle,
    FilledArrowUp,
    FilledArrowDown,
    Warning,
    SendMail,
    Delete,
    Tag,
    Category,
    SwitchIcon,
    PanelIcon,
    RefererIcon,
    TransactionIcon,
    PersonalIcon,
    TrackingIcon,
  },
  name: 'Icon',
  props : {
    selected:false,
    name:{
      type : String
    }
  },
}
</script>
