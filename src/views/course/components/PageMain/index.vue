<template>
  <div>
    <el-button
      size="small"
      type="primary"
      @click="handleAddCouse()">
      <d2-icon name="add"/>
      添加新课程
    </el-button>

    <!-- course list -->
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

      <el-table-column label="名称" width="360" align="center">
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

      <el-table-column label="发布状态" width="160" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_publish"
            active-text="上线"
            inactive-text="下线"
            :active-value="1"
            :inactive-value="0"
            @change="handleCoursePublishStatus($event, scope.row)">
          </el-switch>
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

      <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEditCourse(scope.$index, scope.row)"
            type="text">编辑</el-button>
          <el-button
          size="small"
          @click="handleSection(scope.row)"
          type="text">章节管理</el-button>
          <el-button
            size="small"
            @click="handleVideoList(scope.$index, scope.row)"
            type="text">视频管理</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- course form -->
    <el-dialog :title="courseFormTitle" :visible.sync="dialogEditCourse" width="80%" top="2vh">
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
          label="slug"
          prop="slug">
          <el-input
            v-model="form.slug"
            placeholder="slug"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="分类">
          <el-select v-model="form.type" placeholder="分类">
            <el-option label="后端" value="backend"></el-option>
            <el-option label="前端" value="frontend"></el-option>
            <el-option label="工具" value="tool"></el-option>
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
          label="封面图"
          prop="description">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8081/v1/upload/image"
            accept="image/jpeg,image/gif,image/png"
            :show-file-list="false"
            drag
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload">
            <img v-if="form.cover_url" :src="form.cover_url" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
            <input type="hidden" v-model="form.cover_key" />
          </el-upload>
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content">
          <el-input
            v-model="form.content"
            placeholder="内容"
            type="textarea"
            :rows="8"/>
        </el-form-item>

        <el-form-item
          label="更新状态"
          prop="update_status">
          <el-radio-group v-model="form.update_status">
            <el-radio-button label="0">新建</el-radio-button>
            <el-radio-button label="1">预告</el-radio-button>
            <el-radio-button label="2">更新中</el-radio-button>
            <el-radio-button label="3">已完结</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleCourseConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleCourseClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 章节form -->
    <el-dialog :title="sectionFormTitle" :visible.sync="dialogEditSection" width="80%">
      <el-form
        ref="form"
        :model="sectionForm"
        label-width="80px">

        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="sectionForm.name"
            placeholder="请输入章节名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="排序值"
          prop="weight">
          <el-input
            v-model="sectionForm.weight"
            placeholder="排序值"
            :clearable="true"/>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleCourseConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleSectionFormClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- video form -->
    <el-dialog :title="videoFormTitle" :visible.sync="dialogEditVideo" width="80%" top="2vh">
      <el-form
        ref="videoForm"
        :model="videoForm"
        :rules="videoRules"
        label-width="100px">

        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="videoForm.name"
            placeholder="请输入视频名称"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="episode_id"
          prop="episode_id">
          <el-input
            v-model="videoForm.episode_id"
            placeholder="episode_id"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="关键词"
          prop="keywords">
          <el-input
            v-model="videoForm.keywords"
            placeholder="可输入文章关键词"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description">
          <el-input
            v-model="videoForm.description"
            placeholder="可输入文章描述"
            type="textarea"
            :rows="3"/>
        </el-form-item>

        <el-form-item
          label="封面图"
          prop="cover_key">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8081/v1/upload/image"
            accept="image/jpeg,image/gif,image/png"
            :show-file-list="false"
            drag
            :on-success="handleVideoImageSuccess"
            :before-upload="beforeVideoImageUpload">
            <img v-if="videoForm.cover_url" :src="videoForm.cover_url" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
            <input type="hidden" v-model="videoForm.cover_key" />
          </el-upload>
        </el-form-item>

        <el-form-item
          label="视频"
          prop="video_key">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8081/v1/upload/video"
            accept="'.mp4'"
            :show-file-list="false"
            :on-success="handleVideoSuccess"
            :before-upload="beforeVideoUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <span>{{ videoForm.mp4_key }}</span>
          </el-upload>
          <video
            v-if="videoForm.mp4_key"
            ref="videoBox"
            id="testVideo"
            class="video-js"
            height="300px"
            preload="auto"
            controls=""
            :src="videoForm.mp4_url">
            </video>
        </el-form-item>

        <el-form-item
          label="视频总长度"
          prop="duration">
          <el-input
            v-model="videoForm.duration"
            placeholder="视频总长度，单位秒"/>
        </el-form-item>

        <el-form-item
          label="是否免费"
          prop="is_free">
          <el-radio v-model="videoForm.is_free" label="1" border>免费</el-radio>
          <el-radio v-model="videoForm.is_free" label="0" border>收费</el-radio>
        </el-form-item>

        <el-form-item
          label="是否发布"
          prop="is_publish">
          <el-radio v-model="videoForm.is_publish" label="1" border>是</el-radio>
          <el-radio v-model="videoForm.is_publish" label="0" border>否</el-radio>
        </el-form-item>

        <el-form-item size="small">
          <el-button type="primary" :loading="dialogLoading" @click="handleVideoConfirm">{{stateButton[state]}}</el-button>
          <el-button @click="handleVideoFormClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="章节管理" :visible.sync="dialogSectionVisible" width="80%">
      <el-table :data="sectionGridData">
        <el-table-column property="name" label="名称" width="150"></el-table-column>
        <el-table-column property="weight" label="排序值"></el-table-column>
        <el-table-column property="created_at" label="创建时间"></el-table-column>
        <el-table-column property="updated_at" label="更新时间"></el-table-column>
        <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEditSection(scope.$index, scope.row)"
            type="text">编辑</el-button>
          <el-button
            size="small"
            @click="handleVideo(scope.$index, scope.row)"
            type="text">视频管理</el-button>
          <el-button
            size="small"
            @click="handleDeleteSection(scope.$index, scope.row)"
            type="text">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="视频管理" :visible.sync="dialogVideoVisible" width="80%">
      <el-row>
        <el-button type="primary" size="small" @click="handleAddVideo()">添加视频</el-button>
      </el-row>
      <el-table :data="videoGridData" max-height="500">
        <el-table-column property="name" label="名称" width="150"></el-table-column>
        <el-table-column property="course_id" label="课程id"></el-table-column>
        <el-table-column property="is_free" label="是否免费"></el-table-column>
        <el-table-column property="duration" label="时长"></el-table-column>
        <el-table-column property="created_at" label="创建时间"></el-table-column>
        <el-table-column property="updated_at" label="更新时间"></el-table-column>
        <el-table-column
        label="操作"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEditVideo(scope.$index, scope.row)"
            type="text">编辑</el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { addCourse, updateCourse, updateCoursePublishStatus, getSectionList, getVideoList, addVideo, updateVideo } from '@api/course'
// import BooleanControl from '../BooleanControl'
// import BooleanControlMini from '../BooleanControlMini'
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
      state: 'create',
      dialogLoading: false,
      stateMap: {
        create: '新增课程',
        update: '编辑课程'
      },
      stateButton: {
        create: '确定',
        update: '修改'
      },
      currentTableData: [],
      multipleSelection: [],
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
      },
      courseFormTitle: '添加课程',
      form: {
        id: undefined,
        name: '',
        keywords: '',
        description: '',
        slug: '',
        cover_url: '',
        cover_key: '',
        content: '',
        update_status: 0
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
      },
      sectionForm: {
        name: '',
        weight: 0
      },
      dialogEditCourse: false,
      dialogSectionVisible: false,

      dialogEditSection: false,
      sectionFormTitle: '添加章节',
      sectionGridData: [],

      // video attr
      videoState: 'create',
      videoStateMap: {
        create: '新增视频',
        update: '编辑视频'
      },
      videoStateButton: {
        create: '确定',
        update: '修改'
      },
      // 列表
      dialogVideoVisible: false,
      videoGridData: [],
      // form
      dialogEditVideo: false,
      videoFormTitle: '添加视频',
      videoForm: {
        id: undefined,
        course_id: undefined,
        section_id: undefined,
        name: '',
        keywords: '',
        description: '',
        cover_key: '',
        cover_url: '',
        mp4_key: '',
        mp4_url: '',
        content: '',
        duration: 0,
        length: '',
        is_free: 0,
        is_publish: 0
      },
      videoRules: {
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
            max: 500,
            message: '长度不能大于 500 个字符',
            trigger: 'blur'
          }
        ]
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
    handleCourseClose () {
      this.dialogEditCourse = false
    },
    handleAddCouse () {
      this.courseFormTitle = '添加课程'
      this.state = 'create'
      this.dialogEditCourse = true
    },
    handleEditCourse (index, row) {
      // 处理数据
      this.form = row

      this.courseFormTitle = '编辑课程'
      this.state = 'update'
      this.dialogEditCourse = true
    },
    handleClose () {

    },
    // 确认新增或修改
    handleCourseConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.state === 'create' ? this.handleCreateCourse() : this.handleUpdateCourse()
        }
      })
    },
    // 新增课程
    handleCreateCourse () {
      this.form.update_status = parseInt(this.form.update_status)
      this.form.is_publish = parseInt(this.form.is_publish)
      addCourse({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.dialogEditCourse = false
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新课程
    handleUpdateCourse () {
      this.form.update_status = parseInt(this.form.update_status)
      this.form.is_publish = parseInt(this.form.is_publish)
      updateCourse({ ...this.form })
        .then(res => {
          this.$message.success('操作成功')
          this.dialogEditCourse = false
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    handleImageSuccess (res, file) {
      console.log('res', res)
      console.log('file', file)
      this.form.cover_url = res.data.url
      this.form.cover_key = res.data.key
    },
    beforeImageUpload (file) {
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
    handleSection (row) {
      console.log(row)
      this.dialogSectionVisible = true
      getSectionList({
        ...row
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '章节数据请求完毕'
          })
          this.sectionGridData = res.list
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '章节数据请求异常'
          })
          console.log('err', err)
        })
    },
    handleEditSection (index, row) {
      console.log(index, row)
      this.sectionFormTitle = '编辑' + row.name
    },
    handleSectionFormClose () {
      this.dialogEditSection = false
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleVideoFormClose () {
      this.dialogEditVideo = false
    },
    handleVideo (index, row) {
      // for section
      this.videoGridData = row.video_items
      this.dialogVideoVisible = true
    },
    handleVideoList (index, row) {
      this.videoForm.course_id = row.id
      getVideoList({ ...row })
        .then(res => {
          this.videoGridData = res.list
          this.dialogVideoVisible = true
        })
        .finally(() => {
          // this.dialogVideoVisible = false
        })
    },
    handleAddVideo () {
      this.videoFormTitle = '添加视频'
      this.dialogEditVideo = true
      this.videoState = 'create'
    },
    handleEditVideo (index, row) {
      console.log(index, row)
      this.videoFormTitle = '编辑视频'
      this.dialogEditVideo = true
      this.videoState = 'update'
      this.videoForm = row
    },
    // 确认新增或修改
    handleVideoConfirm () {
      this.$refs.videoForm.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          this.videoState === 'create' ? this.handleCreateVideo() : this.handleUpdateVideo()
        }
      })
    },
    // 新增视频
    handleCreateVideo () {
      this.videoForm.is_free = parseInt(this.videoForm.is_free)
      this.videoForm.is_publish = parseInt(this.videoForm.is_publish)
      this.videoForm.duration = parseInt(this.videoForm.duration)
      this.videoForm.episode_id = parseInt(this.videoForm.episode_id)
      addVideo({ ...this.videoForm })
        .then(res => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    // 更新视频
    handleUpdateVideo () {
      this.videoForm.is_free = parseInt(this.videoForm.is_free)
      this.videoForm.is_publish = parseInt(this.videoForm.is_publish)
      this.videoForm.duration = parseInt(this.videoForm.duration)
      this.videoForm.episode_id = parseInt(this.videoForm.episode_id)
      updateVideo({ ...this.videoForm })
        .then(res => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    handleVideoImageSuccess (res, file) {
      console.log('res', res)
      console.log('file', file)
      this.videoForm.cover_url = res.data.url
      this.videoForm.cover_key = res.data.key
    },
    beforeVideoImageUpload (file) {
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
    handleVideoSuccess (res, file) {
      console.log('res', res)
      console.log('file', file)
      this.videoForm.mp4_key = res.data.key
      this.videoForm.mp4_url = res.data.url
    },
    beforeVideoUpload (file) {
      // const isImage = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt50M = file.size / 1024 / 1024 < 50

      // if (!isImage) {
      //   this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      // }
      if (!isLt50M) {
        this.$message.error('上传视频大小不能超过 50MB!')
      }
      return isLt50M
    },
    handleCoursePublishStatus (isPublish, row) {
      console.log('event', isPublish)
      updateCoursePublishStatus({ ...row })
        .then(res => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.dialogLoading = false
        })
    }
  }
}
</script>

<style scoped>
</style>
