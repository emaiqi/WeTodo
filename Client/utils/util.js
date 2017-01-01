function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function timespan2LocalTime(timespan){
  var itemTime = new Date(timespan);
  var now = new Date();
  var missionTime = now.getTime() - itemTime.getTime();
  var textStr = "上";
  var today = formatTime(now).split(" ")[0];
  var tomorrow = formatTime(new Date(now.getTime()+1*24*60*60*1000)).split(" ")[0];
  var yesterday = formatTime(new Date(now.getTime()-1*24*60*60*1000)).split(" ")[0];
  var thisWeek = new Date(getMonday().getTime() + 7*24*60*60*1000) - getMonday().getTime();
  //如果年月日相同
  if(today === formatTime(itemTime).split(" ")[0]){
    return "今天";
  }else{
    //年月相同日不同
    if(formatTime(itemTime).split(" ")[0] === tomorrow){
      return "明天"
    }else if(formatTime(itemTime).split(" ")[0] === yesterday){
      return "昨天"
    }
  }
  //小于一周
  if(itemTime.getTime()>(getMonday().getTime()) && itemTime.getTime()<(new Date(getMonday().getTime()+7*24*60*60*1000))){
    textStr = "本";
    return textStr + getTimeText(timespan);
  }
  //小于俩周
  if(itemTime.getTime()>(getMonday().getTime() - 7*24*60*60*1000) && itemTime.getTime()<getMonday().getTime()){
    textStr = "上"
    return textStr + getTimeText(timespan);
  }
  //大于俩周
  if(itemTime.getTime()>new Date(getMonday().getTime() + 7*24*60*60*1000)&&itemTime.getTime()<new Date(getMonday().getTime() + 14*24*60*60*1000)){
    textStr = "下"
    return textStr + getTimeText(timespan);
  }
  return formatTime(itemTime)
}

//获取星期几
function getTimeText(timespan){
  var index = new Date(timespan).getDay();
  var week = ["周日","周一","周二","周三","周四","周五","周六"]
  return  week[index];
}

//获取本周一时间
function getMonday(){
  var now = new Date();
  var today = new Date(now.getFullYear() + "/" + (now.getMonth() + 1) + "/" +now.getDate());
  var index = now.getDay();
  if(index===0){
    index = 7;
  }
  if(index>1){
    return new Date(today.getTime() - (index-1)*24*60*60*1000);
  }
}

module.exports = {
  formatTime: formatTime,
  timespan2LocalTime: timespan2LocalTime
}
