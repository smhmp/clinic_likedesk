export default (value) => {
  if (typeof value === 'undefined' || !value) {
    return value;
  }
  value = typeof value === 'number' ? value.toString() : value;
  return value.toString().replace(/\d/g, function(match) {
    return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][parseInt(match)];
  });
};
