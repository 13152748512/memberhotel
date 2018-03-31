var util = require('../../utils/util.js');
var title = '正在努力开发中...'
const app = getApp()
var foodsurl = app.globalData.localhost + '/interface/queryGreens_wx.action';
Page({
  data: {
    lunboarr: [
      {
        img: '../../images/1.jpg'
      },
      {
        img: '../../images/2.jpg'
      },
      {
        img: '../../images/3.jpg'
      },
      {
        img: '../../images/4.jpg'
      },
      {
        img: '../../images/5.jpg'
      }
    ],
    autoplay: true,
    interval: 2000,
    duration: 500,
    mapstatus: '',
    dishclass: '1',//初始化显示分类
    cardata: [],
    showmode:false,
    menu:[]
  },
  onLoad: function () {
    var that = this
    // 请求菜品
    var data = {
      mobile: 'mobile',
      merchantId: app.globalData.merchantId
    }
    app.request(foodsurl, 'GET', data, function (res) {
      app.globalData.imageurl = res.data.path1
      that.setData({
        imageurl: res.data.path1,//图片服务器
        allfoodsdata: res.data.mobile,//所有菜品信息
        menu_list: res.data.mobile[0].secondList
      })
      that.add()
    })
  },
  onShow:function(){
    var that = this
    var globalcardata = app.globalData.globalCarData.carlist
    var menulist = that.data.menu_list
    util.showmenu_list(that, globalcardata, menulist)
  },
  chooseCategory: function (e) {//选择分类
  //console.log(e);
    var that = this
    var menulist = e.currentTarget.dataset.menu_list
    var globalcardata = app.globalData.globalCarData.carlist
    that.setData({
      menu_list: e.currentTarget.dataset.menu_list,
      dishclass: e.currentTarget.dataset.id
    })
    that.add()
    util.showmenu_list(that,globalcardata, menulist)
  },
  goprize: function () {
    wx.navigateTo({
      url: '../prize/prize'
    })
  },
  gofoodsdetil: function (e) {
    var id = e.currentTarget.dataset.id
    var price = e.currentTarget.dataset.price
    var title = e.currentTarget.dataset.title
    var imgname = e.currentTarget.dataset.imgname
    var imgurl = e.currentTarget.dataset.imgurl
    wx.navigateTo({
      url: '../foodsdata/foodsdata?id=' + id + '&price=' + price + '&title=' + title + '&imgname=' + imgname + '&imgurl=' + imgurl
    })
  },
  //加入购物车
  addDish: function (e) {
    var that = this
    var obj = e.currentTarget.dataset//加进的数据
    var menulist = that.data.menu_list
    var globalcardata = app.globalData.globalCarData.carlist//购物车数据
    var isrepetition
    obj.count = 1
    for (var i = 0; i < globalcardata.length; i++) {//查看购物车中有否
      if (globalcardata[i].foodid == obj.foodid) {
        globalcardata[i].count += 1
        isrepetition = true
      }
    }
    if (!isrepetition){
      globalcardata.push(obj)
    }
    for (var i = 0; i < globalcardata.length;i++){//回显数据
      for (var j = 0; j < menulist.length;j++){
        if (globalcardata[i].foodid == menulist[j].id){
          menulist[j].count = globalcardata[i].count
          util.showmenu_list(that,globalcardata, menulist)
        }
      }
    }
    util.num_price(that,app,globalcardata)
  },
  reduceDish:function(e){
    var that = this
    var obj = e.currentTarget.dataset
    var menulist = that.data.menu_list
    var globalcardata = app.globalData.globalCarData.carlist//购物车数据
    for (var i = 0; i < globalcardata.length;i++){
      if (obj.foodid == globalcardata[i].foodid){
        globalcardata[i].count -=1
        util.showmenu_list(that,globalcardata,menulist)
      }
    }
    util.num_price(that,app,globalcardata)
  },
  imgErr:function(e){

  },
  add:function(){
    var that = this
    var menu_list = that.data.menu_list
    //console.log(menu_list)
    var shoulist = that.data.shoulist
    var n=menu_list.length
    if (n!== 0){
      if(n>7){
       var arr=menu_list.splice(0,7)
       that.setData({ menu_list: arr, menu: menu_list, showmode: false, onlist: false })
      }else{
        that.setData({ showmode: true, onlist:true })
      }
    }
  },
  onShareAppMessage: function () {

  },
  scrolltolower:function(){
    var that = this
    var menu_list = that.data.menu_list
    var menu = that.data.menu
    var arr=menu.splice(0,7)
    that.setData({menu_list:menu_list.concat(arr)},function(){
      if (menu.length == 0) {
        that.setData({ showmode: true, onlist: true })
      }
    })
  },
  gorecharge: function () {
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  cardcenter:function(e){//领券中心
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../'+url
    })
  }
})
