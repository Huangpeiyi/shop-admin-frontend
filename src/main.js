import Vue from 'vue'
import App from './App.vue'

//1.引入element-ui
import ElementUI from "element-ui";

//2.引入样式
import 'element-ui/lib/theme-chalk/index.css';

// 1.引入axios
import axios from 'axios';

// import store from './store'
// import router from './router'
//3.全局注册组件
Vue.use(ElementUI);
Vue.config.productionTip = false;

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  // store,
  // router,
  render: h => h(App)
}).$mount('#app')
