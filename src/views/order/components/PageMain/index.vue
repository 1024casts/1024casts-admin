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

      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
            {{scope.row.order_amount}}
        </template>
      </el-table-column>

      <el-table-column label="支付金额" align="center">
        <template slot-scope="scope">
            {{scope.row.pay_amount}}
        </template>
      </el-table-column>

      <el-table-column label="支付方式" align="center">
        <template slot-scope="scope">
            {{scope.row.pay_method}}
        </template>
      </el-table-column>

      <el-table-column label="支付时间" align="center">
        <template slot-scope="scope">
            {{scope.row.paid_at}}
        </template>
      </el-table-column>

      <el-table-column label="支付状态" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="payStatusMap[scope.row.status].type">
            {{payStatusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="140">
        <template slot-scope="scope">
          {{scope.row.updated_at}}
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
      payStatusMap: {
        'pending': {
          text: '新建',
          type: 'info'
        },
        'paid': {
          text: '已支付',
          type: 'success'
        },
        'canceled': {
          text: '已取消',
          type: 'warn'
        },
        'completed': {
          text: '已完结',
          type: 'info'
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
