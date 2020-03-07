
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
    title: '课程管理',
    icon: 'flask'
  },
  {
    path: '/video',
    title: '视频管理',
    icon: 'play-circle'
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
