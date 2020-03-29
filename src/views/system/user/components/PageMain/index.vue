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

      <el-table-column label="ID" width="70">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="70">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.avatar"
            :fit="fit">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
            {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
            {{scope.row.email}}
        </template>
      </el-table-column>

      <!-- <el-table-column label="个人网站" width="180" align="center">
        <template slot-scope="scope">
            {{scope.row.persnal_website}}
        </template>
      </el-table-column> -->

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="注册时间">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>

      <el-table-column label="最后登录IP">
        <template slot-scope="scope">
          {{scope.row.last_login_ip}}
        </template>
      </el-table-column>

      <el-table-column label="最后登录时间">
        <template slot-scope="scope">
          {{scope.row.last_login_time}}
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
