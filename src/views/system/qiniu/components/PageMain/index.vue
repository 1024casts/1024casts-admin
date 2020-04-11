<template>
  <div>
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleUpload">上传图片</el-button>
      </el-form-item>
    </el-form>

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

      <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlePreview(scope.$index, scope.row)"
            type="text">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="上传图片" :visible.sync="dialogUploadVisible" width="50%" :center=true>
      <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8081/v1/upload/image"
            accept="image/jpeg,image/gif,image/png"
            :show-file-list="false"
            drag
            :on-success="handleSuccess"
            :before-upload="beforeUpload">
            <img v-if="previewImageUrl" :src="previewImageUrl" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
          </el-upload>
    </el-dialog>
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
      dialogUploadVisible: false,
      previewImageUrl: '',
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
    handleUpload () {
      this.dialogUploadVisible = true
    },
    handleSuccess (res, file) {
      this.previewImageUrl = res.data.url
    },
    beforeUpload (file) {
      const isImage = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isImage && isLt5M
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
    handlePreview (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
</style>
