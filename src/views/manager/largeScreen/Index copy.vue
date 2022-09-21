<template>
  <section class="large_screen_wrap">
    <!-- 头部 -->
    <div class="lagscn_top">
      <img src="@/assets/images/largescreen/lagscn_top.png" alt="">

      <!-- 时间 -->
      <span class="lgsntp_time font_family_ping">{{ cruuentTime }}</span>
    </div>

    <!-- 主体部分 -->
    <div class="lagscn_content">
      <!-- 主体左侧 -->
      <div class="lagscncot_left">
        <!-- 经营数据 -->
        <div class="lgcp_wrap operate_data">
          <div class="lgcp_title f-cb">
            <span class="f-fl">经营数据</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_line">
              <ul class="justify_cot dot_txt num_txt_wrap">
                <li>资产总额<span>{{ setNum(businessLeftData.total_assets) }}</span>亿</li>
                <li>净资产<span>{{ setNum(businessLeftData.net_assets) }}</span>亿</li>
                <li>从业人员<span>{{ businessLeftData.employee_num }}</span>人</li>
              </ul>
            </div>
            <div class="lgcpcot_wrap justify_cot">
              <div class="lgcpcot_l">
                <div class="operadate_item">
                  <ul class="chart_wrap num_txt_wrap">
                    <li>本年营收进度<span>{{ setNum(businessLeftData.revenue_completion_rate) }}%</span></li>
                    <li><span>{{ setNum(businessLeftData.annual_target_operating_income) }}</span>亿元</li>
                  </ul>
                  <battery-process-chart ref="chart1Ref" :chart-data="{barData: [businessLeftData.revenue_completion_rate], lineData: [100]}" />
                </div>
                <div class="operadate_item">
                  <ul class="compare num_txt_wrap">
                    <li>本年营业收入<span>{{ setNum(businessLeftData.annual_operating_income) }}</span>亿元</li>
                    <li>同比<b :class="{'down': businessLeftData.revenue_growth_rate<0, 'up': businessLeftData.revenue_growth_rate>0}">{{ setNum(businessLeftData.revenue_growth_rate) }}%</b></li>
                  </ul>
                </div>
              </div>
              <div class="lgcpcot_r">
                <div class="operadate_item">
                  <ul class="chart_wrap num_txt_wrap">
                    <li>本年利润进度<span>{{ setNum(businessLeftData.gross_profit_completion_rate) }}%</span></li>
                    <li><span>{{ setNum(businessLeftData.annual_target_profits) }}</span>亿元</li>
                  </ul>
                  <battery-process-chart ref="chart2Ref" :chart-data="{barData: [businessLeftData.gross_profit_completion_rate], lineData: [100]}" />
                </div>
                <div class="operadate_item">
                  <ul class="compare num_txt_wrap">
                    <li>本年利润总额<span>{{ setNum(businessLeftData.annual_gross_profits) }}</span>亿元</li>
                    <li>同比<b :class="{'down': businessLeftData.gross_profit_growth_rate<0, 'up': businessLeftData.gross_profit_growth_rate>0}">{{ setNum(businessLeftData.gross_profit_growth_rate) }}%</b></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 营收与利润 -->
        <div class="lgcp_wrap revenue_profit">
          <div class="lgcp_title f-cb">
            <span class="f-fl">营收与利润结构</span>
            <tab class="lgcp_title_right f-fr" :tabList="revenueProfitList" @checkTab="checkTab" />
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap justify_cot">
              <div class="lgcpcot_l">
                <revenue-profit-chart-1 ref="chart3Ref" :chart-data="revenueProfitData1" :height="'135px'" :ysSubTitle="ysSubTitle" @setRevenueProfitChart2Data="setRevenueProfitChart2Data" />
                <!-- <div class="chart_lend">

                </div> -->
              </div>
              <div class="lgcpcot_r">
                <revenue-profit-chart-2 ref="chart4Ref" :chart-data="revenueProfitData2" :height="'135px'" />
              </div>
            </div>
          </div>
        </div>
        <!-- 产业发展 -->
        <div class="lgcp_wrap industrial">
          <div class="lgcp_title f-cb">
            <span class="f-fl">产业发展</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap">
              <div class="industrial_table justify_cot">
                <div class="lgcpcot_l">
                  <brain-table ref="industrialTableRef" class="industrial_table_wrap" :tableData="industrialTableData1" :columns="industrialTableColumns" :isClick="true" :listLoading="industrialListLoading" @getRowData="getCompanyData" />
                </div>
                <div class="lgcpcot_r">
                  <brain-table class="industrial_table_wrap" :tableData="industrialTableData2" :columns="industrialTableColumns" :height="'162px'" :isClick="true" :listLoading="industrialListLoading" @getRowData="getCompanyData" />
                </div>
              </div>
              <div class="industrial_row">
   
                <!-- 本年投资进度(暂时不做)---后又加上 -->
                <div class="indrilow_item f-cb">
                  <div class="idrwitm_l f-fl">
                    <dl>
                      <dt>
                        <ul class="justify_cot num_txt_wrap">
                          <li>本年投资进度<span>{{ setNum(businessLeftData.investment_amountYes) }}%</span></li>
                          <li>已完成投资<span>{{ setNum(businessLeftData.annual_investment_amountSum) }}</span>亿元</li>
                        </ul>
                      </dt>
                      <dd><battery-process-chart ref="chart5Ref" :chart-data="{barData: [businessLeftData.investment_amountYes], lineData: [100]}" /></dd>
                      <!-- <dd class="tip">(油品:6.8% 中碳:3.2% 餐饮2.8% 文化2.7% 数字商业4.6% 服务区4.3%)</dd> -->
                    </dl>
                  </div>
                  <div class="idrwitm_r f-fl">
                    <h4 class="num_txt_wrap"><span>{{ setNum(businessLeftData.annual_plane_investment_amountSum) }}</span>亿元</h4>
                  </div>
                </div>
                <div class="indrilow_item f-cb">
                  <div class="idrwitm_l f-fl">
                    <dl>
                      <dt>
                        <ul class="justify_cot num_txt_wrap">
                          <li>活跃会员占比<span>{{ businessLeftData.result }}%</span></li>
                          <li>活跃会员<span>{{ businessLeftData.active_cnt }}</span>人</li>
                        </ul>
                      </dt>
                      <dd>
                        <battery-process-chart ref="chart6Ref" :chart-data="{barData: [businessLeftData.result], lineData: [100]}" />
                      </dd>
                    </dl>
                  </div>
                  <div class="idrwitm_r f-fl">
                    <h4 class="num_txt_wrap">会员总数<span class="line_mid">{{ businessLeftData.member_cnt }}</span>万人</h4>
                  </div>
                </div>
              </div>
              <div class="industrial_talent">
                <div class="tip_title">
                  <h3>人才分布</h3>
                  <div class="division_bar"></div>
                </div>
                <div class="idutrltat_wrap">
                  <dl>
                    <dd>
                      <ul>
                        <li><span>学历</span></li>
                        <li>
                          <industrial-talent-chart ref="chart7Ref" :chart-data="industrialTalentData1" />
                        </li>
                      </ul>
                    </dd>
                    <dd>
                      <ul>
                        <li><span>职称</span></li>
                        <li>
                          <industrial-talent-chart ref="chart8Ref" :chart-data="industrialTalentData2" />
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 风险数据 -->
        <div class="lgcp_wrap risk_data">
          <div class="lgcp_title f-cb">
            <span class="f-fl">风险数据</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap">
              <div class="riskdt_txt">
                <ul class="justify_cot dot_txt num_txt_wrap">
                  <li>资产负债率<span>{{ setNum(businessLeftData.asset_liability_ratioCount) }}%</span></li>
                  <li>存货增常比率<span>{{ setNum(businessLeftData.inventory_growth_rateCount) }}%</span></li>
                  <li>应收账款增长率<span>{{ setNum(businessLeftData.accounts_receivable_growth_rateCount) }}%</span></li>
                </ul>
              </div>
              <div class="riskdt_chart">
                <risk-data-chart ref="chart9Ref" :chart-data="riskDataData" :height="'155px'" />
                <!-- <risk-data-chart ref="chart9Ref" :chart-data="riskDataData" :height="'180px'" /> -->
              </div>
              <div class="riskdt_txt">
                <ul class="riskdt_total dot_txt num_txt_wrap">
                  <li>有责事故总数<span>{{ businessLeftData.duty_accident_cnt }}</span>个</li>
                  <li>重大经济损失(200万元及以上)事故数<span>{{ businessLeftData.significant_losses_accident_cnt }}</span>个</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主体中间 -->
      <div class="lagscncot_center">
        <div class="lgstcnt_wrap">
          <div class="lgstcnt_top_wrap">
            <!-- 主体中间头部 -->
            <large-screen-top ref="lgcnTopRef" @goBack="goBack" />
          </div>
          <div class="lgstcnt_bot_wrap">
            <!-- 主体中间内容 -->
            <large-screen-main ref="lgcnMainRef" @setZswhData="setZswhData" @getMarkerData="setRightPageData" @getMapAreaData="setRightPageData" />
          </div>
        </div>
      </div>

      <!-- 主体右侧 -->
      <div class="lagscncot_right">
        <!-- 流量数据 -->
        <div class="lgcp_wrap flow_data">
          <div class="lgcp_title f-cb">
            <span class="f-fl">流量数据</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap">
              <div class="fowdata_top justify_cot">
                <div class="lgcpcot_l">
                  <div class="fwdtp_item">
                    <dl class="f-cb">
                      <dt class="f-fl">
                        <img src="@/assets/images/largescreen/car_ico.png" alt="">
                      </dt>
                      <dd class="f-fl">
                        <ul class="num_txt_wrap">
                          <li>今日入区车辆数</li>
                          <li><span>{{ businessRightData.car_numday }}</span>辆</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                  <div class="fwdtp_item">
                    <dl class="f-cb">
                      <dt class="f-fl">
                        <img src="@/assets/images/largescreen/chart_ico.png" alt="">
                      </dt>
                      <dd class="f-fl">
                        <ul class="compare num_txt_wrap">
                          <li>本年累计入区车辆数</li>
                          <!-- <li><span>1719</span>辆&nbsp;&nbsp;同比<b class="up">14%</b></li> -->
                          <!-- <li><span>{{ businessRightData.car_numYear }}</span>辆&nbsp;&nbsp;同比<b :class="{'down': businessRightData.PercentYear<0, 'up': businessRightData.PercentYear>0}">{{ businessRightData.PercentYear }}%</b></li> -->
                          <li><span>{{ businessRightData.car_numYear }}</span>辆</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="lgcpcot_r">
                  <flow-data-chart ref="chart10Ref" :chart-data="flowDataData" :height="'170px'" />
                </div>
              </div>
              <div class="division_bar"></div>
              <div class="fowdata_bot">
                <ul class="justify_cot dot_txt num_txt_wrap">
                  <li>今日入区率<span>{{ setNum(businessRightData.carin_per) }}%</span></li>
                  <li>今日入区消费转化率<span>{{ setNum(businessRightData.percentage) }}%</span></li>
                  <li>累计入区消费转化率<span>{{ setNum(businessRightData.result) }}%</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 服务区经营数据 -->
        <div class="lgcp_wrap service_area_data">
          <div class="lgcp_title f-cb">
            <span class="f-fl">服务区经营数据</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap">
              <div class="lgcprit_item srveara_row">
                <ul class="justify_cot">
                  <li>
                    <dl class="num_txt_wrap dot_txt">
                      <dt>占地面积</dt>
                      <dd><span>{{ setNum(businessRightData.areaCovered) }}</span>万㎡</dd>
                    </dl>
                  </li>
                  <li>
                    <dl class="num_txt_wrap dot_txt">
                      <dt>经营面积</dt>
                      <dd><span>{{ setNum(businessRightData.businessArea) }}</span>万㎡</dd>
                    </dl>
                  </li>
                  <li>
                    <dl class="num_txt_wrap dot_txt">
                      <dt>管理人员数量</dt>
                      <dd><span>{{ businessRightData.manager_cnt }}</span>人</dd>
                    </dl>
                  </li>
                  <li>
                    <dl class="num_txt_wrap dot_txt">
                      <dt>加油(气)站数量</dt>
                      <dd><span>{{ businessRightData.stationCount }}</span>个</dd>
                    </dl>
                  </li>
                  <li>
                    <dl class="num_txt_wrap dot_txt">
                      <dt>充电桩数量</dt>
                      <dd><span>{{ businessRightData.chargingPileCount }}</span>个</dd>
                    </dl>
                  </li>
                </ul>
              </div>
              <div class="lgcprit_item justify_cot lgcprit_total">
                <div class="lgcpcot_l">
                  <ul class="justify_cot num_txt_wrap dot_txt">
                    <li>今日单笔平均消费金额</li>
                    <li class="not_dot"><span>{{ setNum(businessRightData.resultoneday) }}</span>元</li>
                  </ul>
                </div>
                <div class="lgcpcot_r">
                  <ul class="justify_cot num_txt_wrap dot_txt">
                    <li>服务区门店在营率</li>
                    <li class="not_dot"><span>{{ setNum(businessRightData.resultshopsNumnow) }}</span>%</li>
                  </ul>
                </div>
              </div>
              <div class="lgcprit_item justify_cot lgcprit_res">
                <div class="lgcpcot_l">
                  <service-area-chart ref="chart11Ref" :chart-data="serviceAreaData" :height="'220px'" />
                </div>
                <div class="lgcpcot_r">
                  <brain-table class="service_area_table_wrap" :height="'215px'" :tableData="serviceAreaTableData" :columns="serviceAreaTableColumns" :listLoading="serviceAreaListLoading" :isClick="true" @getRowData="setRightPageData" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 公共服务数据 -->
        <div class="lgcp_wrap public_service_data">
          <div class="lgcp_title f-cb">
            <span class="f-fl">公共服务数据</span>
          </div>
          <div class="lgcp_cont">
            <div class="lgcpcot_wrap">
              <div class="lgcprit_item srvedat_row justify_cot">
                <div class="srvdtrw_item">
                  <dl>
                    <dt>门店数量</dt>
                    <dd>
                      <ul class="num_txt_wrap f-cb">
                        <li class="f-fl"><span>{{ businessRightData.shopsNum }}</span>个</li>
                        <li class="f-fl">
                          <ol>
                            <li>在营业{{ businessRightData.normalBusinessShops }}个</li>
                            <li>
                              <el-progress :percentage="businessRightData.resultshopsNumnow" :show-text="false" />
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
                <div class="srvdtrw_item">
                  <dl>
                    <dt>车位数量</dt>
                    <dd>
                      <ul class="num_txt_wrap f-cb">
                        <li class="f-fl"><span>{{ businessRightData.parking_space_total }}</span>个</li>
                        <li class="f-fl">
                          <ol>
                            <li>已使用{{ businessRightData.park_vehicle_total }}个</li>
                            <li>
                              <el-progress :percentage="businessRightData.resultpark_vehicle" :show-text="false" />
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
                <div class="srvdtrw_item">
                  <dl>
                    <dt>淋浴房</dt>
                    <dd class="num_txt_wrap font_family_ping"><span>{{ businessRightData.showerRoomCount }}</span>个</dd>
                  </dl>
                </div>
                <div class="srvdtrw_item">
                  <dl>
                    <dt>母婴室</dt>
                    <dd class="num_txt_wrap font_family_ping"><span>{{ businessRightData.motherAndBabyRoomCount }}</span>个</dd>
                  </dl>
                </div>
                <div class="srvdtrw_item">
                  <dl>
                    <dt>司机之家</dt>
                    <dd class="num_txt_wrap font_family_ping"><span>{{ businessRightData.driversHomeCount }}</span>个</dd>
                  </dl>
                </div>
              </div>
              <div class="lgcprit_item justify_cot lgcprit_total">
                <div class="lgcpcot_l">
                  <ul class="justify_cot num_txt_wrap dot_txt">
                    <li>服务区本月投诉总次数</li>
                    <li class="not_dot"><span>{{ businessRightFixData.numberCountMonth }}</span></li>
                  </ul>
                </div>
                <div class="lgcpcot_r">
                  <ul class="justify_cot compare num_txt_wrap dot_txt">
                    <li>公共服务支出变动率</li>
                    <li class="not_dot"><b :class="{'down': businessRightFixData.public_service_expenditure_change_rate<0, 'up': businessRightFixData.public_service_expenditure_change_rate>0}">{{ setNum(businessRightFixData.public_service_expenditure_change_rate) }}%</b></li>
                  </ul>
                </div>
              </div>
              <div class="lgcprit_item justify_cot lgcprit_res">
                <div class="lgcpcot_l">
                  <div class="tip_title">
                    <h3>本月投诉内容</h3>
                    <div class="division_bar"></div>
                  </div>
                  <smooth-scrollbar>
                    <brain-table ref="publicServiceTableRef" class="public_service_table_wrap" :height="'215px'" :isFixed="true" :tableData="publicServiceTableData" :columns="publicServiceTableColumns" :listLoading="publicServiceListLoading" />
                  </smooth-scrollbar>
                </div>
                <div class="lgcpcot_r">
                  <div class="tip_title">
                    <h3>服务区吸引力TOP10排名</h3>
                    <div class="division_bar"></div>
                  </div>
                  <public-service-chart ref="chart12Ref" :chart-data="publicServiceData" :height="'215px'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * tools / api
 */
// 接口
// import * as lgApi from '@/api/largeScreen'
import * as lgTipApi from './components/tipComponents/lgTipApi'

/**
 * 组件
 */
// 图表
import BatteryProcessChart from './charts/BatteryProcessChart'  // 电池
import RevenueProfitChart1 from './charts/RevenueProfitChart1'  // 营收与利润结构1
import RevenueProfitChart2 from './charts/RevenueProfitChart2'  // 营收与利润结构2
import IndustrialTalentChart from './charts/IndustrialTalentChart'  // 人才分布
import RiskDataChart from './charts/RiskDataChart'  // 风险数据
import FlowDataChart from './charts/FlowDataChart'  // 流量数据
import ServiceAreaChart from './charts/ServiceAreaChart'  // 服务区经营数据
import PublicServiceChart from './charts/PublicServiceChart'  // 公共服务数据
// 工具
import BrainTable from './components/tipComponents/BrainTable'
import Tab from './components/tipComponents/Tab'
// 主体内容
import LargeScreenTop from './components/LargeScreenTop'
import LargeScreenMain from './components/LargeScreenMain'

/**
 * 测试数据
 */
// 图表测试数据
import { revenueProfitData1, revenueProfitData2, industrialTalentData1, industrialTalentData2, riskDataData, flowDataData, serviceAreaData, publicServiceData } from './testData/chartData'
// 表格测试数据
import { industrialTableData1, industrialTableData2, serviceAreaTableData, publicServiceTableData } from './testData/tableData'

export default {
  name: "largeScreen",

  components: {
    // 图表
    BatteryProcessChart,
    RevenueProfitChart1, RevenueProfitChart2, RiskDataChart, IndustrialTalentChart,
    FlowDataChart, ServiceAreaChart, PublicServiceChart,
    // 工具
    BrainTable, Tab,
    // 主体内容
    LargeScreenTop, LargeScreenMain
  },

  data() {
    return {
      /**
       * tools
       */
      revenueProfit: 1,  // 1营收  2利润
      revenueProfitList: ['营收', '利润'],
      ysTitle: '文化',  // 营收饼图subtitle
      ysSubTitle: '0.27',  // 营收饼图subtitle
      cruuentTime: this.globalUtils.getDateTimeNowFormate(),
      timer: null,
      isServer: '',  // 是否为服务区  1 是   2 不是

      tableTab: '',
      industrialListLoading: false,  // 产业发展loading
      serviceAreaListLoading: false,  // 服务区经营数据loading
      publicServiceListLoading: false,  // 公共服务数据loading

      /**
       * 图表数据
       */
      revenueProfitData1, revenueProfitData2, industrialTalentData1, industrialTalentData2, riskDataData,
      flowDataData, serviceAreaData, publicServiceData,

      /**
       * 表格数据
       */
      industrialTableData1, industrialTableData2,
      serviceAreaTableData, publicServiceTableData,

      /**
       * columns数据
       */
      // 产业发展1-2
      industrialTableColumns: [{ prop: 'company_short_name', label: '公司名称' }, { prop: 'Indicator', label: '指标' }, { prop: 'newNuber', label: '数据', align: 'right' }],
      // 服务区经营数据
      serviceAreaTableColumns: [{ prop: 'area_anme', label: '区域', align: 'center' }, { prop: 'newRevenueAmount', label: '累计对客营收', align: 'center' }, { prop: 'YearOnYear', label: '同比', align: 'center' }],
      // 公共服务数据
      publicServiceTableColumns: [{ prop: 'servicepart_name', label: '服务区', align: 'center' }, { prop: 'create_time', label: '时间', align: 'center' }, { prop: 'complaint_content', label: '投诉内容' }],

      /**
       * 接口数据
       */
      // 页面接口数据
      // 左边数据
      businessLeftData: {},
      // 中间数据
      businessCenterData: {},
      // 右边数据
      businessRightData: {},
      businessRightFixData: {},
    }
  },

  methods: {
    /**
     * init
     */
    initPage() {
      this.getcurrntTime()  // 获取时间
      this.initData()  // 获取初始数据
    },

    /**
     * tools
     */
    setNum(num) {
      return num ? parseFloat(num).toFixed(2) : ''
    },
    // 时间
    getcurrntTime() {
      this.timer = setInterval(() => {
        this.cruuentTime = this.globalUtils.getDateTimeNowFormate()
      }, 1000);
    },
    // 选项卡
    checkTab(val) {
      // console.log(val)

      switch (val) {
        case this.revenueProfitList[0]:
          this.revenueProfit = 1
          break
        case this.revenueProfitList[1]:
          this.revenueProfit = 2
          break
      }

      this.getRevenueProfitList()
    },
    // 返回
    goBack() {
      // console.log('返回')

      // 主页面返回
      this.$refs.lgcnMainRef.goBack()

      // 执行表格方法
      this.$refs.industrialTableRef.removeTrClass()
    },
    // 浙商文化
    setZswhData(val) {
      // console.log(val)

      this.tableTab = val

      this.getPojDetailList('2')
    },
    // 初始化数据
    resetData() {
      /**
       * 页面数据
       */
      this.businessLeftData = {}
      this.businessCenterData = {}

      /**
       * 表格数据
       */
      // 产业发展
      this.industrialTableData1 = []
      this.industrialTableData2 = []
      // 服务区经营数据
      this.serviceAreaTableData = []
      // 公共服务数据
      this.publicServiceTableData = []

      /**
       * 图表数据
       */
      // 人才分布
      this.industrialTalentData1 = {
        legend: [],
        fieldData: [],
      }
      this.industrialTalentData2 = {
        legend: [],
        fieldData: [],
      }
      // 风险数据
      this.riskDataData = {
        fieldData: [],
        yData1: [],
        yData2: [],
        yData3: []
      }
      // 重置右边改变数据
      this.resetRightChangeData()
      // 公共服务数据
      this.publicServiceData = {
        fieldData: [],
        yData: [],
      }

      this.setLoading()  // 设置loading
    },
    // 重置右边改变数据
    resetRightChangeData() {
      // 流量数据
      this.flowDataData = {
        fieldData: [],
      }
      // 服务区经营数据
      this.serviceAreaData = {
        fieldData: [],
        yData1: [],
        yData2: [],
      }
      this.businessRightData = {}
    },
    // 重置图表（右边）
    resetRightChart() {
      this.$nextTick(() => {
        for (let i = 10; i <= 11; i++) {
          eval(`this.$refs.chart${i}Ref.resetChart()`)
        }
      })
    },
    // 设置loading
    setLoading() {
      this.industrialListLoading = true
      this.serviceAreaListLoading = true
      this.publicServiceListLoading = true
    },
    // 判断百分比
    checkPercent(numData) {
      if(numData < 0 || !numData) {
        return 0
      }
      if(numData > 100) {
        return 100
      }

      return numData
    },
    // 表格滚动
    tableScroll(tbodyDom) {
      if (tbodyDom.clientHeight >= tbodyDom.scrollHeight){
        return;
      }

      return setInterval(() => {
        // 元素自增距离顶部1像素
        tbodyDom.scrollTop += 36
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (tbodyDom.clientHeight + tbodyDom.scrollTop == tbodyDom.scrollHeight) {
          // 重置table距离顶部距离
          tbodyDom.scrollTop = 0
        }
      }, 1500)
    },

    /**
     * 业务
     */
    // 获取初始数据
    initData() {
      this.resetData()  // 初始化数据

      // 产业发展
      this.setCompanyTarget()

      // 页面图表数据
      this.setChartData()
    },
    // 设置右边数据 / 获取标注数据
    setRightPageData(itemRow) {
      console.log('设置右边数据 / 获取标注数据', itemRow, typeof itemRow)

      this.resetRightChangeData()  // 重置右边改变数据

      // isServer: '',  // 是否为服务区  1 是   2 不是
      // 点击地图标注  isServer === 1
      if (itemRow.isServer === '1') {
        // console.log("点击地图标注", itemRow)
        this.isServer = '1'
      }
      // 点击表格  isServer === 2
      if (itemRow.isServer === '2' || typeof itemRow === 'string') {
        // console.log("点击表格", itemRow)
        this.isServer = '2'
      }

      this.renderRightChangeData(itemRow)

      this.resetRightChart()  // 重置图表（右边）
    },
    // 获取产业发展
    async setCompanyTarget() {
      let companyTargetList = await lgTipApi.getCompanyTargetData()
      this.industrialListLoading = false

      // console.log(companyTargetList)
      if (companyTargetList) {
        companyTargetList.forEach((item, index) => {
          if (index < 5) {
            this.industrialTableData1.push(item)
          } else {
            this.industrialTableData2.push(item)
          }
        })
      }
    },
    // 获取公司信息
    getCompanyData(companyData) {
      // console.log(companyData)

      let wrap = document.querySelector('.lgstcnt_wrap')
      wrap.classList.remove('shouye_main_wrap')

      this.$refs.lgcnTopRef.getCompanyData(companyData)  // LargeScreenTop组件获取数据
      this.$refs.lgcnMainRef.getCompanyData(companyData)  // LargeScreenMain组件获取数据

      /**
       * 点击时调用接口
       */
      /**
      * 高速广告:1    高速石油:4
      * 高速商贸:10   高速能源:5
      * 浙商互联:11   中碳科技:6
      * 浙商文化:2    创胜至合:7
      * 盈通餐饮:3    浙江建融:8
      * 富春驿商: 9
      * 
      * 高速广告、浙商互联、浙商文化 为表格数据
      * 其他为地图数据
      */
      switch (companyData.company_id) {
        case '1':
        case '2':
        case '11':
          this.getPojDetailList(companyData.company_id)  // 获取项目情况 - 表格
          break;
        default:
          this.getBusinessList(companyData.company_id)  // 获取项目简介 - 地图
      }
    },
    // 获取项目情况 - 表格
    async getPojDetailList(companyId) {
      this.$refs.lgcnMainRef.startLoading()

      let params = {
        companyId,
        currentPage: this.tableTab === '' ? undefined : this.tableTab
      }
      let pojDetaiList = await lgTipApi.getPojDetailData(params)
      // console.log("表格数据", pojDetaiList)
      this.$refs.lgcnMainRef.endLoading()

      this.$refs.lgcnMainRef.getPojListData(pojDetaiList)  // LargeScreenMain组件获取数据
    },
    // 获取项目简介 - 地图
    async getBusinessList(companyId) {
      this.$refs.lgcnMainRef.startMapLoading()

      let params = {
        companyId
      }
      let businessList = await lgTipApi.getBusinessData(params)
      // console.log("地图数据", businessList)

      this.$refs.lgcnMainRef.endMapLoading()

      this.$refs.lgcnMainRef.getBusinessListData(businessList)  // LargeScreenMain组件获取数据
    },

    /**
     * 页面图表数据
     */
    // 获取数据
    async setChartData() {
      // 渲染左边部分
      this.renderLeft();

      // 渲染中间部分
      this.renderCenter();

      // 渲染右边部分
      this.renderRight();
    },
    // 渲染左边部分
    async renderLeft() {
      /**
       * 经营数据
       * ysSubTitle
       */
      let operateData = await lgTipApi.getOperateData()
      // console.log("经营数据", operateData[0])
      this.businessLeftData = Object.assign(this.businessLeftData, operateData[0])

      /**
       * 获取本年投资进度图表
       */
      let batteryProcessChart0Data = await lgTipApi.getBatteryProcessChart0()
      // console.log("获取本年投资进度图表", batteryProcessChart0Data)
      this.businessLeftData = Object.assign(this.businessLeftData, batteryProcessChart0Data[0])

      /**
       * 获取会员进度条图表
       */
      let batteryProcessChart1Data = await lgTipApi.getBatteryProcessChart1()
      // console.log("获取会员进度条图表", batteryProcessChart1Data)
      this.businessLeftData = Object.assign(this.businessLeftData, batteryProcessChart1Data[0])

      /**
       * 人才分布
       */
      let industrialTalentData = await lgTipApi.getIndustrialTalentData()
      // console.log("人才分布", industrialTalentData)

      this.industrialTalentData1 = {
        legend: ['本科', '大专', '高中及以下', '研究生', '中专'],
        fieldData: [
          [industrialTalentData[0].undergraduate_num],  // 本科
          [industrialTalentData[0].junior_num],  // 大专
          [industrialTalentData[0].high_school_num],  // 高中及以下
          [industrialTalentData[0].graduate_num],  // 研究生
          [industrialTalentData[0].polytechnic_num],  // 中专
        ],
      }
      this.industrialTalentData2 = {
        legend: ['无职称', '初级', '中级', '副高', '正高'],
        fieldData: [
          [industrialTalentData[0].no_title_professional],  // 无职称
          [industrialTalentData[0].primary_profession],  // 初级
          [industrialTalentData[0].intermediate_title],  // 中级
          [industrialTalentData[0].associate_professor],  // 副高
          [industrialTalentData[0].senior_professional],  // 正高
        ],
      }

      /**
       * 风险数据
       */
      // 获取风险数据图表
      let riskDataChartData = await lgTipApi.getRiskDataChartData()
      // console.log("获取风险数据图表", riskDataChartData)
      this.businessLeftData = Object.assign(this.businessLeftData, riskDataChartData[0])
      /* this.riskDataData = {
        fieldData: ['11商业集团母公司', '高速发展', '高速商贸', '高速石油', '中碳科技', '高速广告', '创盛至合', '盈通公司', '高速能源', '浙商文化', '浙商互联', '富春驿商'],
        yData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        yData2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        yData3: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      } */
      riskDataChartData.forEach(item => {
        this.riskDataData.fieldData.push(item.company_short_name)
        this.riskDataData.yData1.push(item.asset_liability_ratio)
        this.riskDataData.yData2.push(item.inventory_growth_rate)
        this.riskDataData.yData3.push(item.accounts_receivable_growth_rate)
      })
      // 获取风险数据
      let riskDataInfo = await lgTipApi.getRiskDataInfo()
      // console.log("获取风险数据", riskDataInfo)
      this.businessLeftData = Object.assign(this.businessLeftData, riskDataInfo[0])

      /**
       * 营收与利润
       */
      this.getRevenueProfitList()
    },
    // 营收与利润
    async getRevenueProfitList() {
      // 营收与利润结构 - 左
      this.revenueProfitData1.fieldData = []
      // 营收与利润结构 - 右
      this.revenueProfitData2.yData1 = []
      this.revenueProfitData2.yData2 = []
      this.revenueProfitData2.yData3 = []

      if (this.revenueProfit === 1) {
        // console.log('营收接口')  ysSubTitle

        // 营收饼图
        let yingShouChart1 = await lgTipApi.getYingShouChart1()
        // console.log("营收饼图", yingShouChart1)
        yingShouChart1.forEach(item => {
          this.revenueProfitData1.fieldData.push({ value: item.revenueYear.toFixed(2), name: item.business_type, percentage: item.Result.toFixed(2), business_id: item.business_id })
        })

        this.getRevenueLineData()  // 营收折线
      } else {
        // console.log('利润接口')

        // 利润饼图
        let liRunChart1 = await lgTipApi.getLiRunChart1()
        // console.log("利润饼图", liRunChart1)
        liRunChart1.forEach(item => {
          this.revenueProfitData1.fieldData.push({ value: item.month_profitsYear.toFixed(2), name: item.business_type, percentage: item.Result.toFixed(2), business_id: item.business_id })
        })

        this.getProfitLineData()  // 利润折线
      }
    },
    // 重置营收与利润图表
    resetRevenueProfitChart(flag) {
      if(!flag) {
        if (this.$refs.chart3Ref && this.$refs.chart4Ref) {
          this.$refs.chart3Ref.resetChart()
          this.$refs.chart4Ref.resetChart()
        }
      } else {
        if (this.$refs.chart4Ref) {
          this.$refs.chart4Ref.resetChart()
        }
      }
    },
    // 处理营收与利润折线图数据
    resolveRevenueProfitChart2(yinshouChar2Data) {
      let date = new Date
      let jinnian = date.getFullYear()
      let qunian = jinnian - 1
      let qiannian = jinnian - 2
      // console.log(jinnian, qunian, qiannian)
      let jinnianArr = [], qunianArr = [], qiannianArr = []

      yinshouChar2Data.forEach(item => {
        // 今年
        if (item.year === jinnian.toString()) {
          jinnianArr.push(item)
        }
        // 去年
        if (item.year === qunian.toString()) {
          qunianArr.push(item)
        }
        // 前年
        if (item.year === qiannian.toString()) {
          qiannianArr.push(item)
        }
      })

      return {
        'jinnian': jinnianArr,
        'qunian': qunianArr,
        'qiannian': qiannianArr,
      }
    },
    // 营收折线
    async getRevenueLineData(business_id) {
      // 营收折线
      let yingShouChart2 = await lgTipApi.getYingShouChart2(business_id)
      // console.log("营收折线", yingShouChart2)
      let yingShouChart2After = this.resolveRevenueProfitChart2(yingShouChart2)  // 处理数据
      // console.log('营收折线处理后数据', yingShouChart2After)
      // 营收与利润结构 - 右
      yingShouChart2After.jinnian.forEach((item, index) => {
        if(index < 12) {
          // console.log(item.operating_income_month)
          this.revenueProfitData2.yData1.push(parseFloat(item.operating_income_month))
        }
      })
      yingShouChart2After.qunian.forEach((item, index) => {
        if(index < 12) {
          // console.log(item.operating_income_month)
          this.revenueProfitData2.yData2.push(parseFloat(item.operating_income_month))
        }
      })
      yingShouChart2After.qiannian.forEach((item, index) => {
        if(index < 12) {
          // console.log(item.operating_income_month)
          this.revenueProfitData2.yData3.push(parseFloat(item.operating_income_month))
        }
      })
    },
    // 利润折线
    async getProfitLineData(business_id) {
      // 利润折线
      let liRunChart2 = await lgTipApi.getLiRunChart2(business_id)
      // console.log("利润折线", liRunChart2)
      let liRunChart22After = this.resolveRevenueProfitChart2(liRunChart2)  // 处理数据
      // console.log('利润折线处理后数据', liRunChart22After)
      liRunChart22After.jinnian.forEach((item, index) => {
        if(index < 12) {
          this.revenueProfitData2.yData1.push(parseFloat(item.month_profits))
        }
      })
      liRunChart22After.qunian.forEach((item, index) => {
        if(index < 12) {
          this.revenueProfitData2.yData2.push(parseFloat(item.month_profits))
        }
      })
      liRunChart22After.qiannian.forEach((item, index) => {
        if(index < 12) {
          this.revenueProfitData2.yData3.push(parseFloat(item.month_profits))
        }
      })
    },
    // 获取折线图数据
    setRevenueProfitChart2Data(business_id) {
      // console.log('获取折线图数据', business_id, this.revenueProfit)

      if (this.revenueProfit === 1) {
        // 营收
        this.getRevenueLineData(business_id)
      } else {
        // 利润
        this.getProfitLineData(business_id)
      }

      this.resetRevenueProfitChart(true)
    },
    // 渲染中间部分
    async renderCenter() {
      // 首页地图上方数据展示
      let indexMapTopData = await lgTipApi.getIndexMapTopData()
      // console.log("首页地图上方数据展示", indexMapTopData)
      this.businessCenterData = Object.assign(this.businessCenterData, indexMapTopData[0])
      this.$refs.lgcnTopRef.getIndexMapTopData(this.businessCenterData)  // LargeScreenTop组件获取数据

      // 首页地图下方数据展示
      let indexMapBelowData = await lgTipApi.getIndexMapBelowData()
      // console.log("首页地图下方数据展示", indexMapBelowData)
      this.businessCenterData = Object.assign(this.businessCenterData, indexMapBelowData[0])
      this.$refs.lgcnMainRef.getIndexMapBelowData(this.businessCenterData)  // LargeScreenMain组件获取数据
    },
    // 投诉内容滚动
    complaintTbScroll() {
      // console.log('投诉内容滚动')

      this.$nextTick(()=> {
        let intervalTimer = null  // 定时器
        let tableDom = this.$refs.publicServiceTableRef.$el  // 表格dom
        let tbodyDom = tableDom.querySelector('.el-table__body-wrapper')

        // 设置滚动
        intervalTimer = this.tableScroll(tbodyDom)

        // 鼠标移入，停止滚动
        tbodyDom.onmouseover = ()=> {
          clearInterval(intervalTimer);
        }; 
        // 鼠标移出，继续滚动
        tbodyDom.onmouseout = ()=> {
          intervalTimer = this.tableScroll(tbodyDom)
        }; 
      })
    },
    // 渲染右边部分
    async renderRight() {
      /*********************
       * 渲染右边不变部分数据
       * /*******************
       */
      /**
       * 获取服务门店在营数据(表格)
       */
      let serviceAreaTableData = await lgTipApi.getServiceAreaTableData()
      // console.log("获取服务门店在营数据(表格)", serviceAreaTableData)
      this.serviceAreaTableData = serviceAreaTableData
      this.serviceAreaListLoading = false

      /**
       * 公共服务支出变动率
       */
      let publicServiceData1 = await lgTipApi.getPublicServiceData1()
      // console.log("公共服务支出变动率", publicServiceData1)
      this.businessRightFixData = Object.assign(this.businessRightFixData, publicServiceData1[0])

      /**
       * 渲染服务区投诉排行表格以及投诉数据
       */
      let publicServiceTable = await lgTipApi.getPublicServiceTable()
      // console.log("渲染服务区投诉排行表格以及投诉数据", publicServiceTable)
      this.businessRightFixData = Object.assign(this.businessRightFixData, publicServiceTable[0])
      publicServiceTable.forEach(item => {
        item.servicepart_name = item.servicepart_name.substring(0, 2)
      })
      this.publicServiceTableData = publicServiceTable
      this.publicServiceListLoading = false

      // 投诉内容滚动
      this.complaintTbScroll()

      /**
       * 渲染服务区吸引力图表
       */
      let publicServiceChartData = await lgTipApi.getPublicServiceChart()
      // console.log("渲染服务区吸引力图表", publicServiceChartData)
      publicServiceChartData.forEach(item => {
        this.publicServiceData.fieldData.push(item.serverpart_name.substring(0, 2))
        this.publicServiceData.yData.push(item.serverpart_attraction_index)
      })

      /*********************
       * 渲染右边变化部分数据
       * /*******************
       */
      this.renderRightChangeData()
    },
    // 渲染右边变化部分数据
    renderRightChangeData(itemRow) {
      // console.log("渲染右边变化部分数据", itemRow, this.isServer)

      // 默认数据
      if (!itemRow) {
        // console.log("渲染右边变化部分数据 - 默认")

        this.renderRightServerData()  // 不传表示全部
      }

      switch (this.isServer) {
        case '1':
          // console.log("点击服务区")
          this.renderRightServerData(itemRow.serverpart_name)
          break
        case '2':
          // console.log("点击区域")
          if(typeof itemRow !== 'string') {
            // console.log(itemRow)
            this.renderRightRegionData(itemRow.area_anme)
          } else {
            this.renderRightRegionData(itemRow)
          }
          
          break
      }
    },
    // 右边变化部分服务区数据
    async renderRightServerData(label) {
      if (label) {
        // 默认数据是服务区数据
        // console.log("右边服务区数据", label)
      }

      /**
       * 流量数据相关
       */
      // 点服务区渲染流量数据图表
      let flowChartByServiceData = await lgTipApi.getFlowChartByService(label)
      // console.log("点服务区渲染流量数据图表", flowChartByServiceData)
      this.renderFlowChart(flowChartByServiceData)  // 渲染流量数据图表

      // 点服务区显示今日入区车辆
      let flowData1ByServiceData = await lgTipApi.getFlowData1ByService(label)
      // console.log("点服务区显示今日入区车辆", flowData1ByServiceData)
      this.renderFlowData1(flowData1ByServiceData)  // 今日入区车辆

      // 点服务区显示本年累计入区车辆数
      let flowData2ByServiceData = await lgTipApi.getFlowData2ByService(label)
      // console.log("点服务区显示本年累计入区车辆数", flowData2ByServiceData)
      this.renderFlowData2(flowData2ByServiceData)  // 本年累计入区车辆数

      // 点服务区显示今日入区率
      let flowData3ByServiceData = await lgTipApi.getFlowData3ByService(label)
      // console.log("点服务区显示今日入区率", flowData3ByServiceData)
      this.renderFlowData3(flowData3ByServiceData)  // 今日入区率

      // 点服务区显示今日入区消费转化率
      let flowData4ByServiceData = await lgTipApi.getFlowData4ByService(label)
      // console.log("点服务区显示今日入区消费转化率", flowData4ByServiceData)
      this.renderFlowData4(flowData4ByServiceData)  // 今日入区消费转化率

      // 点服务区显示累计入区消费转化率
      let flowData5ByServiceData = await lgTipApi.getFlowData5ByService(label)
      // console.log("点服务区显示累计入区消费转化率", flowData5ByServiceData)
      this.renderFlowData5(flowData5ByServiceData)  // 累计入区消费转化率

      /**
       * 服务区经营数据
       */
      // 点服务区显示渲染累计对客营收柱状图
      let serviceAreaChartByServiceData = await lgTipApi.getServiceAreaChartByService(label)
      // console.log("点服务区显示渲染累计对客营收柱状图", serviceAreaChartByServiceData)
      this.renderServiceAreaChart(serviceAreaChartByServiceData)  // 累计对客营收柱状图

      // 点服务区显示今日单笔消费金额
      let serviceAreaData1ByServiceData = await lgTipApi.getServiceAreaData1ByService(label)
      // console.log("点服务区显示今日单笔消费金额", serviceAreaData1ByServiceData)
      this.renderServiceAreaData1(serviceAreaData1ByServiceData)  // 今日单笔消费金额

      // 点服务区显示管理人员
      let serviceAreaData2ByService = await lgTipApi.getServiceAreaData2ByService(label)
      // console.log("点服务区显示管理人员", serviceAreaData2ByService)
      this.renderServiceAreaData2(serviceAreaData2ByService)  // 管理人员

      /**
       * 公共服务数据
       */
      // 点服务区显示公共服务数据车位数量
      let publicServiceData1ByServiceData = await lgTipApi.getPublicServiceData1ByService(label)
      // console.log("点服务区显示公共服务数据车位数量", publicServiceData1ByServiceData)
      this.renderPublicServiceData1(publicServiceData1ByServiceData)  // 公共服务数据车位数量

      /**
       * 服务区经营数据和公共服务数据重合
       */
      // 点服务区显示服务区门店在营率和公共服务数据门店数量
      let servicePublicData1ByServiceData = await lgTipApi.getServicePublicData1ByService(label)
      // console.log("点服务区显示服务区门店在营率和公共服务数据门店数量", servicePublicData1ByServiceData)
      this.renderServicePublicData1(servicePublicData1ByServiceData)  // 服务区门店在营率和公共服务数据门店数量

      // 点服务区显示服务区数据和公共数据
      let servicePublicData2ByServiceData = await lgTipApi.getServicePublicData2ByService(label)
      // console.log("点服务区显示服务区数据和公共数据", label, servicePublicData2ByServiceData)
      this.renderServicePublicData2(servicePublicData2ByServiceData)  // 服务区数据和公共数据
    },
    // 右边变化部分区域数据
    async renderRightRegionData(label) {
      // console.log("右边区域数据", label)

      /**
       * 流量数据相关
       */
      // 点区域渲染流量数据图表
      let flowChartByRegionData = await lgTipApi.getFlowChartByRegion(label)
      // console.log("点区域渲染流量数据图表", flowChartByRegionData)
      this.renderFlowChart(flowChartByRegionData)  // 渲染流量数据图表

      // 点区域显示今日入区车辆
      let flowData1ByRegionData = await lgTipApi.getFlowData1ByRegion(label)
      // console.log("点区域显示今日入区车辆", flowData1ByRegionData)
      this.renderFlowData1(flowData1ByRegionData)  // 今日入区车辆

      // 点区域显示本年累计入区车辆数
      let flowData2ByRegionData = await lgTipApi.getFlowData2ByRegion(label)
      // console.log("点区域显示本年累计入区车辆数", flowData2ByRegionData)
      this.renderFlowData2(flowData2ByRegionData)  // 本年累计入区车辆数

      // 点区域显示今日入区率
      let flowData3ByRegionData = await lgTipApi.getFlowData3ByRegion(label)
      // console.log("点区域显示今日入区率", flowData3ByRegionData)
      this.renderFlowData3(flowData3ByRegionData)  // 今日入区率

      // 点区域显示今日入区消费转化率
      let flowData4ByRegionData = await lgTipApi.getFlowData4ByRegion(label)
      // console.log("点区域显示今日入区消费转化率", flowData4ByRegionData)
      this.renderFlowData4(flowData4ByRegionData)  // 今日入区消费转化率

      // 点区域显示累计入区消费转化率
      let flowData5ByRegionData = await lgTipApi.getFlowData5ByRegion(label)
      // console.log("点区域显示累计入区消费转化率", flowData5ByRegionData)
      this.renderFlowData5(flowData5ByRegionData)  // 累计入区消费转化率

      /**
       * 服务区经营数据
       */
      // 点区域显示渲染累计对客营收柱状图
      let serviceAreaChartByRegionData = await lgTipApi.getServiceAreaChartByRegion(label)
      // console.log("点区域显示渲染累计对客营收柱状图", serviceAreaChartByRegionData)
      this.renderServiceAreaChart(serviceAreaChartByRegionData)  // 累计对客营收柱状图

      // 点区域显示今日单笔消费金额
      let serviceAreaData1ByRegionData = await lgTipApi.getServiceAreaData1ByRegion(label)
      // console.log("点区域显示今日单笔消费金额", serviceAreaData1ByRegionData)
      this.renderServiceAreaData1(serviceAreaData1ByRegionData)  // 今日单笔消费金额

      // 点区域显示管理人员
      let serviceAreaData2ByRegionData = await lgTipApi.getServiceAreaData2ByRegion(label)
      // console.log("点服务区显示管理人员", serviceAreaData2ByService)
      this.renderServiceAreaData2(serviceAreaData2ByRegionData)  // 管理人员

      /**
       * 公共服务数据
       */
      // 点区域显示公共服务数据车位数量
      let publicServiceData1ByRegionData = await lgTipApi.getPublicServiceData1ByRegion(label)
      // console.log("点区域显示公共服务数据车位数量", publicServiceData1ByRegionData)
      this.renderPublicServiceData1(publicServiceData1ByRegionData)  // 公共服务数据车位数量

      /**
       * 服务区经营数据和公共服务数据重合
       */
      // 点区域显示服务区门店在营率和公共服务数据门店数量
      let servicePublicData1ByRegionData = await lgTipApi.getServicePublicData1ByRegion(label)
      // console.log("点区域显示服务区门店在营率和公共服务数据门店数量", servicePublicData1ByRegionData)
      this.renderServicePublicData1(servicePublicData1ByRegionData)  // 服务区门店在营率和公共服务数据门店数量

      // 点区域显示服务区数据和公共数据
      let servicePublicData2ByRegionData = await lgTipApi.getServicePublicData2ByRegion(label)
      // console.log("点区域显示服务区数据和公共数据", servicePublicData2ByRegionData)
      this.renderServicePublicData2(servicePublicData2ByRegionData)  // 服务区数据和公共数据       
    },
    /***********************
     * 设置右边部分数据
     * *********************
     */
    /**
     * 流量数据相关
     */
    // 渲染流量数据图表
    renderFlowChart(flowChartData) {
      flowChartData.forEach(item => {
        this.flowDataData.fieldData.push({ value: item.car_num, name: item.vehicle_type })
      })
    },
    // 今日入区车辆
    renderFlowData1(flowData) {
      // console.log("今日入区车辆", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
    // 本年累计入区车辆数 ---
    renderFlowData2(flowData) {
      // console.log("本年累计入区车辆数", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
    // 今日入区率
    renderFlowData3(flowData) {
      // console.log("今日入区率", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
    // 今日入区消费转化率
    renderFlowData4(flowData) {
      // console.log("今日入区消费转化率", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
    // 累计入区消费转化率
    renderFlowData5(flowData) {
      // console.log("累计入区消费转化率", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },

    /**
     * 服务区经营数据
     */
    // 累计对客营收柱状图
    renderServiceAreaChart(flowData) {
      this.serviceAreaData.fieldData = ['正餐营收', '司乘服务营收', '闲餐饮营收', '汽车服务营收', '零售营收', '其他营收']
      
      flowData.forEach(item=> {
        let barData = [
          item.dinner_amount, 
          item.driver_service_amount, 
          item.casual_amount, 
          item.car_service_amount, 
          item.retail_amount, 
          item.other_amount
        ]
        
        if(item.now === '今年') {
          this.serviceAreaData.yData1 = barData
        } else {
          this.serviceAreaData.yData2 = barData
        }

        // console.log("今年", this.serviceAreaData.yData1)
        // console.log("去年", this.serviceAreaData.yData2)
      })
    },
    // 今日单笔消费金额
    renderServiceAreaData1(flowData) {
      // console.log("今日单笔消费金额", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
    // 管理人员
    renderServiceAreaData2(flowData) {
      // console.log("管理人员", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },

    /**
     * 公共服务数据
     */
    // 公共服务数据车位数量
    renderPublicServiceData1(flowData) {
      // console.log("公共服务数据车位数量", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
      // 判断百分比
      this.businessRightData.resultpark_vehicle = this.checkPercent(this.businessRightData.resultpark_vehicle)
    },

    /**
     * 服务区经营数据和公共服务数据重合
     */
    // 服务区门店在营率和公共服务数据门店数量
    renderServicePublicData1(flowData) {
      // console.log("服务区门店在营率和公共服务数据门店数量", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
      // 判断百分比
      this.businessRightData.resultshopsNumnow = this.checkPercent(this.businessRightData.resultshopsNumnow)
    },
    // 服务区数据和公共数据
    renderServicePublicData2(flowData) {
      // console.log("服务区数据和公共数据", flowData)
      this.businessRightData = Object.assign(this.businessRightData, flowData[0])
    },
  },

  created() {
    this.initPage()
  },

  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="less" scoped>
@navHeight: 105px;
@caontentMargin: 40px;
@asideWidth: 30.5%;
@titleHeight: 38px;
@titleMargin: 14px;
@tabRadius: 5px;
@numFontSize: 20px;
@fontBetween: 5px;
@dotMargin: 13px;
@fontBlueColor1: #4abefe;
@fontBlueColor2: #58b2ff;
@fontBlueColor3: #00c0ff;
@fontRedColor1: #e54246;
@progressColor: linear-gradient(270deg, #1aaf87 0%, rgba(26, 175, 135, 0) 100%);

.large_screen_wrap {
  width: 100%;
  height: 100%;
  background: #091f3f;
  color: #fff;
  padding-bottom: 1px;

  .lagscn_top,
  .lagscn_content {
    margin: 0 auto;
    overflow: hidden;
  }

  .lagscn_top {
    position: relative;
    height: @navHeight;

    img {
      width: 100%;
    }

    .lgsntp_time {
      position: absolute;
      top: 23%;
      right: 16%;
      font-size: 14px;
    }
  }

  .lagscn_content {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 98.5%;
    margin-top: -@caontentMargin;
    min-height: calc(100vh - @navHeight + @caontentMargin);
    margin-bottom: 10px;

    /** tools */
    .justify_cot {
      display: flex;
      justify-content: space-between;
    }

    .dot_txt {
      li,
      dt {
        position: relative;

        &.not_dot {
          &::before {
            display: none;
          }
        }

        &:first-child {
          left: @dotMargin;
        }

        span {
          margin-left: @fontBetween;
        }

        &::before {
          content: "";
          position: absolute;
          top: 58%;
          transform: translateY(-50%);
          left: -@dotMargin;
          width: 6px;
          height: 6px;
          background-image: linear-gradient(60deg, #0096ec, #1ad3fc);
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }

    .num_txt_wrap {
      span {
        font-size: @numFontSize;
        color: @fontBlueColor1;
        font-family: @numFontFamily;
      }
    }

    .compare {
      b {
        position: relative;
        margin-left: 18px;
        font-family: @pingFontFamily;

        &::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 3px;
          width: 0px; /*设置宽高为0，所以div的内容为空，从才能形成三角形尖角*/
          height: 0px;
          border-left: 5px solid transparent; /*transparent 表示透明*/
          border-right: 5px solid transparent;
          overflow: hidden;
        }

        &.up {
          color: #e54246;
        }

        &.down {
          color: #22d9db;
        }

        &.up::before {
          border-bottom: 10px solid #e54246;
        }

        &.down::before {
          border-top: 10px solid #22d9db;
        }
      }
    }

    .tip_title {
      h3 {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }

    .division_bar {
      width: 100%;
      height: 1px;
      background-image: linear-gradient(to right, #38a4f9, #13326c);
      margin-bottom: 10px;
    }

    /** page */
    .lagscncot_left,
    .lagscncot_center,
    .lagscncot_right {
      .lgcp_wrap {
        .lgcp_title {
          width: 100%;
          height: @titleHeight;
          line-height: @titleHeight;
          margin-bottom: 10px;
          background: linear-gradient(
            90deg,
            rgba(40, 90, 144, 0.76) 0%,
            rgba(66, 109, 165, 0) 100%
          );
          overflow: hidden;

          span {
            display: block;
            margin-left: @titleMargin;
            font-size: 18px;
            font-weight: bold;
          }

          /* .lgcp_title_right {
            ul {
              margin-right: @titleMargin;
              background: #305392;
              border-radius: @tabRadius;

              li {
                display: inline-block;
                padding: 0 15px;
                font-size: 16px;
                border-radius: @tabRadius;
                cursor: pointer;

                &.selected {
                  font-weight: bold;
                  background: #447acd;
                }
              }
            }
          } */
        }

        .lgcp_cont {
          width: 100%;
          min-height: 10px;

          .lgcpcot_wrap {
            width: 96%;
            margin: 0 auto 10px;

            .lgcpcot_l,
            .lgcpcot_r {
              width: 48.8%;
              min-height: 48px;
            }

            .lgcpcot_l {
            }

            .lgcpcot_r {
            }
          }
        }
      }
    }

    .lagscncot_left,
    .lagscncot_right {
      width: @asideWidth;
      height: 100%;
      background: url("../../../assets/images/largescreen/side_bg.png") top
        no-repeat;
      background-position-y: -12px;
      padding-bottom: 8px;
      overflow: hidden;
    }

    .lagscncot_left {
      // 经营数据
      .operate_data {
        .lgcpcot_line {
          width: 96%;
          margin: 0 auto 10px;

          span {
            margin: 0 3px 0 8px;
          }
        }

        .lgcpcot_wrap {
          .operadate_item {
            width: 100%;

            &:not(:last-child) {
              margin-bottom: 8px;
            }

            &:nth-child(2) {
              margin-bottom: 0;
            }

            ul {
              display: flex;
              justify-content: space-between;

              li {
                &:last-child {
                  margin-top: 6px;
                }

                span {
                  margin: 0 3px 0 8px;
                }
              }

              &.only {
                li {
                  &:first-child {
                    left: 15px;
                  }
                  &:last-child {
                    &::before {
                      top: 11%;
                      transform: initial;
                    }
                  }
                }
              }

              &.chart_wrap {
                height: 23px;

                li:last-child {
                  span {
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }

      // 营收与利润
      .revenue_profit {
        span {
          line-height: @titleHeight;
        }

        .lgcp_title {
          line-height: initial;

          .lgcp_title_right {
            .chart_lend {}
          }
        }
      }

      // 产业发展
      .industrial {
        .lgcpcot_wrap {
          margin-bottom: 0 !important;

          .industrial_table {
            // background: #F00;

            ::v-deep .industrial_table_wrap {
              //  background: #F00;

              .el-table__body-wrapper {
                table {
                  tbody {
                    tr {
                      &:hover {
                        // border: solid 1px #f00
                      }
                    }
                  }
                }
              }
            }
          }

          .industrial_row {
            width: 100%;
            margin: 12px 0 10px;

            .indrilow_item {
              &:not(:last-child) {
                margin-bottom: 10px;
              }

              .idrwitm_l {
                width: 73%;

                dl,
                dt,
                dd,
                ul,
                li {
                  font-family: @pingFontFamily;
                }

                dl {
                  dt {
                    ul.num_txt_wrap {
                      li {
                        height: 20px;
                        line-height: 20px;

                        &:first-child {
                          span {
                            font-size: 18px;
                            margin-left: @fontBetween;
                          }
                        }
                      }

                      li:last-child {
                        span {
                          font-size: 12px;
                        }
                      }
                    }
                  }

                  dd.tip {
                    font-size: 12px;
                  }
                }
              }
              .idrwitm_r {
                margin: 25px 0 0 18px;

                h4,
                span {
                  font-size: 12px;
                  font-family: @pingFontFamily;
                  font-weight: 400;
                }

                span {
                  margin-right: 3px;

                  &.line_mid {
                    margin-left: 5px;
                  }
                }
              }
            }
          }

          .industrial_talent {
            .idutrltat_wrap {
              dl {
                width: 100%;

                dd {
                  ul {
                    display: flex;
                    li {
                      font-family: @pingFontFamily;

                      &:first-child {
                        position: relative;
                        width: 53px;
                        margin-right: 10px;

                        span {
                          position: absolute;
                          top: 3px;
                          display: block;
                          width: 48px;
                          height: 26px;
                          line-height: 26px;
                          border-left: solid 2px #3f95cf;
                          padding-left: 7px;
                          font-family: @pingFontFamily;
                          font-size: 14px;
                          font-weight: bold;
                          background: linear-gradient(
                            90deg,
                            rgba(29, 111, 212, 0.65) 0%,
                            rgba(20, 66, 140, 0) 100%
                          );
                        }
                      }
                      &:last-child {
                        flex: 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 风险数据
      .risk_data {
        .lgcpcot_wrap {
          margin-bottom: 9px !important;
        }
        .riskdt_txt {
          ul {
            &.riskdt_total {
              li {
                display: inline-block;

                &:not(:last-child) {
                  margin-right: 50px;
                }

                span {
                  margin: 0 8px 0 12px;
                }
              }
            }
          }
        }

        .riskdt_chart {
          margin: 16px 0 9px 0;
        }
      }
    }

    .lagscncot_center {
      height: 100%;
      width: calc(100% - @asideWidth * 2 - 30px);

      .lgstcnt_wrap {
        width: 100%;
        margin-top: calc(@caontentMargin + 15px);
        background: linear-gradient(
          360deg,
          rgba(22, 62, 112, 0.3) 0%,
          #18386c 100%
        );

        &.fcys_main_wrap,
        &.shouye_main_wrap {
          background: none;

          .lgstcnt_top_wrap {
            background: url("../../../assets/images/largescreen/side_bg.png")
              top no-repeat;
            background-position-y: -12px;
          }
        }

        .lgstcnt_top_wrap {
          width: 100%;
          min-height: 50px;
          // height: 295px;
          // background: url("../../../assets/images/largescreen/side_bg.png") top no-repeat;
          // background-position-y: -12px;
        }

        .lgstcnt_bot_wrap {
          width: 100%;
          min-height: 295px;
          margin-top: 10px;
          // background: #f00;
        }
      }
    }

    .lagscncot_right {
      // 流量数据
      .flow_data {
        .fowdata_top {
          margin-bottom: 13px;

          .lgcpcot_l {
            .fwdtp_item {
              width: 100%;
              height: 80px;
              background-image: linear-gradient(
                270deg,
                rgba(76, 159, 240, 0.59) 0%,
                #163668 100%
              );
              overflow: hidden;

              &:not(:last-child) {
                margin-bottom: 10px;
              }

              dl {
                width: 86%;
                margin: 21px auto 0;

                dt {
                  width: 42px;
                  height: 42px;
                  overflow: hidden;
                  margin: 2px 15px 0 0;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                dd {
                  ul {
                    li {
                      &:not(:last-child) {
                        margin-bottom: 10px;
                      }

                      span {
                        margin-right: @fontBetween;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .fowdata_bot {
        }
      }

      // 服务区经营数据, 公共服务数据
      .service_area_data,
      .public_service_data {
        .lgcprit_item {
          &:not(:last-child) {
            margin-bottom: 14px;
          }

          &.lgcprit_total {
            .lgcpcot_l,
            .lgcpcot_r {
              width: 48%;
              height: 48px;
              border-left: solid 2px #1f9bff;
              background: linear-gradient(
                90deg,
                rgba(29, 111, 212, 0.35) 0%,
                rgba(20, 66, 140, 0) 100%
              );

              ul {
                li {
                  line-height: 45px;
                  font-family: PingFangSC-Regular, PingFang SC;

                  &:first-child {
                    &::before {
                      top: 50%;
                      left: -17px;
                      background: #fff;
                    }
                  }

                  span {
                    margin-right: @fontBetween;
                  }

                  b {
                    font-size: 20px;
                    font-family: @numFontFamily;

                    &::before {
                      left: -15px;
                      top: 8px;
                    }
                  }
                }
              }
            }

            .lgcpcot_l {
            }

            .lgcpcot_r {
            }
          }

          &.lgcprit_res {
          }
        }
      }

      // 服务区经营数据
      .service_area_data {
        .lgcprit_item {
          &.srveara_row {
            ul {
              li {
                min-width: 74px;

                dl {
                  dt {
                    margin-bottom: 10px;
                  }
                  dd {
                    margin-left: @dotMargin;

                    span {
                      margin-right: @fontBetween;
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 公共服务数据
      .public_service_data {
        .lgcpcot_wrap {
          margin-bottom: 3px !important;

          .lgcprit_item {
            &.srvedat_row {
              .srvdtrw_item {
                dl {
                  span {
                    margin-right: @fontBetween;
                    font-size: 18px;
                  }

                  dd {
                    li {
                      font-family: @pingFontFamily;
                    }

                    ul {
                      & > li {
                        margin-top: 6px;

                        &:first-child {
                          margin: 10px 10px 0 0;
                        }

                        &:last-child {
                          ol {
                            min-width: 80px;
                            margin-left: 6px;

                            li {
                              &:not(:last-child) {
                                margin-bottom: 6px;
                              }

                              /deep/ .el-progress {
                                .el-progress-bar {
                                  .el-progress-bar__outer {
                                    .el-progress-bar__inner {
                                      background: @progressColor;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }

                    &.num_txt_wrap {
                      margin-top: 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>