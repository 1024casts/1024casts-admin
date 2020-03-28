
// 课程
import course from './modules/course'
import order from './modules/order'

// 菜单 侧边栏
export const menuAside = [
  course,
  order
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
    path: '/order',
    title: '订单',
    icon: 'cny'
  },
  {
    path: '/system',
    title: '系统',
    icon: 'television'
  },
  {
    path: '/course',
    title: '设置',
    icon: 'cog'
  }
]
