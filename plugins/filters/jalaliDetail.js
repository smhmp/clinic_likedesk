import moment from 'moment-jalaali';
moment.loadPersian();


export default (value) => {
  if (value !== null) {

      return moment(value, 'YYYY-MM-DD HH:mm:ss').format(' jDD jMMMM jYYYY،  HH:mm:ss ');
  }

  return '---';
};
