// index.js
// 获取应用实例
import Toast from '@vant/weapp/toast/toast';
import {
  getRequest
} from '../api/request'
const app = getApp()

Page({
  data: {
    dataList: [],
    isIos: false,
    areaOptions: [{
      text: '全部区域',
      value: ''
    },
    {
      text: '龙岗区',
      value: '龙岗区'
    },
    {
      text: '龙华区',
      value: '龙华区'
    },
    {
      text: '福田区',
      value: '福田区'
    },
    {
      text: '南山区',
      value: '南山区'
    },
    {
      text: '罗湖区',
      value: '罗湖区'
    },
    {
      text: '盐田区',
      value: '盐田区'
    },
    {
      text: '宝安区',
      value: '宝安区'
    },
    ],
    subjectOptions: [{
      text: '全部科目',
      value: ''
    },
    {
      text: '语文',
      value: '语文'
    },
    {
      text: '数学',
      value: '数学'
    },
    {
      text: '英语',
      value: '英语'
    },
    {
      text: '政治',
      value: '政治'
    },
    {
      text: '历史',
      value: '历史'
    },
    {
      text: '地理',
      value: '地理'
    },
    {
      text: '物理',
      value: '物理'
    },
    {
      text: '化学',
      value: '化学'
    },
    {
      text: '生物',
      value: '生物'
    },
    ],
    // imgPrefix: 'http://localhost:5000',
    imgPrefix: 'https://www.lyjiajiao.cn',
    areaOption: '',
    subjectOption: '',
    active: 1,
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
  areaChange(event) {
    getRequest('/api/user/list', {
      page: 1,
      pageSize: 100,
      area: event.detail
    }).then(res => {
      const {
        list
      } = res.data
      this.setData({
        dataList: list
      })
    });
  },
  subjectChange(event) {

    getRequest('/api/user/list', {
      page: 1,
      pageSize: 100,
      subject: event.detail
    }).then(res => {
      const {
        list
      } = res.data
      this.setData({
        dataList: list
      })
    });
  },
  jumpToList(e) {
    const {
      customer: customerId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../list/index?id=${customerId}`
    })
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