const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//窗口与购物车数据
const showmenu_list = function (that, globalcardata, menulist) {
  for (var i = 0; i < globalcardata.length; i++) {
    for (var j = 0; j < menulist.length; j++) {
      if (globalcardata[i].foodid == menulist[j].id) {
        menulist[j].count = globalcardata[i].count
        that.setData({
          menu_list: menulist
        })
      }
    }
    if (globalcardata[i].count==0){
      globalcardata.splice(i,1)
    }
  }
}
//购物车信息计算
const num_price = function (that,app,globalcardata) {
  var num = 0
  var price = 0
  for (var i = 0; i < globalcardata.length; i++) {
    num += globalcardata[i].count
    price += globalcardata[i].count * globalcardata[i].price
  }
  app.globalData.globalCarData.num = num
  app.globalData.globalCarData.tprice = price
  that.setData({
    num: num,
    tprice: price
  })
}
//购物车内数据回显
const carData = function(that,globaldata,carlist){
  that.setData({
    carlist: globaldata
  })
}
//提示信息
const reminder = function(title){
  wx.showToast({
    title: title,
    duration: 1500
  })
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  showmenu_list: showmenu_list,
  num_price: num_price,
  carData: carData,
  reminder: reminder
}
