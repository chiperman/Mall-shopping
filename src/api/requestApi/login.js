import axios from '../http.js'
const login = {
  async login(username, password) {
    return await axios.post('/user/login', {
      username: username,
      password: password
    })
  }
}
export default login
