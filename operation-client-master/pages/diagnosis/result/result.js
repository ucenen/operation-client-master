// pages/diagnosis/result/result.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    weizhenduan:[],
    yizhenduan:[]
  },

  openpage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  onChange(event) {  
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
    this.setData({
      active: event.detail.name
    })
    this.getdata()
    
  },

  getdata(){
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = wx.getStorageSync('diagnosis_obj')
    obj.state = this.data.active;
    app.sdk.get_kiosk_error(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success') {
         if(this.data.active == 0){
           this.setData({
             weizhenduan: success.data.return_msg
           })
         }else{
           this.setData({
             yizhenduan: success.data.return_msg.listMap
           })
         }
         
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
      console.log(success);
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