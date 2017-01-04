//index.js
//获取应用实例
var items = [];
var app = getApp()
Page({
  data: {
    items: items
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../item/item'
    })
    console.log("离开")
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
