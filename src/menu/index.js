
// 课程
import course from './modules/course'
import order from './modules/order'
import plan from './modules/plan'
import system from './modules/system'

// 菜单 侧边栏
export const menuAside = [
  course,
  order,
  plan,
  system
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
    path: '/plan',
    title: 'plan',
    icon: 'calendar'
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
