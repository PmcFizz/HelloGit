var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        dnzt: !1
    },
    bindDateChange: function(t) {
        console.log("date 发生 change 事件，携带值为", t.detail.value, this.data.datestart), this.setData({
            date: t.detail.value
        }), t.detail.value == this.data.datestart ? console.log("日期没有修改") : console.log("修改了日期");
    },
    switch1Change: function(t) {
        var e = this, a = Number(this.data.cost3), o = this.data.freight2;
        console.log("switch1 发生 change 事件，携带值为", t.detail.value, a, o), e.setData({
            dnzt: t.detail.value
        }), t.detail.value ? e.setData({
            cost2: a - o,
            freight: 0
        }) : e.setData({
            cost2: a,
            freight: o
        });
    },
    onLoad: function(t) {
        var e = this, a = util.formatTime(new Date()), o = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), n = util.formatTime(new Date()).substring(11, 16);
        console.log(a, o.toString(), n.toString()), this.setData({
            datestart: o,
            timestart: n,
            date: o,
            time: n
        });
        var s = wx.getStorageSync("url"), i = t.price * t.num;
        e.setData({
            id: t.id,
            url: s,
            price: t.price,
            num: t.num,
            cost: i.toFixed(2),
            name1: t.name1,
            name2: t.name2,
            name3: t.name3,
            store_id: t.store_id
        }), console.log(t + "这是商家的id"), e.user_infos(), e.refresh();
    },
    refresh: function(t) {
        var l = this, e = l.data.id;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(t) {
                console.log(t);
                var e = t.data.spec, a = {}, o = [];
                e.forEach(function(t) {
                    var e = t.spec_id + "_" + t.spec_name;
                    void 0 === a[e] && (a[e] = []), a[e].push(t);
                });
                for (var n = Object.keys(a), s = 0; s < n.length; s++) {
                    var i = n[s].split("_");
                    o.push({
                        spec_id: i[0],
                        spec_name: i[1],
                        value: a[n[s]]
                    });
                }
                console.log(o), t.data.good.imgs = t.data.good.imgs.split(","), t.data.good.lb_imgs = t.data.good.lb_imgs.split(",");
                var c = Number(l.data.cost), r = Number(t.data.good.freight), d = Number(t.data.good.freight), u = c + r;
                u = u.toFixed(2), l.setData({
                    store_good: t.data.good,
                    cost2: u,
                    freight: r,
                    freight2: d,
                    result: o,
                    cost3: u
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: l.data.store_id
            },
            success: function(t) {
                console.log(t), l.setData({
                    store: t.data.store[0]
                });
            }
        });
    },
    user_infos: function(t) {
        var i = this;
        wx.login({
            success: function(t) {
                var e = t.code;
                wx.getUserInfo({
                    success: function(t) {
                        var n = t.userInfo.nickName, s = t.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: e
                            },
                            success: function(t) {
                                var e = s, a = n, o = t.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: o,
                                        img: e,
                                        name: a
                                    },
                                    success: function(t) {
                                        console.log("这是用户的登录信息"), console.log(t), i.setData({
                                            user_info: t.data,
                                            openid: o
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
    address: function(t) {
        var e = this, a = e.data.user_info.id;
        console.log(a), wx.chooseAddress({
            success: function(t) {
                console.log(t), app.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        user_name: t.userName,
                        user_tel: t.telNumber,
                        user_address: t.provinceName + t.cityName + t.countyName + t.detailInfo
                    },
                    success: function(t) {
                        console.log(t), e.user_infos();
                    }
                });
            }
        });
    },
    add: function(t) {
        var e = this.data.num + 1, a = this.data.cost1, o = (a *= e.toFixed(2)) + this.data.freight;
        this.setData({
            num: e,
            cost: a,
            cost2: o
        });
    },
    subtraction: function(t) {
        var e = this.data.num;
        e -= 1;
        var a = this.data.cost1, o = (a *= e.toFixed(2)) + this.data.freight;
        this.setData({
            num: e,
            cost: a,
            cost2: o
        });
    },
    note: function(t) {
        console.log(t), this.setData({
            note: t.detail.value
        });
    },
    order: function(t) {
        var e = this;
        console.log(e.data);
        var a, o = e.data.store_good, n = e.data.user_info.id, s = e.data.user_info, i = e.data.openid, c = this.data.freight, r = (Number(o.goods_cost), 
        e.data.cost2), d = e.data.note, u = e.data.result, l = this.data.date;
        if (a = this.data.dnzt ? 1 : 2, console.log("iszt", a, l), 1 == u.length) var g = u[0].spec_name + ":" + e.data.name1;
        if (2 == u.length) g = u[0].spec_name + ":" + e.data.name1 + ";" + u[1].spec_name + ":" + e.data.name2;
        if (3 == u.length) g = u[0].spec_name + ":" + e.data.name1 + ";" + u[1].spec_name + ":" + e.data.name2 + ";" + u[2].spec_name + ":" + e.data.name3;
        console.log(u), console.log(String(g)), d = null == d ? "" : e.data.note, "" == s.user_name ? wx.showModal({
            title: "提示",
            content: "您还没有填写收货地址喔",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : (console.log(d), app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                user_id: n,
                store_id: o.store_id,
                money: r,
                user_name: s.user_name,
                address: s.user_address,
                tel: s.user_tel,
                good_id: o.id,
                good_name: o.goods_name,
                good_img: o.imgs[0],
                good_money: e.data.price,
                good_spec: String(g),
                freight: c,
                good_num: e.data.num,
                note: d,
                is_zt: a,
                zt_time: l
            },
            success: function(t) {
                console.log(t);
                var e = t.data;
                console.log(r), app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: r,
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log("这里是支付成功"), console.log(t), app.util.request({
                                    url: "entry/wxapp/PayOrder",
                                    cachetime: "0",
                                    data: {
                                        order_id: e
                                    },
                                    success: function(t) {
                                        console.log("改变订单状态"), console.log(t), wx.redirectTo({
                                            url: "../logs/order",
                                            success: function(t) {},
                                            fail: function(t) {},
                                            complete: function(t) {}
                                        });
                                    }
                                }), app.util.request({
                                    url: "entry/wxapp/sms2",
                                    cachetime: "0",
                                    data: {
                                        store_id: o.store_id
                                    },
                                    success: function(t) {
                                        console.log(t);
                                    }
                                });
                            },
                            fail: function(t) {
                                console.log("这里是支付失败"), console.log(t), wx.showToast({
                                    title: "支付失败",
                                    duration: 1e3
                                }), wx.redirectTo({
                                    url: "../logs/order",
                                    success: function(t) {},
                                    fail: function(t) {},
                                    complete: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});