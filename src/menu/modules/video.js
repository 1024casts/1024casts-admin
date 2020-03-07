export default {
  path: '/video',
  title: '视频管理',
  icon: 'play-circle',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '视频首页',
      icon: 'home'
    },
    {
      path: `${pre}list`,
      title: '视频列表',
      icon: 'list'
    },
    {
      path: `${pre}top10`,
      title: 'top10视频',
      icon: 'line-chart'
    }
  ])('/video/')
}
