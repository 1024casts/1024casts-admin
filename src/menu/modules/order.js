export default {
  path: '/order',
  title: '订单管理',
  icon: 'flask',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '订单首页',
      icon: 'home'
    }
  ])('/order/')
}
