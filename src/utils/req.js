import axios from 'axios'
import URL from './utils';
const token = "Bearer".concat(JSON.parse(localStorage.getItem("token")));
const request = axios.create({
  baseURL: URL.BASE_URL,
  timeout: 5000 // 请求超时
})

const request1 = axios.create({
  baseURL: URL.BASE_URL,
  headers: {'Authorization': token, 'Content-Type': 'application/json'},
  timeout: 5000
})

export default {
  request, request1
}