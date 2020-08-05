<template>
  <div id='app'>
    <van-nav-bar title='挑选你的最爱' />
    <van-row type='flex'>
      <van-col span='6'>
        <van-sidebar v-model='activeKey' @change='onChange'>
          <van-sidebar-item v-for='(item, i) in list' :key='i' :title='item.name' />
          <van-sidebar-item title='开发中' disabled />
          <van-sidebar-item title='开发中' disabled />
        </van-sidebar>
      </van-col>
      <van-col span='18'>
        <van-swipe :autoplay='3000' class='my-swipe'>
          <van-swipe-item v-for='(image, index) in images' :key='index'>
            <img class='swipe_img' v-lazy='image' />
          </van-swipe-item>
        </van-swipe>
        <van-grid :column-num='3' :border='false'>
          <van-grid-item v-for='(item, index) in HotList' :key='index'>
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
        HotList: [],
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        list: [{
            name: '推荐分类'
          },
          {
            name: '进口超市'
          },
          {
            name: '国际品牌'
          },
          {
            name: '男装'
          },
          {
            name: '女装'
          },
          {
            name: '数码产品'
          },
          {
            name: '钟表珠宝'
          },
          {
            name: '奢侈品'
          },
          {
            name: '男鞋'
          },
          {
            name: '女鞋'
          }
        ]
      }
    },
    created() {
      this.$api.categoryData.getHotList().then(({
        data
      }) => {
        this.HotList = data.goods_info
      })
    },
    components: {
      MenuBar
    },
    methods: {
      onChange(index) {
        this.type = 'primary'
        var List = this.HotList
        var reList = []
        for (var i = 0; i < List.length; i++) {
          var index1 = Math.floor(Math.random() * List.length) // 随机下标
          reList.push(List[index1]) // 将随机出的元素，存放新数组newArr中去
          List.splice(index1, 1) //    将随机出的元素在arr中删除
        }
        var res = [...reList, ...List]
        this.HotList = res
      }
    }
  }
</script>
