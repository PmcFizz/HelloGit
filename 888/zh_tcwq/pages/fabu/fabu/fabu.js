var app = getApp();

Page({
    data: {
        index: 0,
        base: !1
    },
    onLoad: function(a) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.reload();
    },
    reload: function(a) {
        var e = this, t = wx.getStorageSync("System");
        console.log(t);
        var n = wx.getStorageSync("url");
        e.setData({
            url: n,
            pt_name: t.pt_name
        }), app.util.request({
            url: "entry/wxapp/type",
            cachetime: "0",
            success: function(a) {
                var t = a.data;
                e.setData({
                    nav: t
                });
            }
        });
    },
    settled: function(a) {
        wx.navigateTo({
            url: "../../settled/settled",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    formid_one: function(a) {
        console.log("搜集第一个formid"), console.log(a), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: a.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {}
        });
    },
    bindPickerChange: function(a) {
        console.log(a);
        var t = this, e = t.data.id, n = a.detail.value, o = t.data.nav[t.data.index].array[n];
        for (var i in t.data.nav[t.data.index].array) if (o == t.data.nav[t.data.index].arrays[i].name) var d = t.data.nav[t.data.index].arrays[i].id, r = t.data.nav[t.data.index].arrays[i].type_id, c = t.data.nav[t.data.index].money;
        console.log(t.data.nav[t.data.index]), wx.navigateTo({
            url: "../edit/edit?info=" + o + "&id=" + e + "&type_id=" + d + "&money=" + c + "&type2_id=" + r
        });
    },
    edit: function(a) {
        var t = this;
        console.log(a);
        var e = a.currentTarget.dataset.index, n = a.currentTarget.dataset.id, o = t.data.nav[e].money, i = [], d = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/FtXz",
            cachetime: "0",
            data: {
                user_id: d
            },
            success: function(a) {
                console.log(a, d), "今天发帖次数已经超限!" == a.data ? wx.showModal({
                    title: "提示",
                    content: "今天发帖次数已经超限!"
                }) : app.util.request({
                    url: "entry/wxapp/type2",
                    cachetime: "0",
                    data: {
                        id: n
                    },
                    success: function(a) {
                        console.log(a), 0 != a.data.length ? (a.data.map(function(a) {
                            var t;
                            t = a.name, i.push(t);
                        }), console.log(i), t.setData({
                            array: i,
                            arrays: a.data,
                            base: !0,
                            type_id: n,
                            money: o
                        })) : wx.navigateTo({
                            url: "../edit/edit?id=" + t.data.id + "&type_id=" + n + "&money=" + o + "&type2_id=0"
                        });
                    }
                });
            }
        });
    },
    cancel: function(a) {
        this.setData({
            base: !1
        });
    },
    selected: function(a) {
        var t = this, e = t.data.arrays, n = a.currentTarget.id, o = t.data.type_id, i = e[n].id, d = e[n].name, r = t.data.money;
        t.setData({
            base: !1
        }), wx.navigateTo({
            url: "../edit/edit?type2_id=" + i + "&type_id=" + o + "&money=" + r + "&info=" + d
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});