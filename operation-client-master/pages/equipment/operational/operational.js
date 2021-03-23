// pages/equipment/operational/operational.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    data_list:null
  },

  input_change(e){
    this.setData({
      input_text:e.detail.value
    })
  },

  openpopup() {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  hege(){
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      id: this.data.data_list.id,
      isRegular:2
    }
    app.sdk.mt_inspection(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == "success") {        
        var data_list = this.data.data_list;
        data_list.isRegular = 2;
        this.setData({
          data_list: data_list
        })
        wx.showToast({
          icon:'success',
          duration:1000,
          title: success.data.return_msg,
        })
        } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
        }
      
    })
    
  },

  buhege() {
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      id: this.data.data_list.id,
      isRegular: 1,
      inspectionRemark:this.data.input_text
    }
    app.sdk.mt_inspection(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == "success") {
        var data_list = this.data.data_list;
        data_list.isRegular = 1;
        this.setData({
          show: false,
          data_list: data_list
        })
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data_list: wx.getStorageSync('record_item')
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