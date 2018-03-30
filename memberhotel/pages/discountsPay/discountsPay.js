var title="亲,请输入消费金额";
var title1="此单免费！"
Page({
  data: {
    money:0,
    moneynum: 0,    
    show:false,
    hide:true,
    onOff:false,
    text:"",
    DiscountAmount:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  checkboxChange: function () {
    var show = this.data.show;
    var moneynum = this.data.moneynum;
    this.setData({
      show: !show,
      DiscountAmount:0,
      money: moneynum.toFixed(2)
    });
  },
  enteramount:function(e){
    if (e.detail.value){
      var num = parseFloat(e.detail.value);
      var DiscountAmount = parseFloat(this.data.DiscountAmount);
      var money = (num - DiscountAmount).toFixed(2);
      if (money < "0") {
        money = 0
      }
      this.setData({
        money: money,
        moneynum:num,
        onOff:true
      })
    }else{
      this.setData({
        money: 0,
        onOff:false
      })
    }
  },
  DiscountAmount:function(e){
    var moneynum = parseFloat(this.data.moneynum);
    if (e.detail.value) {
      var Discount = parseFloat(e.detail.value);
      var Surplus = (moneynum - Discount).toFixed(2); 
      if (Surplus<"0"){
        Surplus=0
      }
      this.setData({
        money: Surplus,
        DiscountAmount: Discount
      })
    } else {
      this.setData({
        money: moneynum.toFixed(2),
        DiscountAmount: 0
      })
    }
  },
  opinion:function(e){
    var text = e.detail.value;
    this.setData({
      text: text
    })
  },
  messageBoard:function(){
    this.setData({
      hide: false
    })
  },
  formSubmit:function(){
    var that=this
    var text=this.data.text;
    var money = this.data.money;
    if(money){
      console.log(money, text);
    }else{
      var onOff=that.data.onOff
      wx.showToast({
        title: onOff?title1:title,
        icon: 'none',
        duration: 900
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})