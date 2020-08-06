import axios from '../http.js'
const register = {
  async register(username, password) {
    return await axios.post('/user/register', {
      username: username,
      password: password
    })
  }
}
export default register
