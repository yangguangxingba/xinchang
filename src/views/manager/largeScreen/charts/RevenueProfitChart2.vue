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
      emptColor: '#173669',
      cfnColor: 'rgba(255,255,255,0.6)',
      pointColor: '#ffffff',
      symbol: "circle",  // 实心点
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
    setOptions({ fieldData,  yData1, yData2, yData3 } = {}) {
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
          legend: {
            top: -5,
            right: 0,
            itemWidth: 15,
            itemHeight: 7,
            textStyle: {
              color: '#fff',
              fontSize: '10px'
            }
          },
          grid: {
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
            height: '86%',
            width: '98%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: fieldData,
            axisTick:{
              show: false,  // 隐藏刻度线
            },
            axisLabel: {
              padding: [0, 0, 0, 0],
              // interval: 0, // 横轴信息全部显示
              // rotate: 30,
              align:'left',
              fontSize: 10,
              color: this.cfnColor
            },
          },
          yAxis: {
            type: 'value',
            // min: 0,
            // max: 16,
            // interval: 4,
            axisLabel: {
              fontSize: 10,
              color: this.cfnColor,
              formatter (val) {
                if(val === 0) {
                  return val
                }

                return `${val}亿`
              }
            }
          },
          series: [
            {
              name: '今年',
              type: 'line',
              symbol: this.symbol,
              itemStyle: {
                color: "#39C3AB", //改变折线颜色
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#39C3AB',
                  },
                  {
                    offset: 1,
                    color: this.emptColor,
                  },
                ], false),
              },
              data: yData1,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '去年',
              type: 'line',
              symbol: this.symbol,
              itemStyle: {
                color: "#1D8CFF", //改变折线颜色
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1D8CFF',
                  },
                  {
                    offset: 1,
                    color: this.emptColor,
                  },
                ], false),
              },
              data: yData2,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '前年',
              type: 'line',
              symbol: this.symbol,
              itemStyle: {
                color: "#6144FF", //改变折线颜色
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#6144FF',
                  },
                  {
                    offset: 1,
                    color: this.emptColor,
                  },
                ], false),
              },
              data: yData3,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }
          ]
        }
        // option-end
      )
    }
  }
}
</script>