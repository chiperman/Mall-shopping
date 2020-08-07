import axios from "../http"

const detailData = {
  // 商品详细页数据请求
  async data(goodsId) {
    console.log(`/goods/goodsDetails/${goodsId}`)
    return await axios.post('/goods/goodsDetails/', {
      goodsId: goodsId
    })
  }
}
export default detailData
