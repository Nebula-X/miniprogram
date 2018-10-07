import fly from '../utils/fly'

/**
 * 设备 -- 设备列表
 * @returns {*}
 */
export const deviceList = (page) => {
  return fly.post('app_v1/device/device-list', {page})
}

/**
 * 设备 -- 设备详情
 * @returns {*}
 */
export const deviceInfo = (id) => {
  return fly.post('app_v1/device/device-info', {'device_id': id})
}

/**
 * 设备 -- 工艺列表
 * @returns {*}
 */
export const technicsInfo = (id) => {
  return fly.post('app_v1/technology/technology-list', {'device_id': id})
}

// /**
//  * 设备 -- 历史工艺追溯
//  * @returns {*}
//  */
// export const technicsHistory = (id, time, techname) => {
//   var formData = new FormData()
//   formData.append('device_id', id)
//   formData.append('time', time)
//   formData.append('techname', techname)
//   return fly.post('app_v1/technology/technology-history', formData)
// }
//
/**
 * 设备 -- 报警监控
 * @returns {*}
 */
export const alarmInfo = (id, page) => {
  return fly.post('app_v1/alarm/alarm-monitoring', {'page': page, 'device_id': id})
}
//
// /**
//  * 设备 -- 历史报警
//  * @returns {*}
//  */
// export const alarmHistory = (id) => {
//   var formData = new FormData()
//   formData.append('device_id', id)
//   return fly.post('app_v1/alarm/alarm-retrospect', formData)
// }
//
// /**
//  * 设备 -- 产能详情
//  * @returns {*}
//  */
// export const capacityInfo = (id) => {
//   var formData = new FormData()
//   formData.append('device_id', id)
//   return fly.post('app_v1/capacity/capacity-info', formData)
// }
//
// /**
//  * 设备 -- 历史产能
//  * @returns {*}
//  */
// export const capacityHistory = (id) => {
//   var formData = new FormData()
//   formData.append('device_id', id)
//   return fly.post('app_v1/capacity/capacity-history', formData)
// }
