var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      imageurl: app.globalData.imageurl,
      carlist: app.globalData.globalCarData.carlist,
      num: app.globalData.globalCarData.num,
      tprice: app.globalData.globalCarData.tprice
    })
  },
  onShow:function(){
    this.setData({
      carlist: app.globalData.globalCarData.carlist,
      num: app.globalData.globalCarData.num,
      tprice: app.globalData.globalCarData.tprice
    })
  },
  addcount:function(e){
    var that = this
    var id = e.currentTarget.dataset.foodid//id
    var globalCarData = app.globalData.globalCarData.carlist//购物车数据
    var carlist = that.data.carlist//页面数据
    for (var i = 0; i < globalCarData.length;i++){
      if (globalCarData[i].foodid == id){
        globalCarData[i].count+=1
      }
    }
    util.carData(that, globalCarData, carlist)
    util.num_price(that,app, globalCarData)
  },
  reducecount:function(e){
    var that =this
    var id = e.currentTarget.dataset.foodid
    var globalCarData = app.globalData.globalCarData.carlist
    var carlist = that.data.carlist
    for (var i = 0; i < globalCarData.length; i++) {
      if (globalCarData[i].foodid == id) {
        globalCarData[i].count -= 1
      }
    }
    util.carData(that, globalCarData, carlist)
    util.num_price(that, app, globalCarData)
  },
  goindex:function(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  onShareAppMessage: function () {
  
  }
})