import axios from '../http.js'
const categoryData = {
  async getHotList() {
    return await axios.get('/goods/goodsList')
  },
  async getGoodsList(category_name) {
    return await axios.post('/category-search', {
      categoryName: category_name
    })
  }
}
export default categoryData
