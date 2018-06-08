var app = getApp();

Page({
    data: {
        luntext: [ "最新收录", "热门推荐", "附近师傅" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        refresh_top: !1,
        yellow_list: [],
        page: 1
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        var s = this, e = wx.getStorageSync("url");
        s.setData({
            url: e
        }), app.util.request({
            url: "entry/wxapp/yellowType",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                e.length <= 5 ? s.setData({
                    height: 130
                }) : 5 < e.length && s.setData({
                    height: 260
                });
                for (var a = [], n = 0, o = e.length; n < o; n += 10) a.push(e.slice(n, n + 10));
                console.log(a), s.setData({
                    nav: a
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowHeight: t.windowHeight
                });
            }
        });
        var a = wx.getStorageSync("city");
        console.log("轮播图的城市为" + a), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(t) {
                var e = [];
                for (var a in t.data) 6 == t.data[a].type && e.push(t.data[a]);
                s.setData({
                    slide: e
                });
            }
        }), s.refresh();
    },
    refresh: function(t) {
        var d = this, e = wx.getStorageSync("city");
        console.log("城市为" + e);
        var g = d.data.page, h = d.data.yellow_list;
        null == g && (g = 1), null == h && (h = []), console.log("page为" + e), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                page: g,
                cityname: e
            },
            success: function(t) {
                if (console.log(t), 0 == t.data) d.setData({
                    refresh_top: !0
                }); else {
                    for (var e in h = h.concat(t.data)) {
                        var a = h[e].coordinates.split(",");
                        h[e].lat2 = Number(wx.getStorageSync("Location").latitude), h[e].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var n = Number(wx.getStorageSync("Location").latitude), o = Number(wx.getStorageSync("Location").longitude), s = a[0], r = a[1], i = n * Math.PI / 180, c = s * Math.PI / 180, l = i - c, u = o * Math.PI / 180 - r * Math.PI / 180, f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(i) * Math.cos(c) * Math.pow(Math.sin(u / 2), 2)));
                        f *= 6378.137;
                        f = (f = Math.round(1e4 * f) / 1e4).toFixed(2);
                        h[e].distance = f;
                    }
                    d.setData({
                        yellow_list: h,
                        yellow_list1: h,
                        page: g + 1,
                        refresh_top: !1
                    });
                }
            }
        });
    },
    search: function(t) {
        var e = this;
        console.log(t);
        var a = t.detail.value;
        "" == a ? e.setData({
            search_yellow: []
        }) : app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    search_yellow: t.data
                });
            }
        });
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(e);
        var a = this.data.yellow_list, n = this.data.yellow_list1;
        0 == e ? this.setData({
            yellow_list: n
        }) : 1 == e ? (a = a.sort(function(t, e) {
            return (t = Number(t.views)) < (e = Number(e.views)) ? -1 : e < t ? 1 : 0;
        }), this.setData({
            yellow_list: a
        })) : 2 == e && (a = a.sort(function(t, e) {
            return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
        }), this.setData({
            yellow_list: a
        })), this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.user_id;
        console.log(a), wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store_type_id: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.typename;
        wx.navigateTo({
            url: "yellowtype?id=" + e + "&typename=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    mine_yellow: function(t) {
        wx.reLaunch({
            url: "mine_yellow"
        });
    },
    shouye: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    },
    jumps: function(t) {
        var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, o = t.currentTarget.dataset.wb_src, s = t.currentTarget.dataset.type;
        if (1 == s) {
            var r = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(r), console.log(), 
            wx.navigateTo({
                url: n + Number(r),
                success: function(t) {
                    e.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                e.setData({
                    averdr: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            yellow_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});