import axios from '../http.js'
const collectionData = {
  async getCollectionList(userId) {
    return await axios.post('/user/collectionList', {
      userId: userId
    })
  },
  async editCollection(userId, goodsId, isDeleted) {
    return await axios.post('/u-action/collection', {
      userId: userId,
      goodsId: goodsId,
      isDeleted: isDeleted
    })
  }
}
export default collectionData
