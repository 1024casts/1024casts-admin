export default {
  path: '/course',
  title: '课程管理',
  icon: 'flask',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '课程首页',
      icon: 'home'
    }
  ])('/course/')
}
