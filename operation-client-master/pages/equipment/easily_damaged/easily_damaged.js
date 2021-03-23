// pages/equipment/temperature/temperature.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: false,
    select_item: "",
    eqNumber: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍等..',
    })
    this.setData({
      eqNumber: wx.getStorageSync('temp_eqNumber'),
      tempJsonArr: wx.getStorageSync('temp_equipment'),
    })
    wx.hideLoading();
  },

  replace_ok(e){
    var that = this;
    wx.showModal({
      content: '确定更换吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍等..',
          })
          var obj = {
            edId: e.currentTarget.dataset.edid,
            openid: app.globalData.openid
          }
          app.sdk.replace_ok(obj, success => {
            if (success.data.return_code == 'success') {
              var data = {
                eqNumber: wx.getStorageSync('temp_eqNumber')
              }
              app.sdk.look_easily_damaged(data, success => {
                if (success.data.return_code == 'success') {
                  that.setData({
                    tempJsonArr: success.data.return_msg
                  })
                  
                }
              })

              wx.showToast({
                duration: 1000,
                title: success.data.return_msg
              })
            } else {
              
              wx.showToast({
                icon: 'none',
                duration: 1000,
                title: success.data.return_msg
              })
            }
          })
          wx.hideLoading();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
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