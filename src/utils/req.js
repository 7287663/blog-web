import axios from 'axios'

const BASE_URL = 'http://192.168.0.112:8081/admin';
const token = "Bearer".concat(JSON.parse(localStorage.getItem("token")));
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000 // 请求超时
})

const request1 = axios.create({
  baseURL: BASE_URL,
  headers: {'Authorization': token, 'Content-Type': 'application/json'},
  timeout: 5000
})

export default {
  request, request1
}