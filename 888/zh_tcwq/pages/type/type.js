var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp(), Data = require("../../utils/util.js");

Page((_defineProperty(_Page = {
    data: {
        index: 0,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        averdr: !1,
        hotels: !1,
        refresh_top: !1,
        scroll_top: !0,
        index_class: !1
    },
    swiperChange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        });
    },
    swiperChange1: function(e) {
        this.setData({
            swiperCurrent1: e.detail.current
        });
    },
    jumps: function(e) {
        var t = this, a = (e.currentTarget.dataset.name, e.currentTarget.dataset.appid), n = e.currentTarget.dataset.src, r = e.currentTarget.dataset.id, i = e.currentTarget.dataset.sjtype;
        console.log(r);
        var o = e.currentTarget.dataset.type;
        if (1 == o) {
            var s = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(s), console.log(), 
            wx.navigateTo({
                url: n + Number(s),
                success: function(e) {
                    t.setData({
                        averdr: !0
                    });
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        } else 2 == o ? wx.navigateTo({
            url: "../car/car?vr=" + r + "&sjtype=" + i,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : 3 == o && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(e) {
                t.setData({
                    averdr: !0
                });
            }
        });
    },
    city_select: function(e) {
        wx.navigateTo({
            url: "city",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    delete: function(e) {
        this.setData({
            averdr: !0
        });
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        });
    },
    seller: function(e) {
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo"
        });
    },
    settled: function(e) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    onLoad: function(e) {
        console.log("onLoad");
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
            }
        }), wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    windowHeight: e.windowHeight
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url2", e.data);
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    System: e.data,
                    userinfo: wx.getStorageSync("users")
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Views",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data;
                "" == t ? t = 0 : 1e4 < Number(t) && (t = (Number(t) / 1e4).toFixed(2) + "万"), a.setData({
                    views: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Num",
            cachetime: "0",
            success: function(e) {
                a.setData({
                    Num: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url", e.data), a.setData({
                    url: e.data
                });
            }
        }), a.refresh(), a.seller();
    },
    hddb: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 1e3
        });
    },
    refresh: function(e) {
        var i = this, t = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Storelist",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(e) {
                e.data.length <= 5 ? i.setData({
                    store: e.data
                }) : i.setData({
                    store: e.data.slice(0, 6)
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(e) {
                console.log(e);
                var t = [], a = [], n = [];
                for (var r in e.data) 8 == e.data[r].type && t.push(e.data[r]), 5 == e.data[r].type && a.push(e.data[r]), 
                7 == e.data[r].type && n.push(e.data[r]);
                i.setData({
                    slide: t,
                    advert: a,
                    ggslide: n
                });
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(e) {
                var t = [];
                for (var a in e.data) 4 == e.data[a].type && t.push(e.data[a]);
                i.setData({
                    msgList: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/type",
            cachetime: "0",
            success: function(e) {
                var t = e.data;
                t.length <= 5 ? i.setData({
                    height: 165
                }) : 5 < t.length && i.setData({
                    height: 330
                });
                for (var a = [], n = 0, r = t.length; n < r; n += 10) a.push(t.slice(n, n + 10));
                console.log(a, t), i.setData({
                    nav: a,
                    navs: t
                });
            }
        });
    }
}, "seller", function(e) {
    var o = this, t = o.data.index_class, a = wx.getStorageSync("city"), n = wx.getStorageSync("index"), s = o.data.page, c = o.data.seller;
    if (console.log(a), 1 == t) {
        null != s && "" != s || (s = 1), null != c && "" != c || (c = []);
        var r = o.data.navs[n].id;
        app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                type_id: r,
                page: o.data.page,
                cityname: a
            },
            success: function(e) {
                if (console.log(e.data), 0 == e.data.length) o.setData({
                    refresh_top: !0
                }); else {
                    o.setData({
                        refresh_top: !1,
                        page: s + 1
                    }), c = c.concat(e.data), c = function(e) {
                        for (var t = [], a = 0; a < e.length; a++) -1 == t.indexOf(e[a]) && t.push(e[a]);
                        return t;
                    }(c);
                }
                if (0 < e.data.length) {
                    for (var t in e.data) {
                        var a = app.ormatDate(e.data[t].tz.sh_time);
                        e.data[t].tz.img = e.data[t].tz.img.split(","), e.data[t].tz.details = e.data[t].tz.details.replace("↵", " "), 
                        4 < e.data[t].tz.img.length && (e.data[t].tz.img_length = Number(e.data[t].tz.img.length) - 4), 
                        4 <= e.data[t].tz.img.length ? e.data[t].tz.img1 = e.data[t].tz.img.slice(0, 4) : e.data[t].tz.img1 = e.data[t].tz.img, 
                        e.data[t].tz.time = a.slice(0, 16);
                    }
                    for (var n in c) {
                        for (var r in c[n].label) c[n].label[r].number = (void 0, i = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                        i);
                        o.setData({
                            seller: c
                        });
                    }
                } else o.setData({
                    seller: c
                });
                var i;
            }
        });
    } else null == s && (s = 1), null == c && (c = []), app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            page: o.data.page,
            cityname: a
        },
        success: function(e) {
            if (console.log(e.data), 0 == e.data.length) o.setData({
                refresh_top: !0
            }); else {
                o.setData({
                    refresh_top: !1,
                    page: s + 1
                }), c = c.concat(e.data), c = function(e) {
                    for (var t = [], a = 0; a < e.length; a++) -1 == t.indexOf(e[a]) && t.push(e[a]);
                    return t;
                }(c);
            }
            if (0 < e.data.length) {
                for (var t in e.data) {
                    var a = app.ormatDate(e.data[t].tz.sh_time);
                    e.data[t].tz.img = e.data[t].tz.img.split(","), e.data[t].tz.details = e.data[t].tz.details.replace("↵", " "), 
                    4 < e.data[t].tz.img.length && (e.data[t].tz.img_length = Number(e.data[t].tz.img.length) - 4), 
                    4 <= e.data[t].tz.img.length ? e.data[t].tz.img1 = e.data[t].tz.img.slice(0, 4) : e.data[t].tz.img1 = e.data[t].tz.img, 
                    e.data[t].tz.time = a.slice(0, 16);
                }
                for (var n in c) {
                    for (var r in c[n].label) c[n].label[r].number = (void 0, i = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                    i);
                    o.setData({
                        seller: c
                    });
                }
            } else o.setData({
                seller: c
            });
            var i;
        }
    });
}), _defineProperty(_Page, "commend", function(e) {
    var t = e.currentTarget.id;
    var a = e.currentTarget.dataset.index;
    wx.setStorageSync("index", a), this.setData({
        page: "",
        seller: "",
        index: a,
        index_class: !0,
        activeIndex: t
    }), this.seller();
}), _defineProperty(_Page, "whole", function(e) {
    wx.removeStorage({
        key: "index",
        success: function(e) {}
    }), this.setData({
        page: 1,
        seller: [],
        index_class: !1
    }), this.seller();
}), _defineProperty(_Page, "bindinput", function(e) {
    var t = e.detail.value;
    "" != t && app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            keywords: t
        },
        success: function(e) {
            0 == e.data.length ? wx.showModal({
                title: "提示",
                content: "没有这个帖子",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "确定",
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }) : wx.navigateTo({
                url: "../infodetial/infodetial?id=" + e.data[0].tz.id,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    });
}), _defineProperty(_Page, "ormatDate", function(e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "-" + a(t.getMonth() + 1, 2) + "-" + a(t.getDate(), 2) + " " + a(t.getHours(), 2) + ":" + a(t.getMinutes(), 2) + ":" + a(t.getSeconds(), 2);
    function a(e, t) {
        for (var a = "" + e, n = a.length, r = "", i = t; i-- > n; ) r += "0";
        return r + a;
    }
}), _defineProperty(_Page, "thumbs_up", function(e) {
    var a = this, n = a.data.seller, r = e.currentTarget.dataset.id, i = wx.getStorageSync("users").id, t = (Number(e.currentTarget.dataset.num), 
    function(t) {
        n[t].tz.id == r && (n[t].thumbs_up = !0, app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: r,
                user_id: i
            },
            success: function(e) {
                1 != e.data ? wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确认",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : (n[t].tz.givelike = Number(n[t].tz.givelike) + 1, a.setData({
                    seller: n
                }));
            }
        }));
    });
    for (var o in n) t(o);
}), _defineProperty(_Page, "previewImage", function(e) {
    console.log(e);
    var t = e.currentTarget.dataset.id, a = this.data.url, n = [], r = e.currentTarget.dataset.inde, i = this.data.seller;
    for (var o in i) if (i[o].tz.id == t) {
        var s = i[o].tz.img;
        for (var c in s) n.push(a + s[c]);
        wx.previewImage({
            current: a + s[r],
            urls: n
        });
    }
}), _defineProperty(_Page, "red", function(e) {
    wx.navigateTo({
        url: "../redbag/redbag",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "redinfo", function(e) {
    wx.showModal({
        title: "温馨提示",
        content: "功能暂未开放,敬请期待",
        showCancel: !0,
        cancelText: "取消",
        confirmText: "确定",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "yellow_page", function(e) {
    wx.reLaunch({
        url: "../yellow_page/yellow"
    });
}), _defineProperty(_Page, "post1", function(e) {
    wx.switchTab({
        url: "../fabu/fabu/fabu"
    });
}), _defineProperty(_Page, "store_info", function(e) {
    var t = e.currentTarget.id;
    wx.navigateTo({
        url: "../sellerinfo/sellerinfo?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "notice", function(e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../notice/notice?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "post", function(e) {
    wx, wx.reLaunch({
        url: "../shun/shun",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "phone", function(e) {
    var t = e.currentTarget.dataset.id;
    wx.makePhoneCall({
        phoneNumber: t
    });
}), _defineProperty(_Page, "more", function(e) {
    wx.switchTab({
        url: "../store/store",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "jump", function(e) {
    var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.name;
    wx.navigateTo({
        url: "../marry/marry?id=" + t + "&name=" + a,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "see", function(e) {
    this.data.seller;
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../infodetial/infodetial?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    });
}), _defineProperty(_Page, "formid_one", function(e) {
    console.log("搜集第一个formid"), console.log(e), app.util.request({
        url: "entry/wxapp/SaveFormid",
        cachetime: "0",
        data: {
            user_id: wx.getStorageSync("users").id,
            form_id: e.detail.formId,
            openid: wx.getStorageSync("openid")
        },
        success: function(e) {}
    });
}), _defineProperty(_Page, "onReady", function() {
    this.setData({
        first: 1
    });
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), 
_defineProperty(_Page, "onUnload", function() {
    wx.removeStorageSync("city_type");
}), _defineProperty(_Page, "onPullDownRefresh", function() {
    this.setData({
        page: 1,
        seller: [],
        refresh_top: !1
    }), this.refresh(), this.seller(), wx.stopPullDownRefresh();
}), _defineProperty(_Page, "onReachBottom", function() {
    0 == this.data.refresh_top && this.seller();
}), _defineProperty(_Page, "onShareAppMessage", function() {}), _Page));