import { apiCommon, apiCommonNormal } from '@/utils/util'
import * as lgApi from '@/api/largeScreen'

/**
 * ******************************************************************************
 * 地图、经营指标以及中间数据接口
 * ******************************************************************************
 */
// 首页地图数据
export const getIndexMap = async () => {
    return await apiCommon(lgApi.getIndexMap)
}

// 首页地图上方数据展示
export const getIndexMapTopData = async () => {
    return await apiCommon(lgApi.getIndexMapTopData)
}

// 本年累计对客营收
export const getBnljdkysData = async () => {
    return await apiCommon(lgApi.getBnljdkysData)
}

// 首页地图下方数据展示
export const getIndexMapBelowData = async () => {
    return await apiCommon(lgApi.getIndexMapBelowData)
}

// 查看门店/项目简介
export const getBusinessData = async params => {
    return await apiCommon(lgApi.getBusiness, params)
}

// 获取项目情况
export const getPojDetailData = async params => {
    return await apiCommon(lgApi.getPojDetail, params)
}

// 获取公司经营指标
export const getCompanyTargetData = async () => {
    return await apiCommon(lgApi.getCompanyTarget)
}

/**
 * ******************************************************************************
 * 左边静态区域接口
 * ******************************************************************************
 */
// 获取经营数据
export const getOperateData = async () => {
    return await apiCommon(lgApi.getOperateData)
}
// 获取本年投资进度图表
export const getBatteryProcessChart0 = async () => {
    return await apiCommon(lgApi.getBatteryProcessChart0)
}
// 获取会员进度条图表
export const getBatteryProcessChart1 = async () => {
    return await apiCommon(lgApi.getBatteryProcessChart1)
}
// 获取人力分布
export const getIndustrialTalentData = async () => {
    return await apiCommon(lgApi.getIndustrialTalent)
}
// 获取风险数据图表
export const getRiskDataChartData = async () => {
    return await apiCommon(lgApi.getRiskDataChart)
}
// 获取风险数据
export const getRiskDataInfo = async () => {
    return await apiCommon(lgApi.getRiskDataInfo)
}

/**
 * 营收与利润
 */
//  营收饼图
export const getYingShouChart1 = async () => {
    return await apiCommon(lgApi.getYingShouChart1)
}
//  营收折线
export const getYingShouChart2 = async business_id => {
    return await apiCommon(lgApi.getYingShouChart2, business_id)
}
//  利润饼图
export const getLiRunChart1 = async () => {
    return await apiCommon(lgApi.getLiRunChart1)
}
//  利润折线
export const getLiRunChart2 = async business_id => {
    return await apiCommon(lgApi.getLiRunChart2, business_id)
}

/**
 * ******************************************************************************
 * 右边区域接口
 * ******************************************************************************
 */
/**
 * ***********************************************
 * 右边不需要区分
 * ***********************************************
 */
/**
 * 服务区经营数据
 */
// 获取服务门店在营数据(表格)
export const getServiceAreaTableData = async () => {
    return await apiCommon(lgApi.getServiceAreaTable)
}

/**
 * 公共服务数据
 */
// 公共服务支出变动率
export const getPublicServiceData1 = async () => {
    return await apiCommon(lgApi.getPublicServiceData1)
}
// 渲染服务区投诉排行表格以及投诉数据
export const getPublicServiceTable = async () => {
    return await apiCommon(lgApi.getPublicServiceTable)
}
// 渲染服务区吸引力图表
export const getPublicServiceChart = async () => {
    return await apiCommon(lgApi.getPublicServiceChart)
}

/**
 * ***********************************************
 * 右边区分服务区和区域接口
 * ***********************************************
 */
/**
 * 流量数据相关 12个接口
 */
// 点服务区渲染流量数据图表
export const getFlowChartByService = async label => {
    return await apiCommon(lgApi.getFlowChartByService, label)
}
// 点区域渲染流量数据图表
export const getFlowChartByRegion = async label => {
    return await apiCommon(lgApi.getFlowChartByRegion, label)
}

// 点服务区显示今日入区车辆
export const getFlowData1ByService = async label => {
    return await apiCommon(lgApi.getFlowData1ByService, label)
}
// 点区域显示今日入区车辆
export const getFlowData1ByRegion = async label => {
    return await apiCommon(lgApi.getFlowData1ByRegion, label)
}

// 点服务区显示本年累计入区车辆数
export const getFlowData2ByService = async label => {
    return await apiCommon(lgApi.getFlowData2ByService, label)
}
// 点区域显示本年累计入区车辆数
export const getFlowData2ByRegion = async label => {
    return await apiCommon(lgApi.getFlowData2ByRegion, label)
}

// 点服务区显示今日入区率
export const getFlowData3ByService = async label => {
    return await apiCommon(lgApi.getFlowData3ByService, label)
}
// 点区域显示今日入区率
export const getFlowData3ByRegion = async label => {
    return await apiCommon(lgApi.getFlowData3ByRegion, label)
}

// 点服务区显示今日入区消费转化率
export const getFlowData4ByService = async label => {
    return await apiCommon(lgApi.getFlowData4ByService, label)
}
// 点区域显示今日入区消费转化率
export const getFlowData4ByRegion = async label => {
    return await apiCommon(lgApi.getFlowData4ByRegion, label)
}

// 点服务区显示累计入区消费转化率
export const getFlowData5ByService = async label => {
    return await apiCommon(lgApi.getFlowData5ByService, label)
}
// 点区域显示累计入区消费转化率
export const getFlowData5ByRegion = async label => {
    return await apiCommon(lgApi.getFlowData5ByRegion, label)
}


/**
 * 服务区经营数据
 */
// 点服务区显示渲染累计对客营收柱状图
export const getServiceAreaChartByService = async label => {
    return await apiCommon(lgApi.getServiceAreaChartByService, label)
}
// 点区域显示渲染累计对客营收柱状图
export const getServiceAreaChartByRegion = async label => {
    return await apiCommon(lgApi.getServiceAreaChartByRegion, label)
}

// 点服务区显示今日单笔消费金额
export const getServiceAreaData1ByService = async label => {
    return await apiCommon(lgApi.getServiceAreaData1ByService, label)
}
// 点区域显示今日单笔消费金额
export const getServiceAreaData1ByRegion = async label => {
    return await apiCommon(lgApi.getServiceAreaData1ByRegion, label)
}

// 点服务区显示管理人员
export const getServiceAreaData2ByService = async label => {
    return await apiCommon(lgApi.getServiceAreaData2ByService, label)
}
// 点区域显示管理人员
export const getServiceAreaData2ByRegion = async label => {
    return await apiCommon(lgApi.getServiceAreaData2ByRegion, label)
}

/**
 * 公共服务数据
 */
// 点服务区显示公共服务数据车位数量
export const getPublicServiceData1ByService = async label => {
    return await apiCommon(lgApi.getPublicServiceData1ByService, label)
}
// 点区域显示公共服务数据车位数量
export const getPublicServiceData1ByRegion = async label => {
    return await apiCommon(lgApi.getPublicServiceData1ByRegion, label)
}

/**
 * 服务区经营数据和公共服务数据重合
 */
// 点服务区显示服务区门店在营率和公共服务数据门店数量
export const getServicePublicData1ByService = async label => {
    return await apiCommon(lgApi.getServicePublicData1ByService, label)
}
// 点区域显示服务区门店在营率和公共服务数据门店数量
export const getServicePublicData1ByRegion = async label => {
    return await apiCommon(lgApi.getServicePublicData1ByRegion, label)
}

// 点服务区显示服务区数据和公共数据
export const getServicePublicData2ByService = async label => {
    return await apiCommon(lgApi.getServicePublicData2ByService, label)
}
// 点区域显示服务区数据和公共数据
export const getServicePublicData2ByRegion = async label => {
    return await apiCommon(lgApi.getServicePublicData2ByRegion, label)
}

