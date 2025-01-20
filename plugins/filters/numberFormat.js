export default (value) => {
  if (typeof value === 'undefined') {
    return value;
  }
  return value.toLocaleString('fa-IR');
};
