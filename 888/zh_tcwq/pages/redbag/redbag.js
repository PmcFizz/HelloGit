var app = getApp();

Page({
    data: {},
    redinfo: function(o) {
        console.log(o);
        var e = o.currentTarget.dataset.id, n = o.currentTarget.dataset.logo;
        wx.navigateTo({
            url: "redinfo/redinfo?store_id=" + e + "&logo=" + n
        });
    },
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = wx.getStorageSync("url");
        this.setData({
            url: e
        }), this.reload();
    },
    reload: function(o) {
        var u = this;
        app.util.request({
            url: "entry/wxapp/RedPaperList",
            cachetime: "0",
            success: function(o) {
                console.log(o);
                var n = o.data, t = 0, a = 0, i = 0, e = function(e) {
                    a += Number(n[e].views), i += Number(n[e].hbfx_num), console.log(n[e].details), 
                    n[e].img = n[e].img.split(","), 4 <= n[e].img.length ? n[e].img = n[e].img.splice(0, 4) : n[e].img = n[e].img, 
                    1 == n[e].hb_random ? n[e].hb_money = Number(n[e].hb_money) : n[e].hb_money = (Number(n[e].hb_money) * Number(n[e].hb_num)).toFixed(2), 
                    t += Number(n[e].hb_money), app.util.request({
                        url: "entry/wxapp/HongList",
                        cachetime: "0",
                        data: {
                            id: n[e].id
                        },
                        success: function(o) {
                            console.log(o), Number(n[e].hb_num) <= o.data.length ? n[e].rob = !1 : n[e].rob = !0, 
                            console.log(n), u.setData({
                                store: n,
                                Congratulations: o.data,
                                price: t.toFixed(2),
                                views: a,
                                givelike: i
                            });
                        }
                    });
                };
                for (var r in n) e(r);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});