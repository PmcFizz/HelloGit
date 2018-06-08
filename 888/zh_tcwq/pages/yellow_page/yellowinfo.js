var _Page;

function _defineProperty(e, n, a) {
    return n in e ? Object.defineProperty(e, n, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = a, e;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {},
    onLoad: function(e) {
        var n = this, a = wx.getStorageSync("url");
        n.setData({
            url: a
        }), app.util.request({
            url: "entry/wxapp/YellowPageInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e), e.data.sh_time = app.ormatDate(e.data.sh_time).slice(0, 10), e.data.coordinates = e.data.coordinates.split(","), 
                n.setData({
                    yellow_info: e.data
                });
            }
        });
    },
    phone: function(e) {
        var n = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    address: function(e) {
        var n = this, a = Number(n.data.yellow_info.coordinates[0]), o = Number(n.data.yellow_info.coordinates[1]);
        wx.openLocation({
            latitude: a,
            longitude: o,
            name: n.data.yellow_info.company_name,
            address: n.data.yellow_info.company_address
        });
    },
    shouye: function(e) {
        console.log(e), wx.reLaunch({
            url: "../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    }
}, "phone", function(e) {
    var n = this.data.yellow_info.link_tel;
    wx.makePhoneCall({
        phoneNumber: n
    });
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "onShow", function() {}), 
_defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {
    var e = this;
    console.log(e.data);
    wx.getStorageSync("users").id;
    return {
        title: e.data.yellow_info.company_name,
        path: "/zh_tcwq/pages/yellow_page/yellowinfo?id=" + e.data.yellow_info.id + "&type=1",
        success: function(e) {},
        fail: function(e) {}
    };
}), _Page));