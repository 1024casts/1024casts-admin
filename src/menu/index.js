
// 课程
import course from './modules/course'
import video from './modules/video'

// 菜单 侧边栏
export const menuAside = [
  course,
  video
]

// 菜单 顶栏
export const menuHeader = [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    path: '/course',
    title: '课程',
    icon: 'flask'
  },
  {
    path: '/video',
    title: '视频',
    icon: 'video-camera'
  },
  {
    path: '/order',
    title: '订单',
    icon: 'cny'
  },
  {
    path: '/plan',
    title: 'Plan管理',
    icon: 'bars'
  },
  {
    path: '/course',
    title: '用户管理',
    icon: 'user'
  },
  {
    path: '/course',
    title: '设置',
    icon: 'cog'
  }
]
