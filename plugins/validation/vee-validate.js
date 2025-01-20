import  Vue  from 'vue';
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import './extraRules';
import { localize } from "vee-validate";
import fa from '../../translate/validation/faMessages.json';
import {$zpl} from "@/plugins/zpl";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}
localize('fa' , fa);
$zpl.validationFa=fa
