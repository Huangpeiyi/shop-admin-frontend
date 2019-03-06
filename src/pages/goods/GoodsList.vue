<template>
  <div>
    <!-- 操作栏 -->
    <el-row type="flex" justify="space-between" class="handleBox mt20">
      <div>
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button @click="handleDelete(idsStr)">删除</el-button>
      </div>
      <div>
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search"  @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      class="mt20"
      @selection-change="handleSelectionChange"
    >
      <!-- 表格的多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题" width="260">
        <template slot-scope="scope">
          <el-row type="flex">
            <img :src="scope.row.imgurl" alt="" class="imgsize">
            <div>{{scope.row.title}}</div>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180" prop="categoryname"></el-table-column>
      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.market_price | tofixed}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pageBox mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
       
<script>
export default {
  data() {
    return {
      tableData: [],
      //当前的页面
      pageIndex: 1,
      //当前显示的条数
      pageSize: 2,
      //数据总条数
      totalCount: 0,
      //搜索条件
      searchValue: "",
      //选择的id
      idsStr: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      //请求商品类别数据
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
          //获取返回的数据
          console.log(res);
          const { data } = res;

          console.log(data.message, 123)
          //表格的数据
          this.tableData = data.message;
          //修改总条数
          this.totalCount = data.totalcount;
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //当表格选择时触发
    handleSelectionChange(data) {
      console.log(data);
      const ids=data.map(v=>{
        return v.id;
      })
      const idsStr=ids.join(",");
      this.idsStr=idsStr;
    },
    //删除商品时触发
    handleDelete(ids) {
      this.$axios
        .get(`http://localhost:8899/admin/goods/del/${ids}`)
        .then(res => {
          console.log(res);
          const { status, message } = res.data;
          if (status == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            //重新请求数据
            this.getList();
          }
        });
    },
    //切换显示条数时触发
    handleSizeChange(num) {
      this.pageSize = num;
      this.getList();
    },
    //切换当前页时触发
    handleCurrentChange(num) {
      this.pageIndex = num;
      this.getList();
    },
    //跳转到新增商品
    handleToGoodsAdd() {
      this.$router.push("/admin/goods-add");
    },
    //搜索
    handleSearch(){
      this.pageIndex=1;
      console.log(this.searchValue);
      this.getList();
    }
  },
  filters: {
    tofixed(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style>
.el-main {
  line-height: 0;
}
.handleBox {
  width: 100%;
  height: 40px;
}
.pageBox {
  text-align: left;
}
.imgsize{
  display:block;
  flex-shrink:0;
  width:64px;
  height:64px;
  margin-right:8px;
}
</style>
