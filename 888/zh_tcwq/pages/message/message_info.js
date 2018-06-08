var app = getApp();

Page({
    data: {
        speak: !1
    },
    previewImage: function(e) {
        var t = this.data.url, a = [], n = e.currentTarget.dataset.inde, o = this.data.info.imgs;
        for (var s in o) a.push(t + o[s]);
        wx.previewImage({
            current: t + o[n],
            urls: a
        });
    },
    onLoad: function(e) {
        console.log(e);
        var t = e.id, a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                a.setData({
                    url: e.data
                });
            }
        });
        var n = wx.getStorageSync("System");
        console.log(n), a.setData({
            id: t,
            system: n
        }), a.refresh();
    },
    refresh: function(e) {
        var l = this, i = l.data.id;
        var r = 0;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var t = e.code;
                wx.setStorageSync("code", t), wx.getUserInfo({
                    success: function(e) {
                        var o = e.userInfo.nickName, s = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: t
                            },
                            success: function(e) {
                                var t = s, a = o, n = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: n,
                                        img: t,
                                        name: a
                                    },
                                    success: function(e) {
                                        console.log(e), r = e.data.id, l.setData({
                                            username: e.data.name,
                                            user_id: e.data.id
                                        });
                                        var t, a, n, u = (t = new Date(), a = t.getMonth() + 1, n = t.getDate(), 1 <= a && a <= 9 && (a = "0" + a), 
                                        0 <= n && n <= 9 && (n = "0" + n), t.getFullYear() + "/" + a + "/" + n + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds());
                                        app.util.request({
                                            url: "entry/wxapp/ZxInfo",
                                            cachetime: "0",
                                            data: {
                                                id: i,
                                                user_id: r
                                            },
                                            success: function(e) {
                                                console.log(e);
                                                var t = e.data;
                                                null == t.img ? t.type = 1 : t.type = 2, t.content = t.content.replace("↵", "\n");
                                                var a = u, n = t.time.replace(/-/g, "/"), o = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, s = Math.abs(Date.parse(a.replace(o, "$2-$3-$1$4")) - Date.parse(n.replace(o, "$2-$3-$1$4"))) / 1e3, i = Math.floor(s / 3600), c = Math.floor(s % 3600 / 60);
                                                t.m = Number(i), t.h = Number(c), console.log(i + " 小时 " + c + " 分钟"), console.log(u), 
                                                null != t.imgs && (t.imgs = t.imgs.split(",")), console.log(t), t.time = t.time.slice(0, 16), 
                                                app.util.request({
                                                    url: "entry/wxapp/ZxPlList",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id
                                                    },
                                                    success: function(e) {
                                                        console.log(e), t.pl = e.data, l.setData({
                                                            info: t
                                                        });
                                                    }
                                                }), app.util.request({
                                                    url: "entry/wxapp/ZxLikeList",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id
                                                    },
                                                    success: function(e) {
                                                        console.log(e), l.setData({
                                                            thumbs_up: e.data
                                                        });
                                                    }
                                                }), app.util.request({
                                                    url: "entry/wxapp/Footprint",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id,
                                                        user_id: r
                                                    },
                                                    success: function(e) {
                                                        console.log(e);
                                                    }
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
        });
    },
    speak: function(e) {
        this.setData({
            speak: !0,
            speak_type: 1
        });
    },
    speak1: function(e) {
        this.setData({
            speak: !1
        });
    },
    speak3: function(e) {
        console.log(e), wx.getStorageSync("users").id != this.data.info.user_id ? wx.showModal({
            title: "提示",
            content: "只有管理员才可以回复",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            speak: !0,
            speak_type: 2,
            speak_id: e.currentTarget.id
        });
    },
    speaks: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            value: t
        });
    },
    Collection: function(e) {
        var t = this, a = t.data.info, n = t.data.user_id;
        app.util.request({
            url: "entry/wxapp/ZxLike",
            cachetime: "0",
            data: {
                zx_id: a.id,
                user_id: n
            },
            success: function(e) {
                console.log(e), 1 == e.data ? (wx.showToast({
                    title: "点赞成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), setTimeout(function() {
                    t.refresh();
                }, 2e3)) : wx.showModal({
                    title: "提示",
                    content: e.data,
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    Collection: e.data
                });
            }
        });
    },
    speak2: function(e) {
        var t = this, a = t.data.value;
        if (console.log(a), null == a || "" == a) wx.showModal({
            title: "提示",
            content: "还没输入内容哦",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            var n = t.data.user_id, o = t.data.info.id, s = t.data.speak_type, i = t.data.speak_id;
            1 == s ? app.util.request({
                url: "entry/wxapp/ZxPl",
                cachetime: "0",
                data: {
                    zx_id: o,
                    content: a,
                    user_id: n
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        });
                    }, 2e3));
                }
            }) : app.util.request({
                url: "entry/wxapp/ZxHf",
                cachetime: "0",
                data: {
                    id: i,
                    reply: a
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "回复成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        });
                    }, 2e3));
                }
            });
        }
    },
    shouye: function(e) {
        wx.reLaunch({
            url: "../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this.data.info, a = this.data.username;
        return console.log(t), "button" === e.from && console.log(e.target), {
            title: a + "邀请你进来看看",
            path: "zh_tcwq/pages/message/message_info?id=" + t.id,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});