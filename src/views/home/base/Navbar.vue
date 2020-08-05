<template>
  <div class="navbar">
    <van-row type="flex" justify="space-between" align="center">
      <van-col span="24">
        <van-search @focus="goSearch" shape="round" background="#5aaafb" placeholder="请输入搜索关键词" v-model="searchValue" />
      </van-col>
    </van-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchValue: ""
      }
    },
    methods: {
      goSearch() {
        this.$router.push("/search")
      },
      goNews() {
        this.$router.push("/news")
      }
    }
  }
</script>
<style>
</style>
