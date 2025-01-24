import App from './App'
import router from './router/router'
import pinia from './store'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(router)
  app.use(uviewPlus)
  
  // 挂载uview-plus
  uni.$u = uviewPlus
  
  return {
    app
  }
}
// #endif