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
      default: '45px'
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
      lineColors: ['#1AAF87', '#488FFF', '#EFA451', '#D56C39', '#C767E0'],
      lendTextStyle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
      },
      legendIcon: 'rect',
      legendItem: 8,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions(option=> {
          this.setOptionsData(option)
        })
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
      this.setOptions(option=> {
        this.setOptionsData(option)
      })
    },
    setOptionsData(option) {
      option.series = []

      for(let i=0; i<this.chartData.fieldData.length; i++) {
        option.series.push({
          type: 'bar',
          stack: 'total',
          barWidth: '10px',
          label: {
            show: false,
          },
          emphasis: {
            focus: 'series'
          },
          name: this.chartData.legend[i],
          data: this.chartData.fieldData[i],
        })
      }

      this.chart.setOption(option)
    },
    setOptions(next) {
      let that = this
      this.chart.setOption(
        // option-start
        {
          tooltip: {
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
          },
          color: this.lineColors,
          legend: {
            left: 'left',
            textStyle: this.lendTextStyle,
            itemWidth: this.legendItem,
            itemHeight: this.legendItem,
            itemGap: 15,  // 间距
            formatter (name) {
              let { fieldData, legend } = that.chartData
              let total = 0
              let curData

              for(let i=0; i<legend.length; i++) {
                total += parseInt(fieldData[i][0])

                if(legend[i] === name) {
                  curData = parseInt(fieldData[i][0])
                }
              }
              var p = ((curData / total) * 100).toFixed(1) + '%'; //求出百分比

              return `${name} ${p}`
            }
          },
          grid: {
            top: 0,
            left: 0,
            right: -82,
            bottom: 0,
          },
          xAxis: {
            type: 'value',
            show: false,
            minorSplitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: [''],
            // 去除网格线
            axisLine: {
              show: false
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          series: [],
        }
        // option-end
      )

      if(next) {
        next(this.chart.getOption())
      }
    }
  }
}
</script>