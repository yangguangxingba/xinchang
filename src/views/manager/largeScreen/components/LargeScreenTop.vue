<template>
  <!-- 主体中间头部 -->
  <section class="large_screen_top">
    <main-top ref="mainTopRef" v-if="JSON.stringify(companyData) === '{}'" />
    <common-top ref="comTopRef" v-else @goBack="goBack" />
  </section>
</template>

<script>
import MainTop from './topComponents/MainTop'
import CommonTop from './topComponents/CommonTop'

export default {
  components: {
    MainTop, CommonTop
  },

  data() {
    return {
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
      // console.log("返回")

      this.companyData = {}

      this.$nextTick(()=> {
        this.$emit('goBack')

        this.$refs.mainTopRef.getIndexMapTopData(this.businessCenterData)  // MainTop组件获取数据
      })
    },

    /**
     * 业务
     */
    // 获取公司信息
    getCompanyData(companyData) {
      // console.log(companyData)
      this.companyData = companyData

      this.$nextTick(()=> {
        this.$refs.comTopRef.getCompanyData(companyData)  // CommonTop组件获取数据
      })
    },

    // 获取首页地图上方数据
    getIndexMapTopData(businessCenterData) {
      // console.log("获取首页地图上方数据", businessCenterData);

      this.businessCenterData = businessCenterData

      this.$refs.mainTopRef.getIndexMapTopData(businessCenterData)  // MainTop组件获取数据
    }
  }
}
</script>