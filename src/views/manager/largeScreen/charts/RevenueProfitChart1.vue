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
    chartSubTitle: {
      type: String,
      default: '0.26'
    },
    chartTitle: {
      type: String,
      default: '文化'
    },
  },
  data() {
    return {
      chart: null,
      legendItem: 8,
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

      this.chart.on('legendselectchanged', obj=> {
        // console.log(this.chartData, obj)

        this.chart.setOption({
          legend:{ selected:{  [obj.name]: true}}
        })

        let business_id
        this.chartData.fieldData.forEach(item=> {
          if(item.name === obj.name) {
            business_id = item.business_id
          }
        })

        this.$emit('setRevenueProfitChart2Data', business_id)
      })

      this.chart.on('mouseover', ()=> {
        this.chart.setOption({
          // title: { show: false }
        })
      })
      this.chart.on('mouseout', ()=> {
        this.chart.setOption({
          // title: { show: true }
        })
      })
    },
    setOptions({ fieldData } = {}) {
      let that = this
      this.chart.setOption(
        // option-start
        {
          tooltip: {
            trigger: 'item',
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
          },
          title: {
            text: that.chartTitle,
            subtext: "{num|0.26}{unit|亿}",
            subtext: `{num|${that.chartSubTitle}}{unit|亿}`,
            left: "23%",
            top: "30%",
            textAlign: "center",
            show: false,
            textStyle: {
              color: "#fff",
              fontSize: 12,
              align: "center",
              fontWeight: 400
            },
            subtextStyle: {
              rich: {
                // 数字
                num: {
                  color: "#4ABEFE",
                  fontSize: 24,
                  fontWeight: 800,
                },
                // 单位
                unit: {
                  color: "#fff",
                  padding: [0, 3],
                }
              }
            }
          },
          legend: {
            show: true,
            orient: 'vertical',
            itemWidth: this.legendItem,
            itemHeight: this.legendItem,
            icon: "rect",
            top: 5,
            bottom: 0,
            right: 0,
            padding: [0, 0, 0, 0],
            height: '100%',
            // selectedMode: false,
            textStyle: {
              color: '#fff',
              fontSize: '9px'
            },
            tooltip: {
              show: false
            },
            formatter: name=> {
              let { fieldData } = that.chartData
              let curData

              for(let i=0; i<fieldData.length; i++) {
                if(fieldData[i].name === name) {
                  curData = fieldData[i].percentage
                }
              }

              return `${name}(${curData}%)`
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              left: 0,
              radius: ['75%', '90%'], // 两值的差就是饼图的宽，第一个是内部饼图直径，第二个是外部饼图的直径，因为外部饼图没有数据展示为空，所以形成了圆环
              center: ['25%', '50.5%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: '#173669',
                borderWidth: 2
              },
              labelLine: {
                show: false
              },
              label: {
                show: false,
                position: 'center',
                formatter (val) {
                  let { data } = val
                  let { fieldData } = that.chartData
                  let str

                  fieldData.forEach(item=> {
                    if(item.name === data.name) {
                      if(item.percentage>0) {
                        str = `{title|${data.name}}\n\n{num|${data.value}}{unit|亿}`
                      } else {
                        str = `{title|${data.name}}\n\n{num|-${data.value}}{unit|亿}`
                      }
                    }
                  })

                  return str
                }
              },
              emphasis: {
                label: {
                  show: true,
                  rich: {
                    // 标题
                    title: {
                      color: "#fff",
                      fontSize: 10,
                      align: "center",
                      fontWeight: 400,
                    },
                    // 数字
                    num: {
                      color: "#4ABEFE",
                      fontSize: 14,
                      fontWeight: 800,
                    },
                    // 单位
                    unit: {
                      color: "#fff",
                      padding: [0, 3],
                    }
                  }
                }
              },
              data: fieldData
            }
          ]
        }
        // option-end
      )
    }
  }
}
</script>