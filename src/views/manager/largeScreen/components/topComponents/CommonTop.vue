<!-- 公共头部内容 -->
<template>
  <section class="common_top">
    <div class="comntp_top mancnt_top">
      <ul>
        <li>{{ companyData.company_name }}</li>
        <li @click="goBack">
          <img src="@/assets/images/largescreen/back.png" alt="">
        </li>
      </ul>
    </div>
    <!-- 统计数据 - 浙江建融和富春驿商没有  -->
    <div class="total_data">
      <total-data :companyData="companyData" v-if="companyData.company_id !== '8' && companyData.company_id !== '9'" />
    </div>
    <!-- 文本内容 -->
    <div class="comntp_cont">
      <smooth-scrollbar>
        <p v-html="companyData.company_introd"></p>
      </smooth-scrollbar>
    </div>
  </section>
</template>

<script>
// 头部
import TotalData from './components/TotalData'

export default {
  components: {
    TotalData
  },

  data() {
    return {
      companyData: {},
    }
  },

  methods: {
    /**
     * tools
     */
    // 返回
    goBack() {
      // console.log('返回')
      this.$emit('goBack')
    },

    /**
     * 业务
     */
    // 获取公司信息
    getCompanyData(companyData) {
      this.companyData = companyData
    }
  },
}
</script>

<style lang="less" scoped>
@topHeight: 42px;

.common_top {
  .comntp_top {
    ul {
      li {
        &:last-child {
          width: 72px;
          height: @topHeight;
          margin-top: 2px;
          cursor: pointer;
          
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .total_data, .comntp_cont {
    width: 96%;
    margin: 8px 0 0 8px;
  }

  .comntp_cont {
    min-height: 128px;
    margin-top: 0;
    padding-bottom: 8px;
    overflow: auto;

    p {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1.2px;
      padding: 5px 10px 6px 6px;
    }
  }
}
</style>