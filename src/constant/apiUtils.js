import axios from 'axios'

const varToken = localStorage.getItem("token") ? localStorage.getItem("token") : ''
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.headers.common['Authorization'] = `Bearer ${varToken}`
axios.defaults.headers.common["Content-Type"] = "application/json"

const getToken = () => {
  return {
    Authorization : `Bearer ${varToken}`
  }
}

export const ApiRequest = {}

ApiRequest.get = (url, params = {}) => {
  console.log(`======tokennn`, localStorage.getItem("token"));
  console.log("====token22222222===", varToken)
   return axios.get(url, {params , headers : getToken()})
}

ApiRequest.post = (url, data = {}) => {
  return axios.post(url, data )
}
