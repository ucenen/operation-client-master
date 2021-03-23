// pages/equipment/eq_module/eq_module.js
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

  is_know(e) {
    console.log(e);
    var that = this;
    wx.showModal({
      content: '确定知晓吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍等..',
          })
          var obj = {
            emId: e.currentTarget.dataset.emid
          }
          app.sdk.is_know(obj, success => {
            if (success.data.return_code == 'success') {
              var data = {
                eqNumber: wx.getStorageSync('temp_eqNumber')
              }
              app.sdk.look_equipment_module(data, success => {
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

  }
})