<template>
<div class="admin-container">
  <el-container>
    <el-aside width="auto">
        <!-- 预留放logo的位置 -->
        <div class="logo"></div>
        <app-aside :isCollapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header>
          <app-header @onChange="handleCollapse"></app-header>
      </el-header>
      <el-main>
          <breadcrumb></breadcrumb>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
    name:"admin-index",
    components:{
        "app-aside" :Aside,
        "app-header" :Header,
        "breadcrumb":Breadcrumb
    },
    data(){
        return{
            isCollapse:false
        }
        
    },
    methods:{
        handleCollapse(){
            this.isCollapse=!this.isCollapse;
        }
    }
};
</script>

<style>
/* container外层的div */
.admin-container{
    position: fixed;
    width:100%;
    top:0;
    bottom:0;
}

.el-header {
    color: #333;
    
  }
  
  .el-aside {
      display: flex;
      flex-direction: column;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-container {
    margin-bottom: 40px;
    /*继承admin-container的高度*/
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .logo{
      height:60px;
      background:#454f5a;
  }
</style>
