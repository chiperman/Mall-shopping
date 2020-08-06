import axios from '../http.js'
const cartData = {
	async cartData() {
		return await axios.get('/user/checkShopCart')
	}
}
export default cartData
