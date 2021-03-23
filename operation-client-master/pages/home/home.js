// pages/home/home.js
var app = getApp();
// var sdk = require("../../utils/sdk.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info:[
		  { code: 'order', status: false },
		  { code: 'report', status: false },
		  { code: 'guest_traffic', status: false },
		  { code: 'clean', status: false },
		  { code: 'add_material', status: false },
		  { code: 'meter_reading', status: false },
		  { code: 'maintain', status: false },
		  { code: 'diagnose', status: false },
		  { code: 'monitor', status: false },
      { code: 'checking', status: false },
      { code: 'eq_config', status: false },
      { code: 'kiosk_merchant_sales', status: false },
      { code: 'easily_damaged', status: false },
      { code: 'eq_module', status: false }
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
    var info = app.checkauthority(1,this.data.info)
    this.setData({
      info:info
    })

    wx.showLoading({
      title: '请稍等....',
    })
    var obj = {
      openid: app.globalData.openid,
    }
    app.sdk.data_today(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg
        })        
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })

    //获取所有设备
    // var obj2 = {
    //   openid: this.globalData.openid,
    // }
    app.sdk.search_equipment(obj, success => {
      if (success.data.return_code == 'success') {
        app.globalData.equipment = success.data.return_msg
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
    wx.hideHomeButton();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
    
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
    wx.showLoading({
      title: '下拉刷新',
    });
    var obj = {
      openid: app.globalData.openid,
    }
    app.sdk.data_today(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg
        })
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg, 
        })
      }
    })
    wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

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
