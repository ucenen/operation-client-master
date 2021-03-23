// pages/clean/bynumber/bynumber.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all:false,
    clean_equipment: '',
  },

  update(e){
    var arr = this.data.arr;
    arr[e.currentTarget.dataset.index].status = !arr[e.currentTarget.dataset.index].status;
    this.setData({
      arr:arr
    })
  },


  select_all(){
    var arr = this.data.arr;
    for(var i =0 ; i<arr.length;i++){
      if(this.data.select_all){
        arr[i].status = false
      }else{
        arr[i].status = true
      }
    }
    this.setData({
      arr:arr,
      select_all:!this.data.select_all
    })
  },


  cleaning_ok(e){
    var arr = []
    for(var i= 0;i<this.data.arr.length;i++){
      if(this.data.arr[i].status){
        arr.push(this.data.arr[i].name)
      }
    }
    var obj ={
      openid: app.globalData.openid,
      eqNumber: this.data.clean_equipment.return_msg.eqNumber,
      cleaningContent:arr
    }

    app.sdk.cleaning_ok(obj,success => {
      console.log(success)
      if (success.data.return_code == 'success') {
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: '提交成功!',
        })
        
        wx.navigateBack({
          
        })

      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: '提交失败!',
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        clean_equipment:wx.getStorageSync('clean_equipment')
      })
      app.sdk.get_cleaning_label(success => {
      if (success.data.return_code == 'success') {
        var arr = [];
        for (var i = 0; i < success.data.return_msg.length;i++){
          arr.push({
            name: success.data.return_msg[i],
            status:false
          })
        }
        this.setData({
          arr:arr
        })       
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: '获取清洁标签失败!',
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