// pages/order/selecttype/selecttype.js
var app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:"1",
	  input_text:'',
    info: [
      { code: 'order:look', status: false }
    ],
    result: [],
    eqNumber: '',
    result_status: false
  }, 

  openpage(e){
    if(!this.data.info[0].status){
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '无查询权限!',
      })
      return;
    }

    if (this.data.input_text == "" || this.data.input_text == null){
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '请输入查询关键词！',
      })
      return;
    }

	  var entityJson = {};
	  switch(this.data.radio) {
			case "1":
			  entityJson.orderNumber = this.data.input_text;			  
			  break;
			case "2":
			  entityJson.nickname = this.data.input_text;	
			  break;
			case "3":
			  entityJson.mobile = this.data.input_text;		  
		      break;
			case "4":
        entityJson.productName = this.data.input_text;
			  break;
			case "5":
        entityJson.payOrderNumber = this.data.input_text;
			  break;
			case "6":
        entityJson.eqNumber = this.data.input_text;
			  break;	  		
		   default:			  
	  } 

    var obj = {
      openid: app.globalData.openid,
      pageNum: 1,
      pageSize: 20,
      entityJson: entityJson
    }

    wx.showLoading({
      title: '查询中...',
    })

    app.sdk.look_order_to_page(obj, success => {
      wx.hideLoading();
      
      if (success.data.return_msg.length>0){
        // for (var i = 0; i < success.data.return_msg.length; i++) {
        //   var norms = success.data.return_msg[i].norms.split(',');
        //   var productNames = success.data.return_msg[i].productNames.split(',');
        //   success.data.return_msg[i].product = []
        //   for (var j = 0; j < productNames.length; j++) {
        //     success.data.return_msg[i].product.push({
        //       productNames: productNames[j],
        //       norms: norms[j]
        //     })
        //   }
        // }

        // wx.setStorageSync('list_data', success.data.return_msg);
        wx.setStorageSync('order_select_obj', obj)
        wx.setStorageSync('entityJson', entityJson);
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      }else{
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: '未查到数据！',
        })
      }
      
    })


    
  },


  onChange(e){
    this.setData({
      radio: e.detail
    })
  },
  
  input_change(e){
    this.setData({
      input_text:e.detail.value
    })  
  },



  onclick(e) {
    this.setData({
      result_status: true
    })
    var str = {
      detail: {
        value: this.data.input_text == '' ? '' : this.data.input_text
      }
    }
    this.dianwei_change(str);
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      input_text: e.currentTarget.dataset.item
    })
  },


  dianwei_change(e) {
    if (!this.data.result_status) {
      return;
    }
    console.log(e);
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
      result: arr
    })
    if (e.detail.value == '') {
      this.setData({
        input_text: e.detail.value
      })
    }

  },
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = app.checkauthority(2, this.data.info)
    this.setData({
      info: info
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