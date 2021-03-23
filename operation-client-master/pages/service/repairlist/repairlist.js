// pages/service/repairlist/repairlist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [
      { code: 'checking', status: false }
    ],
    active: 0,
    weixiu_show: false,
    chexiao_show: false,
    buhege_show: false,

    hege: true, //控制下面操作栏是否出现
    tubiao: false,
    buhege_text: '', //不合格原因

    page_data: [{
      data: [],
      page_index: 1,
      page_end: false
    }, {
      data: [],
      page_index: 1,
      page_end: false
    }, {
      data: [],
      page_index: 1,
      page_end: false
    }, {
      data: [],
      page_index: 1,
      page_end: false
    }],
    weixiu_item: null, //选择进行维修的节点
    weixiu_text: '', //维修内容
    chexiao_item: null, //选择进行撤销的节点
    chexiao_text: '', //撤销内容
    pageSize: 5
  },
  //开始维修
  start_repair(e) {
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      erlId: this.data.weixiu_item.erlId,
      repairContext: this.data.weixiu_text
    }
    app.sdk.start_repair(obj, success => {
      if (success.data.return_code == 'success') {

        this.setData({
          weixiu_show: false
        })
        this.getdata();
        wx.hideLoading();
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })
      } else {
        this.getdata();
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
  },

  //撤销维修
  cancel_repair(e) {
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      erlId: this.data.chexiao_item.erlId,
      revokeResult: this.data.chexiao_text
    }
    app.sdk.cancel_repair(obj, success => {
      if (success.data.return_code == 'success') {

        this.setData({
          chexiao_show: false
        })
        this.getdata();
        wx.hideLoading();
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })
      } else {
        this.getdata();
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
  },


  weixiu_text_change(e) {
    this.setData({
      weixiu_text: e.detail.value
    })
  },

  chexiao_text_change(e) {
    this.setData({
      chexiao_text: e.detail.value
    })
  },

  buhege_text_change(e) {
    this.setData({
      buhege_text: e.detail.value
    })
  },


  buhege() {
    var that = this;
    var obj = {
      openid: app.globalData.openid,
      erlId: this.data.buhege_item.erlId,
      isRegular: 1,
      inspectionRemark: this.data.buhege_text
    }

    app.sdk.repair_inspection(obj, success => {
      if (success.data.return_code == 'success') {
        that.getdata();

        that.setData({
          buhege_show: false
        })
        this.getdata();
        wx.hideLoading();
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
  },


  hege(e) {
    var that = this;
    var obj = {
      openid: app.globalData.openid,
      erlId: e.currentTarget.dataset.item.erlId,
      isRegular: 2
    }
    var that = this;
    wx.showModal({
      content: '是否确认维修合格',
      cancelText: '是',
      confirmText: '否',
      success(res) {
        if (res.confirm) {
          console.log('用户点击取消')
        } else if (res.cancel) {
          console.log('用户点击是')
          app.sdk.repair_inspection(obj, success => {
            if (success.data.return_code == 'success') {
              that.getdata();
              wx.hideLoading();
              wx.showToast({
                icon: 'success',
                duration: 1000,
                title: success.data.return_msg,
              })
            } else {
              wx.hideLoading();
              wx.showToast({
                icon: 'none',
                duration: 1000,
                title: success.data.return_msg,
              })
            }
          })


          // that.setData({
          //   hege: false,
          //   tubiao: true
          // })
        }
      }
    })
  },

  // 维修完成
  wancheng(e) {
    var that = this;
    var obj = {
      openid: app.globalData.openid,
      erlId: e.currentTarget.dataset.item.erlId
    }
    wx.showModal({
      content: '是否确认维修完成',
      cancelText: '是',
      confirmText: '否',
      success(res) {
        if (res.confirm) {
          console.log('用户点击取消')
        } else if (res.cancel) {
          console.log('用户点击是')
          app.sdk.repair_completed(obj, success => {
            if (success.data.return_code == 'success') {
              that.getdata();
              wx.hideLoading();
              wx.showToast({
                icon: 'success',
                duration: 1000,
                title: success.data.return_msg,
              })
            } else {              
              wx.hideLoading();
              wx.showToast({
                icon: 'none',
                duration: 1000,
                title: success.data.return_msg,
              })
            }
          })
        }
      }
    })
  },

  openpopup_buhege(e) {
    this.setData({
      buhege_show: true,
      buhege_item: e.currentTarget.dataset.item
    })
  },

  onClose_buhege() {
    this.setData({
      buhege_show: false
    })
  },

  openpopup_chexiao(e) {
    this.setData({
      chexiao_show: true,
      chexiao_item: e.currentTarget.dataset.item
    })
  },

  onClose_chexiao() {
    this.setData({
      chexiao_show: false
    })
  },

  openpopup(e) {
    this.setData({
      weixiu_show: true,
      weixiu_item: e.currentTarget.dataset.item
    })
  },

  onClose() {
    this.setData({
      weixiu_show: false
    })
  },

  onChange(e) {
    var page_data = this.data.page_data
    page_data[e.detail.name].page_index = 1 
    this.setData({
      active: e.detail.name,
      page_data:page_data
    })

    this.getdata();
  },

  getdata() {   
    var obj = wx.getStorageSync('service_obj');
    var obj = {
      openid: app.globalData.openid,
      eqNumber: obj.eqNumber,
      repairState: this.data.active,
      beginTime: obj.beginTime,
      endTime: obj.endTime,
      pageNum: 1, //this.data.page_data[this.data.active].page_index
      pageSize: this.data.pageSize
    }    
    
    app.sdk.get_repair_list_for_page(obj, success => {
      
      // wx.hideLoading()
      if (success.data.return_code == 'success' && success.data.return_msg.length > 0) {
        var page_data = this.data.page_data;
        page_data[this.data.active].data = success.data.return_msg;
        if (success.data.return_msg.length != this.data.pageSize) {
          page_data[this.data.active].page_end = true;
          // page_data[this.data.active].page_index = page_data[this.data.active].page_index + 1
        } else {
          page_data[this.data.active].page_end = false;
        }
        this.setData({
          page_data: page_data
        })
      } else {
        var page_data = this.data.page_data;
        page_data[this.data.active].data = success.data.return_msg;
        page_data[this.data.active].page_index = 1;
        page_data[this.data.active].page_end = false;
        this.setData({
          page_data: page_data
        })
        wx.showToast({
          icon:'none',
          duration:1000,
          title: success.data.return_msg
        })
      }
      console.log(success);
    })
  },

  getdata2() {

    if (this.data.page_data[this.data.active].page_end) {
      return;
    }
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = wx.getStorageSync('service_obj');
    
    var obj = {
      openid: app.globalData.openid,
      eqNumber: obj.eqNumber,
      repairState: this.data.active,
      beginTime: obj.beginTime,
      endTime: obj.endTime,
      pageNum: this.data.page_data[this.data.active].page_index + 1,
      pageSize: this.data.pageSize
    }
    app.sdk.get_repair_list_for_page(obj, success => {
      wx.hideLoading();
      if (success.data.return_code == 'success' && success.data.return_msg.length > 0) {
        var arr = [];
        var page_data = this.data.page_data;
        for (var i = 0; i < page_data[this.data.active].data.length; i++) {
          arr.push(page_data[this.data.active].data[i])
        }
        for (var i = 0; i < success.data.return_msg.length; i++) {
          arr.push(success.data.return_msg[i])
        }
        page_data[this.data.active].data = arr
        
        if (success.data.return_msg.length != this.data.pageSize) {
          page_data[this.data.active].page_end = true;
          // page_data[this.data.active].page_index = page_data[this.data.active].page_index + 1
        } else {
          page_data[this.data.active].page_index = page_data[this.data.active].page_index + 1
        }
        this.setData({
          page_data: page_data
        })
      } else {
        var page_data = this.data.page_data;
        page_data[this.data.active].page_end = true;
        this.setData({
          page_data: page_data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = app.checkauthority(1, this.data.info)
    this.setData({
      info: info
    })
    this.setData({
      active:wx.getStorageSync('service_obj').repairState
    })
    this.getdata();
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
    this.getdata2();
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