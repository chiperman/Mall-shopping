import axios from '../http.js'
const addressData = {
  async getAddressList() {
    return await axios.get('/user/addressList')
  }
}
export default addressData
