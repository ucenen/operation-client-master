// pages/diagnosis/judge/judge.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    input_text:''
  },

  input_change(e) {
    this.setData({
      input_text: e.detail.value
    })
  },

  select(e){    
    var data = this.data.arr;    
    data[e.currentTarget.dataset.index].status = !data[e.currentTarget.dataset.index].status;    
    this.setData({
      arr: data
    })
  },  

  diagnosis_kiosk(){
    wx.showLoading({
      title: '请稍等...',
    })
    var arr = []
    for(var i = 0 ;i<this.data.arr.length;i++){
      if (this.data.arr[i].status){
        arr.push(this.data.arr[i].name)
      }      
    }

    var obj ={
      openid: app.globalData.openid,
      kId: wx.getStorageSync('diagnosis_obj').kId,
      content:arr.length>0 ? arr :this.data.input_text
    }

    app.sdk.diagnosis_kiosk(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success') {
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

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sdk.get_diagnostic_label(success => {
      if (success.data.return_code == 'success') {
        var arr = [];
        for (var i = 0; i < success.data.return_msg.length; i++) {
          arr.push({
            name: success.data.return_msg[i].labelContent,
            status: false
          })
        }
        this.setData({
          arr: arr
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