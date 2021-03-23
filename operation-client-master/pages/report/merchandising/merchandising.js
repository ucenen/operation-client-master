import * as echarts from '../../../ec-canvas/echarts';
var util = require('../../../utils/util.js');
const app = getApp();
// let chart = null;

var barec = null

function setOption(productName, cupCount, saleAmount) {
  var option = {
    color: ['#e6000c', '#009943'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
      // confine: true
    },
    legend: {
      data: ['杯数', '实付'],
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666',
        interval: 0
      }      
    }],
    yAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: productName,
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    series: [
      {
        name: '杯数',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: cupCount,
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '实付',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: saleAmount,
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  barec.setOption(option);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [{
        text: '所有商户',
        value: 0
      },
      {
        text: '上海商户',
        value: 1
      },
      {
        text: '浙江商户',
        value: 2
      }
    ],
    value1: 0,
    select_time: '1',
    show: false,
    value: [],
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    start_time: util.getyeardate(new Date),
    end_time: util.getyeardate(new Date),
    type: 1,
    // ec: {
    //   // 将 lazyLoad 设为 true 后，需要手动初始化图表
    //   lazyLoad: true 
    // },
    ec: {
      // disableTouch: true,
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    },
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
    console.log(e);
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
      // eqNumber: e.detail
    })
    if(e.detail==''){
      this.setData({
        eqNumber:''
      })
    }
  },




  echartInit(e) {
    // this.setData({
    //   canvas: e.detail.canvas,
    //   width: e.detail.width,
    //   height: e.detail.height
    // })
  },


  showPopup(e) {
    this.setData({
      show: true,
      type: e.currentTarget.dataset.type
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  confirm(e) {
    if (this.data.type == '1') {
      this.setData({
        start_time: util.getyeardate(new Date(e.detail)),
        show: false
      })
    } else {
      this.setData({
        end_time: util.getyeardate(new Date(e.detail)),
        show: false
      })
    }
    this.getdata();
  },

  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  select_time(e) {
    this.setData({
      select_time: e.currentTarget.dataset.item
    })

    if (e.currentTarget.dataset.item == '1') {
      //计算今天
      var start_time = util.getyeardate(new Date());
      this.setData({
        start_time: start_time,
        end_time: start_time
      })
    }


    if (e.currentTarget.dataset.item == '2') {
      //计算最近7天
      var time = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
      var start_time = util.getyeardate(new Date(time));
      this.setData({
        start_time: start_time,
        end_time: util.getyeardate(new Date())
      })
    }

    if (e.currentTarget.dataset.item == '3') {
      //计算最近30天
      var time = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
      var start_time = util.getyeardate(new Date(time));
      this.setData({
        start_time: start_time,
        end_time: util.getyeardate(new Date())
      })
    }

    this.getdata();
  },

  getdata() {
    this.setData({
      result_status: false,
      eqNumber:this.data.eqNumber
    })
    wx.showLoading({
      title: '请稍等...',
    })
    var that = this;
    var obj = {
      openid: app.globalData.openid,
      eqNumber: this.data.eqNumber,
      beginTime: this.data.start_time,
      endTime: this.data.end_time
    }

    app.sdk.more_product(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg,                
        })

        var productName = []
        var cupCount = []
        var saleAmount = []

        success.data.return_msg.dataList.forEach((item) =>{
          productName.push(item.productName)
          cupCount.push(item.cupCount)
          saleAmount.push(item.saleAmount)
        })        
        setOption(productName, cupCount, saleAmount);
        wx.hideLoading();        
      } else {
        wx.hideLoading();
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
  onLoad: function(options) {
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取组件
    // this.ecComponent = this.selectComponent('#mychart-dom-bar');
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var init = setTimeout(function () {
      that.getdata()
    }, 200);
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