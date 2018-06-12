// pages/ecs/ecs.js
const ECS=[
  {
    name:"ECS1",
    diskSize:"120GB",
    ip:"192.168.0.145"
  },
  {
    name: "ECS2",
    diskSize: "500GB",
    ip: "192.168.0.145"
  },
  {
    name: "ECS3",
    diskSize: "400GB",
    ip: "192.168.0.145"
  },
  {
    name: "ECS4",
    diskSize: "40GB",
    ip: "192.168.0.145"
  },
  {
    name: "ECS5",
    diskSize: "120GB",
    ip: "192.168.0.145"
  }
];
const listWorking = [
  {
    name: "Backup1",
    ecs: "ECS1",
    time: "2018-6-7 08:20",
    p:-1
  },
  {
    name: "Backup2",
    ecs: "ECS2",
    time: "2018-6-7 08:20",
    p:0
  },
  {
    name: "Backup3",
    ecs: "ECS3",
    time: "2018-6-7 08:20",
    p:30
  }
];


const listBackups = [
  {
    name: "Backup1",
    ecs: "ECS1",
    time: "2018-6-7 08:20",
    p: 100
  },
  {
    name: "Backup2",
    ecs: "ECS2",
    time: "2018-6-7 08:20",
    p: 100
  },
  {
    name: "Backup3",
    ecs: "ECS3",
    time: "2018-6-7 08:20",
    p: 100
  }
];

Page({
  onECS:function(){
    this.setData({
      ecsselected : true
    })
    
  },
  onBackup: function () {
    this.setData({
      ecsselected: false
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    listECS:ECS,
    ecsselected:true,
    listWorking: listWorking,
    listBackups: listBackups

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
  
  }
})