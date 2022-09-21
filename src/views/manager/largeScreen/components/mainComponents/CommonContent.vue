<!-- 公共主体中间内容 -->
<template>
  <section class="lgcn_maincont_wrap">
    <div class="map_cont" :class="{'map_item_cont' : JSON.stringify(companyData) !== '{}'}">
    <!-- <div :class="JSON.stringify(companyData) !== '{}' ? 'map_item_cont' : 'map_cont'"> -->
      <map-main ref="mapMainRef" :tabListData="tabListData" @getMarkerData="getMarkerData" @getMapAreaData="getMapAreaData" @getAll="getAll" />
    </div>
    <div class="txt_cont" v-if="JSON.stringify(companyData) === '{}'">
      <div class="lgnmct_item">
        <div class="lgtim_bar"></div>
        <div class="lgtim_cot">
          <ul>
            <li><b>本年总</b>用电量</li>
            <!-- <li><span>3945800</span>kw·h</li> -->
            <li><span>{{ businessCenterData.electricityConsumptionSum }}</span>kw·h</li>
          </ul>
        </div>
        <div class="lgtim_bar"></div>
      </div>
      <div class="lgnmct_item">
        <div class="lgtim_bar"></div>
        <div class="lgtim_cot">
          <ul>
            <li><b>本年总</b>用水量</li>
            <!-- <li><span>394567</span>m³</li> -->
            <li><span>{{ businessCenterData.waterConsumptionSum }}</span>m³</li>
          </ul>
        </div>
        <div class="lgtim_bar"></div>
      </div>
      <div class="lgnmct_item">
        <div class="lgtim_bar"></div>
        <div class="lgtim_cot">
          <ul>
            <li><b>本年光伏</b>发电量</li>
            <!-- <li><span>577088</span>kw·h</li> -->
            <li><span>{{ businessCenterData.annual_pvenergy_output }}</span>kw·h</li>
          </ul>
        </div>
        <div class="lgtim_bar"></div>
      </div>
      <div class="lgnmct_item">
        <div class="lgtim_bar"></div>
        <div class="lgtim_cot">
          <ul>
            <li><b>本年</b>储能</li>
            <!-- <li><span>394567</span>kw·h</li> -->
            <li><span>{{ businessCenterData.annual_stored_energy }}</span>kw·h</li>
          </ul>
        </div>
        <div class="lgtim_bar"></div>
      </div>
    </div>
  </section>
</template>

<script>
import MapMain from '../mapComponents/MapMain'

export default {
  components: {
    MapMain
  },

  data() {
    return {
      tabListData: [],
      companyData: {},
      businessCenterData: {}
    }
  },

  methods: {
    /**
     * tools
     */
    // 返回
    goBack() {
      // console.log('返回')

      // this.tabListData = ['浙江', '22上海', '江苏']
      this.tabListData = []
      this.companyData = {}

      this.$refs.mapMainRef.goBack()
    },
    // 设置选项卡
    setTab(companyId) {
      switch(companyId) {
        // 中碳科技
        case '6': 
          this.tabListData = ['浙江', '上海', '江苏']
          break
        // 创胜至合
        case '7': 
          this.tabListData = ['浙江', '四川', '广西']
          break
        // 高速商贸
        case '10': 
          this.tabListData = ['浙江', '江苏', '新疆']
          break
        // 盈通餐饮
        case '3': 
          this.tabListData = ['浙江', '广西']
          break
        default:
          this.tabListData = []
      }
    },
    // 开始maploading
    startMapLoading() {
      // console.log("开始loading")

      this.$refs.mapMainRef.startMapLoading()  // CommonContent组件获取数据
    },
    // 结束maploading
    endMapLoading() {
      // console.log("结束loading")

      this.$refs.mapMainRef.endMapLoading()  // CommonContent组件获取数据
    },
    // 获取所有数据
    getAll() {
      this.$emit('getAll')
    },

    /**
     * 业务
     */
    // 获取公司信息
    getCompanyData(companyData) {
      // console.log(companyData)

      this.setTab(companyData.company_id)  // 设置选项卡

      this.companyData = companyData
      this.$refs.mapMainRef.getCompanyData(companyData)  // MapMain组件获取数据
    },
    // 获取地图数据
    getMapData(mapData) {
      // console.log(mapData)

      this.$refs.mapMainRef.getMapData(mapData)  // MapMain组件获取数据
    },
    // 获取标注数据
    getMarkerData(markerData) {
      // console.log("获取标注数据", markerData)

      this.$emit('getMarkerData', markerData)
    },
    // 获取城市标注数据
    getMapAreaData(mapAreaData) {
      // console.log("获取城市标注数据", mapAreaData)

      this.$emit('getMapAreaData', mapAreaData)
    },

    // 获取首页地图下方数据
    getIndexMapBelowData(businessCenterData) {
      // console.log("获取首页地图下方数据", businessCenterData);
      this.businessCenterData = businessCenterData
    }
  }
}
</script>

<style lang="less" scoped>
.lgcn_maincont_wrap {
  // margin-top: 35px;

  .map_cont {
    width: 100%;
    height: 785px;
    overflow: hidden;
  }

  .txt_cont {
    display: flex;
    justify-content: space-between;
    width: 95.5%;
    margin: 0 auto;

    .lgnmct_item {
      .lgtim_bar {
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, rgba(37,117,159,0) 0%, #49BEFF 50%, rgba(37,117,159,0) 100%);
        box-shadow: 0px 0px 6px 0px rgba(162,223,255,0.2100);
      }

      .lgtim_cot {
        width: 152px;
        height: 64px;
        overflow: hidden;

        ul {
          margin: 10px auto 0;

          li {
            text-align: center;

            &:first-child {
              font-family: YouSheBiaoTiHei;
              font-size: 18px;
              margin-bottom: 7px;

              b {
                color: #17EAD8;
              }
            }

            &:last-child {
              font-size: 16px;
              font-family: @numFontFamily;

              span {
                font-weight: bold;
                text-shadow: @lumosTxt;
                margin-right: 5px;
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>