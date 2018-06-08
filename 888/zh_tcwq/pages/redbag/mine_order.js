var app = getApp();

Page({
    data: {
        array: [ "待付款", "待发货", "待收货", "已完成", "售后/退款" ],
        activeIndex: 0,
        index: 0
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("url");
        null != a.activeIndex && t.setData({
            activeIndex: a.activeIndex,
            store_id: a.store_id
        }), t.setData({
            url: e
        }), t.refresh();
    },
    refresh: function() {
        var d = this, i = d.data.activeIndex, a = d.data.store_id;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: a
            },
            success: function(a) {
                console.log(a);
                var t = [], e = [], o = [], r = [], s = [];
                for (var n in a.data) a.data[n].time = app.ormatDate(a.data[n].time), 1 == a.data[n].state ? t.push(a.data[n]) : 2 == a.data[n].state ? e.push(a.data[n]) : 3 == a.data[n].state ? o.push(a.data[n]) : 4 == a.data[n].state ? r.push(a.data[n]) : 5 != a.data[n].state && 6 != a.data[n].state && 7 != a.data[n].state || s.push(a.data[n]);
                console.log(t), 0 == i ? d.setData({
                    order: t
                }) : 1 == i ? d.setData({
                    order: e
                }) : 2 == i ? d.setData({
                    order: o
                }) : 3 == i ? d.setData({
                    order: r
                }) : 4 == i && d.setData({
                    order: s
                }), console.log(t);
            }
        });
    },
    select: function(a) {
        console.log(a);
        var d = this, t = d.data.store_id, i = a.currentTarget.dataset.index;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(a) {
                console.log(a);
                var t = [], e = [], o = [], r = [], s = [];
                for (var n in a.data) a.data[n].time = app.ormatDate(a.data[n].time), 1 == a.data[n].state ? t.push(a.data[n]) : 2 == a.data[n].state ? e.push(a.data[n]) : 3 == a.data[n].state ? o.push(a.data[n]) : 4 == a.data[n].state ? r.push(a.data[n]) : 5 != a.data[n].state && 6 != a.data[n].state && 7 != a.data[n].state || s.push(a.data[n]);
                console.log(t), 0 == i ? d.setData({
                    order: t
                }) : 1 == i ? d.setData({
                    order: e
                }) : 2 == i ? d.setData({
                    order: o
                }) : 3 == i ? d.setData({
                    order: r
                }) : 4 == i && d.setData({
                    order: s
                });
            }
        }), d.setData({
            activeIndex: i,
            index: i
        });
    },
    order_info: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "mine_order_info?id=" + t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
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
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});