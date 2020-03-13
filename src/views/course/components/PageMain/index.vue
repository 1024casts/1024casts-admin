<template>
  <div>
    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="Id" width="50">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src=scope.row.cover_image lazy>
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="260" align="center">
        <template slot-scope="scope">
            {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="更新状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.update_status].type">
            {{statusMap[scope.row.update_status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="发布状态" width="80" align="center">
        <template slot-scope="scope">
          <boolean-control-mini
            :value="scope.row.is_publish"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }">
            <d2-icon
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"/>
            <d2-icon
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
              slot="inactive"/>
          </boolean-control-mini>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="150">
        <template slot-scope="scope">
          {{scope.row.updated_at}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
// import BooleanControl from '../BooleanControl'
import BooleanControlMini from '../BooleanControlMini'
export default {
  components: {
    // BooleanControl,
    BooleanControlMini
  },
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      downloadColumns: [
        { label: '卡密', prop: 'key' },
        { label: '面值', prop: 'value' },
        { label: '状态', prop: 'type' },
        { label: '管理员', prop: 'admin' },
        { label: '管理员备注', prop: 'adminNote' },
        { label: '创建时间', prop: 'dateTimeCreat' },
        { label: '使用状态', prop: 'used' },
        { label: '使用时间', prop: 'dateTimeUse' }
      ],
      statusMap: {
        0: {
          text: '新建',
          type: ''
        },
        1: {
          text: '预告',
          type: 'info'
        },
        2: {
          text: '更新中',
          type: 'warn'
        },
        3: {
          text: '已完结',
          type: 'success'
        }
      }
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleSwitchChange (val, index) {
      const oldValue = this.currentTableData[index]
      this.$set(this.currentTableData, index, {
        ...oldValue,
        type: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
