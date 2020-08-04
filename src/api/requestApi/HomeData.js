import axios from '../http.js'
const homeData = {
	async banner() {
		return await axios.get('/goods/home')
	}
}
export default homeData
