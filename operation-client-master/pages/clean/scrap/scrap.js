// pages/clean/scrap/scrap.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    show: false,
    start_time: '请选择开始时间', //开始时间
    end_time:'请选择结束时间', //结束时间
    water:0,
    residue:0,
    waste_water:0,
    waste_milk:0,
    waste_organic:0,
    waste_arabica:0
  },

  showPopup(e) {    
    this.setData({
      show: true,
      type: e.currentTarget.dataset.type
    });
  },

  popuponClose() {
    this.setData({
      show: false
    });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },

  confirm(e) {
    var myDate = new Date(e.detail);
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
    var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var date = myDate.getDate(); //获取当前日(1-31)

    var hours = myDate.getHours(); //获取系统时，
    var minutes = myDate.getMinutes(); //分
    var seconds = myDate.getSeconds(); //秒
    var timeFn = year + '-' + month + '-' + date + ' ' + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) 
    // + ":" + (seconds < 10 ? '0' + seconds : seconds);

    if (this.data.type == '1'){
      this.setData({
        show: false,
        start_time: timeFn
      })
    }else{
      this.setData({
        show: false,
        end_time: timeFn
      })
    }
    
  },

  water_change(e){    
    this.setData({
      water: e.detail.value
    })
  },

  residue_change(e) {
    this.setData({
      residue: e.detail.value
    })
  },

  waste_water_change(e) {
    this.setData({
      waste_water: e.detail.value
    })
  },

  waste_milk_change(e) {
    this.setData({
      waste_milk: e.detail.value
    })
  },

  waste_organic_change(e) {
    this.setData({
      waste_organic: e.detail.value
    })
  },

  waste_arabica_change(e) {
    this.setData({
      waste_arabica: e.detail.value
    })
  },

  enter_scrap(){
    var start_time = new Date(this.data.start_time).getTime();
    var end_time = new Date(this.data.end_time).getTime();    
    if (end_time > start_time ){
      var 　obj = {
        openid: app.globalData.openid,
        eqNumber: wx.getStorageSync('clean_eqNumber'),
        startTime: this.data.start_time,
        endTime: this.data.end_time,
        enterContent: {
          '废水': this.data.water+"L",
          '废渣': this.data.residue+"盒",
          '浪费水': this.data.waste_water+"L",
          '浪费奶': this.data.waste_milk+"L",
          '浪费进口有机豆': this.data.waste_organic + "g",
          '浪费阿拉比卡豆': this.data.waste_arabica + "g",
        }
      }

      app.sdk.enter_scrap(obj, success => {
        if (success.data.return_code == 'success') {
          wx.showToast({
            icon:'none',
            duration:1000,
            title: success.data.return_msg,
          })
          wx.navigateBack({
            
          })
        } else {
          wx.showToast({
            icon: 'none',
            duration: 1000,
            title: success.data.return_msg,
          })
        }
        console.log(success);
      })

    }else{
      wx.showToast({
        icon:'none',
        duration:1000,
        title: '开始时间不能大于结束时间',
      })
    }


    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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