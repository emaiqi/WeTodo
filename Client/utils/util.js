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




//Save or Get SessionId; 
//Usage:
//  save: sessionId('Here is a session_id string');
//  get : sessionId();//return 'Here is a session_id string'; 
function sessionId(){
    return !arguments.length ? wx.getStorageSync('SESSION_ID'):wx.setStorageSync('SESSION_ID',arguments[0]);
}


//API
var API_BASE = 'https://todo.aozi.co/api/';


//API list
var APIs = {
    login: API_BASE+'login',
    item : API_BASE+'todoitem',
    list : API_BASE+'todolist'
};

//封装请求
//api:APIs item; 
//actionType string; 
//data: requestData.Data;
//f:object{success:fn,fail:fn,complete:fn}
function R(api,actionType,data,f){
    var url=APIs[api];
    var j_req={
        Time: new Date().getTime(),
        Data: data
    };
    if(api!='login')j_req['SessionId']=sessionId();
    if(actionType)j_req['ActionType']=actionType;
    //request 请求参数
    wx.request({
        url:url,
        method:'POST',
        data:j_req,
        success:function(r){
            if('function' == typeof(f.success)){
                f.success(r);
            }
        },
        fail:function(r){
            if('function' == typeof(f.fail)){
                f.fail(r);
            }
        },
        complete:function(r){
            if('function' == typeof(f.complete)){
                f.complete(r);
            }
        }
    };);
}


//请求错误的通用处理函数
function failHandler(){
    //TODO:统一处理方式 toast,console.log, errorCode_parse etc.
}


//请求成功，返回ErrorCode时的通用处理函数 
//resData: wx.request 返回的res.data    
//f.success(resData): 处理返回的数据主题 ：res.data.Data,仅当没有ErrorCode 时生效
//f.fail(resData): 需要在通用处理方式完成错误信息处理后，进行个性错误时使用
//f.complete(resData): 
function sucHandler(resDate,f){
    //如果返回Status不是200，即有ErrorCode时通用处理方式
    if('undefined' == typeof(resData.ErrorCode) || '200' != resData.Status){
        wx.toast({
            icon:'warn',
            title:'undefined'==resData.Msg?'操作失败':resData.Msg,
            duration:2000
        });
        
        if('function' == typeof(f.fail)){
            f.fail(resData);
        }
    }else if('function' == typeof(f.success)){
        f.success(resData);
    }
    
    if('function' == typeof(f.complete)){
        f.complete(resData);
    }
}



module.exports = {
  formatTime: formatTime,
  timespan2LocalTime: timespan2LocalTime,
  sessionId: sessionId,
  
}
