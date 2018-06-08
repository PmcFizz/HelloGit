var app = getApp();

Page({
    data: {
        tabs: [ "全部", "审核中", "已通过", "已拒绝" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        iszd: !1,
        refresh_top: !1,
        postlist: [],
        page: 1
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        });
    },
    dkxf: function(e) {
        console.log(e.currentTarget.dataset.id), this.setData({
            iszd: !0,
            xfid: e.currentTarget.dataset.id
        });
    },
    shuaxin: function(e) {
        var a = e.currentTarget.dataset.id, o = wx.getStorageSync("openid"), n = wx.getStorageSync("users").id;
        console.log(a, e.currentTarget.dataset.typeid, o), app.util.request({
            url: "entry/wxapp/SxMoney",
            cachetime: "0",
            data: {
                type_id: e.currentTarget.dataset.typeid,
                id: a
            },
            success: function(e) {
                console.log(e);
                var t = Number(e.data.sx_money);
                console.log(t), wx.showModal({
                    title: "提示",
                    content: "刷新此帖子需付费" + t + "元",
                    confirmText: "确定刷新",
                    success: function(e) {
                        e.confirm ? (console.log("用户点击确定"), t <= 0 ? (console.log("免费刷新"), app.util.request({
                            url: "entry/wxapp/SxTz",
                            cachetime: "0",
                            data: {
                                id: a
                            },
                            success: function(e) {
                                console.log(e), 1 == e.data && (wx.showToast({
                                    title: "刷新帖子成功"
                                }), setTimeout(function() {
                                    wx.switchTab({
                                        url: "../index/index"
                                    });
                                }, 1e3));
                            }
                        })) : (console.log("付费刷新"), app.util.request({
                            url: "entry/wxapp/Pay",
                            cachetime: "0",
                            data: {
                                openid: o,
                                money: t
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
                                            url: "entry/wxapp/SxTz",
                                            cachetime: "0",
                                            data: {
                                                id: a
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), app.util.request({
                                            url: "entry/wxapp/SaveTzPayLog",
                                            cachetime: "0",
                                            data: {
                                                tz_id: a,
                                                money: t,
                                                money5: t
                                            },
                                            success: function(e) {}
                                        }), app.util.request({
                                            url: "entry/wxapp/fx",
                                            cachetime: "0",
                                            data: {
                                                user_id: n,
                                                money: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../index/index"
                                            });
                                        }, 1e3));
                                    }
                                });
                            }
                        }))) : e.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    selected: function(e) {
        var t = this, a = e.currentTarget.id, o = wx.getStorageSync("openid"), n = wx.getStorageSync("users").id, s = t.data.stick, c = s[a].money, i = s[a].type, r = this.data.xfid;
        t.setData({
            iszd: !1
        }), console.log(c, i, r), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: o,
                money: c
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
                            url: "entry/wxapp/TzXf",
                            cachetime: "0",
                            data: {
                                id: r,
                                type: i
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/SaveTzPayLog",
                            cachetime: "0",
                            data: {
                                tz_id: r,
                                money: c,
                                money4: c
                            },
                            success: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/fx",
                            cachetime: "0",
                            data: {
                                user_id: n,
                                money: c
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), setTimeout(function() {
                            t.reload();
                        }, 1e3));
                    }
                });
            }
        });
    },
    tabClick: function(e) {
        console.log(e), this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    onLoad: function(e) {
        var o = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
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
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var a in t) 1 == t[a].type ? t[a].array = "置顶一天（收费" + t[a].money + "元）" : 2 == t[a].type ? t[a].array = "置顶一周（收费" + t[a].money + "元）" : 3 == t[a].type && (t[a].array = "置顶一月（收费" + t[a].money + "元）");
                console.log(t), o.setData({
                    stick: t
                });
            }
        }), o.reload();
    },
    reload: function(e) {
        var c = this, t = wx.getStorageSync("users").id, i = wx.getStorageSync("url"), r = wx.getStorageSync("users").img, l = c.data.page, u = c.data.postlist;
        console.log(r), app.util.request({
            url: "entry/wxapp/MyPost",
            cachetime: "0",
            data: {
                user_id: t,
                pagesize: 10,
                page: l
            },
            success: function(e) {
                console.log(e), c.setData({
                    page: l + 1
                }), console.log(e), e.data.length < 10 ? c.setData({
                    refresh_top: !0
                }) : c.setData({
                    refresh_top: !1
                }), u = u.concat(e.data), console.log(u);
                var t = [], a = [], o = [];
                for (var n in e.data) e.data[n].time = c.ormatDate(e.data[n].time).slice(0, 16), 
                e.data[n].img = e.data[n].img.split(",").slice(0, 4);
                for (var s in u) 1 == u[s].state && null != u[s].type_name ? t.push(u[s]) : 2 == u[s].state && null != u[s].type_name ? a.push(u[s]) : 3 == u[s].state && null != u[s].type_name && o.push(u[s]);
                c.setData({
                    postlist: u,
                    slide: u,
                    user_img: r,
                    url: i,
                    audit: t,
                    adopt: a,
                    refuse: o
                });
            }
        });
    },
    see: function(e) {
        console.log(e), console.log(this.data);
        var t = this.data.slide, a = e.currentTarget.dataset.id;
        for (var o in t) if (t[o].id == a) var n = t[o];
        console.log(n), wx.navigateTo({
            url: "../infodetial/infodetial?id=" + n.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    ormatDate: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + a(t.getMonth() + 1, 2) + "-" + a(t.getDate(), 2) + " " + a(t.getHours(), 2) + ":" + a(t.getMinutes(), 2) + ":" + a(t.getSeconds(), 2);
        function a(e, t) {
            for (var a = "" + e, o = a.length, n = "", s = t; s-- > o; ) n += "0";
            return n + a;
        }
    },
    bianji: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "modify?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    cancel: function(a) {
        var o = this;
        wx.showModal({
            title: "提示",
            content: "是否删除帖子",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {
                if (e.confirm) {
                    console.log("用户点击确定");
                    var t = a.currentTarget.dataset.id;
                    app.util.request({
                        url: "entry/wxapp/DelPost",
                        cachetime: "0",
                        data: {
                            id: t
                        },
                        success: function(e) {
                            console.log(e), 1 == e.data && o.reload();
                        }
                    });
                } else e.cancel && console.log("用户点击取消");
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            activeIndex: 0,
            refresh_top: !1,
            postlist: [],
            page: 1
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.page), 0 == this.data.refresh_top && this.reload();
    },
    onShareAppMessage: function() {}
});