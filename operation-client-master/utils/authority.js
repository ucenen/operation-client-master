// var authority_data = {
// 	"return_code": "success",
// 	"return_msg": [{
// 		"name": "查询订单",
// 		"val": "order",
// 		"name2": ["订单常规权限", "订单退款/返券权限"],
// 		"val2": ["order:look", "order:refund"]
// 	}, {
// 		"name": "报表统计",
// 		"val": "report",
// 		"name2": ["销售统计", "设备统计", "商品统计", "原料消耗统计"],
// 		"val2": ["report:sales", "report:equipment", "report:product", "report:material"]
// 	}, {
// 		"name": "客流统计",
// 		"val": "guest_traffic",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "清洁",
// 		"val": "clean",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "补料",
// 		"val": "add_material",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "水电抄表",
// 		"val": "meter_reading",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "故障列表",
// 		"val": "maintain",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "智能诊断",
// 		"val": "diagnose",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "实时监控",
// 		"val": "monitor",
// 		"name2": [],
// 		"val2": []
// 	}, {
// 		"name": "巡检权限",
// 		"val": "checking",
// 		"name2": [],
// 		"val2": []
// 	}]
// }

// grade 一级菜单还是二级
// obj 需要进行校验的 权限 数组 {code:'order',status:false}
var app = getApp();

function checkauthority(grade, obj) {
	if (grade == 1) {
		for (var i = 0; i < obj.length; i++) {
			for (var j = 0; j < authority_data.return_msg.length; j++) {
				if (obj[i].code == authority_data.return_msg[j].val) {
					obj[i].status = true;
				}
			}
		}
		return obj;
	} else {
		for (var i = 0; i < obj.length; i++) {
			for (var j = 0; j < authority_data.return_msg.length; j++) {
				for(var k = 0; k<authority_data.return_msg[j].val2.length;k++){
					if (obj[i].code == authority_data.return_msg[j].val2[k]) {
						obj[i].status = true;
					}
				}
				
			}
		}
		return obj;	
	}
}

// 导出方法清单
module.exports = {
	checkauthority: checkauthority // 校验页面的权限  返回一个对象 
}
