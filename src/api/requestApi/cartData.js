import axios from '../http.js'
const cartData = {
  async cartData(userId) {
    return await axios.post('/user/checkShopCart', {
      userId: userId
    })
  },
  async delCartGoods(userId, cartItemId) {
    return await axios.post('/u-action/delCartGoods', {
      userId: userId,
      cartItemId: cartItemId
    })
  },
  async addCartGoods(userId, goodsInfo) {
    return await axios.post('/u-action/addToShopCart', {
      userId: userId,
      goodsId: goodsInfo.goods_id,
      goodsName: goodsInfo.goods_name,
      goodsCoverImage: goodsInfo.goods_cover_img,
      sellingPrice: goodsInfo.selling_price
    })
  }
}
export default cartData
