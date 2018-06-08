var app = getApp();

Page({
    data: {
        activeIndex: 0,
        index: 0,
        tabs2: [ "商品信息", "商品推荐" ],
        select_spec: !1,
        spec_index_one: 0,
        spec_index: 0,
        spec_index_two: 0,
        money_one: 0,
        money_two: 0,
        money_three: 0,
        num: 1
    },
    onLoad: function(e) {
        console.log(e);
        var t = e.id, a = e.store_id, o = wx.getStorageSync("url");
        this.setData({
            id: t,
            url: o,
            store_id: a
        }), this.refresh(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    refresh: function(e) {
        var g = this, t = g.data.id;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(e) {
                if (console.log(e), e.data.good.imgs = e.data.good.imgs.split(","), e.data.good.lb_imgs = e.data.good.lb_imgs.split(","), 
                0 == e.data.spec.length) {
                    var t = [];
                    g.setData({
                        goods_cost: e.data.good.goods_cost,
                        store_good: e.data.good,
                        result: t
                    });
                } else {
                    var a = e.data.spec, o = {};
                    t = [];
                    a.forEach(function(e) {
                        var t = e.spec_id + "_" + e.spec_name;
                        void 0 === o[t] && (o[t] = []), o[t].push(e);
                    });
                    for (var n = Object.keys(o), s = 0; s < n.length; s++) {
                        var i = n[s].split("_");
                        t.push({
                            spec_id: i[0],
                            spec_name: i[1],
                            value: o[n[s]]
                        });
                    }
                    console.log(t);
                    var c, d = Number(e.data.good.goods_cost);
                    if (1 == t.length) {
                        var r = Number(t[0].value[0].money), u = 0, l = 0;
                        g.setData({
                            money1: r,
                            money2: u,
                            money3: l
                        });
                    } else if (2 == t.length) {
                        r = Number(t[0].value[0].money), u = Number(t[1].value[0].money), l = 0;
                        g.setData({
                            money1: r,
                            money2: u,
                            money3: l
                        });
                    } else if (3 == t.length) {
                        r = Number(t[0].value[0].money), u = Number(t[1].value[0].money), l = Number(t[2].value[0].money);
                        g.setData({
                            money1: r,
                            money2: u,
                            money3: l
                        });
                    }
                    c = r + u + l, console.log(c);
                    var m = (d + c).toFixed(2);
                    console.log(m), g.setData({
                        result: t,
                        goods_cost: m,
                        price: d,
                        store_good: e.data.good
                    });
                }
            }
        });
    },
    add: function(e) {
        wx.switchTab({
            url: "../logs/logs",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    liji: function(e) {
        this.setData({
            select_spec: !0
        });
    },
    add_num: function(e) {
        var t = this, a = t.data.num + 1, o = t.data.store_good.goods_num;
        a < o ? t.setData({
            num: a
        }) : t.setData({
            num: o
        });
    },
    subtraction: function(e) {
        var t = this, a = t.data.num;
        1 < (a -= 1) ? t.setData({
            num: a
        }) : t.setData({
            num: 1
        });
    },
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    order: function(e) {
        var t = this, a = t.data.result, o = t.data.store_good, n = t.data.store_id, s = t.data.goods_cost, i = t.data.num;
        if (console.log(n), 0 == a.length) wx.redirectTo({
            url: "place_order?id=" + o.id + "&store_id=" + n + "&price=" + s + "&num=" + i,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            if (1 == a.length) var c = a[0].value[t.data.spec_index].name, d = 0, r = 0; else if (2 == a.length) c = a[0].value[t.data.spec_index].name, 
            d = a[1].value[t.data.spec_index_one].name, r = 0; else if (3 == a.length) c = a[0].value[t.data.spec_index].name, 
            d = a[1].value[t.data.spec_index_one].name, r = a[2].value[t.data.spec_index_two].name;
            wx.redirectTo({
                url: "place_order?id=" + o.id + "&store_id=" + n + "&price=" + s + "&num=" + i + "&name1=" + c + "&name2=" + d + "&name3=" + r,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    },
    select_spec: function(e) {
        var t = this.data.select_spec;
        0 == t ? this.setData({
            select_spec: !0
        }) : this.setData({
            select_spec: !1
        });
    },
    spec_index: function(e) {
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), n = t + this.data.money2 + this.data.money3 + o;
        this.setData({
            spec_index: a,
            money1: Number(o),
            goods_cost: n.toFixed(2)
        });
    },
    spec_index_one: function(e) {
        console.log(e);
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), n = t + this.data.money1 + this.data.money3 + o;
        this.setData({
            spec_index_one: a,
            money2: Number(o),
            goods_cost: n.toFixed(2)
        });
    },
    spec_index_two: function(e) {
        console.log(e);
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), n = t + this.data.money2 + this.data.money1 + o;
        this.setData({
            spec_index_two: a,
            money3: o,
            goods_cost: n.toFixed(2)
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