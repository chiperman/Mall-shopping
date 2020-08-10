<template>
	<div class="submit-order">
		<!-- 顶部导航 -->
		<van-sticky>
			<van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft">
				<template slot="left">
					<van-icon name="arrow-left" size=".48rem" color="#000" />
				</template>
			</van-nav-bar>
		</van-sticky>
		<!-- 商品信息 -->
		<van-panel title="收藏商品信息">
			<div v-for="(item,index) in collect_goods_list" :key=index>
				<van-card :price="item.selling_price" desc="440ml;10件，套装" :title="item.goods_name" :thumb="item.goods_cover_img" />
			</div>
		</van-panel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collect_goods_list: []
			}
		},
		created() {
			this.$api.collectionData.getCollectionList(this.$Cookies.get('userId')).then(({
				data
			}) => {
				this.collect_goods_list = data.collect_Info
			})
		},
		methods: {
			onClickLeft() {
				this.$router.push('/me')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.submit-order {
		padding-bottom: 50px;

		.text-color {
			color: #000;
		}

		.text-color-red {
			color: red;
		}
	}
</style>
