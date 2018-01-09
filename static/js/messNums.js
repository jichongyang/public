export default {
  install(Vue, options) {
    Vue.prototype.$myGlobalMethod = opts => {
      window.alert(JSON.stringify(opts))
    }
  }
}