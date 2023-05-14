Component({
  data: {
    active: '0',
    list: [{
        icon: 'wap-home-o',
        text: '我的',
        name: 'my',
        url: '/pages/my/index'
      },
      {
        icon: 'todo-list-o',
        text: '课程',
        name: 'class',
        url: '/pages/class/index'
      },
      {
        icon: 'chart-trending-o',
        text: '统计',
        name: 'statistics',
        url: '/pages/statistics/index'
      },
      {
        icon: 'friends-o',
        text: '教师',
        name: 'teacher',
        url: '/pages/teacher/index'
      },
    ]
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[event.detail].url,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
