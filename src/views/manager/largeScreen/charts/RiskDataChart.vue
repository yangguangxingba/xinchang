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
    yAxisFormatter(val) {
      // console.log(val)
      if(val === 0) {
        return val
      }

      return `${val}%`
    },
    setOptions({ fieldData,  yData1, yData2, yData3 } = {}) {
      this.chart.setOption(
        // option-start
        {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              color: '#fff',
              fontSize: 10
            },
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#fff'
              }
            },
            formatter: function (params) {
              let relVal = `<h3 class="tooltip_title">${params[0].name}</h3>`
              let str
              for (let i = 0, l = params.length; i < l; i++) {
                // relVal += '<br/>' + params[i].marker + params[i].seriesName + params[i].value + '%' + '<br/>'
                // <li>${params[i].marker}${params[i].seriesName}${params[i].value}%<li>
                relVal += `
                  <ul>
                    <li class="f-cb">
                      <i>${params[i].marker}</i>
                      <span>${params[i].seriesName}</span>
                      <b class='f-fr'>${params[i].value}%</b>
                    </li>
                  </ul>
                `
              }
              return relVal
            }
          },
          grid: {
            top: 30,
            left: 0,
            right: 0,
            bottom: 0,
            height: '83%',
            containLabel: true,
          },
          legend: [
            {
              data:[
                {
                  name: '资产负债率',
                  icon: this.legendIcon
                }
              ],
              itemWidth: this.legendItem,
              itemHeight: this.legendItem,
              left: 'left',
              textStyle: this.chartTextStyle
            }, 
            {
              data:[
                {
                  name: '存货增长比率',
                  icon: this.legendIcon
                }
              ],   
              itemWidth: this.legendItem,
              itemHeight: this.legendItem,
              left: 'left',
              left:'15%' , // 调整位置
              textStyle: this.chartTextStyle
            }, 
            {
              data:[
                {
                  name: '应收账款增长率',
                  icon: this.legendIcon
                }
              ],  
              itemWidth: this.legendItem,
              itemHeight: this.legendItem,
              left: 'right',
              textStyle: this.chartTextStyle
            },
          ],
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
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: this.yAxisLine,
              },
              axisLabel: {
                ...this.chartTextStyle,
                formatter(val) {
                  if(val === 0) {
                    return val
                  }

                  return `${val}%`
                },
              },
              min: 0,
              max: 100,
              interval: 20,
            },
            {
              type: 'value',
              splitLine: {
                show: this.yAxisLine,
              },
              axisLabel: {
                ...this.chartTextStyle,
                formatter(val) {
                  if(val === 0) {
                    return val
                  }

                  return `${val}%`
                },
              },
              min: 0,
              max: 200,
              interval: 50,
            }
          ],
          series: [
            {
              name: '资产负债率',
              type: this.seriesType,
              barWidth: this.barWidth,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(72,143,255,100)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(5,32,115,0)',
                  },
                ], false),
              },
              data: yData1,
            },
            {
              name: '存货增长比率',
              type: this.seriesType,
              barWidth: this.barWidth,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(175,143,255,100)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(175,143,255,0)',
                  },
                ], false),
              },
              data: yData2
            },
            {
              name: '应收账款增长率',
              type: this.seriesType,
              barWidth: this.barWidth,
              yAxisIndex: 1,  // 在单个图表实例中存在多个y轴的时候有用
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(26,175,135,100)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(26,175,135,0)',
                  },
                ], false),
              },
              data: yData3
            }
          ]
        }
        // option-end
      )
    }
  }
}
</script>