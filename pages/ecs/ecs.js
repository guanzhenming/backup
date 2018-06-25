// pages/ecs/ecs.js

Page({
  onClickAction: function(e) {
    var ifActionAll = this.data.actionAll;
    var listEcs = [];
    if (ifActionAll == true) {
      console.log('backup all ecs!');
      listEcs = this.data.listECS;
    } else {
      console.log('backup backup single ecs!');
      for (var i=0;i<this.data.listAction.length;i++) {
        for (var j=0;j<this.data.listECS.length;j++) {
          if (this.data.listAction[i].name == this.data.listECS[j].name) {
            listEcs.push(this.data.listECS[j])
          }
        }
      }
    }
      console.log('backup ecs list is:'+JSON.stringify(listEcs));
      var regionId = wx.getStorageSync('region_id');
      var token = wx.getStorageSync(regionId+'-token');
      var projId = wx.getStorageSync(regionId+'-projId');
      for (var k=0;k<listEcs.length;k++) {
        var backupEcs_url = "https://csbs."+regionId+".myhwclouds.com/"+"v1/"+projId+"/providers/fc4d5750-22e7-4798-8a46-f48f62c4c1da/resources/"+listEcs[k].id+"/action";
        wx.request({
          url:backupEcs_url,
          header: {
            "Content-type": "application/json;charset=utf8",
            "X-Auth-Token": token
          },
          method: "POST",
          data: JSON.stringify({protect:{}}),
          complete: function (res) {
            if (res.statusCode!= 200) {
              console.error('backup fail,reson:'+JSON.stringify(res))
            }
          }
        })
      }
      wx.showToast({
        title: '下发命令成功',
        icon: 'success',
        duration: 3000
      })

    
  },
  onActionSingle: function(e) {
    console.log(e)
    var listActionEcs = this.data.listAction;
    for(var i=0;i<e.detail.value.length;i++) {
      var ecs = {
        name: e.detail.value[i]
      }
      listActionEcs.push(ecs);
    }
    this.setData({
      listAction: listActionEcs
    })
  },
  onActionAll: function(e) {
    console.log(e)
    if (e.detail.value.length == 1) {
      this.setData({
        actionAll: true
      })
    } else {
      this.setData({
        actionAll: false
      })
    }
  },
  onClickECS:function(){
    this.setData({
      ecsselected : true
    })
    this.getEcs()
  },
  getEcs: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var regionId = wx.getStorageSync('region_id');
    var token = wx.getStorageSync(regionId + '-token');
    var projId = wx.getStorageSync(regionId + '-projId');
    var region_name = wx.getStorageSync('region_name');
    this.setData({
      region_name: region_name
    })
    var getEcs_url = "https://ecs." + regionId + ".myhwclouds.com/" + "v2/" + projId + "/servers/detail?limit=5";
    var that = this;
    wx.request({
      url: getEcs_url,
      header: {
        "Content-type": "application/json;charset=utf8",
        "X-Auth-Token": token
      },
      method: "GET",
      complete: function (res) {
        console.log('ecs  list is:' + JSON.stringify(res))
        if (res.statusCode == 200) {
          var ecsNum = res.data.servers.length;
          var listECS = [];
          for (var i = 0; i < ecsNum; i++) {
            var vpcId = res.data.metadata && res.data.metadata.vpc_id;
            var ecsIp;
            if (res.data.addresses) {
              ecsIp = _.first(_.first(_.values(res.data.addresses))) && _.first(_.first(_.values(res.data.addresses))).addr || '--';
            }
            if (res.data["addresses"] && res.data["addresses"][vpcId] && res.data["addresses"][vpcId].length) {
              ecsIp = res.data["addresses"][vpcId][0]["addr"]
            }
            var ecs = {
              name: res.data.servers[i].name,
              diskSize: '40G',
              ip: ecsIp,
              id: res.data.servers[i].id
            }
            listECS.push(ecs);
          }
          that.setData({
            listECS: listECS,
            currentEcsNum: ecsNum
          })
          wx.hideToast();

        }
      }
    })
  },
  onClickRegion: function() {
    wx.navigateTo({
      url: '../regions/regions',
      success: function(res) {},
      fail: function (res) { console.error('navigate error:'+JSON.stringify(res)) },
      complete: function (res) { },
    })
  },
  onClickBackup: function() {
    this.setData({
      ecsselected: false
    })
    this.getBackup()
  },
  getBackup: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var regionId = wx.getStorageSync('region_id');
    var token = wx.getStorageSync(regionId + '-token');
    var projId = wx.getStorageSync(regionId + '-projId');
    var getBackup_url = "https://csbs." + regionId + ".myhwclouds.com/" + "v1/" + projId + "/checkpoint_items?limit=5";
    var that = this;
    wx.request({
      url: getBackup_url,
      header: {
        "Content-type": "application/json;charset=utf8",
        "X-Auth-Token": token
      },
      method: "GET",
      complete: function (res) {
        console.log('backup  list is:' + JSON.stringify(res))
        if (res.statusCode == 200) {
          var backupNum = res.data.checkpoint_items.length;
          var listBackup=[];
          var listWorking=[];
          for (var i=0;i<backupNum;i++) {
            var day = res.data.checkpoint_items[i].created_at.split('T')[0];
            var hour = res.data.checkpoint_items[i].created_at.split('T')[1].split('.')[0]
            var h1 = hour.split(':')[0]
            var min = hour.split(':')[1]
            var sec = hour.split(':')[2]
            var h2 = Number(h1)+8
            var time = day+' '+h2+':'+min+':'+sec;
            var back={
              name: res.data.checkpoint_items[i].name,
              ecs: res.data.checkpoint_items[i].extend_info.resource_name,
              time: time,
              p: res.data.checkpoint_items[i].extend_info.progress
            }
            if (back.p == 100) {
              listBackup.push(back)
            } else {
              listWorking.push(back)
            }
          }
          console.log('listWorking:'+JSON.stringify(listWorking))
          console.log('listBackup:' + JSON.stringify(listBackup))
          that.setData({
            listBackups: listBackup,
            listWorking: listWorking,
            currentBackupNum: backupNum
          })
          wx.hideToast();
        } 
      }
    })
    
  },

  getMoreBackup: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var regionId = wx.getStorageSync('region_id');
    var token = wx.getStorageSync(regionId + '-token');
    var projId = wx.getStorageSync(regionId + '-projId');
    var getBackup_url = "https://csbs." + regionId + ".myhwclouds.com/" + "v1/" + projId + "/checkpoint_items?" + "offset=" + this.data.currentBackupNum+"limit=5";
    var that = this;
    wx.request({
      url: getBackup_url,
      header: {
        "Content-type": "application/json;charset=utf8",
        "X-Auth-Token": token
      },
      method: "GET",
      complete: function (res) {
        console.log('backup  list is:' + JSON.stringify(res))
        if (res.statusCode == 200) {
          var backupNum = res.data.checkpoint_items.length;
          var listBackup = that.data.listBackups;
          var listWorking = that.data.listWorking;
          for (var i = 0; i < backupNum; i++) {
            var day = res.data.checkpoint_items[i].created_at.split('T')[0];
            var hour = res.data.checkpoint_items[i].created_at.split('T')[1].split('.')[0]
            var h1 = hour.split(':')[0]
            var min = hour.split(':')[1]
            var sec = hour.split(':')[2]
            var h2 = Number(h1) + 8
            var time = day + ' ' + h2 + ':' + min + ':' + sec;
            var back = {
              name: res.data.checkpoint_items[i].name,
              ecs: res.data.checkpoint_items[i].extend_info.resource_name,
              time: time,
              p: res.data.checkpoint_items[i].extend_info.progress
            }
            if (back.p == 100) {
              listBackup.push(back)
            } else {
              listWorking.push(back)
            }
          }
          console.log('listWorking:' + JSON.stringify(listWorking))
          console.log('listBackup:' + JSON.stringify(listBackup))
          var curBackupNum = backupNum + that.data.currentBackupNum
          that.setData({
            listBackups: listBackup,
            listWorking: listWorking,
            currentBackupNum: curBackupNum
          })
          wx.hideToast();
        }
      }
    })

  },


  /**
   * 页面的初始数据
   */
  data: {
    listECS:[],
    ecsselected:true,
    listWorking: [],
    listBackups: [],
    currentEcsNum: 0,
    currentBackupNum: 0,
    actionAll: false,
    listAction: [],
    region_name: ''
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
    if (this.data.ecsselected == true) {
      this.getBackup()
    } else {
      this.getBackup()
    }

    setTimeout(function() {
      wx.stopPullDownRefresh()
    },2000)
  
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