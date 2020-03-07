export default {
  path: '/course',
  title: '课程管理',
  icon: 'flask',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '课程首页',
      icon: 'home'
    },
    {
      path: `${pre}list`,
      title: '课程列表',
      icon: 'list'
    },
    {
      path: `${pre}create`,
      title: '添加课程',
      icon: 'pencil'
    }
  ])('/course/')
}
