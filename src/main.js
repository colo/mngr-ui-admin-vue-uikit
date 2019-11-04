import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'
Vue.config.productionTip = false
Vue.use(Vuikit)
Vue.use(VuikitIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
