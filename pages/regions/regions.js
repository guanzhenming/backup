// pages/regions/regions.js
Page({
  gotoLogin: function() {
    wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  gotoEcs: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.navigateTo({
      url: '../ecs/ecs',
      success: function (res) {},
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onClickHuabei: function () {
    wx.setStorageSync('region_id', 'cn-north-1')
    wx.setStorageSync('region_name','华北-北京1')
    var token = wx.getStorageSync('cn-north-1-token')
    if(token) {
      this.gotoEcs()
    } else {
      var globalToken = wx.getStorageSync('global-token')
      if (globalToken) {
        login.getProjIdByToken(globalToken)
      } else {
        this.gotoLogin()
      }
    }

  },
  onClickHuadong: function () {
    wx.setStorageSync('region_id', 'cn-east-2')
    wx.setStorageSync('region_name', '华东-上海2')
    var token = wx.getStorageSync('cn-east-2-token')
    if (token) {
      this.gotoEcs()
    } else {
      var globalToken = wx.getStorageSync('global-token')
      if (globalToken) {
        login.getProjIdByToken(globalToken)
      } else {
        this.gotoLogin()
      }
    }

  },
  onClickHuanan: function () {
    wx.setStorageSync('region_id', 'cn-south-1')
    wx.setStorageSync('region_name', '华南-广州')
    var token = wx.getStorageSync('cn-south-1-token')
    if (token) {
      this.gotoEcs()
    } else {
      var globalToken = wx.getStorageSync('global-token')
      if (globalToken) {
        login.getProjIdByToken(globalToken)
      } else {
        this.gotoLogin()
      }
    }

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
    var regionId=wx.getStorageSync('region_id')
    if (regionId) {
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

var login = require('../login/login.js');