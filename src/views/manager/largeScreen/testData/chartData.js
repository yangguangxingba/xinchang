// 营收与利润结构 - 左
export const revenueProfitData1 = {
  /* fieldData: [
    { value: 1048, name: '油品(86.52%)'},
    { value: 735, name: '中碳(6.12%)' },
    { value: 580, name: '饮食(3.25%)' },
    { value: 484, name: '商贸(2.07%)' },
    { value: 300, name: '文化(1.17%)' },
    { value: 300, name: '数字商业(0.96%)' },
    { value: 300, name: '服务区(0.02%)' },
  ], */
  // 传统能源、服务区、新能源、新文化、新商业（商贸零售）、新商业（餐饮）、新数字
  fieldData: [
    { value: 1048, name: '传统能源', percentage: '86.52%'},
    { value: 735, name: '服务区', percentage: '6.12%' },
    { value: 580, name: '新能源', percentage: '3.25%' },
    { value: 484, name: '新文化', percentage: '2.07%' },
    { value: 300, name: '新商业(商贸零售)', percentage: '1.17%' },
    { value: 300, name: '新商业(餐饮)', percentage: '0.96%' },
    { value: 300, name: '新数字', percentage: '0.02%' },
  ],
}
// 营收与利润结构 - 右
export const revenueProfitData2 = {
  fieldData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  yData1: [4, 6, 1, 3, 4, 5, 3, 7, 10, 3, 9, 10],
  yData2: [2, 11, 10, 12, 4, 7, 6, 7, 5, 3, 4, 8],
  yData3: [3, 5, 7, 9, 5, 4, 6, 5, 4, 4, 7, 3]
}
// 人才分布1 - 学历
export const industrialTalentData1 = {
  legend: ['本科', '大专', '高中及以下', '研究生', '中专'],
  fieldData: [[320], [222], [220], [111], [120]],
}
// 人才分布2 - 职称
export const industrialTalentData2 = {
  legend: ['无职称', '初级', '中级', '副高', '正高'],
  fieldData: [[320], [222], [220], [111], [120]],
}
// 风险数据
export const riskDataData = {
  fieldData: ['商业集团母公司', '高速发展', '高速商贸', '高速石油', '中碳科技', '高速广告', '创盛至合', '盈通公司', '高速能源', '浙商文化', '浙商互联', '富春驿商'],
  yData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
  yData2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
  yData3: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
}
// 流量数据
export const flowDataData = {
  fieldData: [
    { value: 1048, name: '客车' },
    { value: 735, name: '货车' },
    { value: 580, name: 'Email' },
    { value: 484, name: '新能源车' },
    { value: 300, name: '危化品车' }
  ],
}
// 服务区经营数据
export const serviceAreaData = {
  fieldData: ['中餐', '西餐', '小吃', '便利店', '其他'],
  yData1: [120, 601, 200, 400, 800],
  yData2: [404, 505, 150, 303, 700],
}
// 公共服务数据
export const publicServiceData = {
  fieldData: ['杭州', '萧山', '安吉', '龙游', '衢州', '绍兴', '太湖'],
  yData: [77, 86, 33, 95, 102, 123, 102],
}