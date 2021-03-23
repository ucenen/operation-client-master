// pages/equipment/temperature/temperature.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: false,
    select_item: "",
    type: 0,
    eqNumber: "",
    tempJsonArr: "",
    input_value: '',
    alarmValue:'',
    humidityAlarmValue:'',
    discontinuedValue:''
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

  openpopup(e) {
    //每次打开弹窗 把三个参数初始化 
    this.setData({
      showFlag: true,
      select_item: e.currentTarget.dataset.item
    })
  },

  onClose() {
    this.setData({
      showFlag: false
    })
  },

  type_change(e) {
    this.setData({
      type: e.detail.value
    })
  },

  alarm_change(e){
    this.setData({
      alarmValue: e.detail.value
    })
  }, 

  humidity_alarm_change(e){
    this.setData({
      humidityAlarmValue: e.detail.value
    })
  },

  discontinued_change(e) {
    this.setData({
      discontinuedValue:e.detail.value
    })
  },

  edit_temp() {
    var that = this;
    //wx.showLoading({
      //title: '请稍等..',
    //})
    var type_ = 0;
    if (0==that.data.type){
      type_ = that.data.select_item.type;
    }else{
      type_ = that.data.type;
    } 
    var alarmValue_ = ''; 
    if ('' == that.data.alarmValue) {
      alarmValue_ = that.data.select_item.alarmValue;
    } else {
      alarmValue_ = that.data.alarmValue;
    }
    var humidityAlarmValue_ = '';
    if ('' == that.data.humidityAlarmValue) {
      humidityAlarmValue_ = that.data.select_item.humidityAlarmValue;
    } else {
      humidityAlarmValue_ = that.data.humidityAlarmValue;
    }
    var discontinuedValue_ = '';
    if ('' == that.data.discontinuedValue) {
      discontinuedValue_ = that.data.select_item.discontinuedValue;
    } else {
      discontinuedValue_ = that.data.discontinuedValue;
    }
    
    var obj = {
      eqNumber: wx.getStorageSync('temp_eqNumber'),
      type: type_,
      descr: that.data.select_item.descr,
      alarmValue: alarmValue_,
      humidityAlarmValue: humidityAlarmValue_,
      discontinuedValue: discontinuedValue_
    }
    app.sdk.add_temperature_config(obj, success => {

      if (success.data.return_code == 'success') {
        that.setData({
          showFlag: false,
          discontinuedValue:'',
          alarmValue:''
        })
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })

        var data = {
          eqNumber: wx.getStorageSync('temp_eqNumber')
        }

        app.sdk.look_temperature_config(data, success => {
          if (success.data.return_code == 'success') {
            that.setData({
              tempJsonArr: success.data.return_msg
            })
            wx.hideLoading();

          } else {
            wx.hideLoading()
          }
        })  
      } else {
        wx.hideLoading()
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