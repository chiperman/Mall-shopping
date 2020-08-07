<template>
  <div>
    <van-nav-bar class='cart-navbar' title='地址编辑' left-arrow border sticky @click-left='onClickLeft'>
      <template slot='left'>
        <van-icon name='arrow-left' size='.48rem' color='#000' />
      </template>
    </van-nav-bar>
    <van-address-edit :area-list="areaList" :address-info="AddressInfo" show-postal show-delete show-set-default
      show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" v-model="AddressInfo.isDefault"
      @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
  import areaList from '../../assets/area.js'
  export default {
    data() {
      return {
        areaList,
        searchResult: [],
        AddressInfo: { // 收货人信息初始值
          i: 0,
          name: '', // 姓名
          tel: '', // 电话
          province: '', // 省份
          city: '', // 城市
          country: '', // 区县
          areaCode: '', // 地址code：ID
          addressDetail: '', // 详细地址
          isDefault: false, // 是否选择默认
          id: '',
          uid: ''
        }
      };
    },
    created(content) {
      this.AddressInfo.i = this.$route.params.index
      this.AddressInfo.name = this.$route.params.name
      this.AddressInfo.tel = this.$route.params.tel
      this.AddressInfo.id = this.$route.params.id
      this.AddressInfo.uid = this.$route.params.uid
      this.AddressInfo.isDefault = this.$route.params.isDefault
    },
    methods: {
      onSave(content) {
        this.$router.push({
          name: 'addressmanage',
          params: {
            index: content.i,
            id: content.id,
            name: content.name,
            tel: content.tel,
            province: content.province,
            city: content.city,
            country: content.country,
            address: content.addressDetail,
            isDefault: content.isDefault
          }
        })
        this.$api.addressData.editAddress(content.uid, this.AddressInfo).then(({
          data
        }) => {
          console.log('editAddress')
          console.log(data.success)
        })
      },
      onDelete(content) {
        this.$router.push({
          name: 'addressmanage',
          params: {
            // index: content.i,
            ondelete: true,
            id: content.id
            // uid: content.uid
            // name: content.name,
            // tel: content.tel,
            // province: content.province,
            // city: content.city,
            // country: content.country,
            // address: content.addressDetail,
            // isDefault: content.isDefault
          }
        })
        this.$api.addressData.delAddress(content.uid, content.id).then(({
          data
        }) => {
          console.log('delAddress')
          console.log(data.success)
        })
      },
      onChangeDetail(val) {},
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
</style>
