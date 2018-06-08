var app = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.login({
            success: function(e) {
                var t = e.code;
                wx.setStorageSync("code", t), wx.getUserInfo({
                    success: function(e) {
                        wx.setStorageSync("user_info", e.userInfo);
                        var n = e.userInfo.nickName, a = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: t
                            },
                            success: function(e) {
                                wx.setStorageSync("key", e.data.session_key), wx.setStorageSync("openid", e.data.openid);
                                var t = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: t,
                                        img: a,
                                        name: n
                                    },
                                    success: function(e) {
                                        wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid);
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.getSetting({
                            success: function(e) {
                                0 == e.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(e) {}
                                });
                            }
                        });
                    }
                });
            }
        }), console.log(e);
        var t, n, o;
        t = new Date(), n = t.getMonth() + 1, o = t.getDate(), 1 <= n && n <= 9 && (n = "0" + n), 
        0 <= o && o <= 9 && (o = "0" + o), t.getFullYear(), t.getHours(), t.getMinutes(), 
        t.getSeconds();
        app.util.request({
            url: "entry/wxapp/CarInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e);
                var t = e.data.pc, n = e.data.tag;
                t.time = app.ormatDate(t.time).slice(5, 16), t.start_time1 = t.start_time.slice(5, 10), 
                t.start_time2 = t.start_time.slice(10, 17), a.setData({
                    pc: t,
                    tag: n
                });
            }
        });
    },
    call_phone: function(e) {
        console.log(e), wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    dizhi1: function(e) {
        var t = this, n = Number(t.data.pc.star_lat), a = Number(t.data.pc.star_lng);
        console.log(n), console.log(a), wx.openLocation({
            latitude: n,
            longitude: a,
            name: t.data.pc.link_name,
            address: t.data.pc.start_place
        });
    },
    dizhi2: function(e) {
        var t = this, n = Number(t.data.pc.end_lat), a = Number(t.data.pc.end_lng);
        console.log(n), console.log(a), wx.openLocation({
            latitude: n,
            longitude: a,
            name: t.data.pc.link_name,
            address: t.data.pc.end_place
        });
    },
    shouye: function(e) {
        console.log(e), wx.reLaunch({
            url: "../../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    fabu: function(e) {
        wx.reLaunch({
            url: "../shun",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    phone: function(e) {
        var t = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        console.log(this.data);
        wx.getStorageSync("users").id;
        return {
            title: this.data.yellow_info.company_name,
            path: "/zh_tcwq/pages/shun/shuninfo2/shuninfo2?id=" + this.data.pc.id,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});