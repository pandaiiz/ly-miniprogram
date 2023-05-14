// app.js

import {
  postRequest
} from './utils/request'
App({
  async onLaunch() {
    await this.login()
    await this.checkUpdate()
  },
  async checkUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  async login() {
    wx.showLoading({
      title: '加载中',
    })
    const {
      code
    } = await wx.login()
    wx.setStorageSync('js_code', code)
    this.globalData.js_code = code
    const {
      data
    } = await postRequest('/api/wechat/wxLogin', {
      code
    })
    wx.hideLoading()
    if (!data.isBind) {
      wx.redirectTo({
        url: '/pages/login/index',
      })
      return
    }

    wx.setStorageSync('token', data.token)
    wx.setStorageSync('userInfo', data.userInfo)
    wx.setStorageSync('session_key', data.session_key)

    this.globalData.userInfo = data.userInfo
    this.globalData.token = data.token
    this.globalData.session_key = data.session_key
    wx.redirectTo({
      url: '/pages/my/index',
    })
  },
  globalData: {
    userInfo: null,
    token: null,
    session_key: null,
    js_code: null,
  }
})