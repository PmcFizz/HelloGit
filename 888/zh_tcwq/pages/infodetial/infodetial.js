var app = getApp();

Page({
    data: {
        reply: !1,
        comment: !1,
        select: 0,
        arrow: 1,
        sure: !1,
        receive: !1,
        rob_redbag: !1,
        share: !1,
        hb_share: !1,
        share_red: !1
    },
    onLoad: function(t) {
        var i = this;
        console.log(t), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), i.setData({
                    system: t.data
                });
            }
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth / 2, a = 1.095 * e;
                i.setData({
                    width: e,
                    height: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), i.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                console.log(t), i.setData({
                    url2: t.data
                });
            }
        });
        var e = wx.getStorageSync("users").id;
        null != t.type ? (wx.login({
            success: function(t) {
                var e = t.code;
                wx.setStorageSync("code", e), wx.getUserInfo({
                    success: function(t) {
                        wx.setStorageSync("user_info", t.userInfo);
                        var n = t.userInfo.nickName, s = t.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: e
                            },
                            success: function(t) {
                                wx.setStorageSync("key", t.data.session_key);
                                var e = s, a = n;
                                wx.setStorageSync("openid", t.data.openid);
                                var o = t.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: o,
                                        img: e,
                                        name: a
                                    },
                                    success: function(t) {
                                        wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                        i.setData({
                                            user_id: t.data.id,
                                            user_name: a
                                        }), i.reload();
                                    }
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,无法正常使用此小程序,点击确定重新获取授权。",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        if (t.authSetting["scope.userInfo"]) wx.getUserInfo({
                                            success: function(t) {
                                                wx.setStorageSync("user_info", t.userInfo);
                                                var n = t.userInfo.nickName, s = t.userInfo.avatarUrl;
                                                app.util.request({
                                                    url: "entry/wxapp/openid",
                                                    cachetime: "0",
                                                    data: {
                                                        code: e
                                                    },
                                                    success: function(t) {
                                                        wx.setStorageSync("key", t.data.session_key);
                                                        var e = s, a = n;
                                                        wx.setStorageSync("openid", t.data.openid);
                                                        var o = t.data.openid;
                                                        app.util.request({
                                                            url: "entry/wxapp/Login",
                                                            cachetime: "0",
                                                            data: {
                                                                openid: o,
                                                                img: e,
                                                                name: a
                                                            },
                                                            success: function(t) {
                                                                wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                                                i.setData({
                                                                    user_id: t.data.id,
                                                                    user_name: a
                                                                }), i.reload();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }); else {
                                            wx.setStorageSync("user_info", "");
                                            app.util.request({
                                                url: "entry/wxapp/openid",
                                                cachetime: "0",
                                                data: {
                                                    code: e
                                                },
                                                success: function(t) {
                                                    wx.setStorageSync("key", t.data.session_key);
                                                    wx.setStorageSync("openid", t.data.openid);
                                                    var e = t.data.openid;
                                                    app.util.request({
                                                        url: "entry/wxapp/Login",
                                                        cachetime: "0",
                                                        data: {
                                                            openid: e,
                                                            img: "",
                                                            name: ""
                                                        },
                                                        success: function(t) {
                                                            wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                                            i.setData({
                                                                user_id: t.data.id,
                                                                user_name: ""
                                                            }), i.reload();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    },
                                    fail: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        }), i.setData({
            post_info_id: t.my_post
        })) : (i.setData({
            user_id: e,
            post_info_id: t.id,
            user_name: wx.getStorageSync("users").name
        }), i.reload());
    },
    reload: function(t) {
        var c = this, u = c.data.post_info_id;
        app.util.request({
            url: "entry/wxapp/IsCollection",
            cachetime: "0",
            data: {
                information_id: u,
                user_id: c.data.user_id
            },
            success: function(t) {
                1 == t.data ? c.setData({
                    Collection: !0
                }) : c.setData({
                    Collection: !1
                });
            }
        });
        var e = wx.getStorageSync("System");
        c.setData({
            system_name: e.pt_name
        }), app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: u
            },
            success: function(t) {
                if (console.log(t), null == t.data.tz.type2_name) var e = ""; else e = t.data.tz.type2_name;
                wx.setNavigationBarTitle({
                    title: t.data.tz.type_name + " " + e
                });
                var a = c.ormatDate(t.data.tz.sh_time);
                for (var o in t.data.tz.time2 = a.slice(0, 16), t.data.pl) t.data.pl[o].time = c.ormatDate(t.data.pl[o].time), 
                t.data.pl[o].time = t.data.pl[o].time.slice(0, 16);
                var n = t.data.tz.givelike;
                for (var s in t.data.tz.img = t.data.tz.img.split(","), t.data.label) t.data.label[s].number = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                var i = Number(t.data.tz.hb_num), r = Number(t.data.tz.hb_random);
                Number(t.data.tz.hb_type);
                t.data.tz.hb_money = 1 == r ? t.data.tz.hb_money : (Number(t.data.tz.hb_money) * i).toFixed(2), 
                app.util.request({
                    url: "entry/wxapp/HongList",
                    cachetime: "0",
                    data: {
                        id: t.data.tz.id
                    },
                    success: function(t) {
                        console.log(t);
                        var e = t.data, a = 0;
                        if (1 == (o = function(t, e) {
                            for (var a = 0; a < t.length; a++) if (e === t[a].user_id) return !0;
                            return !1;
                        }(e, c.data.user_id))) var o = 2; else if (i == e.length) o = 1; else o = 3;
                        for (var n in e) a += Number(e[n].money);
                        c.setData({
                            price: a.toFixed(2),
                            hongbao_use: o,
                            hongbao_len: t.data.length,
                            hongbao: e
                        });
                    }
                }), t.data.tz.details = t.data.tz.details.replace("↵", "\n"), t.data.tz.trans1 = 1, 
                t.data.tz.trans2 = 1, t.data.tz.dis1 = "block", t.data.tz.trans_1 = 2, t.data.tz.trans_2 = 1, 
                c.setData({
                    post: t.data.tz,
                    dianzan: t.data.dz,
                    givelike: n,
                    post_info_id: u,
                    tei_id: t.data.tz.id,
                    criticism: t.data.pl,
                    label: t.data.label
                });
            }
        });
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
        function a(t, e) {
            for (var a = "" + t, o = a.length, n = "", s = e; s-- > o; ) n += "0";
            return n + a;
        }
    },
    rob_redbag: function(t) {
        var e = this.data.rob_redbag;
        this.data.hongbao_use;
        1 == e ? this.setData({
            rob_redbag: !1
        }) : this.setData({
            rob_redbag: !0
        });
    },
    trans1: function(t) {
        var e = this, a = e.data.post, o = e.data.num;
        if (2 == e.data.system.is_hbzf) {
            if (null == o && (o = 1), 1 == o) {
                a.trans1 = "trans1", a.trans2 = "trans2";
                var n = wx.getStorageSync("users").id, s = e.data.post_info_id;
                app.util.request({
                    url: "entry/wxapp/GetHong",
                    cachetime: "0",
                    data: {
                        id: s,
                        user_id: n
                    },
                    success: function(t) {
                        console.log("领取红包"), console.log(t), "error" == t.data && wx.showModal({
                            title: "提示",
                            content: "手慢了，红包被抢光了"
                        });
                    }
                }), setTimeout(function() {
                    a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
                        store: a
                    });
                }, 500), setTimeout(function() {
                    a.trans_1 = 2, a.trans_2 = 1, a.dis1 = "block", a.dis2 = "none", e.setData({
                        store: a
                    });
                }, 1e3), setTimeout(function() {
                    a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
                        store: a
                    });
                }, 1500), setTimeout(function() {
                    wx.navigateTo({
                        url: "../redbag/redinfo/see_rob?id=" + e.data.post_info_id,
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    }), e.setData({
                        rob_redbag: !1
                    });
                }, 1300);
            }
            e.setData({
                post: a,
                num: o + 1
            });
        } else e.setData({
            share_red: !0,
            rob_redbag: !1
        });
    },
    trans2: function(t) {
        this.data.store;
        wx.navigateTo({
            url: "../redbag/redinfo/see_rob?id=" + this.data.post_info_id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), this.setData({
            rob_redbag: !1
        });
    },
    weixin: function(t) {
        this.setData({
            hb_share: !1
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
    receive1: function(t) {
        this.setData({
            receive: !1
        });
    },
    fabu: function(t) {
        wx.reLaunch({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    previewImage: function(t) {
        var e = this.data.url, a = [], o = t.currentTarget.dataset.inde, n = this.data.post.img;
        for (var s in n) a.push(e + n[s]);
        wx.previewImage({
            current: e + n[o],
            urls: a
        });
    },
    Collection: function(t) {
        var e = this, a = e.data.tei_id, o = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Collection",
            cachetime: "0",
            data: {
                information_id: a,
                user_id: o
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
    hb_keyword: function(e) {
        var t = e.detail.value;
        this.data.post.hb_keyword == t ? this.setData({
            sure: !0
        }) : wx.showModal({
            title: "提示",
            content: "输入的口令错误，请重新输入",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {
                e.detail.value;
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    comment: function(t) {
        var e = this, a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), 1 == t.data.state ? e.setData({
                    comment: !0
                }) : wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    complete: function(t) {
        this.setData({
            complete: t.detail.value
        });
    },
    complete1: function(t) {
        this.setData({
            complete1: t.detail.value
        });
    },
    formid_two: function(t) {
        console.log(t), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        var e = this, a = (t.detail.formId, e.data.complete), o = e.data.user_id, n = e.data.post_info_id, i = e.data.post.user_id;
        var s, r, c, u = (s = new Date(), r = s.getMonth() + 1, c = s.getDate(), 1 <= r && r <= 9 && (r = "0" + r), 
        0 <= c && c <= 9 && (c = "0" + c), s.getFullYear() + "-" + r + "-" + c + " " + s.getHours() + ":" + s.getMinutes() + ":" + s.getSeconds());
        "" == a || null == a ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (e.setData({
            replay: !1,
            comment: !1
        }), app.util.request({
            url: "entry/wxapp/Comments",
            cachetime: "0",
            data: {
                information_id: n,
                details: a,
                user_id: o
            },
            success: function(t) {
                if ("error" != t.data) {
                    wx.showToast({
                        title: "评论成功"
                    }), setTimeout(function() {
                        e.reload();
                    }, 1e3);
                    var s = t.data;
                    app.util.request({
                        url: "entry/wxapp/GetFormid",
                        cachetime: "0",
                        data: {
                            user_id: i
                        },
                        success: function(t) {
                            console.log(t);
                            var e, a, o = [];
                            for (var n in t.data) t.data[n].hours = t.data[n].time.slice(10, 19), t.data[n].time = (t.data[n].time, 
                            a = e = void 0, e = new Date(), (a = new Date(e)).setDate(e.getDate() + 7), a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + t.data[n].hours), 
                            console.log(t.data[n].time), console.log(u), u <= t.data[n].time ? o.push(t.data[n]) : app.util.request({
                                url: "entry/wxapp/DelFormid",
                                cachetime: "0",
                                data: {
                                    user_id: t.data[n].user_id,
                                    form_id: t.data[n].form_id
                                },
                                success: function(t) {}
                            });
                            console.log(o), app.util.request({
                                url: "entry/wxapp/TzhfMessage",
                                cachetime: "0",
                                data: {
                                    pl_id: s,
                                    form_id: o[0].form_id,
                                    user_id: o[0].user_id,
                                    openid: o[0].openid
                                },
                                success: function(t) {
                                    console.log(t), app.util.request({
                                        url: "entry/wxapp/DelFormid",
                                        cachetime: "0",
                                        data: {
                                            form_id: o[0].form_id,
                                            user_id: o[0].user_id
                                        },
                                        success: function(t) {
                                            console.log(t);
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else wx.showToast({
                    title: "评论失败",
                    icon: "loading"
                });
            }
        }));
    },
    reply1: function(t) {
        var e = t.currentTarget.dataset.reflex_id, a = t.currentTarget.dataset.name, o = this.data.user_id;
        this.data.post.user_id == o ? this.setData({
            reply: !0,
            reflex_id: e,
            reflex_name: "回复" + a
        }) : wx.showToast({
            title: "管理员可回复",
            icon: "loading",
            duration: 1e3
        });
    },
    formid_one: function(t) {
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
            reply: !1,
            comment: !1
        });
    },
    reply3: function(t) {
        var e = this, a = e.data.reflex_id, o = e.data.complete1;
        "" == o || null == o ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (e.setData({
            reply: !1
        }), app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: a,
                reply: o
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "回复成功"
                }), setTimeout(function() {
                    e.reload();
                }, 1e3));
            }
        }));
    },
    phone: function(t) {
        var e = this.data.post;
        wx.makePhoneCall({
            phoneNumber: e.user_tel
        });
    },
    move: function(t) {
        var e = this, a = e.data.select;
        1 == e.data.arrow ? setTimeout(function() {
            e.setData({
                arrow: 2
            });
        }, 1500) : setTimeout(function() {
            e.setData({
                arrow: 1
            });
        }, 1500), 1 == a ? e.setData({
            select: 0
        }) : e.setData({
            select: 1
        });
    },
    formSubmit: function(t) {
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
        var e = t.detail.formId;
        console.log("用户的form——id是" + e), console.log(this.data);
        var a = wx.getStorageSync("openid");
        console.log(a);
        var o = this, n = o.data.tei_id, s = wx.getStorageSync("users").id, i = Number(o.data.givelike);
        o.data.post.user_id;
        app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: n,
                user_id: s
            },
            success: function(t) {
                console.log(t), "1" == t.data && (wx.showToast({
                    title: "点赞成功",
                    duration: 1e3
                }), o.reload(), o.setData({
                    thumbs_ups: !0,
                    thumbs_up: i + 1
                })), "不能重复点赞!" == t.data && (wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确认",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), o.setData({
                    thumbs_ups: !0
                }));
            }
        });
    },
    shou: function(t) {
        wx.switchTab({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    post: function(t) {
        wx.switchTab({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reload();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = this.data.system.is_hbzf;
        console.log(t, e);
        var o = this;
        console.log(o.data), o.setData({
            share: !0
        });
        var a = o.data.post.user_name, n = o.data.post_info_id, s = Number(o.data.post.hb_money), i = o.data.system.hb_content, r = o.data.system.hb_img;
        if (console.log(r), "" == r) var c = o.data.url2 + "addons/zh_tcwq/template/images/hongbao.jpg"; else c = o.data.url + o.data.system.hb_img;
        if (console.log(s, i, c), "" == i) var u = o.data.user_name + "邀您一起拆" + a + "的红包"; else u = (u = o.data.system.hb_content.replace("name", o.data.user_name)).replace("type", "【" + o.data.post.type_name + "】");
        return 0 < s && "button" == t.from && "1" == e ? {
            title: u,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
            imageUrl: c,
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: o.data.post.id
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), console.log(t), o.setData({
                    share_red: !1
                });
                var e = o.data.user_id, a = o.data.post_info_id;
                console.log(a, e), app.util.request({
                    url: "entry/wxapp/GetHong",
                    cachetime: "0",
                    data: {
                        id: a,
                        user_id: e
                    },
                    success: function(t) {
                        console.log("领取红包"), console.log(t), "error" == t.data && wx.showModal({
                            title: "提示",
                            content: "手慢了，红包被抢光了"
                        });
                    }
                }), wx.navigateTo({
                    url: "../redbag/redinfo/see_rob?id=" + o.data.post_info_id,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), o.setData({
                    share: !0,
                    hb_share: !1,
                    rob_redbag: !1
                });
            },
            fail: function(t) {}
        } : 0 < s && "button" == t.from && "2" == e ? {
            title: u,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: o.data.post.id
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), console.log(t), o.setData({
                    share_red: !1
                });
            },
            fail: function(t) {}
        } : 0 < s && "menu" == t.from ? {
            title: u,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: o.data.post.id
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), console.log(t), o.setData({
                    share_red: !1
                });
            },
            fail: function(t) {}
        } : {
            title: "【" + o.data.post.type_name + "】 " + o.data.post.details,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: o.data.post.id
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), console.log(t), o.setData({
                    share_red: !1
                });
            },
            fail: function(t) {}
        };
    }
});