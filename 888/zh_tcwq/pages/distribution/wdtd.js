var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "一级", "二级" ],
        activeIndex: 0,
        djd: []
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
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
        var a = this, n = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyTeam",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                console.log(t);
                var n = [], e = [];
                n = t.data.one, e = t.data.two;
                for (var o = 0; o < n.length; o++) n[o].time = util.ormatDate(n[o].time);
                for (o = 0; o < e.length; o++) e[o].time = util.ormatDate(e[o].time);
                a.setData({
                    yj: n,
                    ej: e
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