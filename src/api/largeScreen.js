/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/api";

// 默认参数
const defaultParams = {
    pageSize: 999,
    // currentPage: 1,
}

/**
 * ******************************************************************************
 * 地图、经营指标以及中间数据接口
 * ******************************************************************************
 */
// 首页地图数据
export const getIndexMap = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/level/kanban/home/map`,
        method: 'get',
        params: defaultParams
    });
};

// 首页地图上方数据展示
export const getIndexMapTopData = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/non/oil/above/the/map/data`,
        method: 'get',
        params: defaultParams
    });
};

// 本年累计对客营收
export const getBnljdkysData = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/youpin/year/count/revenue`,
        method: 'get',
        params: defaultParams
    });
};

// 首页地图下方数据展示
export const getIndexMapBelowData = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/year/data/all`,
        method: 'get',
        params: defaultParams
    });
};

// 查看门店/项目简介
export const getBusiness = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/data/store/project/introduce`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

// 获取项目情况
export const getPojDetail = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/data/project/information`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

// 获取公司经营指标
export const getCompanyTarget = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/data/business/indicators`,
        method: 'get',
        params: defaultParams
    });
};

/**
 * ******************************************************************************
 * 左边静态区域接口
 * ******************************************************************************
 */
// 获取经营数据
export const getOperateData = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/operating/data`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

// 获取本年投资进度图表
export const getBatteryProcessChart0 = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/annual/investment`,
        method: 'get',
        params: defaultParams
    });
};

// 获取会员进度条图表
export const getBatteryProcessChart1 = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/member/progress/bar`,
        method: 'get',
        params: defaultParams
    });
};

// 获取人力分布 
export const getIndustrialTalent = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/manpower/distribution`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

// 获取风险数据图表
export const getRiskDataChart = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/risk/data`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

// 获取风险数据
export const getRiskDataInfo = params => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/safety/accident`,
        method: 'get',
        params: {
            ...params,
            ...defaultParams
        }
    });
};

/**
 * 营收与利润
 */
//  营收饼图
export const getYingShouChart1 = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/revenue/and/profit/structure`,
        method: 'get',
        params: defaultParams
    });
};
//  营收折线
export const getYingShouChart2 = business_id => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/three/year/revenue/data`,
        method: 'get',
        params: {
            ...defaultParams,
            business_id
        }
    });
};
//  利润饼图
export const getLiRunChart1 = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/profit/pie/chart/structure`,
        method: 'get',
        params: defaultParams
    });
};
//  利润折线
export const getLiRunChart2 = business_id => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/three/year/profit/data`,
        method: 'get',
        params: {
            ...defaultParams,
            business_id
        }
    });
};

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
export const getServiceAreaTable = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/service/area/store/operation/rate`,
        method: 'get',
        params: defaultParams,
    });
};
/**
 * 公共服务数据
 */
// 公共服务支出变动率
export const getPublicServiceData1 = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/operating/data`,
        method: 'get',
        params: defaultParams
    });
}
// 渲染服务区投诉排行表格以及投诉数据
export const getPublicServiceTable = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/service/area/complaint/ranking`,
        method: 'get',
        params: defaultParams
    });
}
// 渲染服务区吸引力图表
export const getPublicServiceChart = () => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/service/area/attractiveness/ranking`,
        method: 'get',
        params: defaultParams
    });
};

/**
 * ***********************************************
 * 右边区分服务区和区域接口
 * ***********************************************
 */
/**
 * 流量数据相关 12个接口
 */
// 点服务区渲染流量数据图表
export const getFlowChartByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/serverpart/vehicleflow/carin/bytype`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域渲染流量数据图表
export const getFlowChartByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/area/vehicleflow/carin/bytype`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示今日入区车辆
export const getFlowData1ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/serverpart/vehicleflow/carin/today`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示今日入区车辆
export const getFlowData1ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/area/vehicleflow/carin/today`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示本年累计入区车辆数
export const getFlowData2ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/serverpart/vehicleflow/carin/year`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示本年累计入区车辆数
export const getFlowData2ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/area/vehicleflow/carin/year`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示今日入区率
export const getFlowData3ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/serverpart/vehicleflow/carin_per/today`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示今日入区率
export const getFlowData3ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/sycloud/area/vehicleflow/carin_per/today`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示今日入区消费转化率
export const getFlowData4ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/area/entrance/conversion/rate/today`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示今日入区消费转化率
export const getFlowData4ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/region/entrance/conversion/rate/today`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示累计入区消费转化率
export const getFlowData5ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/area/entrance/conversion/rate/sum`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示累计入区消费转化率 --- ?
export const getFlowData5ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/region/entrance/conversion/rate/sum`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

/**
 * 服务区经营数据
 */
// 点服务区显示渲染累计对客营收柱状图
export const getServiceAreaChartByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/store/sales/rate/and/consumption/revenue`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示渲染累计对客营收柱状图
export const getServiceAreaChartByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/store/sales/rate/and/consumption/revenue/region`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示今日单笔消费金额
export const getServiceAreaData1ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/area/today/one/money`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};

// 点区域显示今日单笔消费金额
export const getServiceAreaData1ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/regional/single/consumption/amount/today`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

// 点服务区显示管理人员
export const getServiceAreaData2ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/management/personnel/service/area`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};

// 点区域显示管理人员
export const getServiceAreaData2ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/management/personne/Region`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

/**
 * 公共服务数据
 */
// 点服务区显示公共服务数据车位数量
export const getPublicServiceData1ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/spaces/used/service/area`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示公共服务数据车位数量
export const getPublicServiceData1ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/spaces/used/service/area/region`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};

/**
 * 服务区经营数据和公共服务数据重合
 */
// 点服务区显示服务区门店在营率和公共服务数据门店数量
export const getServicePublicData1ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/operating/rate/one`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示服务区门店在营率和公共服务数据门店数量
export const getServicePublicData1ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/operating/rate/region`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};
// 点服务区显示服务区数据和公共数据
export const getServicePublicData2ByService = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/service/area/data/and/public/data`,
        method: 'get',
        params: {
            ...defaultParams,
            serverpart_name: label
        }
    });
};
// 点区域显示服务区数据和公共数据
export const getServicePublicData2ByRegion = label => {
    return axios({
        url: `${base}/zhgs_data_syn/dev/service/area/data/and/public/data/region`,
        method: 'get',
        params: {
            ...defaultParams,
            area: label
        }
    });
};