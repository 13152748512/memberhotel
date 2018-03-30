var area = require('../../utils/area.js')
var areaInfo = [];//所有省市区县数据
var provinces = [];//省
var citys = [];//城市
var countys = [];//区县
var index = [0, 0, 0];
var cellId;
var t = 0;
var show = false;
var moveY = 200;
var title ="请先填写完整您的姓名、电话、地址哦!"
Page({
  data: {
    showw:false,
    editoraddsite:false,
    title: "设为默认",
    Changed: "已设为默认地址", 
    show: show,
    provinces: provinces,
    citys: citys,
    countys: countys,
    value: [0, 0, 0] ,  
    uname:"",
    phone:"",
    address:"",
    ressarr:[],
    i:"",
    id:""
  },
  onLoad: function (options) {
    var that=this
    //请求服务器获取用户地址
    //获取省市区县数据
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      //获取省份数据
      getProvinceData(that);
    });
  },
  adduname:function(e){
    var name = e.detail.value
    this.setData({uname:name})
  },
  addphone:function(e){ 
    var phone = e.detail.value
    this.setData({ phone: phone })
  },
  address:function(e){ 
    var address = e.detail.value
    this.setData({ address: address })
  },
  // 确定添加地址
  addsite:function(e){
    var that=this
    var show = e.currentTarget.dataset.show;
    if(show=="0"){
      wx.getSetting({
        success:function(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success: function (res) {
                console.log(res + "1234566");
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 800
                })
              }
            })
          }
        }
      })
      that.setData({showw:true})
    }else{
      var name=that.data.uname
      var phone=that.data.phone
      var province = that.data.province
      var city = that.data.city
      var county = that.data.county
      var address = that.data.address
      if (name && phone && address && city && province && county){
        var ressarr = that.data.ressarr
        ressarr.push({ "uname": name, "phone": phone, "province": province, "city": city, "county": county,"address": address})
        that.setData({ 
          showw: false, 
          uname: "",
          phone: "",
          address: "",
          ressarr:ressarr
        })
      }else{
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 900
        })
      }
    }
  },
  // 删除
  deletaAbdress:function(e){
    var that = this
    var id = e.target.dataset.id 
    var ressarr = that.data.ressarr
    ressarr.splice(id, 1)
    that.setData({ ressarr: ressarr})
  },
  // 编辑
  editor:function(e){
    var that = this
    var id = e.target.dataset.id
    var ressarr = that.data.ressarr 
    for (var i=0; i<ressarr.length; i++){
      if(id===i){
        that.setData({
          uname: ressarr[i].uname,
          phone: ressarr[i].phone,
          address: ressarr[i].address,
          province: ressarr[i].province,
          city: ressarr[i].city, 
          county: ressarr[i].county,
          i:i,
          showw:true,
          editoraddsite:true
        })
      }
    }
  },
  // 确定编辑地址
  editorsite:function(){
    var that = this
    var i=that.data.i
    var name = that.data.uname
    var phone = that.data.phone
    var address = that.data.address
    var province=that.data.province
    var city=that.data.city
    var county=that.data.county
    var ressarr = that.data.ressarr 
    if (name && phone && address && city && province && county) {
      ressarr[i] = { "uname": name, "phone": phone, "province": province, "city": city, "county": county, "address": address }
      that.setData({
        ressarr: ressarr, 
        showw:false,
        editoraddsite:false,
        uname: "",
        phone: "",
        address: "",
      })
    } else {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 900
      })
    }
  },
  // 设置默认地址
  DefaultAddress:function(e){
    var that = this
    var id = e.target.dataset.id
    var ressarr = that.data.ressarr 
    var value=ressarr.splice(id,1)
    ressarr.unshift(value[0])
    that.setData({ ressarr:ressarr,id:0})
  },
  // 定位
  requestLocation:function(){
    var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '是否要打开设置页面重新授权',
            content: '需要获取你的授权才能使用该功能（地理定位）,请到小程序的设置中打开地理位置授权',
            confirmText: "去授权",
            success: function (res) {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        }
      }
    })
    wx.chooseLocation({
      success: function (res) {
        var address = res.address
        that.setData({
          address: address
        })
      }
    })
  },
  //滑动事件
  bindChange:function (e) {
    var val = e.detail.value
    // console.log(e)
    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      getCityArr(val[0], this);//获取地级市数据
      getCountyInfo(val[0], val[1], this);//获取区县数据
    } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        getCountyInfo(val[0], val[1], this);//获取区县数据
      }
    }
    index = val;
    //console.log(index + " => " + val);
    //更新数据
    this.setData({
      value: [val[0], val[1], val[2]],
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    }
    )
    this.animation.translateY(200 + 'vh').step();
    this.setData({
      animation: this.animation.export(),
      show: show
    })
  },
  //移动按钮点击事件
  translate: function (e) {
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    // this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);
  },
  //隐藏弹窗浮层
  hiddenFloatView(e) {
    //console.log(e);
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
})

//动画事件
function animationEvents(that, moveY, show) {
  //console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    show: show
  })

}
//获取省份数据
function getProvinceData(that) {
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  that.setData({
    provinces: provinces
  })

  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    province: "北京市",
    city: "市辖区",
    county: "东城区",
  })

}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = { name: '' };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = { name: '' };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}