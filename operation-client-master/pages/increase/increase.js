// pages/increase/increase.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid:"",
      empId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍等....',
    })
    var that = this;
    // 登录
    wx.login({
      success: res => {        
        var obj = {
          code: res.code
        }
        app.sdk.get_openid(obj, success => {          
          wx.hideLoading();
          if (success.data.return_code == 'success') {          
            that.setData({
              openid:success.data.openid
            })
            
          } else {
            wx.showToast({
              icon:'none',
              title: success.data.return_msg
            })
          }
        })
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

  },

  input_change(e){
    this.setData({
      empId:e.detail.value
    })
  },

  submit(){
    const that = this;    
    if(this.data.empId==''||this.data.empId==null){
      wx.showToast({
        icon:'none',
        title: '请填写正确的员工id!'
      })
      return;
      
    }

    const obj = {
      openid:this.data.openid,
      empId:this.data.empId
    }
    wx.showLoading();
    app.sdk.look_employee_info(obj, success => {
      if(success.data.return_code=='success'){
        app.sdk.edit_employee_info(obj, success => {
          if(success.data.return_code=='success'){
            wx.hideLoading();
            wx.showToast({
              icon:'success',
              title: success.data.return_msg
            })
          }else{
            wx.hideLoading();
            wx.showToast({
              icon:'none',
              title: success.data.return_msg
            })
          }
        })
      }else{
        wx.hideLoading();
        wx.showToast({
          icon:'none',
          title: success.data.return_msg
        })
      }
    })
  }
})