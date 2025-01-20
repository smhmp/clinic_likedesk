<template>
  <div class="textInputCom" @click="doFocusIn">
    <div :class="['text-input',{inpFocused:isInputFocused,inpFilled:isInputFilled}]">
      <div class="content2">
        <div :class="['text-input-label rtl',{noFocus:!isInputFilled&&!isInputFocused}]">
          <div class="label">{{`${iLabel}`}}</div>
        </div>
        <input :data-rules="dataRules" :data-localize="iLabel" :maxlength="maxlength" :name="iName" ref="inpRef" :type="tagNumber ? 'number' : 'text'" :class="['text rtl',{ltr:tagNumber||ltr}]" v-model="modValName"
               :data-tab="dataTab" :data-role="dataRole"
               @focusout="onFocusOut"
               @focusin="onFocusIn"
               @input="$emit('input', $event.target.value)"
               @keyup="onKeyUp"
               @paste="onPaste"
               :autocomplete="autocomplete"
               v-bind="addiAttr"
        >
      </div>
    </div>
    <div :data-error="iName"  class="hidden zpl-textfield-hint hasError"></div>
    <div v-if="backendErrors" class="zpl-textfield-hint error">
      <span>{{ backendErrors }}</span>
    </div>
    <div v-if="caption" class="caption2" v-html="caption"></div>
    <div v-if="moreGui" class="moreGui">
      <p v-if="!moreGui['href']" >{{moreGui['txt']}}</p>
      <a v-else :href="moreGui['href']" target="_blank">{{moreGui['txt']}}</a>
    </div>
    <slot name="footer" />
  </div>
</template>
<script>

import Icon from "~/components/global/Icon/icon.vue";
import {lg} from "@/src/js/dbg";
import {langTools} from "@/src/js/langMan";
import {TextFieldMixin} from "@/mixins/TextFieldMixin";


export default {
  name: "TextInput",
  components: {Icon},
  mixins:[TextFieldMixin]
};
</script>
