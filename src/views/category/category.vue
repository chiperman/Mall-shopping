<template>
  <div id='app'>
    <van-nav-bar title='挑选你的最爱' />
    <van-row type='flex'>
      <van-col span='6'>
        <van-sidebar v-model='activeKey' @change='onChange'>
          <van-sidebar-item v-for='(item, i) in list' :key='i' :title='item' />
        </van-sidebar>
      </van-col>
      <van-col span='18'>
        <van-swipe :autoplay='3000' class='my-swipe'>
          <van-swipe-item v-for='(image, index) in images' :key='index'>
            <img class='swipe_img' v-lazy='image' />
          </van-swipe-item>
        </van-swipe>
        <van-grid :column-num='3' :border='false'>
          <van-grid-item v-for='(item, index) in goodsList' :key='index'>
            <div class='hot-card'>
              <van-image :src="item.goods_cover_img" />
              <p v-text='item.goods_name'></p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-col>
    </van-row>
    <MenuBar></MenuBar>
  </div>
</template>
<style>
  .swipe_img {
    width: 250px;
    height: 120px;
  }

  .icon-img {
    width: 5px;
    height: 5px;
  }

  .hot-card {
    text-align: center;
    font-size: smaller;
  }
</style>

<script>
  import MenuBar from '../../components/MenuBar.vue'
  import Vue from 'vue'
  import {
    Lazyload
  } from 'vant'
  Vue.use(Lazyload)
  export default {
    data() {
      return {
        activeKey: 0,
        categoryList: [],
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        // 侧边分类列表
        list: ['华为', '苹果', '化妆水', '耳机', '小米', '笔', '唇膏'],
        // 分类下的商品列表
        goodsList: []
      }
    },
    created() {
      this.$api.categoryData.getHotList().then(({
        data
      }) => {
        this.categoryList = data.goods_info
      })
      this.$api.categoryData.getGoodsList(this.list[0]).then(({
        data
      }) => {
        this.goodsList = data.goods_info
      })
    },
    components: {
      MenuBar
    },
    methods: {
      onChange(index) {
        this.type = 'primary'
        this.$api.categoryData.getGoodsList(this.list[index]).then(({
          data
        }) => {
          this.goodsList = data.goods_info
        })
      }
    }
  }
</script>
