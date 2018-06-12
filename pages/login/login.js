// pages/login/login.js
Page({
  getToken: function (userInfo) {
    var region_id = wx.getStorageSync('region_id')
    //支持其他厂商是要从缓存读取url
    var url = 'https://iam.'+region_id+'.myhwclouds.com'+'v3/auth/tokens';
    var bodyData = JSON.stringify({
      auth: {
        identity: {
          password: {
            user: {
              password: userInfo.detail.value.passwordInput,
              domain: {
                name: userInfo.detail.value.accountInput
              },
              name: userInfo.detail.value.accountInput
            }
          },
          methods: [
            "password"
          ]
        },
        scope: {
          doamin: {
            name: userInfo.detail.value.accountInput
          }
        }
      }
    })
    console.log(bodyData)
    wx.request({
      url: url,
      header: {
        'Content-Type': 'application/json;charset=utf8'
      },
      method: 'POST',
      data: bodyData,
      complete: function (res) {
        console.info('res is:'+JSON.stringify(res))
      }
    })
  },
  selectRegion: function () {
    console.log(e)
    var token = wx.getStorageSync('token')
    if (token) {
      console.log('already has token ,use it') 
    } else {
      this.getToken(e);
    }
    /*
    wx.navigateTo({
      url: '../regions/regions',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    */

  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getToken: function (e) {
    console.log('user info is: '+ e)
  }
})