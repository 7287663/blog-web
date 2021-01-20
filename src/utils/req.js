import axios from 'axios'
import URL from './utils';

const request = axios.create({
  baseURL: URL.BASE_URL,
  timeout: 10000 // 请求超时
})

// const request1 = axios.create({
//   baseURL: URL.BASE_URL,
//   headers: {
//     'Authorization': "Bearer" + localStorage.getItem("token"),
//     'Content-Type': 'application/json'
//   },
//   timeout: 10000
// })

const request1 = axios.create({
  baseURL: URL.BASE_URL,
  timeout: 10000
})

request1.defaults.headers.post['Content-Type'] = 'application/json'

request1.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = "Bearer".concat(JSON.parse(localStorage.getItem("token")))
    }
    return config
  }
)

export default {
  request, request1
}