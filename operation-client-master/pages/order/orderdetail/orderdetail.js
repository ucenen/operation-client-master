// pages/order/orderdetail/orderdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: '',
    value1: 0,
    option1: [{
        text: '全部',
        value: 0
      },
      {
        text: '退款',
        value: 1
      },
      {
        text: '返券',
        value: 2
      }
    ],
    show:false,
    actions: [
    {
      name: '退款',
      value: 1
    },
    {
      name: '返券',
      value: 2
    }
    ],


    list_data: [],
    page_index: 2,
    page_size: 20,

    info: [
      { code: 'order:refund', status: false }
    ]
  },

  opensheet(e){
    wx.setStorageSync('select_order', e.currentTarget.dataset.order)
    this.setData({
      show:true
    })
  },

  onClose(){
    this.setData({
      show: false
    })
  },

  onSelect(e){
    if(e.detail.name=='退款'){      
      wx.navigateTo({
        url: '../refund/refund',
      })
    }
  },


  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  dropdownchange() {
    wx.navigateTo({
      url: '../refund/refund',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = app.checkauthority(2, this.data.info)
    this.setData({
      info: info
    })
    
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
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    var obj = wx.getStorageSync('order_select_obj');
    app.sdk.look_order_to_page(obj, success => {
      wx.hideLoading();
      if (success.data.return_msg.length > 0) {
        for (var i = 0; i < success.data.return_msg.length; i++) {
          var norms = success.data.return_msg[i].norms.split(',');
          var productNames = success.data.return_msg[i].productNames.split(',');
          success.data.return_msg[i].product = []
          for (var j = 0; j < productNames.length; j++) {
            success.data.return_msg[i].product.push({
              productNames: productNames[j],
              norms: norms[j]
            })
          }
        }
        that.setData({
          list_data: success.data.return_msg,
          page_index: 2,
        })
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: '未查到数据！',
        })
      }

    })
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
    var that = this;
    if (that.data.list_data.length < (that.data.page_size * (that.data.page_index - 1))) {
      return;
    }

    wx.showLoading({
      title: '查询中...',
    })
    var obj = {
      openid: app.globalData.openid,
      pageNum: that.data.page_index,
      pageSize: that.data.page_size,
      entityJson: wx.getStorageSync('entityJson')
    }
    app.sdk.look_order_to_page(obj, success => {
      wx.hideLoading();
      if (success.data.return_msg.length > 0) {
        var arr1 = new Array();
        for (var i = 0; i < that.data.list_data.length; i++) {
          arr1.push(that.data.list_data[i]);
        }

        for (var i = 0; i < success.data.return_msg.length; i++) {
          var norms = success.data.return_msg[i].norms.split(',');
          var productNames = success.data.return_msg[i].productNames.split(',');
          success.data.return_msg[i].product = []
          for (var j = 0; j < productNames.length; j++) {
            success.data.return_msg[i].product.push({
              productNames: productNames[j],
              norms: norms[j]
            })
          }
          arr1.push(success.data.return_msg[i]);
        }
        that.setData({
          list_data: arr1,
          page_index: that.data.page_index + 1
        })

      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: '到底啦！',
        })
      }

    })

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