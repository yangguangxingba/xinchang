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
      legendItem: 8,
      titleTxt: {
        color: "#fff",
        fontSize: 12,
        align: "center",
        fontWeight: 400
      },
      borderWidth: 3,
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

    setOptions({ fieldData } = {}) {
      //颜色16进制换算rgba,添加透明度
      function hexToRgba(hex, opacity) {
      return (
          'rgba(' +
          parseInt('0x' + hex.slice(1, 3)) +
          ',' +
          parseInt('0x' + hex.slice(3, 5)) +
          ',' +
          parseInt('0x' + hex.slice(5, 7)) +
          ',' +
          opacity +
          ')'
          );
      }
      // 颜色系列
      let color = ['#37FFC9', '#FFE777', '#19D6FF', '#32A1FF', '#cccccc', '#ff1111'];
      let radius = ['55%', '65%']
      let color1 = []
      let color2 = []
      let color3 = []
      // 设置每层圆环颜色和添加间隔的透明色
      color.forEach((item) => {
          color1.push(item, 'transparent');
          color2.push(hexToRgba(item, 0.7), 'transparent');
          color3.push(hexToRgba(item, 0.4), 'transparent');
      });
      // let sum = 0;
      // 根据总值设置间隔值大小
      // fieldData.forEach((item) => {
      //     sum += Number(item.value);
      // });
      // 给每个数据后添加特定的透明的数据形成间隔
      // fieldData.forEach((item, index) => {
      //     if (item.value !== 0) {
      //         fieldData.push(item, {
      //             name: '',
      //             value: sum / 70,
      //             labelLine: {
      //                 show: false,
      //                 lineStyle: {
      //                     color: 'transparent',
      //                 },
      //             },
      //             itemStyle: {
      //                 color: 'transparent',
      //             },
      //         });
      //     }
      // });
      // 每层圆环大小
      let radius2 = [Number(radius[1].split('%')[0]) + 0 + '%', Number(radius[1].split('%')[0]) + 10 + '%'];
      let radius3 = [Number(radius[1].split('%')[0]) + 4 + '%', Number(radius[1].split('%')[0]) + 8 + '%'];
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
            text: "今日入区",
            subtext: "车型分析",
            left: "31.5%",
            top: "38.5%",
            textAlign: "center",
            textStyle: this.titleTxt,
            subtextStyle: this.titleTxt
          },
          legend: {
            orient: 'vertical',
            itemGap: 15,  // 间距
            itemWidth: this.legendItem,
            itemHeight: this.legendItem,
            icon: "rect",
            top: 0,
            bottom: 0,
            right: 0,
            padding: [30, 25],
            height: '100%',
            textStyle: {
              color: '#fff',
              fontSize: '10px'
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              left: 0,
              radius:radius, // 两值的差就是饼图的宽，第一个是内部饼图直径，第二个是外部饼图的直径，因为外部饼图没有数据展示为空，所以形成了圆环
              center: ['33%', '50%'],
              avoidLabelOverlap: false,
              // itemStyle: {
              //   borderColor: '#173669',
              //   borderWidth: this.borderWidth
              // },
              itemStyle: {
                normal: {
                    color: (params) => {
                        return color1[params.dataIndex];
                    },
                },
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false
              },
              data: fieldData
            },
            {
              type: 'pie',
              radius: radius2,
              center: ['33%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              selectedMode: 'single',
              selectedOffset: 0,
              itemStyle: {
                  normal: {
                      color: (params) => {
                          return color2[params.dataIndex];
                      },
                  },
              },
              label: {
                  show: false,
                  formatter: '{b}' + ' ' + '{c}',
              },
              data: fieldData,
              z: 666,
            },
            /* {
              name: '',
              type: 'pie',
              left: 0,
              radius: ['50%', '65%'], // 两值的差就是饼图的宽，第一个是内部饼图直径，第二个是外部饼图的直径，因为外部饼图没有数据展示为空，所以形成了圆环
              center: ['33%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: '#173669',
                borderWidth: this.borderWidth
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false
              },
              data: fieldData
            }, */
          ]
        }
        // option-end
      )
    }
  }
}
</script>