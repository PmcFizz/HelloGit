var app = getApp();

Page({
    data: {
        djss: !1,
        luntext: [ "附近", "新入", "热门" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        refresh_top: !1,
        star: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        } ],
        star1: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star2: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star3: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star4: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        } ]
    },
    hddb: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(t) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.value
        });
    },
    durationChange: function(t) {
        this.setData({
            duration: t.detail.value
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.id;
        console.log(this.data);
        var e = this.data.business;
        if (null != this.data.business && 0 != e.length) {
            if (0 == a) this.refresh(); else if (1 == a) console.log(this.data.store); else if (2 == a) {
                var n = [];
                for (var i in e) 4 <= e[i].score && n.push(e[i]);
                this.setData({
                    store2: n
                });
            }
        }
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    jumps: function(t) {
        var a = this, e = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = (t.currentTarget.dataset.wb_src, 
        t.currentTarget.dataset.id), s = t.currentTarget.dataset.sjtype, r = t.currentTarget.dataset.type;
        if (1 == r) {
            var o = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(o), console.log(), 
            wx.navigateTo({
                url: n,
                success: function(t) {
                    a.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == r ? wx.navigateTo({
            url: "../car/car?vr=" + i + "&sjtype=" + s,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == r && wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                a.setData({
                    averdr: !0
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), a.setData({
            store_name: wx.getStorageSync("System").link_name,
            msgList1: wx.getStorageSync("msgList1"),
            System: wx.getStorageSync("System"),
            userinfo: wx.getStorageSync("users")
        }), a.reload(), a.refresh();
    },
    reload: function(t) {
        var s = this, a = wx.getStorageSync("url");
        s.setData({
            url: a
        }), app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(t) {
                var a = t.data;
                a.length <= 5 ? s.setData({
                    height: 150
                }) : 5 < a.length && s.setData({
                    height: 300
                });
                for (var e = [], n = 0, i = a.length; n < i; n += 10) e.push(a.slice(n, n + 10));
                s.setData({
                    nav: e
                });
            }
        });
        var e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                var a = [];
                for (var e in t.data) 2 == t.data[e].type && a.push(t.data[e]);
                s.setData({
                    slide: a
                });
            }
        });
    },
    refresh: function() {
        var h = this, t = (h.data.star1, wx.getStorageSync("city"));
        console.log("城市为" + t), console.log("page数量为" + h.data.page);
        var x = h.data.page, v = h.data.business;
        null == x && (x = 1), null == v && (v = []), app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                page: x,
                cityname: t
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.length) h.setData({
                    refresh_top: !0
                }), 1 == x && h.setData({
                    store: [],
                    business: [],
                    fjpx: [],
                    store1: []
                }); else {
                    h.setData({
                        page: x + 1,
                        refresh_top: !1
                    });
                    for (var a = {}, e = [], n = 0, i = (v = v.concat(t.data)).length; n < i; n++) a[v[n]] || (e.push(v[n]), 
                    a[v[n]] = !0);
                    for (var s in t.data) {
                        t.data[s].star = h.data.star1;
                        t.data[s].star;
                        t.data[s].score = Number(t.data[s].score);
                        t.data[s].score;
                        var r = t.data[s].coordinates.split(",");
                        t.data[s].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[s].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var o = Number(wx.getStorageSync("Location").latitude), g = Number(wx.getStorageSync("Location").longitude), c = r[0], u = r[1], l = o * Math.PI / 180, d = c * Math.PI / 180, p = l - d, f = g * Math.PI / 180 - u * Math.PI / 180, m = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(p / 2), 2) + Math.cos(l) * Math.cos(d) * Math.pow(Math.sin(f / 2), 2)));
                        m *= 6378.137;
                        m = (m = Math.round(1e4 * m) / 1e4).toFixed(2);
                        t.data[s].distance = m;
                    }
                    h.setData({
                        store: v,
                        business: v,
                        fjpx: v
                    }), h.setData({
                        store1: h.data.fjpx.sort(function(t, a) {
                            return (t = Number(t.distance)) < (a = Number(a.distance)) ? -1 : a < t ? 1 : 0;
                        })
                    });
                }
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(t) {
                var a = [];
                for (var e in t.data) 2 == t.data[e].type && a.push(t.data[e]);
                h.setData({
                    msgList: a
                });
            }
        });
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "../settled/settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    notice: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    store_type_id: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "business?id=" + a + "&typename=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    bindinput: function(t) {
        var a = t.detail.value;
        this.setData({
            value: a
        });
    },
    sqss: function() {
        this.setData({
            djss: !1
        });
    },
    search: function(t) {
        var a = this.data.value, e = this;
        console.log(a), e.setData({
            ssjgarr: [],
            djss: !1
        }), "" != a ? app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    djss: !0,
                    ssjgarr: t.data
                });
            }
        }) : wx.showToast({
            title: "请输入内容",
            icon: "loading"
        });
    },
    onReady: function() {
        this.setData({
            first: 1
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), this.setData({
            page: 1,
            business: [],
            store: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});