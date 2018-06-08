var app = getApp(), screenWidth = 0, screenHeight = 0, screenWidth1 = 0, screenHeight1 = 0, screenWidth2 = 0, screenHeight2 = 0;

Page({
    data: {
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        comments: !1,
        wechat: !1,
        share: !1,
        tabs2: [ "商家详情", "用户评论" ],
        star: [ {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star1: [ {
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
        index: 0,
        swiperCurrent: 0,
        marqueePace: 1,
        marqueeDistance: 0,
        marquee_margin: 30,
        size: 14,
        interval: 20
    },
    comments1: function(t) {
        0 == this.data.wechat ? this.setData({
            wechat: !0
        }) : this.setData({
            wechat: !1
        });
    },
    comments2: function(t) {
        0 == this.data.share ? this.setData({
            share: !0
        }) : this.setData({
            share: !1
        });
    },
    more: function(t) {
        var e = this.data.id;
        wx.navigateTo({
            url: "shop?store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    goods_info: function(t) {
        var e = this.data.id, a = t.currentTarget.id;
        wx.navigateTo({
            url: "good_info?id=" + a + "&store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    previewImage: function(t) {
        var e = this, a = e.data.url, i = [], s = e.data.store.weixin_logo;
        i.push(a + e.data.store.weixin_logo), wx.previewImage({
            current: a + s,
            urls: i
        });
    },
    previewImage3: function(t) {
        var e = this, a = e.data.url, i = [], s = e.data.store.ewm_logo;
        i.push(a + e.data.store.ewm_logo), wx.previewImage({
            current: a + s,
            urls: i
        });
    },
    previewImage2: function(t) {
        this.data.url;
        var e = [];
        e.push(this.data.bath), wx.previewImage({
            urls: e
        });
    },
    previewImage1: function(t) {
        var e = this.data.url, a = [], i = t.currentTarget.id, s = this.data.store.images;
        for (var n in s) a.push(e + s[n]);
        wx.previewImage({
            current: e + s[i],
            urls: a
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    Demonstration: function(t) {
        "" != this.data.store.vr_link && wx.navigateTo({
            url: "../car/car?sjid=" + this.data.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        var o = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = decodeURIComponent(t.scene);
        if (app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), o.setData({
                    url: t.data
                });
            }
        }), null == t.scene) var a = wx.getStorageSync("users"), i = wx.getStorageSync("users").id, s = t.id; else {
            s = e;
            wx.login({
                success: function(t) {
                    var e = t.code;
                    wx.setStorageSync("code", e), wx.getUserInfo({
                        success: function(t) {
                            wx.setStorageSync("user_info", t.userInfo);
                            var s = t.userInfo.nickName, n = t.userInfo.avatarUrl;
                            app.util.request({
                                url: "entry/wxapp/openid",
                                cachetime: "0",
                                data: {
                                    code: e
                                },
                                success: function(t) {
                                    wx.setStorageSync("key", t.data.session_key);
                                    var e = n, a = s;
                                    wx.setStorageSync("openid", t.data.openid);
                                    var i = t.data.openid;
                                    app.util.request({
                                        url: "entry/wxapp/Login",
                                        cachetime: "0",
                                        data: {
                                            openid: i,
                                            img: e,
                                            name: a
                                        },
                                        success: function(t) {
                                            wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                            o.setData({
                                                user_id: t.data.id,
                                                user_info: t.data
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        app.util.request({
            url: "entry/wxapp/StoreCode",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(t) {
                o.setData({
                    bath: t.data
                });
            }
        }), o.setData({
            id: s,
            user_id: i,
            user_info: a
        }), o.reload(), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth, a = t.windowHeight;
                o.setData({
                    sys_width: e,
                    sys_height: a
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    reload: function(t) {
        var o = this, r = o.data.star1, c = o.data.star;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: o.data.id
            },
            success: function(t) {
                for (var e in console.log(t), t.data.star3 = c, t.data.store[0].img1 = t.data.store[0].ad.split(","), 
                t.data.store[0].images = t.data.store[0].img.split(","), t.data.store[0].coordinates = t.data.store[0].coordinates.split(","), 
                t.data.store[0].star = r.slice(0, t.data.store[0].score), t.data.store[0].details = t.data.store[0].details.replace(/↵/g, "\n"), 
                t.data.pl) t.data.pl[e].star = r;
                var a = Number(t.data.store[0].score), i = "../image/xing.png";
                0 == (a = parseInt(a)) ? t.data.star3 = o.data.star1 : 1 == a ? t.data.star3[0].img = i : 2 == a ? (t.data.star3[0].img = i, 
                t.data.star3[1].img = i) : 3 == a ? (t.data.star3[0].img = i, t.data.star3[1].img = i, 
                t.data.star3[2].img = i) : 4 == a ? (t.data.star3[0].img = i, t.data.star3[1].img = i, 
                t.data.star3[2].img = i, t.data.star3[3].img = i) : 5 == a && (t.data.star3[0].img = i, 
                t.data.star3[1].img = i, t.data.star3[2].img = i, t.data.star3[3].img = i, t.data.star3[4].img = i), 
                o.setData({
                    score: a,
                    star3: t.data.star3
                }), app.util.request({
                    url: "entry/wxapp/IsCollection",
                    cachetime: "0",
                    data: {
                        store_id: o.data.id,
                        user_id: o.data.user_id
                    },
                    success: function(t) {
                        1 == t.data ? o.setData({
                            Collection: !0
                        }) : o.setData({
                            Collection: !1
                        });
                    }
                }), wx.setNavigationBarTitle({
                    title: t.data.store[0].store_name
                }), o.setData({
                    store: t.data.store[0],
                    comment: t.data.pl
                });
                var s = t.data.store[0].details.length * o.data.size, n = wx.getSystemInfoSync().windowWidth;
                console.log(s, n), o.setData({
                    length: s,
                    windowWidth: n
                }), o.scrolltxt();
            }
        }), app.util.request({
            url: "entry/wxapp/StoreGoodList",
            cachetime: "0",
            data: {
                store_id: o.data.id
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].imgs = t.data[e].imgs.split(",")[0], 
                t.data[e].lb_imgs = t.data[e].lb_imgs.split(",");
                var a = [];
                for (var i in t.data) 1 == t.data[i].is_show && a.push(t.data[i]);
                a = a.slice(0, 4);
                o.setData({
                    store_good: a
                });
            }
        });
    },
    formid_one: function(t) {
        console.log("搜集第一个formid"), console.log(t), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
    },
    dizhi: function(t) {
        var e = Number(this.data.store.coordinates[0]), a = Number(this.data.store.coordinates[1]);
        wx.openLocation({
            latitude: e,
            longitude: a,
            name: this.data.store.store_name,
            address: this.data.store.address
        });
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    fabu: function(t) {
        wx.navigateTo({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var e = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    reply: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            comments: !0,
            relpay: !0,
            reflex_id: e
        });
    },
    star: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.star, i = "../image/xing.png", s = "../image/star_none.png";
        0 == e ? (a[0].img = i, a[1].img = s, a[2].img = s, a[3].img = s, a[4].img = s) : 1 == e ? (a[0].img = i, 
        a[1].img = i, a[2].img = s, a[3].img = s, a[4].img = s) : 2 == e ? (a[0].img = i, 
        a[1].img = i, a[2].img = i, a[3].img = s, a[4].img = s) : 3 == e ? (a[0].img = i, 
        a[1].img = i, a[2].img = i, a[3].img = i, a[4].img = s) : 4 == e && (a[0].img = i, 
        a[1].img = i, a[2].img = i, a[3].img = i, a[4].img = i), this.setData({
            index: e + 1,
            star: a
        });
    },
    Collection: function(t) {
        var e = this, a = e.data.id, i = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Collection",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: i
            },
            success: function(t) {
                1 == t.data ? (e.setData({
                    Collection: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })) : (wx.showToast({
                    title: "取消收藏成功",
                    icon: "fail",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), e.setData({
                    Collection: !1
                }));
            }
        });
    },
    textarea: function(t) {
        var e = t.detail.value;
        this.setData({
            value: e
        });
    },
    comments: function(t) {
        var e = this, a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                1 == t.data.state ? e.setData({
                    comments: !0,
                    relpay: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确定",
                    confirmColor: "",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    formid_three: function(t) {
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        this.setData({
            comments: !1
        });
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    formid_two: function(t) {
        console.log("点击完成评论"), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        var e = this, a = e.data.index, i = e.data.value, s = e.data.id, n = wx.getStorageSync("users").id, o = e.data.reflex_id;
        var r, c, d, u = (r = new Date(), c = r.getMonth() + 1, d = r.getDate(), 1 <= c && c <= 9 && (c = "0" + c), 
        0 <= d && d <= 9 && (d = "0" + d), r.getFullYear() + "-" + c + "-" + d + " " + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds());
        null == i || "" == i ? wx.showModal({
            title: "提示",
            content: "请输入评论的内容",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 0 == e.data.relpay ? 0 == a ? wx.showModal({
            title: "提示",
            content: "小主，给个评分吧",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : app.util.request({
            url: "entry/wxapp/StoreComments",
            cachetime: "0",
            data: {
                store_id: s,
                user_id: n,
                details: i,
                score: a
            },
            success: function(t) {
                console.log("评论完成"), console.log(t), e.setData({
                    comments: !1
                }), wx.showToast({
                    title: "发表成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    e.reload();
                }, 2e3);
                var n = t.data;
                app.util.request({
                    url: "entry/wxapp/GetFormid",
                    cachetime: "0",
                    data: {
                        user_id: e.data.store.user_id
                    },
                    success: function(t) {
                        console.log("搜索form_id"), console.log(t);
                        var e, a, i = [];
                        for (var s in t.data) t.data[s].hours = t.data[s].time.slice(10, 19), t.data[s].time = (t.data[s].time, 
                        a = e = void 0, e = new Date(), (a = new Date(e)).setDate(e.getDate() + 7), a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + t.data[s].hours), 
                        u <= t.data[s].time ? i.push(t.data[s]) : app.util.request({
                            url: "entry/wxapp/DelFormid",
                            cachetime: "0",
                            data: {
                                user_id: t.data[s].id,
                                form_id: t.data[s].form_id
                            },
                            success: function(t) {
                                console.log("删除form_id"), console.log(t);
                            }
                        });
                        app.util.request({
                            url: "entry/wxapp/StorehfMessage",
                            cachetime: "0",
                            data: {
                                pl_id: n,
                                form_id: i[0].form_id,
                                user_id: i[0].user_id,
                                openid: i[0].openid
                            },
                            success: function(t) {
                                console.log("发送模板消息"), console.log(t), app.util.request({
                                    url: "entry/wxapp/DelFormid",
                                    cachetime: "0",
                                    data: {
                                        form_id: i[0].form_id,
                                        user_id: i[0].user_id
                                    },
                                    success: function(t) {
                                        console.log("删除已经使用的模板消息"), console.log(t);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }) : app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: o,
                reply: i
            },
            success: function(t) {
                1 == t.data && (e.setData({
                    reply: !1,
                    comments: !1
                }), e.reload());
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    scrolltxt: function() {
        var a = this, i = a.data.length, s = a.data.windowWidth, n = setInterval(function() {
            var t = i + s, e = a.data.marqueeDistance;
            e < t ? a.setData({
                marqueeDistance: e + a.data.marqueePace
            }) : (a.setData({
                marqueeDistance: 0
            }), clearInterval(n), a.scrolltxt());
        }, a.data.interval);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this, t = wx.getStorageSync("users").id, a = e.data.store.store_name, i = e.data.store.id;
        return {
            title: a,
            path: "/zh_tcwq/pages/sellerinfo/sellerinfo?user_id=" + t + "&id=" + i + "&type=1",
            success: function(t) {
                app.util.request({
                    url: "entry/wxapp/StoreFxNum",
                    cachetime: "0",
                    data: {
                        store_id: i
                    },
                    success: function(t) {
                        e.reload();
                    }
                });
            },
            fail: function(t) {}
        };
    }
});