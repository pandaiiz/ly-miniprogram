import {
  postRequest
} from '../../utils/request'
const app = getApp()

Page({
  data: {
    userInfo: {},
    imgPrefix: '',
  },
  onChange(event) {
    this.setData({
      active: event.detail
    })
  },
  async onShow() {
    await this.getTabBar().init()
  },
  onLoad() {
    this.setData({imgPrefix: 'https://www.lyjiajiao.cn'})
    this.getUserInfoInterval()
  },
  getUserInfoInterval() {
    const userInfoInterval = setInterval(() => {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        })
        clearInterval(userInfoInterval)
      }
    }, 500)
  },
  async syncWechatInfo(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    const {
      userInfo
    } = wx.getUserProfile({
      desc: '同步用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    })

    const {
      success
    } = await postRequest('/api/wechat/syncWechatInfo', {
      wechatUserInfo: userInfo
    })

    if (success) {
      wx.showToast({
        title: '同步成功！',
        icon: 'success',
        duration: 2000
      })
    }
  },
})