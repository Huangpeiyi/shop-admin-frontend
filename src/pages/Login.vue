<template>
<div class="login-container">
    <h3>登录</h3>
  <el-form :model="ruleForm2" status-icon label-width="60px" class="demo-ruleForm">
    <el-form-item label="密码">
      <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.ruleForm2);
    },
    resetForm() {
      this.ruleForm2 = {
        username: "",
        password: ""
      };
    }
  }
};
</script>
<style lang="scss">
*{
    margin:0;
    padding:0;
}
.login-container{
    width:300px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-150px;
    margin-top:-150px;
    h3{
        text-align: center;
        margin:30px 0;
        color:rgb(0, 162, 255);
    }
}
</style>
