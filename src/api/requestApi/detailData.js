import axios from "../http"

const detailData = {
  // 商品详细页数据请求
  data(goodsId) {
    console.log(`/goods/goodsDetails/${goodsId}`)
    return axios.get('/goods/goodsDetails/', {
      params: {
        goodsId: goodsId
      }
    })
  }
}
export default detailData
