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
      cfnColor: 'rgba(255,255,255,0.6)'
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
    setOptions({ fieldData,  yData1, yData2 } = {}) {
      this.chart.setOption(
        // option-start
        {
          title: {
            text: '累计对客营收(万元)',
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 10,
            }
          },
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
            itemWidth: this.legendItem,
            itemHeight: this.legendItem,
            right: 0,
            textStyle: this.chartTextStyle
          },
          grid: {
            top: 35,
            left: 0,
            right: 0,
            bottom: 0,
            height: '85%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            offset: 15,
            axisTick:{
              show: false,  // 隐藏刻度线
            },
            axisLabel: {
              padding: [0, 0, 0, -23],
              interval: 0, // 横轴信息全部显示
              rotate: 30,
              ...this.chartTextStyle,
              align:'left',
              formatter (val) {
                var strs = val.split(""); //字符串数组
                var str = "";
                for (var i = 0, s; (s = strs[i++]);) {
                  //遍历字符串数组
                  str += s;
                  if (!(i % 4)) str += "\n"; //按需要求余
                }
                return str;
              }
            },
            data: fieldData,
          },
          yAxis: {
            type: 'value',
            // min: 0,
            // max: 1000,
            // interval: 250,
            splitLine: {
              lineStyle: {
                color: this.cfnColor,
                type: 'bold'
              }
            },
            axisLabel: {
              // textStyle: this.chartTextStyle,
              ...this.chartTextStyle
            }
          },
          series: [
            {
              name: '今年',
              type: 'bar',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(221,153,80,0.8000)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(215,150,79,0)',
                  },
                ], false),
              },
              data: yData1
            },
            {
              name: '去年',
              type: 'bar',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#488FFF',
                  },
                  {
                    offset: 1,
                    color: 'rgba(5,32,115,0)',
                  },
                ], false),
              },
              data: yData2
            },
          ]
        }
        // option-end
      )
    }
  }
}
</script>