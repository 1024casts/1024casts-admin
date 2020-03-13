<template>
  <div class="cs-p">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading">
      <div slot="header" class="cs-tc clearfix">
        <span>{{stateMap[state]}}</span>
      </div>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px">

        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入课程名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="分类">
          <el-select v-model="form.type" placeholder="分类">
            <el-option label="后端" value="backend"></el-option>
            <el-option label="前端" value="frontend"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="form.keywords"
            placeholder="可输入文章关键词"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="form.description"
            placeholder="可输入文章描述"
            type="textarea"
            :rows="3"/>
        </el-form-item>

        <el-form-item
          label="内容"
          prop="description">
          <el-input
            v-model="form.content"
            placeholder="内容"
            type="textarea"
            :rows="8"/>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addCourse, updateCourse } from '@/api/course'

export default {
  components: {},
  props: {
    // 编辑状态
    state: {
      type: String,
      required: true,
      default: 'create'
    },
    // // 表单数据
    // formData: {
    //   type: Object,
    //   required: false,
    //   default: () => {}
    // },
    // 加载状态
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      dialogLoading: false,
      stateMap: {
        create: '新增课程',
        update: '编辑课程'
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      form: {
        name: '',
        keywords: '',
        description: '',
        content: '',
        status: '1'
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
        keywords: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
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
        content: [
          {
            max: 60,
            message: '长度不能大于 60 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    formData: {
      handler (val) {
        if (this.state === 'update') {
          // 更新数据
          this.form = val

          // 更新富文本
          // if (this.$refs.tinymce) {
          //   this.$refs.tinymce.destroyTinymce()
          //   this.$refs.tinymce.initTinymce()
          //   this.$refs.tinymce.setContent(val.content)
          // }

          // 清除表单验证
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
        }
      }
    }
  },
  methods: {
    // 关闭当前窗口
    handleClose () {
      this.close({
        tagName: this.$route.fullPath
      })
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
    // 新增文章
    handleCreate () {
      addCourse({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.handleClose()
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新文章
    handleUpdate () {
      updateCourse({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.handleClose()
        })
        .finally(() => {
          this.dialogLoading = false
        })
    }
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
</style>
