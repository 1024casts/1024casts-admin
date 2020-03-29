import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/system',
  name: 'system',
  meta,
  redirect: { name: 'system-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('system/index'),
      meta: {
        ...meta,
        title: '系统首页'
      }
    },
    {
      path: 'user/index',
      name: `${pre}user-index`,
      component: _import('system/user/index'),
      meta: {
        ...meta,
        title: '用户管理'
      }
    },
    {
      path: 'qiniu/index',
      name: `${pre}qiniu-index`,
      component: _import('system/qiniu/index'),
      meta: {
        ...meta,
        title: '七牛管理'
      }
    }
  ])('system-')
}
