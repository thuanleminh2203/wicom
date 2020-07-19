import axios from 'axios'

const varToken = localStorage.getItem("token") ? localStorage.getItem("token") : ''
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = `Bearer ${varToken}`
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded"

export const ApiRequest = {}

ApiRequest.get = (url, params = {}) => {
   return axios.get(url, {params})
    .then((res) => {
      console.log("=====res==" , res)
      // const { data = {}} = res  
      // const { data : body = {} } = data
      // const { token = '' } = body
      // console.log(`token=========???`, token);
      // return token
      // // localStorage.setItem("token" , token)

    })
    .catch((err) => console.log("====errr==" , err))
}

ApiRequest.post = (url, data = {}) => {
  return axios.post(url, data )
  // .then((res) => {
  //   // console.log("=====res==" , res)
  //   const {data = {}} = res
  //   const { data : body = {} } = data
  //   const { token = '' } = body
  //   console.log(`token=========???`, token);
  //   // return token
  //   localStorage.setItem("token" , token)

  // }).catch((err) => console.log("====errr==" , err))
}
