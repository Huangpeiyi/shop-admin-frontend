<template>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu :index="`${index+1}`"  v-for="(item,index) in menus" :key="index">

        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>

        <el-menu-item-group>
          <!-- <span slot="title">分组一</span> -->
          <el-menu-item :index="`${index+1}-${subindex+1}`" v-for="(subitem,subindex) in item.group" :key="subindex">
              <router-link :to="subitem.src" class="aaa">{{subitem.title}}</router-link>
           </el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
      return {                
        menus:[
            {icon:'el-icon-menu',title:'购物商场',group:[
                {src:'/admin/goods-list',title:'商品管理'},
                {src:'/admin/category-list',title:'栏目管理'}
            ]},
            {icon:'el-icon-star-off',title:'会员管理',group:[
                {src:'#',title:'会员列表'}
            ]},
            {icon:'el-icon-tickets',title:'订单管理',group:[
                {src:'#',title:'订单列表'}
            ]}
        ]
      };
    },
    props: ["isCollapse"],
  }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

/* 设置菜单的样式高度为填满剩余的空间*/
.el-menu-vertical-demo {
  flex: 1;
  border-right: none;
}

/*把title隐藏*/
.el-menu-item-group__title {
  display: none;
}
.el-submenu .el-menu-item{
    padding:0!important;
}
.el-menu-vertical-demo a{
	color:inherit;
	text-decoration: none;
    display:block;
    width:100%;
    height:100%;
    padding-left:40px;
}
.aaa{
    color:inherit;
    text-decoration: none;
}
.el-submenu [class^=el-icon-] {
    margin-top: 8px;
}
</style>
