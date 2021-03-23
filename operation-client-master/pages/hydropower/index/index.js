// pages/hydropower/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_show:false,
    currentDate: new Date().getTime(),
    minDate: null, //最小选择日期
    maxDate: new Date().getTime(),//最大选择日期
    start_time:null,
    end_time:null,

    result: [],
    eqNumber: '',
    result_status: false
  },

  openpage(e) {
    this.setData({
      result_status: false,
      eqNumber: this.data.eqNumber
    })
    var that = this;
    if (this.data.eqNumber == '' || this.data.eqNumber == null) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '请输入设备编号!',
      })
      return;
    }

    wx.setStorageSync('hydropower_eqNumber', that.data.eqNumber);
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  onclick(e) {
    this.setData({
      result_status: true
    })
    var str = {
      detail: {
        value: this.data.eqNumber == '' ? '':this.data.eqNumber
      }
    }
    this.dianwei_change(str);
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      eqNumber: e.currentTarget.dataset.item
    })
  },


  input_change(e) {
    this.setData({
      input_text: e.detail.value
    })
  },


  dianwei_change(e) {
    if (!this.data.result_status) {
      return;
    }
    var arr = [];
    for (var i = 0; i < app.globalData.equipment.length; i++) {
      var str = app.globalData.equipment[i].eqNumber;
      //小写转大写
      var str2 = e.detail.value.toUpperCase();
      if ((str.toUpperCase()).indexOf(str2) != -1) {
        arr.push(app.globalData.equipment[i].eqNumber);
      }
    }
    this.setData({
      result: arr
    })
    if (e.detail.value == '') {
      this.setData({
        eqNumber:e.detail.value
      })
    }

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