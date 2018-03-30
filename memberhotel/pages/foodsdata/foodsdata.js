var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    var imgurl = options.imgurl
    var that = this
    that.setData({
      imgurl: imgurl,
      id: options.id,
      price: options.price,
      title: options.title,
      imgname: options.imgname,
      intergal: Math.floor(options.price),
      num: app.globalData.globalCarData.num,//购物车数量
    })

  },
  onShareAppMessage: function () {

  },
  addcar:function(e){
    var that = this
    var obj = e.currentTarget.dataset//加进的数据
    var menulist = that.data.menu_list
    var globalcardata = app.globalData.globalCarData.carlist//购物车数据
    var title = '添加成功'
    var isrepetition
    obj.count = 1
    for (var i = 0; i < globalcardata.length; i++) {//查看购物车中有否
      if (globalcardata[i].foodid == obj.foodid) {
        globalcardata[i].count += 1
        isrepetition = true
      }
    }
    if (!isrepetition) {
      globalcardata.push(obj)
    }
    util.num_price(that, app, globalcardata)
    util.reminder(title)
  },
  gomine:function(){
    wx.reLaunch({
      url: '../mine/mine'
    })
  }
})