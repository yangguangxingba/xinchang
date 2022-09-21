<template>
  <section class="totldt_wrap">
   <!--   * 高速广告:1    高速石油:4
          * 高速商贸:10   高速能源:5
          * 浙商互联:11   中碳科技:6
          * 浙商文化:2    创胜至合:7
          * 盈通餐饮:3    浙江建融:8
          * 富春驿商: 9 -->

    <!-- empty {{ companyData }} -->
    <!-- 中碳科技 -->
    <ul v-if="companyData.company_id === '6'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>亿元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>年营业收入<span>{{ companyData.newoperating_income }}</span>亿元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/zt_ico1.png" />
          </dt>
          <dd>年光伏发电量<span>{{ companyData.newannual_pvenergy_output }}</span>万度</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/zt_ico2.png" />
          </dt>
          <dd>年LNG总销量<span>{{ companyData.newlng_annual_sales }}</span>万吨</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/zt_ico3.png" />
          </dt>
          <dd>年减排CO₂<span>{{ companyData.newco2_emission_reduction }}</span>万吨</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/zt_ico4.png" alt="">
          </dt>
          <dd>年减少标准煤用量<span>{{ companyData.newstandard_coal_consum_reduction }}</span>万吨</dd>
        </dl>
      </li>
    </ul>
    <!-- 高速石油 -->
    <ul v-if="companyData.company_id === '4'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>亿元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_fzl.png" />
          </dt>
          <dd>负债率<span>{{ companyData.newdebt_ratio }}</span>%</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>今年营业收入<span>{{ companyData.newoperating_income }}</span>亿元</dd>
        </dl>
      </li>
    </ul>
    <!-- 浙商文化 -->
    <ul v-if="companyData.company_id === '2'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_fzl.png" />
          </dt>
          <dd>负债率<span>{{ companyData.newdebt_ratio }}</span>%</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>今年营业收入<span>{{ companyData.newoperating_income }}</span>万元</dd>
        </dl>
      </li>
    </ul>
    <!-- 高速能源 -->
    <ul v-if="companyData.company_id === '5'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_fzl.png" />
          </dt>
          <dd>负债率<span>{{ companyData.newdebt_ratio }}</span>%</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>今年营业收入<span>{{ companyData.newoperating_income }}</span>亿元</dd>
        </dl>
      </li>
    </ul>
    <!-- 创胜至合 -->
    <ul v-if="companyData.company_id === '7'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>亿元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>今年营业收入<span>{{ companyData.newoperating_income }}</span>亿元</dd>
        </dl>
      </li>
    </ul>
    <!-- 高速商贸 -->
    <ul v-if="companyData.company_id === '10'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>销售额<span>{{ companyData.retail_amount }}</span>亿元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/gssm_ico1.png" />
          </dt>
          <dd>平均客单价<span>{{ companyData.passenger_price }}</span>元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>GMV<span>{{ companyData.gmv }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/gssm_ico2.png" />
          </dt>
          <dd>客流量<span>{{ companyData.passenger_flow }}</span>万人</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/gssm_ico3.png" />
          </dt>
          <dd>综合毛利率<span>{{ companyData.newgross_profit_rate }}</span>%</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/gssm_ico4.png" />
          </dt>
          <dd>订单数<span>{{ companyData.order_cnt }}</span>万笔</dd>
        </dl>
      </li>
    </ul>
    <!-- 盈通餐饮 -->
    <ul v-if="companyData.company_id === '3'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>营业收入<span>{{ companyData.newoperating_income }}</span>万元</dd>
        </dl>
      </li>
    </ul>
    <!-- 高速广告 -->
    <ul v-if="companyData.company_id === '1'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>资产总额<span>{{ companyData.newtotal_assets }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_fzl.png" />
          </dt>
          <dd>负债率<span>{{ companyData.newdebt_ratio }}</span>%</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>今年营业收入<span>{{ companyData.newoperating_income }}</span>万元</dd>
        </dl>
      </li>
    </ul>
    <!-- 浙商互联 -->
    <ul v-if="companyData.company_id === '11'">
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_zcze.png" />
          </dt>
          <dd>软著(专利)数<span>{{ companyData.newpatents_cnt }}</span>项</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_fzl.png" />
          </dt>
          <!-- <dd>营收金额<span>{{ companyData.revenue_amount }}</span>万元</dd> -->
          <dd>营收金额<span>{{ companyData.newoperating_income }}</span>万元</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <img src="@/assets/images/largescreen/todt_ico/com_yysr.png" />
          </dt>
          <dd>项目推进数量<span>{{ companyData.newproject_number }}</span>个</dd>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    // 公司信息
    companyData: {
      type: Object,
      default: ()=> {}
    }
  },
}
</script>

<style lang="less" scoped>
.totldt_wrap {
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      min-width: 32%;

      &:nth-child(3n+1) {
        margin-right: 20px;
      }

      &:nth-child(3n) {
        min-width: 30%;
        text-align: right;
      }

      dl {
        dt, dd {
          display: inline-block;
        }
        dt {
          width: 32px;
          height: 32px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        dd {
          position: relative;
          top: -10px;

          span {
            margin: 0 5px;
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