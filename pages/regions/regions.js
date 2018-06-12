// pages/regions/regions.js
Page({
  onClickHuabei: function () {
    wx.setStorageSync('region_id', 'cn-north-1')
    wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  onClickHuadong: function () {
    wx.setStorageSync('region_id', 'cn-east-2')
    wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  onClickHuabei: function () {
    wx.setStorageSync('region_id', 'cn-south-1')
    wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    region_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var regionId=wx.getStorageSync('region_id')
    if (region_id) {
      this.setData({
        region_id: regionId
      })
    } else {
      this.setData({
        region_id: 'cn-north-1'
      })
    }
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
  
  }
})