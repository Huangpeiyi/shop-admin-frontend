<template>
  <el-form ref="form" :model="form" label-width="80px" class="goodsAddBox mt20">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择">
        <el-option-group
          v-for="(item,index) in categorys"
          :key="index"
          :label="item.title"
          v-if="item.parent_id===0"
        >
          <el-option
            v-for="(subItem,subIndex) in categorys"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
            v-if="subItem.parent_id===item.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_slide"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- 单张图片上传 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleFileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <!-- 富文本 -->
    <el-form-item label="内容描述" class="editor">
      <quill-editor v-model="form.content"></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        status: false,
        is_top: false,
        is_hot: false,
        is_slide: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",
        //封面图片
        imgList: [],
        //多张图片
        fileList: []
      },
      dialogImageUrl: "",
      dialogVisible: false,
      //封面
      imageUrl: "",
      //类别数据
      categorys: [],
      //商品的id
      id: ""
    };
  },
  mounted() {
    //请求商品数据
    //1.获取动态路由id
    const { id } = this.$route.params;
    //2.保存到data里面
    this.id = id;
    //3.请求商品数据
      this.$axios({
        url: `/admin/goods/getgoodsmodel/${id}`
      }).then(res => {
        console.log(res);
        const {message} = res.data;
        // 初始化表单的值
        this.form = message;

        // 预览图片
        this.imageUrl = message.imgList[0].url;

        this.form.fileList = message.fileList.map(v => {
          return {
            ...v,
            // 覆盖 v 对象里面的url
            url: `http://localhost:8899` + v.shorturl
          }
        })

      })

    //请求数据分类
    this.$axios({
      method: "get",
      url: `/admin/category/getlist/goods`
    }).then(res => {
      //console.log(res);
      const { message, status } = res.data;
      this.categorys = message;

      //最终保存结果数组
      // let options = [];
      // message.forEach(v=>{
      //     //判断当前类别是顶级类别的时候
      //     if(v.parent_id==0){
      //         v.group=[];
      //         //console.log(v);
      //         options.push(v);
      //         //console.log(options);
      //     }else{
      //         options.forEach(item=>{
      //             //console.log(item);
      //             if(v.parent_id==item.category_id){
      //                 item.group.push(v);
      //             }
      //         })
      //     }
      // });
      // this.categorys=options;
      // console.log(options);
    });
  },
  methods: {
    onSubmit() {
      //console.log(this.form);
      this.$axios({
        method: "POST",
        url: `/admin/goods/edit/${this.id}`,
        data: this.form,
        //处理跨域，指示是否跨站点访问控制请求
        withCredentials: true // default
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.$message({
            message: message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.replace("/admin/goods-list");
          }, 1000);
        }
      });
    },

    handleAvatarSuccess(res, file) {
      // 头像预览，把图片解析成base64字符串
      this.imageUrl = window.URL.createObjectURL(file.raw);
      this.form.imgList = [res];
      //解决mac本自动添加upload的问题
      // res.shorturl=res.shorturl.replace("upload","");
      // res.url=res.url.replace("upload","");
    },
    // 判断图片是否大于2m， 如果是的话不上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 移除选中的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片相册的成功回调函数
    handleFileList(res) {
      this.form.fileList.push(res);
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style  lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.goodsAddBox {
  padding: 10px;
  background: #fff;
}
.el-main {
  text-align: left;
}
.el-input {
  width: 200px;
}
/* 清除富文本line-height */
.editor .el-form-item__content {
  line-height: unset;
}
</style>
