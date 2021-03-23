// pages/equipment/volume/volume.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    volume:0,
    eqNumber:'',
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍等..',
    })
    var obj = {
      eqNumber: options.eqNumber,
      //openid: app.globalData.openid,
      type:this.__data__.type
    }
    this.setData({
      eqNumber: options.eqNumber
    });
    app.sdk.look_volume(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          volume: success.data.return_msg.volumeOfSound
        })
      }
    })
    wx.hideLoading();
  },

  less_btn(e) {
    var that = this;
    var val = that.__data__.volume;
    if (val != 0) {
      val--;
    }
    that.setData({
      volume: val
    })
    
  },

  plus_btn(e) {
    var that = this;
    var val = that.__data__.volume;
    if (val != 10) {
      val++;  
    }
    that.setData({
      volume: val
    })
  },

  change_ok(e){
    var that = this;
    that.setData({
      volume: e.detail.value
    })
  },


  save_btn(e){
    var that = this;
    wx.showLoading({
      title: '请稍等..',
    })

    var obj = {
      eqNumber: that.__data__.eqNumber,
      openid: app.globalData.openid,
      type: this.__data__.type,
      volumeOfSound: that.__data__.volume
    }
    app.sdk.set_volume(obj, success => {
      if (success.data.return_code == 'success') {
        wx.showToast({
          duration: 1000,
          title: success.data.return_msg
        })
      }else{
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg
        })
      }
    })
    wx.hideLoading();
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