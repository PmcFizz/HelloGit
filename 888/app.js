App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    getUser: function(s) {
        var c = this;
        wx.login({
            success: function(e) {
                var n = e.code;
                wx.setStorageSync("code", n), wx.getUserInfo({
                    success: function(e) {
                        console.log(e), wx.setStorageSync("user_info", e.userInfo);
                        var t = e.userInfo.nickName, o = e.userInfo.avatarUrl;
                        c.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: n
                            },
                            success: function(e) {
                                console.log(e), wx.setStorageSync("key", e.data.session_key), wx.setStorageSync("openid", e.data.openid);
                                var n = e.data.openid;
                                c.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: n,
                                        img: o,
                                        name: t
                                    },
                                    success: function(e) {
                                        console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), 
                                        s(e.data);
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.getSetting({
                            success: function(e) {
                                0 == e.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.userInfo"], c.getUser(s);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    ormatDate: function(e) {
        var n = new Date(1e3 * e);
        return n.getFullYear() + "-" + t(n.getMonth() + 1, 2) + "-" + t(n.getDate(), 2) + " " + t(n.getHours(), 2) + ":" + t(n.getMinutes(), 2) + ":" + t(n.getSeconds(), 2);
        function t(e, n) {
            for (var t = "" + e, o = t.length, s = "", c = n; c-- > o; ) s += "0";
            return s + t;
        }
    },
    ab: function(e) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null
    }
});