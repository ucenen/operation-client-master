//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)



    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  wx.clearStorageSync()
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
    userInfo: null,
    openid: '', //oUTCI5OhDMGQo_IBl7r8jS3XAxLg
    authority:[], //权限集合
    equipment:[]  //当前openid关联的所有设备
  },
  sdk: require('/utils/sdk.js'), 
  // authority:require('/utils/authority.js'),

  checkauthority(grade, obj){
    var authority = this.globalData.authority;
    if (grade == 1) {
      for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < authority.length; j++) {
          if (obj[i].code == authority[j].val) {
            obj[i].status = true;
          }
        }
      }
      return obj;
    } else {
      for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < authority.length; j++) {
          for (var k = 0; k < authority[j].val2.length; k++) {
            if (obj[i].code == authority[j].val2[k]) {
              obj[i].status = true;
            }
          }

        }
      }
      return obj;
    }
  }
  
})