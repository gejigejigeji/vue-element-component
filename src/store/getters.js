const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  name: state => state.user.name,
  user_id: state => state.user.user_id,
  pages: state => state.user.pages,
  is_info: state => state.user.is_info,//判断是否已提完权限接口
  permission: state => state.user.permission,
  permission_routers: state => state.permission.routers,


  baseUrl: state => state.setting.baseUrl, //接口配置
  pagination: state => state.setting.pagination, //页码配置
  loading: state => state.setting.loading, //loading配置
  params: state => state.setting.params, //params配置
  props: state => state.setting.props, //props配置

};
export default getters
