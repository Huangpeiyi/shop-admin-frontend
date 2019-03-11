//专门存储数据，和修改用户数据的方法
import axios from "axios";

export default {
    //命令空间，为了区别modules下面其他模块可能存在相同的数据或者方法
    namespaced: "user",

    //初始化数据
    state: {
        //用户名
        username: localStorage.getItem("username") || "",
        // 身份信息
        identity: localStorage.getItem("identity") || "",
    },
    //异步修改数据
    actions: {
        //login是命令，对应的函数就是操作函数
        login({commit,state}, data) {
            //创建一个promise对象，
            //resolve和reject是两个函数
            //resolve是promise.then方法中的函数
            return new Promise((resolve, reject) => {
                axios({
                    url: "/admin/account/login",
                    method: "POST",
                    data,
                    //处理跨域
                    withCredentials: true,
                }).then(res => {
                    const {status,message}=res.data;
                    //如果登录错误
                    if(status==1){
                      this.$message.error(message);
                    }else{
                      //把接口返回的值更新到store下的数据
                      state.username=message.uname;
                      state.identity=message.realname;

                      //把用户信息存储到本地
                      localStorage.setItem("username",message.uname);
                      localStorage.setItem("identity",message.realname);

                      resolve();

                    }
                });
            });
        },

        logout({state},fn){
            //调用退出的接口
            axios({
                url:"/admin/account/logout",
                //处理跨域
                withCredentials: true,
            }).then(res=>{
                const {status,message} = res.data;
                if(status == 0 ){
                    //把接口返回值更新store下的数据
                    state.username="";
                    state.identity="";

                    //把用户信息从本地删除
                    localStorage.removeItem("username");
                    localStorage.removeItem("identity");

                    fn();
                }
            })
        }

    }

}