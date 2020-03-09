<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="更新状态" prop="update_status">
      <el-select
        v-model="form.update_status"
        placeholder="状态选择"
        style="width: 100px;">
        <el-option label="全部" value="-1"/>
        <el-option label="新建" value="0"/>
        <el-option label="预告" value="1"/>
        <el-option label="更新中" value="2"/>
        <el-option label="已完结" value="3"/>
      </el-select>
    </el-form-item>

    <el-form-item label="课程名称" prop="name">
      <el-input
        v-model="form.name"
        placeholder="课程名称"
        style="width: 100px;"/>
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
        update_status: '-1',
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
