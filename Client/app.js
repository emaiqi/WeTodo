//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    login();
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


function login(){
  wx.login({
    success: function(res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'https://todo.aozi.co/api/login',
          data: {
            Time: new Date().getTime(),
            Data: {Code:res.code}
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
          success: function(res){
            if(res.data.ErrorCode===undefined){
              console.log("登陆成功");
            }else{
              var err = new Error();
              err.message = "失败:status:"+res.data.Status+",msg:"+res.data.Msg;
              err.name = res.data.ErrorCode
              throw(err)
            }
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}


