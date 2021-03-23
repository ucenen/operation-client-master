// pages/report/kioskMerchant/kioskMerchant.js
import * as echarts from '../../../ec-canvas/echarts';
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_time: '1',
    show: false,
    value: [],
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime() - (1 * 24 * 60 * 60 * 1000),
    start_time: util.getyeardate(new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000))),
    end_time: util.getyeardate(new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000))),
    time_type:1,
    type: 1,

    result: [],
    eqNumber: '',
    kname:'',
    result_status: false,
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      eqNumber: e.currentTarget.dataset.item
    })
  },

  showPopup(e) {
    this.setData({
      show: true,
      type: e.currentTarget.dataset.type
    });
  },

  select_time(e) {
    this.setData({
      select_time: e.currentTarget.dataset.item
    })

    if (e.currentTarget.dataset.item == '1') {
      //计算昨天
      var time = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
      var start_time = util.getyeardate(new Date(time));
      this.setData({
        start_time: start_time,
        end_time: start_time,
        time_type : 1
      })
    }


    if (e.currentTarget.dataset.item == '2') {
      //计算最近7天
      var time = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
      var start_time = util.getyeardate(new Date(time));
      var time2 = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
      var end_time = util.getyeardate(new Date(time2));
      this.setData({
        start_time: start_time,
        end_time: end_time,
        time_type: 2
      })
    }

    if (e.currentTarget.dataset.item == '3') {
      //计算上个月
      // var time = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
      // var start_time = util.getyeardate(new Date(time));
      // var time2 = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
      // var end_time = util.getyeardate(new Date(time2));

      var date = new Date();
      var start_time = util.getLastMonth(date);
      var end_time = util.getLastMonthAndDay(date);

      this.setData({
        start_time: start_time,
        end_time: end_time,
        time_type: 3
      })
    }

    this.getdata();
  },


  confirm(e) {
    console.log(e.detail);
    if (this.data.type == '1') {
      this.setData({
        start_time: util.getyeardate(new Date(e.detail)),
        show: false
      })
    } else {
      this.setData({
        end_time: util.getyeardate(new Date(e.detail)),
        show: false
      })
    }
    console.log(util.getyeardate(new Date(e.detail)));

    return;
    this.getdata();
  },

  eqNumber_change(e) {
    if (!this.data.result_status) {
      return;
    }
    var arr = [];
    for (var i = 0; i < app.globalData.equipment.length; i++) {
      var str = app.globalData.equipment[i].eqNumber;
      //小写转大写
      var str2 = e.detail.toUpperCase();
      if ((str.toUpperCase()).indexOf(str2) != -1) {
        arr.push(app.globalData.equipment[i].eqNumber);
      }
    }
    this.setData({
      result: arr
    })
    if (e.detail == '') {
      this.setData({
        eqNumber: ''
      })
    }

  },

  kname_change(e){
    if (e.detail == '') {
      this.setData({
        kname: '',
        show: false
      })
    }else{
      this.setData({
        kname: e.detail,
        show: false
      })
    }
  },

  getdata() {
    this.setData({
      result_status: false,
      eqNumber: this.data.eqNumber
    })
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      eqNumber: this.data.eqNumber,
      kname: this.data.kname,
      beginTime: this.data.start_time,
      endTime: this.data.end_time,
      timeType: this.data.time_type,
    }
    app.sdk.external_more_sales(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg
        })
        wx.hideLoading()
      } else {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
  },

  onclick(e) {
    this.setData({
      result_status: true
    })
    var str = {
      detail: this.data.eqNumber == '' ? '' : this.data.eqNumber
    }
    this.eqNumber_change(str);
  },

  

  onCancel(e){
    this.setData({
      result_status: false
    })
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      eqNumber: e.currentTarget.dataset.item
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

  }
})