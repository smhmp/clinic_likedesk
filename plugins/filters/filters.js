import Vue from 'vue'
import fromNow from './fromNow'
import jalaliDetail from './jalaliDetail'
import jalaliDetailNoHour from './jalaliDetailNoHour'
import jalali from './jalali'
import strLimit from './strLimit'
import persianNumbers from './persianNumbers'
import numberFormat from './numberFormat'

Vue.filter('fromNow', fromNow);
Vue.filter('jalaliDetail', jalaliDetail);
Vue.filter('jalaliDetailNoHour', jalaliDetailNoHour);
Vue.filter('jalali', jalali);
Vue.filter('strLimit', strLimit);
Vue.filter('persianNumbers', persianNumbers);
Vue.filter('numberFormat', numberFormat);
