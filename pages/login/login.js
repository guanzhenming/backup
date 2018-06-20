// pages/login/login.js
Page({
  getProjId: function (userInfo) {
    var region_id = wx.getStorageSync('region_id')
    wx.setStorageSync('userInfo', userInfo)
    //支持其他厂商是要从缓存读取url
    var url = "https://iam."+region_id+".myhwclouds.com/v3/auth/tokens";
    var bodyData = {
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
          domain: {
            name: userInfo.detail.value.accountInput
          }
        }
      }
    }
    console.log(bodyData)
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json;charset=utf8"
      },
      method: 'POST',
      data: JSON.stringify(bodyData),
      complete: function (res) {
        if(res.statusCode != 201) {
          wx.showModal({
            title: '提示',
            content: '认证失败',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }

          })
        } else {
          var token = JSON.stringify(res.header["X-Subject-Token"]).replace(/\"/g,"");
          wx.setStorageSync('global-token',token)
          var userId = res.data.token.user.id
          wx.setStorageSync('user-id',userId)
          wx.setStorageSync('auth-info',bodydata)
          var getProId_url = "https://iam." + region_id + ".myhwclouds.com/v3/users/"+userId+"/projects";
          wx.request({
            url: url,
            header: {
              "Content-Type": "application/json;charset=utf8"
            },
            method: 'GET',
            data: JSON.stringify(bodyData),
            complete: function (res) {
              if (res.statusCode != 201) {
                wx.showModal({
                  title: '提示',
                  content: '获取项目信息失败',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }

                })
              } else {
                var projId
                regionId = wx.getStorageSync('region_id')
                for(var i=0;i<res.data.projects.length;i++) {
                  if (res.data.projects[i].name == region_id) {
                    projId = res.data.projects[i].id
                    wx.setStorageSync(region_id+'projId',projId)
                  }
                }
                var newBodyData = {
                  auth: {
                    identity: bodyData.auth.identity,
                    scope: {
                      project: {
                        id: projId
                      }
                    }
                  }
                }
                var url = "https://iam." + region_id + ".myhwclouds.com/v3/auth/tokens";
                wx.request({
                  url: url,
                  header: {
                    "Content-Type": "application/json;charset=utf8"
                  },
                  method: 'POST',
                  data: JSON.stringify(newBodyData),
                  complete: function (res) {
                    if (res.statusCode != 201) {
                      wx.showModal({
                        title: '提示',
                        content: '认证失败',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          }
                        }

                      })
                    } else {
                      var token = JSON.stringify(res.header["X-Subject-Token"]).replace(/\"/g, "");
                      var regionId = wx.getStorageSync('region_id')
                      wx.setStorageSync(region_id+'-token',token)
                      wx.navigateTo({
                        url: '../ecs/ecs',
                        success: function(res) {},
                        fail: function (res) { },
                        complete: function (res) { }
                      })
                    }
                  }
                })
              }
            }
          })

        }
      }
    })
  },
  selectRegion: function (e) {
    console.log(e)
    var regionId = this.data.region_id
    var key = regionId + '-token'
    var token = wx.getStorageSync(key)
    if (token) {
      console.log('already has token ,use it') {
        wx.navigateTo({
          url: '../ecs/ecs',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { }
        })
      }
    } else {
      this.getProjId(e);
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
    region_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var regionId = wx.getStorageSync('region_id')
    this.setData({
      region_id: regionId
    })
  
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

})

function getProjIdByToken(token) {
  console.log('star get proid by token')
  var userId = wx.getStorageSync('user-id')
  var regionId = wx.getStorageSync('region_id')
  var getProId_url = "https://iam." + regionId + ".myhwclouds.com/v3/users/" + userId + "/projects";
  wx.request({
    url: url,
    header: {
      "Content-Type": "application/json;charset=utf8"
    },
    method: 'GET',
    data: JSON.stringify(bodyData),
    complete: function (res) {
      if (res.statusCode != 201) {
        wx.showModal({
          title: '提示',
          content: '获取项目信息失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }

        })
      } else {
        var projId
        regionId = wx.getStorageSync('region_id')
        for (var i = 0; i < res.data.projects.length; i++) {
          if (res.data.projects[i].name == region_id) {
            projId = res.data.projects[i].id
            wx.setStorageSync(region_id + 'projId', projId)
          }
        }
        var bodyData = wx.getStorageSync('auth-info')
        var newBodyData = {
          auth: {
            identity: bodyData.auth.identity,
            scope: {
              project: {
                id: projId
              }
            }
          }
        }
        var url = "https://iam." + region_id + ".myhwclouds.com/v3/auth/tokens";
        wx.request({
          url: url,
          header: {
            "Content-Type": "application/json;charset=utf8"
          },
          method: 'POST',
          data: JSON.stringify(newBodyData),
          complete: function (res) {
            if (res.statusCode != 201) {
              wx.showModal({
                title: '提示',
                content: '认证失败',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }

              })
            } else {
              var token = JSON.stringify(res.header["X-Subject-Token"]).replace(/\"/g, "");
              var regionId = wx.getStorageSync('region_id')
              wx.setStorageSync(region_id + '-token', token)
              wx.navigateTo({
                url: '../ecs/ecs',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
              })
            }
          }
        })
      }
    }
  }) 
}

module.exports = {
  getProjIdByToken: getProjIdByToken
}