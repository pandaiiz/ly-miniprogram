// index.js
// 获取应用实例
import Toast from '@vant/weapp/toast/toast';
import {getRequest} from '../api/request'
const app = getApp()

Page({
  data: {
    dataList: [],
    isIos: false,
    option1: [
      { text: '全部区域', value: 11 },
      { text: '龙岗区', value: 0 },
      { text: '龙华区', value: 1 },
      { text: '福田区', value: 2 },
      { text: '南山区', value: 3 },
      { text: '罗湖区', value: 4 },
      { text: '盐田区', value: 5 },
      { text: '宝安区', value: 6 },
    ],
    option2: [
      { text: '全部科目', value: 'all' },
      { text: '语文', value: 'a' },
      { text: '数学', value: 'b' },
      { text: '英语', value: 'c' },
      { text: '政治', value: 'd' },
      { text: '历史', value: 'e' },
      { text: '地理', value: 'f' },
      { text: '物理', value: 'g' },
      { text: '化学', value: 'h' },
      { text: '生物', value: 'i' },
    ],
    value1: 11,
    value2: 'all',
    star: 4.5,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    active: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChange1(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  jumpToList(e) {
    const {customer: customerId} = e.currentTarget.dataset
    wx.navigateTo({
      url: `../list/index?id=${customerId}`
    })
  },

  onLoad() {
    getRequest('user/list', {page:1,pageSize:100}).then(res => {
      const {list} = res.data
      this.setData({
        dataList: list
      })
    })


    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    
    const {platform} = wx.getSystemInfoSync()
    if (platform === 'ios') this.setData({ isIos: true })
    else this.setData({ isIos: false })
    
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
