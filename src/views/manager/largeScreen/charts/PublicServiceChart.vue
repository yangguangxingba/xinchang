<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from "echarts";
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100px'
    },
    chartFontColor: {
      type: String,
      default: '#000'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    txtFontSize: {
      type: Number,
      default: 15
    },
  },
  data() {
    return {
      chart: null,
      seriesType: 'bar',
      barWidth: 4,
      legendIcon: 'rect',
      legendItem: 8,
      yAxisLine: false,
      cfnColor: 'rgba(255,255,255,0.8)'
    }
  },
  computed: {
    chartTextStyle() {
      return {
        color: this.cfnColor,
        fontSize: 10,
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化图表
    resetChart() {
      // console.log("初始化图表", this.chart)
      // 图表不存在跳出
      if (!this.chart) {
        return
      }

      // 销毁图表
      this.chart.dispose()
      this.chart = null

      // 重新启动图表
      this.initChart()
    },
    initChart() {
      // console.log(echarts)
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ fieldData,  yData } = {}) {
      this.chart.setOption(
        // option-start
        {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            top: 13,
            left: 0,
            right: 0,
            bottom: 0,
            width: '95%',
            height: '95%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            interval: 0, // 横轴信息全部显示
            align:'left',
            // textStyle: {
              align:'left',
              fontSize: 10,
              color: this.cfnColor
            // },
          },
          yAxis: {
            type: 'category',
            axisTick:{
              show: false,  // 隐藏刻度线
            },
            axisLabel: {
              // textStyle: this.chartTextStyle,
              ...this.chartTextStyle,
            },
            data: fieldData
          },
          series: [
            {
              type: 'bar',
              // itemStyle: {
                // normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    color: '#4ABEFE',
                    fontSize: 10,
                    /* textStyle: {
                      color: '#4ABEFE',
                      fontSize: 10,
                    } */
                  },
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: 'rgba(54,123,236,0)'},
                      {offset: 1, color: '#0E9AF8'}
                    ]
                  ),
                // },
              // },
              data: yData
            }
          ]
        }
        // option-end
      )
    }
  }
}
</script>