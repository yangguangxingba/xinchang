<!-- 浙商互联表格 -->
<template>
  <section class="map_item_cont">
    <div class="mancnt_top">
      <ul>
        <li>2022年度重点工作推进表</li>
      </ul>
    </div>
    <smooth-scrollbar>
      <!-- <el-table class="zshl_table_wrap" :data="tableData" :span-method="splitCellMethod" v-loading="listLoading" align="left"> -->
      <el-table class="zshl_table_wrap" :data="tableData" :span-method="splitCellMethod" align="left">
        <el-table-column label="工作模块" prop="work_module" align="center" />
        <el-table-column label="序号" prop="order_number" align="center" />
        <el-table-column label="项目内容" prop="project_contents" />
        <el-table-column label="责任领导" prop="responsible_leader" align="center" />
        <el-table-column label="协调人员" prop="responsible_staff" align="center" />
        <!-- <el-table-column label="项目进度" prop="project_progression" /> -->
        <el-table-column label="项目进度">
          <template slot-scope="scope">
            {{ scope.row.project_progression }}
          </template>
        </el-table-column>
      </el-table>
      <!-- <brain-table class="zshl_table_wrap" 
                  :tableData="tableData" 
                  :columns="zswhTbColumns"
                  :splitTableName="'浙商互联'"
                  :listLoading="listLoading" /> -->
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
  },

  data() {
    return {
      listLoading: false,

      zswhTbColumns: [
        { prop: 'work_module', label: '工作模块', align: 'center'}, 
        { prop: 'order_number', label: '序号', align: 'center'}, 
        { prop: 'project_contents', label: '项目内容'}, 
        { prop: 'responsible_leader', label: '责任领导', align: 'center'},
        { prop: 'responsible_staff', label: '协调人员', align: 'center'},
        { prop: 'project_progression', label: '项目进度'},
      ],
    }
  },

  methods: {
    initTable() {
      
    },
    splitCellMethod({ row, column, rowIndex, columnIndex }) {
      // 浙商互联合并单元格
      // 第一行
      if(rowIndex === 0) {
        // 第一行不变
        return [1,1]
      } else {
        // 第一列
        if(columnIndex === 0) {
          // 第二行向下合并4行
          if(rowIndex === 1) {
            return [4, 1]
          }

          // 删除多余单元格
          return [0, 0]
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import url('./less/cntTable');

.zshl_table_wrap {
  &.el-table {
    width: 100%;
    background: @lgnMainColor;
    border: none;
    overflow-y: auto;

    &::before {
      display: none;
    }

    ::v-deep .hidden-columns {
      display: none;
    }

    ::v-deep .el-loading-mask {
      background-color: @loadingMask
    }

    ::v-deep .el-table__header-wrapper, ::v-deep .el-table__body-wrapper {
      .el-table__empty-block {
        span {
          font-size: 12px;
          color: #fff;
        }
      }

      table {
        colgroup {
          display: none;
        }

        thead, tbody {
          tr {
            background: @lgnMainColor;
            border: none;

            &:hover {
              td {
                background: initial;
              }
            }

            th, td {
              padding: 0;
              background: @lgnMainColor;
              border: none;

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

              .cell {
                padding: 0;
                background: #143663;
                font-family: @pingFontFamily;
                font-size: 12px;
                color: #fff;
                overflow: initial;
                /*内容超出后隐藏*/
                text-overflow: initial;
                /* 超出内容显示为省略号 */
                white-space: initial;
                /* 文本不进行换行 */
              }
            }
          }
        }
      }
    }

    ::v-deep .el-table__header-wrapper {
      table {
        thead {
          tr {
            th {
              .cell {
                color: #58B2FF;
                padding: 12px 0;
                font-weight: 600;
                color: #fff;
                background: #0954a6;
                text-align: center;
              }
            }
          }
        }
      }
    }

    ::v-deep .el-table__body-wrapper {
      table {
        tbody {
          tr {
            &:hover {
              td, .cell {
                background: #0d284e;
              }
            }

            &:nth-child(odd) {
              td {
                .cell {
                  background: initial;
                }
              }
            }

            td {
              border: solid 1px #0d284e;

              .cell {
                padding: 12px 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>