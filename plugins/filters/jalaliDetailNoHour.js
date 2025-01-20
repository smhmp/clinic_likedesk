import moment from 'moment-jalaali';
moment.loadPersian();


export default (value) => {
  if (value !== null) {

      return moment(value, 'YYYY-MM-DD').format('jDD jMMMM jYYYY');
  }

  return '---';
};
