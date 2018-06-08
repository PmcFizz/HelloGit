var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var o = wx.getStorageSync("users");
        console.log(o), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#d95940",
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = wx.getStorageSync("url");
        this.setData({
            id: t.id,
            user_info: o,
            url: a
        }), this.refresh();
    },
    onReady: function() {},
    refresh: function(t) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: i.data.id
            },
            success: function(t) {
                console.log(t);
                var r = t.data.tz;
                Number(t.data.tz.hb_num);
                r.img = r.img.split(","), 1 == r.hb_random ? r.hb_money = Number(r.hb_money) : r.hb_money = Number(r.hb_money) * Number(r.hb_num), 
                "" == r.hb_keyword ? i.setData({
                    sure: !0
                }) : i.setData({
                    sure: !1
                }), app.util.request({
                    url: "entry/wxapp/HongList",
                    cachetime: "0",
                    data: {
                        id: t.data.tz.id
                    },
                    success: function(t) {
                        console.log(t);
                        var o = t.data, a = 0;
                        for (var e in o) o[e].time = app.ormatDate(o[e].time).slice(5, 16), a += Number(o[e].money);
                        var n = r.hb_money - a;
                        console.log(n), console.log(a), i.setData({
                            hongbao: o,
                            total_comment: n.toFixed(2),
                            total_num: o.length
                        });
                    }
                }), console.log(t.data.pl), r.hb_money = Number(r.hb_money).toFixed(2), r.trans1 = 1, 
                r.trans2 = 1, r.dis1 = "block", r.trans_1 = 2, r.trans_2 = 1, i.setData({
                    store: r,
                    criticism: t.data.pl,
                    label: t.data.label
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});