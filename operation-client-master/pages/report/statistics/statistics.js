// pages/report/statistics/statistics.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [
      { code: 'report:sales', status: false },
      { code: 'report:equipment', status: false },
      { code: 'report:product', status: false },
      { code: 'report:material', status: false },
    ]
  },

  openpage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    wx.showLoading({
      title: '请稍等...',
    })

    var info = app.checkauthority(2, this.data.info)
    this.setData({
      info: info
    })

    var obj={
      openid: app.globalData.openid,
    }
    app.sdk.report_statistics(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg
        })
        wx.hideLoading()
      } else {
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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