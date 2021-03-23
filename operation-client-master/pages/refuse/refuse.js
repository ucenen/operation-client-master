// pages/refuse/refuse.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showLoading({
      title: '授权中,请稍等！',
    })
    // 登录
    wx.login({
      success: res => {
        var obj = {
          code: res.code
        }
        app.sdk.check_user(obj, success => {
          wx.hideLoading();
          if (success.data.return_code == 'success') {    
            app.globalData.openid = success.data.return_msg.openid;
            app.globalData.authority = success.data.return_msg.authority;                      
            wx.reLaunch({
              url: '../home/home',
            })
          } else {
            this.setData({
              auth: true
            })
          }
        })
      }

    })





    // var that = this;
    // wx.showLoading({
    //   title: '授权中...',
    // })
    // // 登录
    // wx.login({
    //   success: res => {
    //     var obj = {
    //       code: res.code
    //     }
    //     that.sdk.check_user(obj, success => {
    //       wx.hideLoading();
    //       if (success.data.return_code == 'success') {
    //         that.globalData.openid = success.data.return_msg.openid;
    //         that.globalData.authority = success.data.return_msg.authority;
    //           //授权过 在关闭app后再次打开 不进行授权处理
    //         // 注意 这个方法是在页面的方法执行后 才会 执行   请注意 跳转的路径  如果在二级 目录 需要加 ../../跳出来
    //         // let pages = getCurrentPages();
    //         // let router = pages[pages.length - 1].route;

    //         wx.reLaunch({
    //           url: '/pages/home/home',
    //         })


    //       } else {
    //         let pages = getCurrentPages();
    //         let router = pages[pages.length - 1].route;
    //         if (router == 'pages/refuse/refuse') {

    //         } else {
    //           wx.reLaunch({
    //             url: '/pages/refuse/refuse',
    //           })
    //         }
    //       }
    //     })
    //   }

    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'COFE SYSTEM',
      path: '/pages/refuse/refuse',  // 路径，传递参数到指定页面。
      imageUrl: '/image/authority.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})