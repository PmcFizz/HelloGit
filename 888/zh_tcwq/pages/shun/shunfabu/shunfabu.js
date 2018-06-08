var app = getApp();

Page({
    data: {
        shunfabu: [ "人找车", "车找人", "车找货", "货找车" ],
        index: 0,
        arr_index: 0,
        array: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
        icon_hidden: !0,
        duty: !0,
        money: "0",
        time: "00:00"
    },
    onLoad: function(t) {
        console.log(t), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = wx.getStorageSync("System");
        console.log(e);
        var a = this, n = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                2 == t.data.state && wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
        var o, c, i, s = (o = new Date(), c = o.getMonth() + 1, i = o.getDate(), 1 <= c && c <= 9 && (c = "0" + c), 
        0 <= i && i <= 9 && (i = "0" + i), o.getFullYear() + "-" + c + "-" + i + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds()).slice(0, 11), l = "";
        0 == t.id ? l = "人找车" : 1 == t.id ? l = "车找人" : 2 == t.id ? l = "车找货" : 3 == t.id && (l = "货找车"), 
        app.util.request({
            url: "entry/wxapp/CarTag",
            cachetime: "0",
            data: {
                typename: l
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].click_class = "select1";
                a.setData({
                    label: t.data
                });
            }
        }), a.setData({
            date: s,
            id: t.id,
            type_name: l,
            money: e.pc_money,
            pc_xuz: e.pc_xuz
        });
    },
    changeColor: function(t) {
        console.log(t);
        var e = t.currentTarget.id, a = this.data.label;
        for (var n in a) ;
        "select1" == a[e].click_class ? a[e].click_class = "select2" : "select2" == a[e].click_class && (a[e].click_class = "select1"), 
        this.setData({
            label: a
        });
    },
    text: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    add: function(t) {
        var e = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t);
                t.latitude, t.longitude, t.speed, t.accuracy;
                e.setData({
                    address: t.address,
                    start_lat: t.latitude,
                    start_lng: t.longitude
                });
            }
        });
    },
    add1: function(t) {
        var e = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t);
                t.latitude, t.longitude, t.speed, t.accuracy, t.latitude, t.longitude;
                e.setData({
                    address1: t.address,
                    end_lat: t.latitude,
                    end_lng: t.longitude
                });
            }
        });
    },
    bindPickerChange: function(t) {
        this.setData({
            arr_index: t.detail.value
        });
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            date: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    icon_show: function(t) {
        0 == this.data.icon_hidden ? this.setData({
            icon_hidden: !0
        }) : this.setData({
            icon_hidden: !1
        });
    },
    cancel: function(t) {
        0 == this.data.duty ? this.setData({
            duty: !0
        }) : this.setData({
            duty: !1
        });
    },
    formSubmit: function(t) {
        console.log(t);
        var e = this, a = (wx.getStorageSync("city_type"), wx.getStorageSync("city"));
        console.log(a);
        var n = wx.getStorageSync("users").id, o = e.data.id, c = e.data.type_name, i = t.detail.value.address1, s = t.detail.value.address2, l = t.detail.value.path;
        null == l && (l = " ", console.log(l));
        var u = e.data.date + e.data.time, d = e.data.array[e.data.arr_index], r = t.detail.value.weight, g = t.detail.value.contacts, p = t.detail.value.contacts_tel, f = t.detail.value.other_demand, m = Number(e.data.money), _ = (c = e.data.type_name, 
        e.data.start_lat), h = e.data.start_lng, y = e.data.end_lat, w = e.data.end_lng;
        console.log(_), console.log(h), console.log(y), console.log(e.data.label);
        var x = e.data.label, v = [];
        for (var S in x) "select2" == x[S].click_class && v.push(x[S]);
        console.log(v);
        var k = [];
        v.map(function(t) {
            var e = {};
            e.tag_id = t.id, k.push(e);
        }), console.log(k);
        var D = "";
        if ("" == i ? D = "还没有选择出发地址哦" : "" == s ? D = "还没有选择目的地哦" : 3 == o ? "" == r && (D = "还没有填写货物重量") : "" == g ? D = "还没有填写联系人" : "" == p && (D = "还没有填写联系人的电话"), 
        "" != D) wx.showModal({
            title: "温馨提示",
            content: D,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }); else if (m <= 0) app.util.request({
            url: "entry/wxapp/car",
            cachetime: "0",
            data: {
                user_id: n,
                start_place: i,
                end_place: s,
                start_time: u,
                num: d,
                link_name: g,
                link_tel: p,
                typename: c,
                other: f,
                tj_place: l,
                sz: k,
                hw_wet: r,
                star_lat: _,
                star_lng: h,
                end_lat: y,
                end_lng: w,
                cityname: a
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "发布成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    wx.navigateBack({
                        url: "../shun",
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    });
                }, 2e3);
            }
        }); else {
            var T = wx.getStorageSync("openid");
            app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: T,
                    money: m
                },
                success: function(t) {
                    console.log(t), wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: t.data.signType,
                        paySign: t.data.paySign,
                        success: function(t) {
                            app.util.request({
                                url: "entry/wxapp/fx",
                                cachetime: "0",
                                data: {
                                    user_id: n,
                                    money: m
                                },
                                success: function(t) {
                                    console.log(t);
                                }
                            }), console.log(t), app.util.request({
                                url: "entry/wxapp/car",
                                cachetime: "0",
                                data: {
                                    user_id: n,
                                    start_place: i,
                                    end_place: s,
                                    start_time: u,
                                    num: d,
                                    link_name: g,
                                    link_tel: p,
                                    typename: c,
                                    other: f,
                                    tj_place: l,
                                    sz: k,
                                    hw_wet: r,
                                    star_lat: _,
                                    star_lng: h,
                                    end_lat: y,
                                    end_lng: w,
                                    cityname: a
                                },
                                success: function(t) {
                                    console.log(t), app.util.request({
                                        url: "entry/wxapp/SaveCarPayLog",
                                        cachetime: "0",
                                        data: {
                                            car_id: t.data,
                                            money: m
                                        },
                                        success: function(t) {
                                            console.log(t);
                                        }
                                    }), wx.showToast({
                                        title: "发布成功",
                                        icon: "",
                                        image: "",
                                        duration: 2e3,
                                        mask: !0,
                                        success: function(t) {},
                                        fail: function(t) {},
                                        complete: function(t) {}
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            url: "../shun",
                                            success: function(t) {},
                                            fail: function(t) {},
                                            complete: function(t) {}
                                        });
                                    }, 2e3);
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});