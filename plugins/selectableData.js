let selectableData = (data, newData, value='id', title='title') => {
  data.forEach((item) => {
    newData.push({
      title: item[title],
      value: item[value],
    });
  });
};
export default selectableData;
