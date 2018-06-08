var imgArray = [], app = getApp();

Page({
    data: {
        images: [],
        lunbo_len: 0,
        checked1: !1,
        checked2: !1,
        checked3: !1,
        checked4n: !1,
        disabled: !1
    },
    onLoad: function(e) {
        var t = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("url2"), a = wx.getStorageSync("url"), n = wx.getStorageSync("System");
        t.setData({
            url: o,
            procedures: Number(n.hb_sxf) / 100,
            url1: a
        });
        wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyStore",
            cachetime: "0",
            data: {
                user_id: e.user_id
            },
            success: function(e) {
                console.log(e), t.setData({
                    store: e.data,
                    user_id: ""
                });
            }
        });
    },
    choiseimg: function() {
        var o = this;
        console.log(o.data);
        var a = wx.getStorageSync("uniacid"), e = 9 - [].length;
        0 < e && e <= 9 ? wx.chooseImage({
            count: e,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var t = e.tempFilePaths;
                o.uploadimg({
                    url: o.data.url + "app/index.php?i=" + a + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: t
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    uploadimg: function(e) {
        var t = this, o = e.i ? e.i : 0, a = e.success ? e.success : 0, n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[o],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), a++, imgArray.push(e.data), t.setData({
                    imgArray: imgArray
                }), console.log(o), console.log("上传商家轮播图时候提交的图片数组", imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                n++, console.log("fail:" + o + "fail:" + n);
            },
            complete: function() {
                console.log(o), ++o == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + a + " 失败：" + n)) : (console.log(o), 
                e.i = o, e.success = a, e.fail = n, t.uploadimg(e));
            }
        });
    },
    delete: function(e) {
        console.log(this.data), console.log(e), Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1;
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            -1 < t && this.splice(t, 1);
        };
        var t = e.currentTarget.dataset.index;
        imgArray.remove(imgArray[t]), this.setData({
            imgArray: imgArray
        });
    },
    switch1Change: function(e) {
        console.log(e), this.setData({
            checked1: e.detail.value
        });
    },
    switch2Change: function(e) {
        console.log(e), this.setData({
            checked2: e.detail.value
        });
    },
    formSubmit: function(e) {
        var t = this, o = wx.getStorageSync("city"), a = wx.getStorageSync("users"), n = (a.id, 
        a.openid), i = t.data.images, c = t.data.store, s = t.data.procedures, l = e.detail.value, r = Number(l.money), u = Number(l.share), d = l.details, g = t.data.checked1, f = t.data.checked2;
        if (0 == g) var m = 1, p = (r + s * r).toFixed(2), h = r / u; else m = 2, p = (r * u + r * u * s).toFixed(2);
        if (0 == f) var y = "", w = 1; else y = l.hb_keyword, w = 2;
        console.log(imgArray);
        var x = "";
        console.log(x), console.log("红包总金额  " + p);
        var S = new RegExp("^[一-龥]+$"), v = "";
        "" == d ? v = "福利描述不能为空" : "" == r ? v = "红包金额不能为空" : !t.data.checked1 && r < 1 ? v = "福利红包金额不能小于1元" : "" == u ? v = "红包个数不能为空" : h < .1 ? v = "红包份数过大，请合理设置" : t.data.checked1 && r < .1 ? v = "单个红包最小金额不能小于0.1" : 1 == f && ("" == y ? v = "红包口令不能为空" : S.test(y) || (v = "口令只能输入汉字")), 
        "" != v ? wx.showModal({
            title: "提示",
            content: v,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : imgArray.length < i.length ? wx.showModal({
            title: "提示",
            content: "图片正在上传，请稍候",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (x = imgArray.join(","), console.log(x), t.setData({
            disabled: !0
        }), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: n,
                money: p
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        console.log("这里是支付成功"), console.log(e), app.util.request({
                            url: "entry/wxapp/Posting",
                            cachetime: "0",
                            data: {
                                store_id: c.id,
                                details: d,
                                img: x,
                                user_id: t.data.user_id,
                                user_name: c.store_name,
                                user_tel: c.tel,
                                type2_id: "",
                                type_id: "",
                                money: p,
                                type: "",
                                sz: c.logo,
                                address: c.address,
                                hb_money: r,
                                hb_keyword: y,
                                hb_num: u,
                                hb_type: w,
                                hb_random: m,
                                cityname: o
                            },
                            success: function(e) {
                                console.log(e), app.util.request({
                                    url: "entry/wxapp/SaveTzPayLog",
                                    cachetime: "0",
                                    data: {
                                        tz_id: e.data,
                                        money: p,
                                        money3: p
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                }), wx.showToast({
                                    title: "发布成功",
                                    icon: "",
                                    image: "",
                                    duration: 2e3,
                                    mask: !0,
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                }), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "../index/index",
                                        success: function(e) {},
                                        fail: function(e) {},
                                        complete: function(e) {}
                                    });
                                }, 2e3);
                            }
                        });
                    },
                    fail: function(e) {
                        console.log("这里是支付失败"), console.log(e), wx.showToast({
                            title: "支付失败",
                            duration: 1e3
                        }), t.setData({
                            disabled: !1
                        });
                    }
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        imgArray.splice(0, imgArray.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});