export default {
  path: '/system',
  title: '系统管理',
  icon: 'flask',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '系统首页',
      icon: 'home'
    },
    {
      path: `${pre}user/index`,
      title: '用户管理',
      icon: 'user'
    },
    {
      path: `${pre}qiniu/index`,
      title: '七牛管理',
      icon: 'suitcase',
      children: ([
        {
          path: `${pre}qiniu/upload`,
          title: '上传图片',
          icon: 'upload'
        },
        {
          path: `${pre}qiniu/index`,
          title: '资源管理',
          icon: 'file'
        }
      ])
    }
  ])('/system/')
}
