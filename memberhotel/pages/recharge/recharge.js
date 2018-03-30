// pages/recharge/recharge.js
Page({
  data: {
    show:false,
    paid:0,
    bysending:0,
    id:"",
    disabled:true
  },
  onLoad: function (options) {
  
  },
  // 充值金额
  RechargeAmount:function(e){
    var that = this
    var paid = e.currentTarget.dataset.paid
    var bysending = e.currentTarget.dataset.bysending
    var id = e.currentTarget.dataset.id
    that.setData({
      paid: paid,
      bysending: bysending,
      show:false,
      id:id,
      disabled:false
    })
  },
  // 自定义金额
  CustomAmount:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    that.setData({
      paid: 0,
      bysending: 0,
      show:true,
      id: id,
      disabled: true
    })
  },
  EventHandle:function(e){
    var that = this
    var value = e.detail.value
    if (value){
      that.setData({
        paid: value,
        bysending: 0,
        disabled: false
      })
    }else{
      that.setData({
        disabled: true,
        paid: 0,
        bysending: 0
      })
    }
  },
  // btn
  Recharge:function(){
    var that = this
    var paid = that.data.paid
    var bysending = that.data.bysending
    console.log(paid, bysending);
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