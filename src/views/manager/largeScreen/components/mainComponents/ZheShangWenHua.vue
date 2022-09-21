<!-- 浙商文化表格 -->
<template>
  <section class="map_item_cont">
    <div class="mancnt_top">
      <ul>
        <li>2022年度重点工作推进表</li>
      </ul>
    </div>
    
    <smooth-scrollbar>
      <brain-table class="zswh_table" 
                  :tableData="tableData" 
                  :columns="zswhTbColumns"
                  :splitTableName="'浙商文化'"
                  :listLoading="listLoading" />
      <!-- <tab class="itme_pg_tab zswh_tab" :tabList="['1', '2']"  @checkTab="checkTab" /> -->
    </smooth-scrollbar>
  </section>
</template>

<script>
// 工具
import BrainTable from '../tipComponents/BrainTable'
import Tab from '../tipComponents/Tab'

export default {
  components: {
    BrainTable, Tab
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
      // zswhTbData: this.tableData,
      zswhTbColumns: [
        { prop: 'work_module', label: '工作模块', align: 'center'}, 
        { prop: 'order_number', label: '序号', align: 'center'}, 
        { prop: 'project_contents', label: '工作目标和内容'}, 
        { prop: 'responsible_leader', label: '责任领导', align: 'center'},
        { prop: 'responsible_staff', label: '协办人员', align: 'center'},
        { prop: 'project_progression', label: '推进情况'},
      ],
    }
  },

  watch: {
    tableData(newVal) {
      this.zswhTbData = newVal
    }
  },

  methods: {
    checkTab(val) {
      // console.log(val)
      // console.log(this.zswhTbData)

      this.$emit('setZswhData', val)
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./less/cntTable');
@import url('./less/itemTab');

.map_item_cont {
  ::v-deep .zswh_tab {
    width: 60px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
}

.zswh_table {
  ::v-deep .el-table__header-wrapper, ::v-deep .el-table__body-wrapper {
    table {
      thead, tbody {
        tr {
          th, td {
            &:nth-child(1) {
              width: 70px;
            }
            &:nth-child(2) {
              width: 38px;
            }
            &:nth-child(4) {
              width: 55px;
            }
            &:nth-child(5) {
              width: 70px;
            }
          }
        }
      }
    }
  }
}
</style>