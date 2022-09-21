<!-- 浙商互联表格 -->
<template>
  <section class="map_item_cont">
    <div class="mancnt_top">
      <ul>
        <li>2022年度重点工作推进表</li>
      </ul>
    </div>
    <smooth-scrollbar>
      <brain-table class="zshl_table_wrap" 
                  :tableData="tableData" 
                  :columns="zswhTbColumns"
                  :splitTableName="'浙商互联'"
                  :listLoading="listLoading" />
    </smooth-scrollbar>
  </section>
</template>

<script>
// 工具
import BrainTable from '../tipComponents/BrainTable'

export default {
  components: {
    BrainTable
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
      zswhTbColumns: [
        { prop: 'work_module', label: '工作模块', align: 'center'}, 
        { prop: 'order_number', label: '序号', align: 'center'}, 
        { prop: 'project_contents', label: '项目内容'}, 
        { prop: 'responsible_leader', label: '责任领导', align: 'center'},
        { prop: 'responsible_staff', label: '协调人员', align: 'center'},
        { prop: 'project_progression', label: '项目进度'}
      ],
    }
  },

  methods: {
  },
}
</script>

<style lang="less" scoped>
@import url('./less/cntTable');

.zshl_table_wrap {
  ::v-deep .el-table__header-wrapper, ::v-deep .el-table__body-wrapper {
    table {
      thead, tbody {
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
</style>