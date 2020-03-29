<template>
  <div>
    <!-- order list -->
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

      <el-table-column label="资源哈希值">
        <template slot-scope="scope">
          {{scope.row.hash}}
        </template>
      </el-table-column>

      <el-table-column label="key">
        <template slot-scope="scope">
          {{scope.row.key}}
        </template>
      </el-table-column>

      <el-table-column label="类型">
        <template slot-scope="scope">
            {{scope.row.mimeType}}
        </template>
      </el-table-column>

      <el-table-column label="大小">
        <template slot-scope="scope">
            {{scope.row.fsize}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  components: {
    // BooleanControl,
    // BooleanControlMini
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
      dialogLoading: false,
      currentTableData: [],
      multipleSelection: [],
      statusMap: {
        0: {
          text: '未激活',
          type: 'warning'
        },
        1: {
          text: '已激活',
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
    handleClose () {

    },
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
    }
  }
}
</script>

<style scoped>
</style>
