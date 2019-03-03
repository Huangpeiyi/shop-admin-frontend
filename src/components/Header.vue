<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>admin</div>
  </el-row>
</template>

<script>
export default {
    methods:{
        handleToggle(){
            this.$emit("onChange");
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
