import request from '@/utils/request'
import { LineData, PieData, RadarData, ReportData } from '@/types/Dashboard'

export default {
  // 获取工作台汇总数据
  getReportData() {
    return request.get<ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<LineData>('/order/dashboard/getLineData')
  },
  // 获取城市分布数据
  getPieCityData() {
    return request.get<PieData>('/order/dashboard/getPieCityData')
  },
  // 获取年龄分布数据
  getPieAgeData() {
    return request.get<PieData>('/order/dashboard/getPieAgeData')
  },
  // 获取雷达图数据
  getRadarData() {
    return request.get<RadarData>('/order/dashboard/getRadarData')
  }
}
