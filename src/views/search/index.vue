<template>
  <div class="search">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="black" />
    </van-sticky>
    <!-- 搜索 -->
    <form>
      <van-search v-model="keywords" placeholder="请输入搜索关键词" shape="round" @search="onSearch" />
    </form>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        keywords: "",
        clearHistory: false
      }
    },
    methods: {
      black() {
        this.$router.go(-1)
      },
      onSearch() {
        console.log("我已经执行了")
      },
      // 清除历史搜索
      clear() {
        this.$dialog
          .confirm({
            message: "你确定要删除该商品订单吗？"
          })
          .then(() => {
            this.clearHistory = true
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  }
</script>

<style  scoped>
  .search {
    background-color: #fff;

    .van-search__content {
      background-color: #eeeeee;
    }

    .search-history,
    .hot-search {

      .history-content,
      .hot-search-content {
        padding: 3px 10px;

        div {
          background-color: #eeeeee;
          padding: 3px 10px;
          margin: 0 10px;
          display: inline-block;
          border-radius: 20px;
          margin-bottom: 10px;
          color: #333;
        }
      }
    }
  }
</style>
