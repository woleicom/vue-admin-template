const getters = {
  language: state => state.app.language,
  userToken: state => state.user.token,
  userInfo: state => state.user.info,
}
export default getters