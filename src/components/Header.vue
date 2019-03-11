<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>{{username}} {{identity}}</div>
    <a href="javascript:void(0)" @click="handleLogout">退出</a>
  </el-row>
</template>

<script>
import {mapState} from "vuex";
export default {
    computed:{
        ...mapState("user",{
            username:"username",
            identity:"identity"
        })
    },
    methods:{
        handleToggle(){
            this.$emit("onChange");
        },
        handleLogout(){
            //退出操作
            this.$store.dispatch("user/logout",()=>{
                this.$router.push("/login")
            })
        }
    }
};
</script>

<style scoped lang="scss">
.header{
    height:60px;
    i{
        cursor:pointer;
    }
}
</style>
