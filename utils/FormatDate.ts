const moment = require("moment/moment");

const formatDate = (date:Date) => {
  console.log(date);
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;