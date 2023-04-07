// const tokenKey = "access-token";
const serverUrl =  "https://www.lyjiajiao.cn"; 

// const serverUrl = "http://localhost:5000";
// 例外不用token的地址
const exceptionAddrArr = ['/user/login', ];

//请求头处理函数
function CreateHeader(url, type) {
  let header = {}
  if (type == 'POST_PARAMS') {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  } else {
    header = {
      'content-type': 'application/json'
    }
  }
  if (exceptionAddrArr.indexOf(url) == -1) { //排除请求的地址不需要token的地址
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibmlja25hbWUiOiLmtYvor5Uy5Y-3IiwibW9iaWxlIjoiMTM4ODg4ODg4ODgiLCJpYXQiOjE2Nzk4ODMyMzIsImV4cCI6MTY3OTkxMjAzMn0.dCM0IrDz-4JEff1hZBocP-rRWOU9w4J2FvO5V4dxMds'
    // let token = wx.getStorageSync(tokenKey);
    // header.Authorization = token;
  }
  return header;
}
//post请求，数据在body中
function postRequest(url, data) {
  let header = CreateHeader(url, 'POST');
  console.log(header, 'header')
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + url,
      data: data,
      header: header,
      method: 'POST',
      success: (res => {
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res)
        } else {
          reject(res)
        }
      }),
      fail: (res => {
        reject(res)
      })
    })
  })
}
//post请求，数据按照query方式传给后端
function postParamsRequest(url, data) {
  let header = CreateHeader(url, 'POST_PARAMS');
  let useurl = url;
  console.log(useurl);
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + useurl,
      data: data,
      header: header,
      method: 'POST',
      success: (res => {
        console.log(res, '1212')
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res)
        } else {
          reject(res)
        }
      }),
      fail: (res => {
        reject(res)
      })
    })
  })
}
//get 请求
function getRequest(url, data) {
  let header = CreateHeader(url, 'GET');
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + url,
      data: data,
      header: header,
      method: 'GET',
      success: (res => {
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res.data)
        } else {
          reject(res)
        }
      }),
      fail: (res => {
        reject(res)
      })
    })
  })
}
//put请求
function putRequest(url, data) {
  let header = CreateHeader(url, 'PUT');
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + url,
      data: data,
      header: header,
      method: 'PUT',
      success: (res => {
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res)
        } else {
          reject(res)
        }
      }),
      fail: (res => {
        reject(res)
      })
    })
  })
}
//delete请求
function deleteRequest(url, data) {
  let header = CreateHeader(url, 'DELETE');
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + url,
      data: data,
      header: header,
      method: 'DELETE',
      success: (res => {
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res)
        } else {
          reject(res)
        }
      }),
      fail: (res => {
        reject(res)
      })
    })
  })
}
module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.postParamsRequest = postParamsRequest;
module.exports.putRequest = putRequest;
module.exports.deleteRequest = deleteRequest;
module.exports.serverUrl = serverUrl;