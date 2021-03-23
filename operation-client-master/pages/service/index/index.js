// pages/service/index/index.js
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    time_show: false,
    input_text:'',
    actions: [],
    popup_show: false,
    start_time: util.getyeardate(new Date()),
    end_time: util.getyeardate(new Date()),
    // start_time: '',
    // end_time: '',
    type:'1',
    status: null,
    currentDate: new Date().getTime(),
    minDate: null,
    maxDate: new Date().getTime(),

    result: [],
    eqNumber: '',
    result_status: false
  },

  input_change(e){
    console.log(e);
    this.setData({
      input_text:e.detail.value
    })
  },


  confirm(event){
    if (this.data.type === "1") {
      this.setData({
        currentDate: event.detail,
        time_show: false,
        start_time: util.getyeardate(new Date(event.detail))
      });
    } else {      
      this.setData({
        currentDate: event.detail,
        time_show: false,
        end_time: util.getyeardate(new Date(event.detail))
      });
    }

  },

  openpage(e) {

    this.setData({
      result_status: false,
      eqNumber: this.data.eqNumber
    })
    // if (this.data.input_text == '' || this.data.input_text == null) {
    //   wx.showToast({
    //     icon: 'none',
    //     duration: 1000,
    //     title: '请输入设备编号!',
    //   })
    //   return;
    // }   

    wx.showLoading({
      title: '请稍等...',
    }) 
    var obj = {
      openid: app.globalData.openid,
      eqNumber: this.data.eqNumber,
      repairState: this.data.status == null ? 0 : this.data.status.value,
      beginTime: this.data.start_time,
      endTime: this.data.end_time,
      pageNum: 1,
      pageSize: 5
    }

    app.sdk.get_repair_list_for_page(obj, success => {
      wx.hideLoading()
      if (success.data.return_code == 'success') {

        wx.setStorageSync('service_obj', obj)
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })

      } else {
        wx.showToast({
          icon: 'none',
          duration: 1500,
          title: success.data.return_msg
        })
      }
    })


    

  },


  opensheet() {
    this.setData({
      show: true
    })
  },

  showPopup(e){
    console.log(e);
    this.setData({
      time_show: true,
      type: e.currentTarget.dataset.type
    })
  },

  onClose() {
    this.setData({
      show: false,
      time_show:false
    });
  },

  onSelect(event) {
    this.setData({
      status: event.detail
    })
  }, 


  onclick(e) {
    this.setData({
      result_status: true
    })
    var str = {
      detail: {
        value: this.data.eqNumber == '' ? '' : this.data.eqNumber
      }
    }
    this.dianwei_change(str);
  },

  select_item(e) {
    this.setData({
      result_status: false,
      result: [],
      eqNumber: e.currentTarget.dataset.item
    })
  },


  // input_change(e) {
  //   this.setData({
  //     input_text: e.detail.value
  //   })
  // },


  dianwei_change(e) {
    if (!this.data.result_status) {
      return;
    }
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
        eqNumber:e.detail.value
      })
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    app.sdk.get_repair_status(success => {
      if (success.data.return_code == 'success') {
        this.setData({
          actions: success.data.return_msg
        })
      } else {

      }
      console.log(success);
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