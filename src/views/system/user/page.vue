<template>
  <d2-container>
    <page-header
      slot="header"
      @submit="handleSubmit"
      ref="header"/>
    <page-main
      :table-data="table"
      :loading="loading"/>
    <page-footer
      slot="footer"
      :current="page.pageCurrent"
      :size="page.pageSize"
      :total="page.pageTotal"
      @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
import { getUserList } from '@api/user'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'system-user-index',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('./components/PageFooter')
  },
  data () {
    return {
      table: [],
      loading: false,
      page: {
        page: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  activated () {
  },
  methods: {
    handlePaginationChange (val) {
      // this.$notify({
      //   title: '分页变化',
      //   message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
      // })
      this.page = {
        page: val.current,
        pageSize: val.size,
        pageTotal: val.total
      }
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    handleSubmit (form) {
      this.loading = true
      getUserList({
        ...form,
        ...this.page
      })
        .then(res => {
          this.loading = false
          this.table = res.list
          this.page.pageTotal = res.totalCount
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '表格数据请求异常'
          })
          console.log('err', err)
        })
    }
  }
}
</script>
