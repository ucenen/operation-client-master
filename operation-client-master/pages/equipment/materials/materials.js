// pages/equipment/materials/materials.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    select_item:"",
    margin:0,
    warning:0,
    soldOut:0, 
    eqNumber: "",
    material: "",
    input_value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍等..',
    })
    this.setData({
      
      eqNumber: wx.getStorageSync('material_eqNumber'),
      material: wx.getStorageSync('material_equipment')
    })
    wx.hideLoading();
  },

  openpopup(e){   
    //每次打开弹窗 把三个参数初始化 
    this.setData({
      show: true,
      margin: e.currentTarget.dataset.item.margin,
      warning: e.currentTarget.dataset.item.warningValue,
      soldOut: e.currentTarget.dataset.item.soldOutValue, 
      select_item: e.currentTarget.dataset.item
    })
  },

  onClose(){
    this.setData({
      show: false
    })
  },


  margin_change(e){
      this.setData({
        margin: e.detail.value
      })
  },

  warning_change(e){
    this.setData({
      warning: e.detail.value
    })
  },

  soldOut_change(e){
    this.setData({
      soldOut: e.detail.value
    })
  },

  add_material_balance(){
    var that =this;
    wx.showLoading({
      title: '请稍等..',
    })
    if ("进口有机豆" == this.data.select_item.mtName && this.data.margin>2400) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName +"补料极限2.4KG"
      })
      return;
    }
    if ("阿拉比卡豆" == this.data.select_item.mtName && this.data.margin > 2700) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName +"补料极限2.7KG"
      })
      return;
    }
    if ("牛奶" == this.data.select_item.mtName && this.data.margin > 40000) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName +"补料极限40L"
      })
      return;
    }
    if (this.data.select_item.mtName.indexOf("糖浆") != -1 && this.data.margin > 1000) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName +"补料极限1L"
      })
      return;
    }
    if (this.data.select_item.mtName.indexOf("抹茶粉") != -1 && this.data.margin > 450) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName +"补料极限0.45KG"
      })
      return;
    }
    if (this.data.select_item.mtName.indexOf("可可粉") != -1 && this.data.margin > 750) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName+"补料极限0.75KG"
      })
      return;
    }
    if ("榛果颗粒" == this.data.select_item.mtName && this.data.margin > 450) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName+"补料极限0.45KG"
      })
      return;
    }
    if ("香草粉" == this.data.select_item.mtName && this.data.margin > 150) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName+"补料极限0.15KG"
      })
      return;
    }
    if ("麦片颗粒" == this.data.select_item.mtName && this.data.margin > 150) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName+"补料极限0.15KG"
      })
      return;
    }
    if ("纸杯" == this.data.select_item.mtName && this.data.margin > 220) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName+"补料极限220个"
      })
      return;
    }
    if ("塑料杯" == this.data.select_item.mtName && this.data.margin > 220) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: this.data.select_item.mtName + "补料极限220个"
      })
      return;
    }
    var obj = {
      openid: app.globalData.openid,
      ecrId: this.data.select_item.ecrId,
      addMargin: this.data.margin,
      soldOutValue: this.data.soldOut,
      warningValue: this.data.warning
    }
    app.sdk.add_material_balance(obj, success => {
      
      if (success.data.return_code == 'success') {
        that.setData({
          show: false
        })
        wx.showToast({
          icon: 'success',
          duration: 1000,
          title: success.data.return_msg,
        })

        var data = {
          openid: app.globalData.openid,
          eqNumber: wx.getStorageSync('material_eqNumber')
        }

        app.sdk.look_equipment_material(data, success => {
          if (success.data.return_code == 'success') {
              that.setData({
                material:success.data.return_msg,
                input_value:''
              })
              wx.hideLoading();
          
          } else {
            wx.hideLoading()
          }
          console.log(success);
        })       
      } else {
        wx.hideLoading()
      }
      console.log(success);
    })
  },


  reset_material_balance(e){
    var that = this;
    
    var obj = {
      openid: app.globalData.openid,
      ecrId: e.currentTarget.dataset.item.ecrId     
    }
    wx.showModal({
      // title: '提示',
      content: '确定重置' + e.currentTarget.dataset.item.mtName + '吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍等..',
          })
           app.sdk.reset_material_balance(obj, success => {
              wx.hideLoading();
              if (success.data.return_code == 'success') {
                wx.showToast({
                  duration:1000,
                  title: success.data.return_msg
                })
                var data = {
                  openid: app.globalData.openid,
                  eqNumber: wx.getStorageSync('material_eqNumber')
                }

                app.sdk.look_equipment_material(data, success => {
                  if (success.data.return_code == 'success') {
                    that.setData({
                      material: success.data.return_msg
                    })                   
                  } else {
                    
                  }
                  console.log(success);
                })
              }else{
                wx.showToast({
                  icon:'none',
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