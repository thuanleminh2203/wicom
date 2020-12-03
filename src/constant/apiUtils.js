import axios from 'axios'

// import {CONSTANT} from './Constant'
const varToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
// axios.defaults.baseURL = CONSTANT.API
axios.defaults.headers.common['Authorization'] = `Bearer ${varToken}`
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
// axios.defaults.headers['Access-Control-Request-Headers'] = 'access-control-allow-origin'

const getToken = () => {
  return {
    Authorization: `Bearer ${varToken}`,
  }
}

export const ApiRequest = {}
ApiRequest.get = (url, params = {}) => {
  // console.log('======tokennn', localStorage.getItem('token'))
  // console.log('====token22222222===', varToken)
  return axios.get(url, { params, headers: getToken() })
  // .catch((err) => console.log('===err code===', history))
}

ApiRequest.post = (url, data = {}) => {
  return axios.post(url, data)
}

// ApiRequest.post = (url, data = {}) => {
//   axios
//     .post(url, data)
//     .then((response) => {
//       console.log('====response====', response)
//     })
//     .catch((err) => console.log('===have err==== ', err))
// }
