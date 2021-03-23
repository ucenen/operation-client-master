// pages/order/refund/refund.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 0,
    show:false,
    refund_text:'客诉退款',
    order:null,
    mobile: '',
    beizhu:'',
    actions: [
      {
        name: '客诉退款', color: '#7e7e7e'
      },
      {
        name: '赠饮退款', color: '#7e7e7e'
      },
      {
        name: '其他', color: '#7e7e7e'
      }
    ]
  },

  isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
  },

  tuikuan(){
    var that = this;
    if (!this.isPhoneNumber(that.data.mobile == '' ? that.data.order.mobile : that.data.mobile)){
      wx.showToast({
        icon:'none',
        duration:1000,
        title: '请输入正确的手机号!',
      })
      return;
    }
    
    
    wx.showModal({      
      content: '确认退款吗？',
      // showCancel:false,
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '退款中...',
          })
          var obj = {
            openid: app.globalData.openid,
            mobile: that.data.mobile == '' ? that.data.order.mobile : that.data.mobile,
            orderNumber: that.data.order.orderNumber,
            refundCause: that.data.refund_text,
            remark:that.data.beizhu
          }
          app.sdk.refund_order_to_mt(obj, success => {
            if (success.data.return_code == 'success') {
              wx.showToast({
                icon: 'success',
                duration: 1000,
                title: success.data.return_msg,
              })
              wx.hideLoading()
              wx.navigateBack({
                
              })
            } else {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                duration: 1000,
                title: success.data.return_msg,
              })
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  opensheet(e){
    this.setData({
      show:true
    })
  },

  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      refund_text :event.detail.name
    })
  },

  mobile_change(e){
    this.setData({
      mobile: e.detail
    })
  },

  beizhu_change(e){
    this.setData({
      beizhu:e.detail.value
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: wx.getStorageSync('select_order')
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
  },

  openpage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})