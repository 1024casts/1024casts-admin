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

      <el-table-column label="ID" width="40">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="名称" width="80" align="center">
        <template slot-scope="scope">
            {{scope.row.name}}<br>({{scope.row.alias}})
        </template>
      </el-table-column>

      <el-table-column label="描述" width="200" align="center">
        <template slot-scope="scope">
            {{scope.row.description}}
        </template>
      </el-table-column>

      <el-table-column label="价格" width="60" align="center">
        <template slot-scope="scope">
            {{scope.row.price}}
        </template>
      </el-table-column>

      <el-table-column label="促销价格" width="100" align="center">
        <template slot-scope="scope">
            {{scope.row.promo_price}}
        </template>
      </el-table-column>

      <el-table-column label="促销时间" width="200">
        <template slot-scope="scope">
          {{scope.row.format_promo_start}} <br> 至 <br> {{scope.row.format_promo_end}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="statusMap[scope.row.status].type">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="140">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            type="text">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

     <!-- plan form -->
    <el-dialog :title="formTitle" :visible.sync="dialogEdit" width="80%">
      <el-form
        ref="form"
        :model="form"
        label-width="80px">

        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="alias"
          prop="name">
          <el-input
            v-model="form.alias"
            placeholder="请输入alias"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入描述"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="价格"
          prop="price">
          <el-input
            v-model="form.price"
            placeholder="36"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="促销价格"
          prop="price">
          <el-input
            v-model="form.promo_price"
            placeholder=""
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="促销时间"
          prop="price_time">
          <el-date-picker
            v-model="form.promo_start"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="促销开始时间">
          </el-date-picker>
            -
          <el-date-picker
            v-model="form.promo_end"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="促销结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-radio-group v-model="form.status">
            <el-radio-button label="0">下线</el-radio-button>
            <el-radio-button label="1">上线</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addPlan, updatePlan } from '@api/plan'
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
      dialogEdit: false,
      currentTableData: [],
      multipleSelection: [],
      statusMap: {
        0: {
          text: '下线',
          type: 'info'
        },
        1: {
          text: '已上线',
          type: 'success'
        }
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      form: {
        id: undefined,
        name: '',
        description: '',
        alias: '',
        price: 0,
        promo_price: 0,
        promo_start: '',
        promo_end: '',
        status: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不能大于 200 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        alias: [
          {
            max: 60,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ],
        pirce: [
          {
            max: 0,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ]
      },
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
    },
    // 编辑，打开form
    handleEdit (index, row) {
      // 处理数据
      this.form = row

      this.formTitle = '编辑plan'
      this.state = 'update'
      this.dialogEdit = true
    },
    handleClose () {
      this.dialogEdit = false
    },
    // 确认新增或修改
    handleConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.state === 'create' ? this.handleCreate() : this.handleUpdate()
        }
      })
    },
    // 新增plan
    handleCreate () {
      this.form.status = parseInt(this.form.status)
      addPlan({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.dialogEdit = false
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新plan
    handleUpdate () {
      this.form.price = parseFloat(this.form.price)
      this.form.promo_price = parseFloat(this.form.promo_price)
      this.form.status = parseInt(this.form.status)
      updatePlan({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.dialogEdit = false
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
  }
}
</script>

<style scoped>
</style>
