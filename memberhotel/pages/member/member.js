Page({
  data: {
    
  },
  onLoad: function (options) {
  
  },
  goskip:function(e){
    var url=e.currentTarget.dataset.url;
    if(url){
      wx.navigateTo({url:"../"+url});
    }else{
      wx.showToast({
        title: '正在努力开发中',
        icon: 'none',
        duration: 500
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})