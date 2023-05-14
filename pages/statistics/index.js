import {
  getRequest
} from '../../utils/request'
const app = getApp()

Page({
  data: { active: 'home',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onChange(event) {
    this.setData({active: event.detail})
    console.log(event.detail);
  },
  onShow() {
    this.getTabBar().init()
  },
  onLoad() {
    getRequest('/api/user/list', {
      page: 1,
      pageSize: 100
    }).then(res => {
      const {
        list
      } = res.data
      this.setData({
        dataList: list
      })
    })


    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }


    const {
      platform
    } = wx.getSystemInfoSync()
    if (platform === 'ios') this.setData({
      isIos: true
    })
    else this.setData({
      isIos: false
    })

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})