export default {
  path: '/plan',
  title: 'plan管理',
  icon: 'calendar',
  children: (pre => [
    {
      path: `${pre}index`,
      title: 'plan首页',
      icon: 'home'
    }
  ])('/plan/')
}
