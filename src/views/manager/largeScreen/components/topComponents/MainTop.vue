<!-- 大屏首页内容头部 -->
<template>
  <section class="lgcn_maintop_wrap">
    <div class="lgmntp_item">
      <div class="lgtpitm_l">
        <span class="smal">今日对客营收</span>
      </div>
      <div class="lgtpitm_r">
        <ul>
          <!-- <li>加油<span>3065</span>万元</li> -->
          <li>加油<span></span>万元</li>
          <li class="itmbar"></li>
          <li>非油<span>{{ businessCenterData.revenue_amountn }}</span>万元</li>
        </ul>
      </div>
    </div>
    <div class="lgmntp_item">
      <div class="lgtpitm_l">
        <span>本年累计对客营收</span>
      </div>
      <div class="lgtpitm_r">
        <ul>
          <li>加油<span>{{ businessCenterData.youpin_year_revenue }}</span>亿元</li>
          <!-- <li>加油<span></span>亿元</li> -->
          <li class="itmbar"></li>
          <!-- <li>非油<span>6.95</span>亿元</li> -->
          <!-- <li>非油<span>{{ parseFloat(businessCenterData.revenue_amountCountn).toFixed(2) }}</span>亿元</li> -->
          <li>非油<span>{{ businessCenterData.revenue_amountCountn }}</span>亿元</li>
        </ul>
      </div>
    </div>
    <div class="lgmntp_item">
      <div class="lgtpitm_l">
        <span class="smal">今日消费笔数</span>
      </div>
      <div class="lgtpitm_r">
        <ul>
          <!-- <li>加油<span>8.28</span>万笔</li> -->
          <li>加油<span></span>万笔</li>
          <li class="itmbar"></li>
          <!-- <li>非油<span>2.59</span>万笔</li> -->
          <li>非油<span>{{ businessCenterData.ticket_countn }}</span>万笔</li>
        </ul>
      </div>
    </div>
    <div class="lgmntp_item">
      <div class="lgtpitm_l">
        <span>本年累计消费笔数</span>
      </div>
      <div class="lgtpitm_r">
        <ul>
          <!-- <li>加油<span>1234.45</span>万笔</li> -->
          <li>非油<span></span>万笔</li>
          <li class="itmbar"></li>
          <!-- <li>非油<span>1349.38</span>万笔</li> -->
          <li>非油<span>{{ businessCenterData.ticket_countCountn }}</span>万笔</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.initPage()
  },

  data() {
    return {
      businessCenterData: {}
    }
  },

  methods: {
    initPage() {
      this.$nextTick(()=> {
        let wrap = this.$el.parentNode.parentNode.parentNode
        // console.log(wrap)
        wrap.classList.add('shouye_main_wrap')
      })
    },
    // 获取首页地图上方数据
    getIndexMapTopData(businessCenterData) {
      // console.log("获取首页地图上方数据", businessCenterData);

      this.businessCenterData = businessCenterData
    }
  }
}
</script>

<style lang="less" scoped>
.lgcn_maintop_wrap {
  display: flex;
  width: 100%;
  height: 80px;
  background: url("../../../../../assets/images/largescreen/center_main_top.png") top no-repeat;

  .lgmntp_item {
    display: flex;
    flex: 1;
    background: linear-gradient(100deg, #2a58ac 0%, rgb(23 48 101) 100%);

    .lgtpitm_l {
      width: 22%;

      span {
        display: block;
        width: 88%;
        margin: 3px 0 0 7px;
        font-size: 14px;
        font-weight: bold;
        line-height: 18px;
        letter-spacing: 2.5px;

        &.smal {
          margin-top: 13px;
        }
      }
    }

    .lgtpitm_r {
      flex: 1;

      ul {
        width: 95%;
        margin: 12px 0 0 5px;
        // margin: 28px 0 0 5px;

        li {
          width: 100%;
          font-family: @pingFontFamily;
          font-size: 12px;

          &.itmbar {
            height: 1px;
            margin: 8px 0 7px 0;
            background: linear-gradient(270deg, rgba(76,238,255,0) 0%, rgba(215,241,255,0.8000) 50%, rgba(37,217,253,0) 100%);
          }

          span {
            margin: 0 3px;
            font-family: @numFontFamily;
            font-size: 18px;
            font-weight: bold;
            text-shadow: @lumosTxt;
          }
        }
      }
    }
  }
}
</style>