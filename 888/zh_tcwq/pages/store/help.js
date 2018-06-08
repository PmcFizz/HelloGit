var app = getApp();

Page({
    data: {
        list: [ {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        }, {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        }, {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        } ]
    },
    kindToggle: function(o) {
        var n = o.currentTarget.id, t = this.data.list;
        console.log(n);
        for (var e = 0, a = t.length; e < a; ++e) t[e].open = e == n && !t[e].open;
        this.setData({
            list: t
        });
    },
    onLoad: function(o) {
        var n = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(this), app.util.request({
            url: "entry/wxapp/GetHelp",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), n.setData({
                    list: o.data
                });
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