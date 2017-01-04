//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.request({
    //   url: 'https://todo.aozi.co/api/todoitem',
    //   data: req,
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   },
    //   fail: function(res) {
    //     // fail
    //     console.log(res)
    //   },
    //   complete: function(res) {
    //     // complete
    //     console.log(res)
    //   }
    // })
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})



