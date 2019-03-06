<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item.src }"
        v-for="(item,index) in breadcrumb"
        :key="index"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumb() {
      //console.log(this.$route.matched);
      var matched = this.$route.matched;
      var newArr = matched.map(v => {
        return {
          src: v.path,
          title: v.meta
        };
      });
      //console.log(newArr);
      return newArr;
    }
  }
};
</script>

<style>
</style>
