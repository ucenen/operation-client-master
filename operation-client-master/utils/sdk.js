/**
 *  @auth wl.li  liwulin@sobey.com
 */

var openid = 'test_111';
var url = 'https://api.cofeplus.com:8421/CofeInterface/';

function check_user( obj, success, fail, complete) {
	wx.request({
		url: url+'check_user.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

// 参数	是否必须	说明
// openid	是	运维小程序用户的openid
// pageNum	是	当前第几页，从1开始
// pageSize	是	每页显示数据行数
// entityJson	否	查询条件，json格式
//     orderNumber	否	订单编号
//     nickname	否	用户昵称
//     mobile	否	手机号
//     eqNumber	否	设备编号
//     productName	否	商品名称
//     payOrderNumber	否	交易单号
function look_order_to_page( obj, success, fail, complete) {
	wx.request({
		url: url+'look_order_to_page.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_equipment(obj, success, fail, complete) {
	wx.request({
		url: url+'look_equipment.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

// 参数	是否必须	说明
// openid	是	运维小程序用户的openid
// eqNumber	是	设备编号
function search_equipment(obj, success, fail, complete) {
	wx.request({
		url: url+'search_equipment.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function get_cleaning_label(success, fail, complete) {
	wx.request({
		url: url+'get_cleaning_label.do',
		method: 'GET',
		data: {},
		success: success,
		fail: fail,
		complete: complete,
	});
}

function cleaning_ok(obj,success, fail, complete) {
	wx.request({
		url: url+'cleaning_ok.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

// 参数	是否必须	说明
// eqNumber	是	设备编号
function look_equipment_material(obj,success, fail, complete) {
	wx.request({
		url: url+'look_equipment_material.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function add_material_balance(obj,success, fail, complete) {
	wx.request({
		url: url+'add_material_balance.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function add_temperature_config(obj, success, fail, complete) {
  wx.request({
    url: url + 'add_temperature_config.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function look_temperature_config(obj, success, fail, complete) {
  wx.request({
    url: url + 'look_temperature_config.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function enter_scrap(obj,success, fail, complete) {
	wx.request({
		url: url+'enter_scrap.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_meter_reading_record(obj,success, fail, complete) {
	wx.request({
		url: url+'look_meter_reading_record.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function get_repair_status(success, fail, complete) {
	wx.request({
		url: url+'get_repair_status.do',
		method: 'GET',
		data: {},
		success: success,
		fail: fail,
		complete: complete,
	});
}


function get_repair_list_for_page(obj,success, fail, complete) {
	wx.request({
		url: url+'get_repair_list_for_page.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function add_meter_reading(obj,success, fail, complete) {
	wx.request({
		url: url+'add_meter_reading.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function start_repair(obj,success, fail, complete) {
	wx.request({
		url: url+'start_repair.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function cancel_repair(obj,success, fail, complete) {
	wx.request({
		url: url+'cancel_repair.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function repair_completed(obj,success, fail, complete) {
	wx.request({
		url: url+'repair_completed.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function repair_inspection(obj,success, fail, complete) {
	wx.request({
		url: url+'repair_inspection.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function search_kiosk(obj,success, fail, complete) {
	wx.request({
		url: url+'search_kiosk.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}



function get_kiosk_error(obj,success, fail, complete) {
	wx.request({
		url: url+'get_kiosk_error.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function get_diagnostic_label(success, fail, complete) {
	wx.request({
		url: url+'get_diagnostic_label.do',
		method: 'GET',
		data: {},
		success: success,
		fail: fail,
		complete: complete,
	});
}


function data_today(obj,success, fail, complete) {
	wx.request({
		url: url+'data_today.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function report_statistics(obj,success, fail, complete) {
	wx.request({
		url: url+'report_statistics.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function more_equipment(obj,success, fail, complete) {
	wx.request({
		url: url+'more_equipment.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function diagnosis_kiosk(obj,success, fail, complete) {
	wx.request({
		url: url+'diagnosis_kiosk.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function more_sales(obj,success, fail, complete) {
	wx.request({
		url: url+'more_sales.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function remote_operation_menu(success, fail, complete) {
	wx.request({
		url: url+'remote_operation_menu.do',
		method: 'GET',
		data: {},
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_error_record(obj,success, fail, complete) {
	wx.request({
		url: url+'look_error_record.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_scrap_record(obj,success, fail, complete) {
	wx.request({
		url: url+'look_scrap_record.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_mt_record(obj,success, fail, complete) {
	wx.request({
		url: url+'look_mt_record.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function mt_inspection(obj,success, fail, complete) {
	wx.request({
		url: url+'mt_inspection.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function more_product(obj,success, fail, complete) {
	wx.request({
		url: url+'more_product.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function more_material(obj,success, fail, complete) {
	wx.request({
		url: url+'more_material.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function edit_equipment_state(obj,success, fail, complete) {
	wx.request({
		url: url+'edit_equipment_state.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}



function refund_order_to_mt(obj,success, fail, complete) {
	wx.request({
		url: url+'refund_order_to_mt.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function reset_material_balance(obj,success, fail, complete) {
	wx.request({
		url: url+'reset_material_balance.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function get_openid(obj,success, fail, complete) {
	wx.request({
		url: url+'get_openid.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}


function look_employee_info(obj,success, fail, complete) {
	wx.request({
		url: url+'look_employee_info.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function edit_employee_info(obj,success, fail, complete) {
	wx.request({
		url: url+'edit_employee_info.do',
		method: 'GET',
		data: obj,
		success: success,
		fail: fail,
		complete: complete,
	});
}

function stop_equipment(obj, success, fail, complete){
  wx.request({
    url: url + 'stop_equipment.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function external_more_sales(obj, success, fail, complete) {
  wx.request({
    url: url + 'external_more_sales.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function look_easily_damaged(obj, success, fail, complete) {
  wx.request({
    url: url + 'look_easily_damaged.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function replace_ok(obj, success, fail, complete) {
  wx.request({
    url: url + 'replace_ok.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function look_volume(obj, success, fail, complete) {
  wx.request({
    url: url + 'look_volume.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function set_volume(obj, success, fail, complete) {
  wx.request({
    url: url + 'set_volume.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function look_equipment_module(obj, success, fail, complete) {
  wx.request({
    url: url + 'look_equipment_module.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

function is_know(obj, success, fail, complete) {
  wx.request({
    url: url + 'is_know.do',
    method: 'GET',
    data: obj,
    success: success,
    fail: fail,
    complete: complete,
  });
}

// 导出方法清单
module.exports = {
	check_user:check_user,//获取用户openid 并检测权限
	look_order_to_page: look_order_to_page,  // 订单根据 多种条件 查询订单
	look_equipment:look_equipment,//查询设备状态 
	search_equipment:search_equipment,	//查询所有设备
	get_cleaning_label:get_cleaning_label, //获取清洁标签
	cleaning_ok:cleaning_ok, //清洁完成
	look_equipment_material:look_equipment_material, //查看设备物料情况
	add_material_balance:add_material_balance, //添加物料
	enter_scrap:enter_scrap, //废料录入
	look_meter_reading_record:look_meter_reading_record, //查询水电记录
	get_repair_status:get_repair_status,//获取设备报修状态
	get_repair_list_for_page:get_repair_list_for_page, //获取设备报修列表
	add_meter_reading:add_meter_reading, //添加水电抄表
	start_repair:start_repair,//开始维修
	cancel_repair:cancel_repair,//撤销维修
	repair_completed:repair_completed,//维修完成
	repair_inspection:repair_inspection,//维修巡检
	search_kiosk:search_kiosk,//点位检索
	get_kiosk_error:get_kiosk_error,//获取异常点位的分析结果
	get_diagnostic_label:get_diagnostic_label,//获取诊断标签
	diagnosis_kiosk:diagnosis_kiosk,//诊断点位
	data_today:data_today,//获取今日数据
	report_statistics:report_statistics,//报表统计
	more_equipment:more_equipment,//更多设备
	more_sales:more_sales,//更多销售信息
	remote_operation_menu:remote_operation_menu,//远程可操作的菜单
	look_error_record:look_error_record,//获取所有异常记录
	look_scrap_record:look_scrap_record,//获取废料记录
	look_mt_record:look_mt_record,//获取运维记录
	mt_inspection:mt_inspection,//运维巡检
	more_product:more_product,//更多商品
	more_material:more_material,//更多原料消耗
	edit_equipment_state:edit_equipment_state, //修改设备状态
	refund_order_to_mt:refund_order_to_mt,//订单退款
	reset_material_balance:reset_material_balance,//重置物料
	get_openid:get_openid, //获取openid
	look_employee_info:look_employee_info,//检查是否已经绑定
	edit_employee_info:edit_employee_info,//绑定openid  和员工id
  look_temperature_config: look_temperature_config,//查看温度配置
  add_temperature_config: add_temperature_config,//添加温度配置
  stop_equipment: stop_equipment,//停售设备
  external_more_sales: external_more_sales,//对外销售统计
  look_easily_damaged: look_easily_damaged,//查看设备易损件
  replace_ok: replace_ok,//更换设备易损件
  set_volume: set_volume,//设置音量
  look_volume: look_volume,//查看音量
  look_equipment_module: look_equipment_module,//查看设备的固件模块
  is_know: is_know,//设备固件模块保修期即将到期，是否知晓
}	
