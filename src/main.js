import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import service from './request'

Vue.use(ElementUI);

Vue.http = Vue.prototype.$http = service
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
