const app = getApp();
import {
  postRequest
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    password: '',
    message: '当前微信未绑定账号，请输入账号密码绑定！'
  },
  // getPhoneNumber(e) {
  //   wx.request({
  //     url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${e.detail.encryptedData}`,
  //   })
  // },

  mobileChange(event) {
    this.setData({
      mobile: event.detail
    })
  },
  passwordChange(event) {
    this.setData({
      password: event.detail
    })
  },

  async bindAccount() {
    const {
      code: js_code
    } = await wx.login()
    const {
      data
    } = await postRequest('/api/wechat/bindAccount', {
      ...this.data,
      js_code
    })

    if (data.isBind) {
      wx.showModal({
        title: '绑定成功！',
        content: '请点击确定退出小程序，重新进入',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            wx.exitMiniProgram()
            // wx.redirectTo({ url: '/pages/my/index' })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideHomeButton()
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