//app.js
const api = require('./utils/api.js');
const md5 = require('./lib/md5/md5.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) 
  },
  globalData: {
    userInfo: null   
  },
  $ajax: api.apiList,
  refresh:function(callback){
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      callback && callback();
    }, 800);
  },
  $alert: function (content, callback, title, showCancel){
    wx.showModal({
      title: title || '提示',
      content: content || '请输入验证码',
      showCancel: showCancel||false,
      success: callback
    })
  },
  md5: function (str){
    return md5(str);
  } 
})