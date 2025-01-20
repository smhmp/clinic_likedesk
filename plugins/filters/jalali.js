import moment from 'moment-jalaali';
import {$zpl} from "@/plugins/zpl";

moment.loadPersian();


export default (value) => {
  if (value !== null) {
    let today = moment($zpl.getCurrTime()).format('jYYYY/jMM/jDD')
    let jValue = moment(value).format('jYYYY/jMM/jDD')
    let currentYear = moment($zpl.getCurrTime()).format('jYYYY')
    let valueCurrent = moment(value).format('jYYYY')
    let yesterday = moment($zpl.getCurrTime()).subtract(1, 'days').format('jYYYY/jMM/jDD');
    let tommorow = moment($zpl.getCurrTime()).add(1, 'days').format('jYYYY/jMM/jDD');
    if (jValue === yesterday) {
      return 'دیروز، ' + moment(value, 'YYYY-MM-DD HH:mm:ss').format(' HH:mm ');
    }
    if (jValue === tommorow) {
      return 'فردا، ' +moment(value, 'YYYY-MM-DD HH:mm:ss').format(' HH:mm ');
    }
    if (jValue === today) {
      return 'امروز، ' + moment(value, 'YYYY-MM-DD HH:mm:ss').format(' HH:mm ');
    }
    if (valueCurrent === currentYear) {
      return moment(value, 'YYYY-MM-DD HH:mm:ss').format(' jDD jMMMM، HH:mm ');
    } else
      return moment(value, 'YYYY-MM-DD HH:mm:ss').format(' jDD jMMMM jYY، HH:mm ');
  } else {
    return '---';
  }
};



