export function formatDate(createTime){
  var startTime = new Date(createTime);
  var endTime = new Date();
  var diff = endTime.getTime() - startTime.getTime();
  //计算年
  var year = Math.floor(diff / (3600 * 1000 * 24 * 360))
  if (year > 0) {
    return year + '年前'
  }
  //计算月
  var month = Math.floor(diff / (3600 * 1000 * 24 * 30))
  if (month > 0) {
    return month + '月前'
  }
  //天
  var day = Math.floor(diff / (3600 * 1000 * 24))
  if (day > 0) {
    return day + '天前'
  }
  //计算时
  var hour = Math.floor(diff / (3600 * 1000))
  if (hour > 0) {
    return hour + '小时前'
  }
  //计算分
  var minutes = Math.floor(diff / (60 * 1000))
  if (minutes > 1) {
    return minutes + '分钟前'
  }else {
    return '刚刚'
  }
}