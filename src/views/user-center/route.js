

export default [
  {
    path: '/usercenter/info',
    name: 'userInfo',
    component: () => import('./info/index')
  },
  {
    path: '/usercenter/setting',
    name: 'userSetting',
    component: () => import('./setting/index')
  }
];
