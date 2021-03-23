// pages/diagnosis/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_text:'',
    search_data:[],
    result:[],
    dianwei:null,
    placeName:'',
    kId:null,
    result_status:false,

    eqNumber:'',
    eqNumber_status:false,
    eqNumber_result:[]


  },

  openpage(e) {
    
    this.setData({
      eqNumber_status: false,
      eqNumber: this.data.eqNumber,
      result_status:false      
    })
    var that = this;
    if (this.data.eqNumber == '' && this.data.kId == null ) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '设备编号和点位不能为空！',
      })
      return;
    }

    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      eqNumber: this.data.eqNumber,
      kId: this.data.kId == null ? '' : this.data.kId,
      state:0      
    }

    app.sdk.get_kiosk_error(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success') {
        wx.setStorageSync('diagnosis_obj', obj)
        wx.setStorageSync('diagnosis_list', success.data.return_msg)       
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      } else {
        wx.showToast({
          icon:'none',
          duration:1000,
          title: success.data.return_msg,
        })
      }
      console.log(success);
    })
  },

  onclick(e){
    this.setData({
      result_status: true,
      eqNumber_status: false
    })
    var str={
      detail:{
        value: this.data.placeName == '' ? 'COFE' : this.data.placeName
      }
    }
    this.dianwei_change(str);
  },

  // blur_change(e){
  //   this.setData({
  //     result_status: false,
  //     result:[]      
  //   })
  // },


  select_item(e){
    this.setData({
      result_status:false,
      result:[],
      dianwei: e.currentTarget.dataset.item,
      placeName: e.currentTarget.dataset.item.placeName, 
      kId: e.currentTarget.dataset.item.kId   
    })
  },


  input_change(e) {
    this.setData({
      input_text: e.detail.value
    })
  },

  dianwei_change(e){    
    if (!this.data.result_status){
      return;
    }    
    var arr = [];
    for(var i = 0;i<this.data.search_data.length;i++){
      var str = this.data.search_data[i].placeName;
      //小写转大写
      var str2 = e.detail.value.toUpperCase();      
      if ((str.toUpperCase()).indexOf(str2) != -1){
        arr.push(this.data.search_data[i]);
      }
    }
    this.setData({
      result: arr
    })
    if (e.detail.value==''){
      this.setData({
        placeName:'',
        kId:null,
        result: this.data.search_data
      })
    }
    
  },


  eqNumber_onclick(e) {
    this.setData({
      eqNumber_status: true,
      result_status: false,
    })
    var str = {
      detail: {
        value: this.data.eqNumber == '' ? '' : this.data.eqNumber
      }
    }
    this.eqNumber_change(str);
  },

  eqNumber_select_item(e) {
    this.setData({
      eqNumber_status: false,
      eqNumber_result: [],
      eqNumber: e.currentTarget.dataset.item
    })
  },


  eqNumber_change(e) {
    if (!this.data.eqNumber_status) {
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
      eqNumber_result: arr
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
    var obj = {
      openid:app.globalData.openid,
      name: 'all'      
    }
    app.sdk.search_kiosk(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          search_data:success.data.return_msg
        })
      } else {

      }
      console.log(success);
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