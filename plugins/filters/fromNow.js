import moment from 'moment-jalaali';
moment.loadPersian();


export default (value) => {
  if (typeof value === 'undefined') {
    return value;
  }
  if (value === null)
    return '---';
  return moment(value, 'YYYY-MM-DD HH:mm:ss').from();
};