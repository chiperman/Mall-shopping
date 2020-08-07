<template>
  <div>
    <van-nav-bar class='cart-navbar' title='管理地址' left-arrow border sticky @click-left='onClickLeft'>
      <template slot='left'>
        <van-icon name='arrow-left' size='.48rem' color='#000' />
      </template>
    </van-nav-bar>
    <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围"
      default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="onSelect" />
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        chosenAddressId: '1',
        del_id: {
          uid: '',
          id: ''
        },
        getlist: [],
        list: [],
        disabledList: [{
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '火星'
        }]
      };
    },
    created() {
      this.$api.addressData.getAddressList(this.$Cookies.get('userId')).then(({
        data
      }) => {
        this.getlist = data.address_info
        for (let i = 0; i < this.getlist.length; i++) {
          var json = {}
          json.index = i
          json.id = this.getlist[i].address_id
          json.uid = this.getlist[i].user_id
          json.name = this.getlist[i].user_name
          json.tel = this.getlist[i].user_phone
          json.province = this.getlist[i].province_name
          json.city = this.getlist[i].city_name
          json.country = this.getlist[i].country_name
          json.address = this.getlist[i].address_detail
          json.isDefault = this.getlist[i].default_flag
          this.list.push(json)
        }
      })
    },
    updated() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.$route.params.ondelete && this.$route.params.id === this.list[i].id) {
          this.list.splice(i, 1)
        }
        if (this.list[i].id !== this.$route.params.id) {
          this.list[i].isDefault = false
        } else {
          this.list[i].name = this.$route.params.name
          this.list[i].tel = this.$route.params.tel
          this.list[i].address = this.$route.params.address
          this.list[i].isDefault = this.$route.params.isDefault
        }
      }
    },
    methods: {
      onAdd() {
        this.list.push({
          id: '',
          name: '王五',
          tel: '136000000000',
          address: '四川省成都市成华区成都理工大学',
          isDefault: false
        })
      },
      onEdit(item, index) {
        this.$router.push({
          name: 'addressedit',
          params: {
            index: item.index,
            name: item.name,
            tel: item.tel,
            id: item.id,
            isDefault: item.isDefault,
            TotalPrice: this.$route.params.TotalPrice,
            infoList: this.$route.params.infoList,
            isOrder: 'true',
            uid: item.uid,
            address: item.address
          }
        })
      },
      onClickLeft() {
        if (this.$route.params.isOrder === false || this.$route.params.isOrder === undefined) {
          this.$router.go(-1)
        } else {
          this.$router.push({
            name: "submitOrder",
            params: {
              TotalPrice: this.$route.params.TotalPrice,
              infoList: this.$route.params.infoList
            }
          })
        }
      },
      onSelect(item, index) {
        if (this.$route.params.isOrder === false || this.$route.params.isOrder === undefined) {} else {
          this.$router.push({
            name: "submitOrder",
            params: {
              TotalPrice: this.$route.params.TotalPrice,
              infoList: this.$route.params.infoList
            }
          })
        }
        this.$store.dispatch("editAddressInfo", item)
      }
    },
    computed: {
      ...mapState(["editAddressInfo"])
    }
  };
</script>

<style>
</style>
