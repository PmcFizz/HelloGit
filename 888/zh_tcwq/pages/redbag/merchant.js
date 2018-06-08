var app = getApp();

Page({
    data: {
        iszd: !1
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        });
    },
    dkxf: function(e) {
        this.setData({
            iszd: !0
        });
    },
    hxdd: function() {
        wx.setStorageSync("hxsjid", this.data.seller.id), wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "../" + e.path.substring(14);
                wx.navigateTo({
                    url: t
                });
            },
            fail: function(e) {
                console.log("扫码fail"), wx.removeStorageSync("hxsjid");
            }
        });
    },
    selected: function(e) {
        var t = this, n = e.currentTarget.id, o = wx.getStorageSync("openid"), a = wx.getStorageSync("users").id, i = t.data.stick, s = i[n].money, c = i[n].type, r = this.data.seller.id;
        t.setData({
            iszd: !1
        }), console.log(s, c, r), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: o,
                money: s
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        });
                    },
                    complete: function(e) {
                        console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == e.errMsg && (app.util.request({
                            url: "entry/wxapp/SjXf",
                            cachetime: "0",
                            data: {
                                id: r,
                                type: c
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/SaveStorePayLog",
                            cachetime: "0",
                            data: {
                                store_id: r,
                                money: s,
                                note: "入驻续费"
                            },
                            success: function(e) {
                                console.log("这是续费成功"), console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/fx",
                            cachetime: "0",
                            data: {
                                user_id: a,
                                money: s
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), setTimeout(function() {
                            t.refresh1();
                        }, 1e3));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        var o = this;
        if (console.log(e), wx.hideShareMenu(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), null == wx.getStorageSync("users").money) ;
        var t = wx.getStorageSync("url");
        o.setData({
            url: t
        });
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e), o.setData({
                    seller: e.data.store[0]
                }), o.refresh();
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), o.setData({
                    System: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/InMoney",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var n in t) 0 < t[n].money ? t[n].money1 = "（收费" + t[n].money + "元）" : t[n].money1 = "  免费", 
                1 == t[n].type ? (t[n].array = "一周" + t[n].money1, t[n].hidden1 = !1) : 2 == t[n].type ? (t[n].array = "半年" + t[n].money1, 
                t[n].hidden1 = !0) : 3 == t[n].type && (t[n].array = "一年" + t[n].money1, t[n].hidden1 = !0);
                console.log(t), o.setData({
                    stick: t
                });
            }
        });
    },
    refresh1: function() {
        var t = this, e = t.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e), t.setData({
                    seller: e.data.store[0]
                }), t.refresh();
            }
        });
    },
    refresh: function(e) {
        var d = this;
        console.log(d.data.seller), this.setData({
            dqdate: app.ormatDate(d.data.seller.dq_time).substring(0, 10)
        });
        var t, n, o, p = (t = new Date(), n = t.getMonth() + 1, o = t.getDate(), 1 <= n && n <= 9 && (n = "0" + n), 
        0 <= o && o <= 9 && (o = "0" + o), t.getFullYear() + "/" + n + "/" + o + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()).slice(0, 10);
        console.log(p);
        var a = d.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: a
            },
            success: function(e) {
                console.log(e);
                var t = new Date();
                t.setTime(t.getTime() - 864e5);
                var n = function(e) {
                    var t = e.getFullYear(), n = e.getMonth() + 1;
                    n = n < 10 ? "0" + n : n;
                    var o = e.getDate();
                    return t + "-" + n + "-" + (o = o < 10 ? "0" + o : o);
                }(t).replace(/-/g, "/");
                if (console.log(n), 0 != e.data.length) {
                    var o = e.data, a = 0, i = [], s = [];
                    for (var c in o) o[c].time = app.ormatDate(o[c].time).slice(0, 10).replace(/-/g, "/"), 
                    "4" == o[c].state && (a += Number(o[c].money), n == o[c].time && (console.log("有昨天的订单"), 
                    i.push(o[c])), p == o[c].time && (console.log("有今天的订单"), console.log(o[c]), s.push(o[c])));
                    var r = 0;
                    for (var l in i) r += Number(i[l].money);
                    var u = 0;
                    for (var f in s) u += Number(s[f].money);
                    d.setData({
                        profit: a.toFixed(2),
                        yes_profit: r,
                        toady_profit: u
                    });
                } else d.setData({
                    profit: 0,
                    yes_profit: 0,
                    toady_profit: 0
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: a
            },
            success: function(e) {
                console.log(e);
                var t = e.data, n = [];
                for (var o in t) t[o].time = app.ormatDate(t[o].time).slice(0, 10), t[o].time = t[o].time.replace(/-/g, "/"), 
                p == t[o].time && n.push(t[o]);
                d.setData({
                    order_num: n.length
                });
            }
        });
    },
    onReady: function() {},
    yemx: function(e) {
        wx.navigateTo({
            url: "wallet/wallet?store_id=" + this.data.seller.id
        });
    },
    more: function(e) {
        console.log(e);
        var t = this.data.seller.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    cash: function(e) {
        wx.navigateTo({
            url: "../logs/cash?&state=2&store_id=" + this.data.seller.id + "&profit=" + this.data.seller.wallet,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_one: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=1&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_two: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=0&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_three: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=3&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_four: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=4&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    fuck: function(e) {
        wx.navigateTo({
            url: "../logs/publish?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    customer: function(e) {
        wx.navigateTo({
            url: "customer/customer?user_id=" + this.data.seller.id
        });
    },
    welfare: function(e) {
        wx.navigateTo({
            url: "welfare?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    sent: function(e) {
        wx.navigateTo({
            url: "sent?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    mechat: function(e) {
        wx.navigateTo({
            url: "../logs/index?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    mine_shop: function(e) {
        wx.navigateTo({
            url: "commodity?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    interests: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    vip: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    tuichu: function(e) {
        wx.removeStorage({
            key: "store_info",
            success: function(e) {
                wx.showToast({
                    title: "退出登陆"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
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