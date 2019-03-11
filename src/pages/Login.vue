<template>
<div class="login-container">
    <h3>登录</h3>
  <el-form :model="formData" status-icon label-width="60px" class="demo-ruleForm">
    <el-form-item label="账号">
      <el-input type="text" v-model="formData.uname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="formData.upwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formData')">提交</el-button>
      <el-button @click="resetForm('formData')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      //console.log(this.formData);
      // this.$axios({
      //   url:"/admin/account/login",
      //   method:"POST",
      //   data:this.formData,
      //   //处理跨域
      //   withCredentials:true,
      // }).then(res=>{
      //   const {status,message}=res.data;
      //   //如果登录错误
      //   if(status==1){
      //     this.$message.error(message);
      //   }else{
      //     this.$router.back();
      //   }
      // })

      this.$store.dispatch('user/login',this.formData).then(()=>{
        this.$router.back();
      });
    },
    resetForm(formName) {
      this.formData = {
        uname: "",
        upwd: ""
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
