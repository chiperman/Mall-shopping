import axios from '../http.js'
const orderData = {
  async submitOrder(infoList, totalPrice, userId) {
    return await axios.post('/u-action/submitOrder', {
      userId: userId,
      totalPrice: totalPrice,
      payStatus: 1,
      payType: '支付宝',
      goodsInfo: infoList
    })
  },
  async orderList(userId) {
    return await axios.post('/user/orderList', {
      userId: userId
    })
  }
}
export default orderData
