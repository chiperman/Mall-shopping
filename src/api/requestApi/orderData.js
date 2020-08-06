import axios from '../http.js'
const orderData = {
  async submitOrder(infoList, totalPrice, userId) {
    return await axios.post('/u-action/submitOrder', {
      user_id: userId,
      total_price: totalPrice,
      pay_status: '已支付',
      pay_type: '支付宝'
    })
  }
}
export default orderData
