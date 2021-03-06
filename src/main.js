import Vue from 'vue'
import App from './App.vue'

//1.引入element-ui
import ElementUI from "element-ui";

//2.引入样式
import 'element-ui/lib/theme-chalk/index.css';

// 1.引入axios
import axios from 'axios';

//引入vuex仓库
import store from './store'
// import router from './router'

//导入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"

import CategoryList from "./pages/category/CategoryList.vue"
import CategoryAdd from "./pages/category/CategoryAdd.vue"
import CategoryEdit from "./pages/category/CategoryEdit.vue"

import GoodsList from "./pages/goods/GoodsList.vue"
import GoodsAdd from "./pages/goods/GoodsAdd.vue"
import GoodsEdit from "./pages/goods/GoodsEdit.vue"

import VueRouter from "vue-router";
Vue.use(VueRouter);
//配置路由
const routes = [
  {path:"/",redirect: "/admin"},
  {path:"/login",component:Login,meta:"登录页"},
  {path:"/admin",component:Admin,meta:"首页",redirect: "/admin/goods-list",children:[
    {path:"category-list",component:CategoryList,meta:"栏目列表"},
    {path:"category-add",component:CategoryAdd,meta:"添加栏目"},
    {path:"category-edit/:id",component:CategoryEdit,meta:"编辑栏目"},
    {path:"goods-list",component:GoodsList,meta:"商品列表"},
    {path:"goods-add",component:GoodsAdd,meta:"添加商品"},
    {path:"goods-edit/:id",component:GoodsEdit,meta:"编辑商品"}
  ]}
]
//创建路由对象
const router=new VueRouter({routes});

//3.全局注册组件
Vue.use(ElementUI);
Vue.config.productionTip = false;

//给axios每次请求自动加上域名
axios.defaults.baseURL="http://localhost:8899";

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
