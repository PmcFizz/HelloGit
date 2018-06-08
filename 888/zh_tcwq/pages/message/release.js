var app = getApp(), _imgArray = [], imgArray2 = [], imgArray3 = [];

Page({
    data: {
        add1: [ {
            id: "imgArray1"
        } ],
        length1: 540
    },
    onLoad: function(t) {
        var e = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = wx.getStorageSync("url2"), n = wx.getStorageSync("url");
        e.setData({
            url: a,
            img_url: n
        }), app.util.request({
            url: "entry/wxapp/ZxType",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    zx: t.data
                });
            }
        });
    },
    imgArray1: function(t) {
        var a = this, n = wx.getStorageSync("uniacid"), e = 9 - _imgArray.length;
        console.log(e), 0 < e && e <= 9 ? wx.chooseImage({
            count: e,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var e = t.tempFilePaths;
                a.uploadimg({
                    url: a.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: e
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    uploadimg: function(t) {
        var e = this, a = t.i ? t.i : 0, n = t.success ? t.success : 0, i = t.fail ? t.fail : 0;
        wx.uploadFile({
            url: t.url,
            filePath: t.path[a],
            name: "upfile",
            formData: null,
            success: function(t) {
                "" != t.data ? (console.log(t), n++, _imgArray.push(t.data), e.setData({
                    imgArray1: _imgArray
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(t) {
                i++, console.log("fail:" + a + "fail:" + i);
            },
            complete: function() {
                console.log(a), ++a == t.path.length ? (e.setData({
                    images: t.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + n + " 失败：" + i)) : (console.log(a), 
                t.i = a, t.success = n, t.fail = i, e.uploadimg(t));
            }
        });
    },
    classifation: function(t) {
        var e = this;
        console.log(e.data);
        e.data.zx;
        var a = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id;
        e.setData({
            activeIndex: a,
            index: a,
            type_id: n
        });
    },
    delete1: function(t) {
        console.log(t), Array.prototype.indexOf = function(t) {
            for (var e = 0; e < this.length; e++) if (this[e] == t) return e;
            return -1;
        }, Array.prototype.remove = function(t) {
            var e = this.indexOf(t);
            -1 < e && this.splice(e, 1);
        };
        var e = t.currentTarget.dataset.inde;
        _imgArray.remove(_imgArray[e]), this.setData({
            imgArray1: _imgArray
        });
    },
    add: function(t) {
        wx.switchTab({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    formSubmit: function(t) {
        console.log(t);
        wx.getStorageSync("city_type");
        var e = wx.getStorageSync("city"), a = this.data.add1, n = (n = t.detail.value.text1).replace("\n", "↵"), i = t.detail.value.details, o = wx.getStorageSync("users").id;
        console.log(o);
        var c = this.data.type_id, r = "";
        if (null == c) r = "还没有选择分类哦"; else if ("" == i) r = "标题不能为空"; else if (1 == a.length) if ("" == n) r = "内容不能为空"; else if (0 == _imgArray.length) var l = ""; else if (0 < _imgArray.length) l = _imgArray.join(",");
        "" != r ? wx.showModal({
            title: "提示",
            content: r,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : app.util.request({
            url: "entry/wxapp/Zx",
            cachetime: "0",
            data: {
                type_id: c,
                user_id: o,
                title: i,
                content: n,
                imgs: l,
                cityname: e
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "发布成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "message",
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    });
                }, 2e3));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        _imgArray.splice(0, _imgArray.length), imgArray3.splice(0, imgArray3.length), imgArray2.splice(0, imgArray2.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});