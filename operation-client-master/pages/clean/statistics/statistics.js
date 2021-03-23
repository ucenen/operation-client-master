var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    value1: 0,
    pageindex:1,
    pagesize:20,
    status:true,
    data_list:[],
    new_data: []
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });

  },

  getdata(){
    if (!this.data.status) {
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    var obj= {
      openid: app.globalData.openid,
      eqNumber: wx.getStorageSync('statistics_eqNumber'),
      pageNum: this.data.pageindex,
      pageSize: this.data.pagesize
    }
    app.sdk.look_scrap_record(obj, success=>{
      wx.hideLoading();
      
      if (success.data.return_code == "success") {
        var arr = []
        this.data.data_list.forEach((item) => {
          arr.push(item)
        })
        success.data.return_msg.forEach((item) => {
          arr.push(item)
        })
        if (success.data.return_msg.length < this.data.pagesize) {
          this.setData({
            data_list: arr,
            status: false
          })
        } else {
          this.setData({
            data_list: arr,
            pageindex: this.data.pageindex + 1
          })
        }
        this.check_data(this.data.data_list);
      }
    })

  },

  check_data(e){
    var arr = [];
    for (var i = 0; i < e.length; i++) {
      var item = []
      for (var key in e[i]) {
        item.push({
          text: key,
          value: e[i][key]
        })       
      }
      arr.push(item);
    }
    this.setData({
      new_data: arr
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
    this.getdata();
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