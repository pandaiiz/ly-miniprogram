import {getRequest} from '../api/request'

// pages/list/index.js
Page({
  data: {
    activeKey: 0,
    isIos: false,
    userInfo: "",
    platform: ""
  },
  onClickIcon() {
    Toast('点击图标');
  },

  onClickButton() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  getTeacherData(id) {
    const that = this
    getRequest('user/userInfo', {id}).then(res => {
      that.setData({ userInfo:  res.data })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.getTeacherData(options.id)

    const {platform} = wx.getSystemInfoSync()
    this.setData({platform})
    if (platform === 'ios') this.setData({ isIos: true })
    else this.setData({ isIos: false })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})