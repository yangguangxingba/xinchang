<template>
  <!-- 主体中间内容 -->
  <section class="large_screen_main" :class="'lgsd' + currentCompany">
    <!-- 富春驿商 -->
    <fu-chun-yi-shang v-if="currentCompany === '9'" />
    <!-- 高速广告 -->
    <gao-su-guang-gao :tableData="pojDetaiList" :listLoading="listLoading" v-if="currentCompany === '1'" />
    <!-- 浙商互联 -->
    <zhe-shang-hu-lian :tableData="pojDetaiList" :listLoading="listLoading" v-if="currentCompany === '11'" />
    <!-- 浙商文化 -->
    <zhe-shang-wen-hua :tableData="pojDetaiList" :listLoading="listLoading" @setZswhData="setZswhData" v-if="currentCompany === '2'" />
    <!-- 公共主体内容 -->
    <common-content ref="comContRef" 
                    @getMarkerData="getMarkerData"
                    @getMapAreaData="getMapAreaData"
                    @getAll="getAll"
                    v-show="currentCompany !== '2' && 
                            currentCompany !== '11' && 
                            currentCompany !== '1' && 
                            currentCompany !== '9'" />
  </section>
</template>

<script>
import CommonContent from './mainComponents/CommonContent'  // 公共主体内容
import FuChunYiShang from './mainComponents/FuChunYiShang'  // 富春驿商
import GaoSuGuangGao from './mainComponents/GaoSuGuangGao'  // 高速广告
import ZheShangHuLian from './mainComponents/ZheShangHuLian'  // 浙商互联
import ZheShangWenHua from './mainComponents/ZheShangWenHua'  // 浙商文化

export default {
  components: {
    CommonContent,
    FuChunYiShang, GaoSuGuangGao, ZheShangHuLian, ZheShangWenHua
  },

  data() {
    return {
      pojDetaiList: [],  // 表格数据
      businessList: [],  // 地图数据
      currentCompany: 'main',  // 当前公司
      listLoading: false,
      businessCenterData: {}
    }
  },

  methods: {
    /**
     * tools
     */
    // 返回
    goBack() {
      // console.log('返回', this.businessCenterData)
      this.currentCompany = 'main'

      this.$refs.comContRef.goBack()
    },
    // 浙商文化
    setZswhData(val) {
      // console.log(val
      
      this.$emit('setZswhData', val)
    },
    // 开始loading
    startLoading() {
      // console.log("开始loading")

      this.listLoading = true
    },
    // 结束loading
    endLoading() {
      // console.log("结束loading")

      this.listLoading = false
    },
    // 开始maploading
    startMapLoading() {
      // console.log("开始loading")

      this.$refs.comContRef.startMapLoading()  // CommonContent组件获取数据
    },
    // 结束maploading
    endMapLoading() {
      // console.log("结束loading")

      this.$refs.comContRef.endMapLoading()  // CommonContent组件获取数据
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
      this.currentCompany = companyData.company_id

      switch(companyData.company_id) {
        // 高速广告
        case '1':
        // 浙商文化
        case '2':
        // 富春驿商
        case '9':
        // 浙商互联
        case '11':
          break
        default:
          this.$nextTick(()=> {
            this.$refs.comContRef.getCompanyData(companyData)  // CommonContent组件获取数据
          })
      }
    },

    // 获取表格数据
    getPojListData(pojDetaiList) {
      // console.log("获取表格数据", pojDetaiList)

      // 高速广告、浙商互联、浙商文化 为表格数据
      this.pojDetaiList = pojDetaiList
    },

    // 获取地图数据
    getBusinessListData(businessList) {
      // console.log("获取地图数据", businessList)

      this.$refs.comContRef.getMapData(businessList)  // CommonContent组件获取数据
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

      this.$refs.comContRef.getIndexMapBelowData(businessCenterData)  // CommonContent组件获取数据
    }
  },
}
</script>

<style lang="less" scoped>
.large_screen_main {
  ::v-deep .map_item_cont {
    height: 800px;
    // overflow: auto;
  }
  // 首页
  &.lgsdmain {
    ::v-deep .map_cont {
      margin: 45px 0 50px;
    }
  }
  // 高速广告
  &.lgsd1 {
    ::v-deep .map_item_cont {
      height: 790px;
      margin-top: 20px;
    }
  }
  // 高速商贸
  &.lgsd10 {
    ::v-deep .map_item_cont {
      height: 686px;
    }
  }
  // 浙商互联
  &.lgsd11 {
    ::v-deep .map_item_cont {
    }
  }
  // 浙商文化
  &.lgsd2 {
    ::v-deep .map_item_cont {
    }
  }
  // 高速石油
  &.lgsd4 {
    ::v-deep.map_item_cont {
      height: 780px;
    }
  }
  // 高速能源
  &.lgsd5 {
    ::v-deep.map_item_cont {
    }
  }
  // 中碳科技
  &.lgsd6 {
    ::v-deep.map_item_cont {
      height: 705px;
    }
  }
  // 创胜至合
  &.lgsd7 {
    ::v-deep.map_item_cont {
      height: 759px;
    }
  }
  // 浙江建融
  &.lgsd8 {
    ::v-deep.map_item_cont {
      height: 836px;
    }
  }
  // 富春驿商
  &.lgsd9 {
    background: #091f3f;

    ::v-deep.map_item_cont {
      height: 612px;
      margin-top: 80px;
    }
  }
}
</style>