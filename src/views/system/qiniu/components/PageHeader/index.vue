<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="Bucket" prop="bucket">
      <el-select
        v-model="form.bucket"
        placeholder="选择"
        style="width: 180px;">
        <el-option label="线上-私有" value="phpcasts"/>
        <el-option label="本地测试" value="test"/>
        <el-option label="线上-public" value="public-phpcasts"/>
        <el-option label="本地测试-公开" value="test-public"/>
        <el-option label="数据库备份-私有" value="backup"/>
      </el-select>
    </el-form-item>

    <el-form-item label="资源前缀" prop="prefix">
      <el-select
        v-model="form.prefix"
        placeholder="选择"
        style="width: 140px;">
        <el-option label="全部" value=""/>
        <el-option label="图片带/" value="/uploads/image"/>
        <el-option label="图片不带/" value="uploads/image"/>
        <el-option label="视频带/" value="/uploads/video"/>
        <el-option label="视频不带/" value="uploads/video"/>
        <el-option label="数据库" value="DB_"/>
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
        bucket: '',
        prefix: ''
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
