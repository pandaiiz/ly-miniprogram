// logs.js
const util = require('../../utils/util.js')
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    logs: [],
    value: '',
    radio: '',
    radio1: '',
  },
  onClickButton() {
    Toast('提交成功！');
    setTimeout(() => {

      wx.navigateTo({
        url: '../index/index'
      })
    }, 1000)
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
