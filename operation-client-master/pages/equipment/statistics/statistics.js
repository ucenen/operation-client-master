// pages/equipment/statistics/statistics.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_type: '1',
    show: false,
    actions: [],
    eqNumber:'',

    edit_state:false,
    edit_eqNumber:'',
    stop_flag:0,
    tipValue:'',
    edit_actions:[{
      name:'正常',
      value:1
    },{ 
        name: '故障',
        value: 2
      }, {
        name: '缺料',
        value: 3
      }],

    result: [],
    eqNumber: '',
    result_status: false
  },


  onclick(e) {
    this.setData({
      result_status: true
    })
    var str = {
      detail: this.data.eqNumber == '' ? '' : this.data.eqNumber
    }
    this.eqNumber_change(str);
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      eqNumber: e.currentTarget.dataset.item
    })
  },

  eqNumber_change(e) {
    if (!this.data.result_status) {
      return;
    }

    var arr = [];
    for (var i = 0; i < app.globalData.equipment.length; i++) {
      var str = app.globalData.equipment[i].eqNumber;
      //小写转大写
      var str2 = e.detail.toUpperCase();
      if ((str.toUpperCase()).indexOf(str2) != -1) {
        arr.push(app.globalData.equipment[i].eqNumber);
      }
    }
    this.setData({
      result: arr,
      eqNumber: e.detail
    })
    // if (e.detail == '') {
    //   this.setData({
    //     result: app.globalData.equipemnt
    //   })
    // }

  },


  opensheet(e) {
    this.setData({
      show: true,
      edit_eqNumber: e.currentTarget.dataset.eqnumber,
      stop_flag: e.currentTarget.dataset.stopflag
    })
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    if (event.detail.name =="设备停售"){
      if (this.data.stop_flag == 0) {
        this.data.tipValue = "确定停售 ";
      } else {
        this.data.tipValue = "确定起售 ";
      }
      var obj = {
        openid: app.globalData.openid,
        eqNumber: this.data.edit_eqNumber,
        stopFlag: this.data.stop_flag
      }
      let that = this;
      wx.showModal({
        // title: '提示',
        content: this.data.tipValue + this.data.edit_eqNumber + ' 吗?',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.showLoading({
              title: '请稍等..',
            })

            app.sdk.stop_equipment(obj, success => {
              wx.hideLoading();
              if (success.data.return_code == 'success') {
                that.getall();
                wx.showToast({
                  duration: 1000,
                  title: success.data.return_msg
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  duration: 1000,
                  title: success.data.return_msg
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (event.detail.name == "音量调节"){
      wx.navigateTo({
        url: '../volume/volume?eqNumber=' + this.data.edit_eqNumber
      })
    }else{
      wx.showToast({
        title: '暂不支持',
        icon: 'success',
        duration: 3000
      })
    }
    
  },

  open_edit_sheet(e) {    
    this.setData({
      edit_state: true,
      edit_eqNumber: e.currentTarget.dataset.eqnumber
    })
  },

  on_edit_Close() {
    this.setData({
      edit_state: false
    });
  },

  on_edit_Select(event) {
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      eqNumber: this.data.edit_eqNumber,
      eqState: event.detail.value
    }
    
    app.sdk.edit_equipment_state(obj,success=>{
      wx.hideLoading();
      if (success.data.return_code == 'success') {
        this.getall();
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }
    })
  },




  select_change(e) {
    this.setData({
      select_type: e.currentTarget.dataset.item
    })
    this.getall();
  },

  openpage(e) {
    wx.setStorageSync('statistics_eqNumber', e.currentTarget.dataset.eqnumber)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  //获取所有设备
  getall() {
    this.setData({
      result_status: false
    })
    wx.showLoading({
      title: '请稍等...',
    })
    var obj = {
      openid: app.globalData.openid,
      eqNumber: this.data.eqNumber,
      eqState: parseInt(this.data.select_type)
    }
    app.sdk.more_equipment(obj, success => {
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
  },

  remote_operation_menu() {
    app.sdk.remote_operation_menu(success => {
      if (success.data.return_code == 'success') {
        this.setData({
          actions: success.data.return_msg
        })
      } else {
        wx.showToast({
          icon: 'none',
          duration: 1000,
          title: success.data.return_msg,
        })
      }

    })
  },

  openmaterial(e){
    wx.showLoading({
      title: '请稍等...',
    })
      var obj = {
        openid: app.globalData.openid,
        eqNumber: e.currentTarget.dataset.eqnumber
      }
      app.sdk.look_equipment_material(obj, success => {
        wx.hideLoading();
        if (success.data.return_code == 'success') {
          wx.setStorageSync('material_eqNumber', e.currentTarget.dataset.eqnumber);
          wx.setStorageSync('material_equipment', success.data.return_msg)
          wx.navigateTo({
            url: e.currentTarget.dataset.url,
          })
        } else {

        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {    
    this.remote_operation_menu();
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
    this.getall();
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