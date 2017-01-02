//index.js
//获取应用实例
var data = {
  title:"",
  time:"",
  date:"",
  repeatArr: [
    {
      id: 0,
      name: '否'
    },
    {
      id: 1,
      name: '是'
    }
  ],
  repeat:"否",
  level:{
    1:{value:1,checked:true,text:"一般"},
    2:{value:2,checked:false,text:"重要"},
    3:{value:3,checked:false,text:"紧急"}
  },
  modalShow: false,
  content: "",
};
var app = getApp()
Page({
  data: {
    title:data.title,
    time:data.time,
    date:data.date,
    level:data.level,
    modalShow: false,
    repeatArr: [
      {
        id: 0,
        name: '否'
      },
      {
        id: 1,
        name: '是'
      }
    ],
    repeat:"否"
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
  bindRepeatChange:function (event){
    var name = "";
    for(var i=0;i<data.repeatArr.length;i++){
      if (data["repeatArr"][i].id == event.detail.value){
        name=data["repeatArr"][i].name
        break;
      }
    }
    data["repeat"] = name;
    this.setData(data)
  },
  bindTimeChange: function (event){
    data["time"] = event.detail.value;
    this.setData(data)
  },
  bindDateChange: function(event){
    data["date"] = event.detail.value;
    this.setData(data)
  },
  showModal:function(){
    data["modalShow"] = true;
    this.setData(data)
  },
  cancelSubmitItem:function(){
    data["modalShow"] = false;
    this.setData(data)
  },
  submitItem:function(event){
    var that = this;
    data["modalShow"] = false;
    var type;
    for(var i in data.level){
      if (data.level[i].checked === true){
        type = data.level[i].value;
        break;
      }
    }
    this.setData(data)
    if(data.title === ""){
      wx.showModal({
        title: '提示',
        content: '事件不能为空',
        success: function(res) {
          if (res.confirm) {
            data["modalShow"] = true;
            that.setData(data)
          }
        }
      })
      return;
    }
    var req = {
        Time: new Date().getTime(),
        Data:{
            RequestTime: new Date().getTime(),
            Data: [
                {
                    Title:data.title,    
                    Content:data.content,    
                    State:0,    
                    Type:type === 1 ? "Normal": type === 2 ? "Urgent" : "Important", //Normal,Urgent,Important,默认Normal    
                    Guid:null,
                    StartTime:  new Date(data.date + " " + data.time).getTime(),    
                    EndTime:    new Date(data.date + " " + data.time).getTime(),    
                    AlertTime:  new Date(data.date + " " + data.time).getTime(),       
                }
            ]
        }
       
    }
    //提交数据
    wx.request({
      url: 'https://todo.aozi.co/api/todoitem',
      data: req,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // fail
        console.log(res)
      },
      complete: function(res) {
        // complete
        console.log(res)
      }
    })
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
