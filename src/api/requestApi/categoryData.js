import axios from '../http.js'
const categoryData = {
  async getHotList() {
    return await axios.get('/goods/goodsList')
  }
}
export default categoryData
