import Vue from 'vue'
import 'es6-promise/auto'
import App from './App'
import ErrorBoundary from './ErrorBoundary.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.performance = true // NODE_ENV === 'development' 옵션, 프로파일링 활성화

Vue.component(ErrorBoundary.name, ErrorBoundary)

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
