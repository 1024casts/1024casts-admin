<template>
  <d2-container>
    <page-edit
      state="update"
      :loading="loading">
    </page-edit>
  </d2-container>
</template>

<script>
import { getCourseList } from '@/api/course'

export default {
  name: 'course-update',
  components: {
    'PageEdit': () => import('./components/PageEdit')
  },
  data () {
    return {
      // 加载状态
      loading: true
    }
  },
  mounted () {
    getCourseList(null)
      .then(res => {
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
