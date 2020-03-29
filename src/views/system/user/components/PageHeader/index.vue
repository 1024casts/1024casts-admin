<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="订单号" prop="name">
      <el-input
        v-model="form.id"
        placeholder="订单号"
        style="width: 250px;"/>
    </el-form-item>

    <el-form-item label="支付状态" prop="update_status">
      <el-select
        v-model="form.status"
        placeholder="支付选择"
        style="width: 120px;">
        <el-option label="全部" value="all"/>
        <el-option label="新建" value="pending"/>
        <el-option label="已支付" value="paid"/>
        <el-option label="已取消" value="canceled"/>
        <el-option label="已完成" value="completed"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        status: 'all',
        user: '',
        key: '',
        note: ''
      },
      rules: {
        type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ]
      }
    }
  },
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
