//index.js
//获取应用实例
var data = {
  title:"",
  time:"",
  date:"",
  level:{
    1:{value:1,checked:true,text:"一般"},
    2:{value:2,checked:false,text:"重要"},
    3:{value:3,checked:false,text:"紧急"}
  }
};
var app = getApp()
Page({
  data: {
    item: {
      time:"",
      date:""
    },
    time:data.time,
    date:data.date,
    level:data.level
  },
  //事件处理函数
  titleInput: function(event) {
    data["title"] = event.detail.value;
    this.setData(data)
  },
  contentInput:function(event){
    data["content"] = event.detail.value;
    this.setData(data)
  },
  itemLevelChange: function (event){
    for(var i in data.level){
      data.level[i].checked=false;
    }
    data["level"][event.detail.value]["checked"] = true;
    this.setData(data)
  },
  dateChange:function (){

  },
  bindTimeChange: function (event){
    data["time"] = event.detail.value;
    this.setData(data)
  },
  bindDateChange: function(event){
    data["date"] = event.detail.value;
    this.setData(data)
  },
  submitItem:function(event){
    //提交数据
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
