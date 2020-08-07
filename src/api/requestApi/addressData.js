import axios from '../http.js'
const addressData = {
  async getAddressList(userId) {
    return await axios.post('/user/addressList', {
      userId: userId
    })
  },
  async editAddress(userId, addressInfo) {
    return await axios.post('/u-action/editAddress', {
      userId: userId,
      addressId: addressInfo.id,
      userName: addressInfo.name,
      userPhone: addressInfo.tel,
      provinceName: addressInfo.province,
      cityName: addressInfo.city,
      countryName: addressInfo.country,
      addressDetail: addressInfo.address,
      defaltFlag: addressInfo.isDefault
    })
  },
  async delAddress(userId, addressId) {
    return await axios.post('/u-action/delAddress', {
      userId: userId,
      addressId: addressId
    })
  }
}
export default addressData
