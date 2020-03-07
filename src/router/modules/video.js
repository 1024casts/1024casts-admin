import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/video',
  name: 'video',
  meta,
  redirect: { name: 'video-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('video/index'),
      meta: {
        ...meta,
        title: '视频首页'
      }
    },
    {
      path: 'list',
      name: `${pre}list`,
      component: _import('video/list'),
      meta: {
        ...meta,
        title: '视频列表'
      }
    },
    {
      path: 'create',
      name: `${pre}create`,
      component: _import('video/create'),
      meta: {
        ...meta,
        title: '添加视频'
      }
    }
  ])('video-')
}
