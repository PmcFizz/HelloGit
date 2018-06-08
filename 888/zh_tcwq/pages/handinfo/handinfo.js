Page({
    data: {
        luntext: [ {
            ctext: "征婚"
        }, {
            ctext: "房产信息"
        }, {
            ctext: "二手闲置"
        }, {
            ctext: "车辆买卖"
        }, {
            ctext: "宠物服务"
        }, {
            ctext: "家电维修"
        }, {
            ctext: "物业服务"
        }, {
            ctext: "美妆衣服"
        } ]
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});