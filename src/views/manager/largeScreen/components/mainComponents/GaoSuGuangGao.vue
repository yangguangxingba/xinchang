<!-- 高速广告 -->
<template>
  <section class="gsgg_wrap map_item_cont">
    <div class="gsgg_top mancnt_top">
      <ul>
        <li>业务分布图</li>
        <li>
          <tab class="itme_pg_tab gsgg_tab f-fl" :tabList="tabListData"  @checkTab="checkTab" />
        </li>
      </ul>
    </div>
    <div class="gsgg_cont">
      <!-- 地图 -->
      <div class="gsgct_map_wrap" v-if="current === '1'"  @click="setPoint">
        <img src="../mapComponents/mapImg/gsgg/gsgg_map.jpg" />

        <!-- 点位 -->
        <div class="point point_gsgg point_gsgg_1" data-name="洗手台数字镜面广告"></div>
        <div class="point point_gsgg point_gsgg_2" data-name="LED大屏"></div>
        <div class="point point_gsgg point_gsgg_3" data-name="杭州地铁五号线媒体资源"></div>
        <div class="point point_gsgg point_gsgg_4" data-name="LCD屏矩阵"></div>
        <div class="point point_gsgg point_gsgg_5" data-name="服务区室内吊牌媒体"></div>
        <div class="point point_gsgg point_gsgg_6" data-name="服务区广场灯箱"></div>
        <div class="point point_gsgg point_gsgg_7" data-name="杭海城际铁路媒体资源"></div>
        <div class="point point_gsgg point_gsgg_8" data-name="服务区墙面灯箱"></div>
        <div class="point point_gsgg point_gsgg_9" data-name="洗手间灯箱"></div>
      </div>
      <!-- 高速广告表格 -->
      <div class="gsgct_table_wrap" v-else>
        <smooth-scrollbar>
          <brain-table  class="gsgct_table" 
                        :tableData="tableData" 
                        :columns="gsggTbColumns"
                        :listLoading="listLoading" />
        </smooth-scrollbar>
      </div>
    </div>

    <!-- 弹窗 -->
    <!-- <el-dialog title="查看大图" :close-on-click-modal="false" :visible.sync="showImg"> -->
    <el-dialog title="查看大图" :visible.sync="showImg">
      <img src="../mapComponents/mapImg/gsgg/xstjmgg.jpg" v-if="currentImg === '洗手台数字镜面广告'">
      <img src="../mapComponents/mapImg/gsgg/led.jpg" v-if="currentImg === 'LED大屏'">
      <img src="../mapComponents/mapImg/gsgg/msg3.jpg" v-if="currentImg === '杭州地铁五号线媒体资源'">
      <img src="../mapComponents/mapImg/gsgg/msg4.jpg" v-if="currentImg === 'LCD屏矩阵'">
      <img src="../mapComponents/mapImg/gsgg/msg5.jpg" v-if="currentImg === '服务区室内吊牌媒体'">
      <img src="../mapComponents/mapImg/gsgg/msg6.jpg" v-if="currentImg === '服务区广场灯箱'">
      <img src="../mapComponents/mapImg/gsgg/msg7.jpg" v-if="currentImg === '杭海城际铁路媒体资源'">
      <img src="../mapComponents/mapImg/gsgg/msg8.jpg" v-if="currentImg === '服务区墙面灯箱'">
      <img src="../mapComponents/mapImg/gsgg/msg9.jpg" v-if="currentImg === '洗手间灯箱'">
    </el-dialog>
  </section>
</template>

<script>
// 工具
import Tab from '../tipComponents/Tab'
import BrainTable from '../tipComponents/BrainTable'

export default {
  components: {
    Tab, BrainTable
  },

  props: {
    tableData: {
      type: Array,
      default: ()=> []
    },
    listLoading: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      tabListData: ['1', '2'],
      current: '1',
      currentImg: '',
      showImg: false,

      gsggTbColumns: [
        { prop: 'order_number', label: '序号', align: 'center'}, 
        { prop: 'project_contents', label: '内容'}, 
        { prop: 'responsible_leader', label: '责任领导', align: 'center'},
        { prop: 'responsible_staff', label: '主要负责部门', align: 'center'},
        { prop: 'project_progression', label: '推进情况'},
      ],
    }
  },

  methods: {
    // 点击选项卡
    checkTab(val) {
      // console.log(val)

      this.current = val
    },

    // 命中锚点
    setPoint(e) {
      let { target } = e

      // 判断是否点击锚点
      if(target.classList.contains('point')) {
        this.showImg = true
        this.currentImg = target.getAttribute('data-name')
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import url('./less/cntTable');
@import url('./less/point');
@import url('./less/itemTab');

.gsgg_wrap {
  .gsgg_top {
    width: 100%;
  }

  ::v-deep .el-dialog {
    background: #21589c;

    .el-dialog__header {
      padding-top: 10px;

      span {
        color: #fff;
      }

      button {
        top: 10px;

        i {
          color: #fff;
        }
      }
    }

    .el-dialog__body {
      padding: 0px 20px 15px;

      img {
        width: 100%;
      }
    }
  }

  .gsgg_cont {
    .gsgct_map_wrap {
      position: relative;

      img {
        width: 100%;
      }

      
    }
    .gsgct_table_wrap {
      ::v-deep .el-table__header-wrapper, ::v-deep .el-table__body-wrapper {
        table {
          thead, tbody {
            tr {
              th, td {
                &:nth-child(1) {
                  width: 63px;

                  .cell {
                    padding-left: 6px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>