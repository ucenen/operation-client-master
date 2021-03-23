const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getyeardate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取上个月初日期
 */
const getLastMonth = date => {
  var year = date.getFullYear();
  var month = date.getMonth();
  if (month == 0) {
    year = year - 1;
    month = 12;
  } else if (month <= 9) {
    month = "0" + month;
  }
  return year + "-" + month + "-01";
}

/**
 * 获取上个月末日期
 */
const getLastMonthAndDay = date => {
  var year = date.getFullYear();
  var month = date.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  } else if (month <= 9) {
    month = "0" + month;
  }
  var lastDay = new Date(year, month, 0);
  return year + "-" + month + "-" + lastDay.getDate();
}

module.exports = {
  formatTime: formatTime,
  getyeardate:getyeardate,
  getLastMonth: getLastMonth,
  getLastMonthAndDay: getLastMonthAndDay
}
