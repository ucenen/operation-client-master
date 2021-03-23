// pages/hydropower/meterreading/meterreading.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,		
    show: false,	//水量输入框
    dianliang_show:false,	//电量输入框
    time_show:false, //时间选择框
    time_show2:false, //时间选择框
    start_time: util.getyeardate(new Date()),
    end_time: util.getyeardate(new Date()),
    start_time2: util.getyeardate(new Date()),
    end_time2: util.getyeardate(new Date()),
    type :"1",
    currentDate: new Date().getTime(),
    currentDate2: new Date().getTime(),
    // minDate:null, //最小选择日期
    // minDate2:null, //最小选择日期
    maxDate: new Date().getTime(),//最大选择日期
    water_table_date:[],
    electricity_table_date: [],
    water_text:'',
    electricity_text:'',
  },
  
  
  confirm(e) {
   var myDate = new Date(e.detail);
   var year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
   var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
   var date = myDate.getDate(); //获取当前日(1-31)
   var timeFn = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
   
   if (this.data.type == '1'){
     this.setData({
       time_show: false,
       start_time: timeFn,	    
     })
     this.getdata();
   } else if (this.data.type == '2'){
     this.setData({
       time_show: false,
       end_time: timeFn,	   
     })
     this.getdata();
   } else if (this.data.type == '3') {
     this.setData({
       time_show: false,
       start_time2: timeFn,
     })
     this.getdata();
   } else if (this.data.type == '4') {
     this.setData({
       time_show: false,
       end_time2: timeFn,
     })
     this.getdata();
   }
    
    
  },
  
  popuponClose() {
    this.setData({
      time_show: false
    });
  },
	
  time_openpopup(e) {	 
    this.setData({
      time_show: true,
      type: e.currentTarget.dataset.type,
    })
  },
	
  dianliang_openpopup() {
    this.setData({
      dianliang_show: true
    })
  },

  dianliang_onClose() {
    this.setData({
      dianliang_show: false
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

  onChange(event) {
    this.setData({
      active: event.detail.name
    })
    this.getdata();
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
  },

  add_meter_reading(){
    
    var obj = {
      openid: app.globalData.openid,
      eqNumber: wx.getStorageSync('hydropower_eqNumber'),
      mrType: this.data.active,
      usageAmount: this.data.active == 0 ? this.data.water_text:this.data.electricity_text
    }
    app.sdk.add_meter_reading(obj, success => {
      if (success.data.return_code == 'success') {
        wx.showToast({
          icon:'success',
          duration:1000,
          title: success.data.return_msg,
        })
        this.setData({
          show: false,
          dianliang_show: false,
        })
        this.getdata();
      } else {

      }
    }) 



  },



  getdata(){
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      eqNumber: wx.getStorageSync('hydropower_eqNumber'),
      mrType: this.data.active,
      startTime: this.data.active == 0 ? this.data.start_time : this.data.start_time2,
      endTime: this.data.active == 0 ? this.data.end_time : this.data.end_time2
    }
    app.sdk.look_meter_reading_record(obj, success => {
      if (success.data.return_code == 'success') {
        
        if (this.data.active==0){
          this.setData({
            water_table_date: success.data.return_msg
          })
        }else{
          this.setData({
            electricity_table_date: success.data.return_msg
          })
        }
        wx.hideLoading()
      } else {
        wx.hideLoading()
        wx.showToast({
          icon:'none',
          duration:1000,
          title: success.data.return_msg,
        })
      }
      console.log(success);
    }) 
  },

  water_change(e){    
    this.setData({
      water_text: e.detail.value
    })
  },

  electricity_change(e) {
    this.setData({
      electricity_text: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.getdata();
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