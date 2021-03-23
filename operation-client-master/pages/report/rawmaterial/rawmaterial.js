import * as echarts from '../../../ec-canvas/echarts';
var util = require('../../../utils/util.js');
const app = getApp();
var barec = null;
var barec2 = null;

function setOption(productName, consumption) {
  var option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c}",
      position: function (pos, params, dom, rect, size) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      }
    },
    // legend: {
    //   data: ['主料'],
      
    //   textStyle: {
    //     fontStyle:'normal',
    //     fontWeight:'normal',
    //     fontSize: 14
    //   }
    // },
    title:{
      show: true,
      text: '主料',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: productName,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval:0
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '主料',        
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside',
            fontSize: 14
          }
        },
        data: consumption
      }
    ]
  };

  barec.setOption(option);
}


function setOption2(productName, consumption) {
  var option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c}",
      position: function (pos, params, dom, rect, size) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      }
    },
    title: {
      show: true,
      text: '辅料',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
      
    ],
    yAxis: [
      {
        type: 'category',
        data: productName,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0
        }
      }
    ],
    series: [
      {
        name: '主料',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside',
            fontSize: 14
          }
        },
        data: consumption
      }
    ]
  };

  barec2.setOption(option);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {    
    select_time: '1',
    show: false,
    value: [],
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    start_time: util.getyeardate(new Date),
    end_time: util.getyeardate(new Date),
    type: 1,
    eqNumber:'',
    data_list:[],
    ec: {
      onInit: function (canvas, width, height) {
        barec= echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    },

    bc: {
      // disableTouch: true,
      onInit: function (canvas, width, height) {
        barec2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec2);
        return barec2;
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
    if (e.detail == '') {
      this.setData({
        eqNumber: ''
      })
    }
  },

  // onChange(e) {
  //   this.setData({
  //     eqNumber: e.detail
  //   });
  // },

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

  bindChange: function (e) {
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

  getdata(){
    this.setData({
      result_status: false,
      eqNumber: this.data.eqNumber
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

    app.sdk.more_material(obj, success => {
      if (success.data.return_code == 'success') {
        this.setData({
          data_list: success.data.return_msg,
        })
        var productName = []
        var consumption = []

        success.data.return_msg.dataList1.forEach((item) => {
          productName.push(item.mtName)          
          consumption.push(item.consumption)
        })

        var productName2 = []
        var consumption2 = []

        success.data.return_msg.dataList2.forEach((item) => {
          productName2.push(item.mtName)
          consumption2.push(item.consumption)
        })
        setOption(productName, consumption);
        setOption2(productName2, consumption2);
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
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var init = setTimeout(function () {
      that.getdata()
    }, 200);
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