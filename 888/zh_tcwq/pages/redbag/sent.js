var app = getApp();

Page({
    data: {
        header: [ "全部", "进行中", "已结束" ],
        index: 0,
        activeIndex: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.setData({
            user_id: e.user_id
        }), this.reload();
    },
    reload: function(e) {
        var c = this, t = c.data.user_id, d = wx.getStorageSync("url");
        app.util.request({
            url: "entry/wxapp/MyPost2",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                var a = e.data, i = [], r = [], u = [], t = function(o) {
                    a[o].time = c.ormatDate(a[o].time).slice(0, 16), a[o].img = a[o].img.split(","), 
                    3 <= a[o].img.length ? a[o].img = a[o].img.splice(0, 3) : a[o].img = a[o].img, s = 0, 
                    s = 1 == a[o].hb_random ? Number(a[o].hb_money) : Number(a[o].hb_money) * Number(a[o].hb_num), 
                    a[o].moneys = s, 0 != a[o].hb_money && app.util.request({
                        url: "entry/wxapp/HongList",
                        cachetime: "0",
                        data: {
                            id: a[o].id
                        },
                        success: function(e) {
                            console.log(e);
                            var t = 0;
                            for (var n in e.data) t += Number(e.data[n].money);
                            a[o].price = t.toFixed(2), Number(a[o].hb_num) == e.data.length ? (a[o].rob = !1, 
                            u.push(a[o])) : (a[o].rob = !0, r.push(a[o])), a[o].honglist = e.data, i.push(a[o]), 
                            console.log(a[o]), c.setData({
                                slide: i,
                                url: d,
                                slide1: r,
                                slide2: u
                            });
                        }
                    });
                };
                for (var n in a) {
                    var s;
                    t(n);
                }
            }
        });
    },
    header: function(e) {
        console.log(e);
        var t = e.currentTarget.id;
        this.setData({
            index: t,
            activeIndex: t
        });
    },
    ormatDate: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + n(t.getMonth() + 1, 2) + "-" + n(t.getDate(), 2) + " " + n(t.getHours(), 2) + ":" + n(t.getMinutes(), 2) + ":" + n(t.getSeconds(), 2);
        function n(e, t) {
            for (var n = "" + e, o = n.length, a = "", i = t; i-- > o; ) a += "0";
            return a + n;
        }
    },
    redinfo: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id, n = e.currentTarget.dataset.logo;
        wx.navigateTo({
            url: "redinfo/redinfo?store_id=" + t + "&logo=" + n
        });
    },
    fabu: function(e) {
        wx.navigateTo({
            url: "welfare",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
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