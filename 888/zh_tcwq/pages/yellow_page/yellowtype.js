var app = getApp();

Page({
    data: {
        luntext: [ "新入", "附近", "热门" ],
        activeIndex: 0,
        refresh_top: !1,
        storelist: [],
        page: 1,
        typeid: "",
        infortype: [ {
            id: 0,
            name: "全部"
        } ],
        scactiveIndex: 0,
        districtList: [],
        sortingList: [ "新入", "附近", "热门" ],
        typeList: [ {
            id: 0,
            name: "全部"
        } ],
        districtChioceIcon: "../image/icon-go-black.png",
        sortingChioceIcon: "../image/icon-go-black.png",
        chioceDistrict: !1,
        chioceSorting: !1,
        chioceFilter: !1,
        activeDistrictParentIndex: -1,
        activeDistrictChildrenIndex: -1,
        scrollTop: 0,
        scrollIntoView: 0,
        activeTypeIndex: 0,
        activeSortingIndex: 0,
        activeTypeIndexname: "选择分类",
        activeSortingIndexname: "选择排序",
        borbtm: 2
    },
    hideAllChioce: function() {
        this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            chioceSorting: !1,
            chioceFilter: !1
        });
    },
    choiceItem: function(t) {
        switch (this.setData({
            borbtm: t.currentTarget.dataset.item
        }), t.currentTarget.dataset.item) {
          case "1":
            this.data.chioceDistrict ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-down-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !0,
                chioceSorting: !1,
                chioceFilter: !1
            });
            break;

          case "2":
            this.data.chioceSorting ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-down-black.png",
                chioceDistrict: !1,
                chioceSorting: !0,
                chioceFilter: !1
            });
            break;

          case "3":
            this.data.chioceFilter ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "/images/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !0
            });
        }
    },
    selectDistrictParent: function(t) {
        this.setData({
            activeDistrictParentIndex: t.currentTarget.dataset.index,
            activeDistrictName: this.data.districtList[t.currentTarget.dataset.index].district_name,
            activeDistrictChildrenIndex: 0,
            scrollTop: 0,
            scrollIntoView: 0
        });
    },
    selectDistrictChildren: function(t) {
        var e = t.currentTarget.dataset.index, i = -1 == this.data.activeDistrictParentIndex ? 0 : this.data.activeDistrictParentIndex;
        0 == e ? this.setData({
            activeDistrictName: this.data.districtList[i].district_name
        }) : this.setData({
            activeDistrictName: this.data.districtList[i].district_children_list[e].district_name
        }), this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeDistrictChildrenIndex: e,
            productList: [],
            pageIndex: 1,
            loadOver: !1,
            isLoading: !0
        });
    },
    selectType: function(t) {
        var e = this;
        if (console.log(t.currentTarget.id, t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var i = ""; else i = t.currentTarget.id;
        var a = t.currentTarget.dataset.index;
        this.setData({
            page: 1,
            refresh_top: !1,
            storelist: [],
            fjstorelist: [],
            typeid: i,
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceSorting: !1,
            activeTypeIndex: a,
            activeSortingIndex: 0,
            activeTypeIndexname: this.data.typeList[a].name
        }), setTimeout(function() {
            e.refresh();
        }, 100);
    },
    selectSorting: function(t) {
        console.log(t.currentTarget.dataset.index);
        var e = t.currentTarget.dataset.index;
        console.log(this.data, e);
        var i = this.data.fjstorelist;
        if (0 == e) ; else if (1 == e) {
            var a = i.sort(function(t, e) {
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var o = i.sort(function(t, e) {
                t = Number(t.views);
                return (e = Number(e.views)) < t ? -1 : t < e ? 1 : 0;
            });
            console.log(o), this.setData({
                store2: o
            });
        }
        this.setData({
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeSortingIndex: e,
            activeSortingIndexname: this.data.sortingList[e]
        });
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(this.data, e);
        var i = this.data.fjstorelist;
        if (0 == e) ; else if (1 == e) {
            var a = i.sort(function(t, e) {
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var o = i.sort(function(t, e) {
                t = Number(t.views);
                return (e = Number(e.views)) < t ? -1 : t < e ? 1 : 0;
            });
            console.log(o), this.setData({
                store2: o
            });
        }
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.user_id;
        console.log(i), wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onLoad: function(t) {
        console.log(t), t.typename && wx.setNavigationBarTitle({
            title: t.typename
        });
        var i = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = wx.getStorageSync("url");
        i.setData({
            url: e,
            id: t.id
        }), app.util.request({
            url: "entry/wxapp/yellowType2",
            cachetime: "0",
            data: {
                type_id: t.id
            },
            success: function(t) {
                console.log(t, i.data.infortype);
                var e = i.data.typeList.concat(t.data);
                console.log(e), i.setData({
                    typeList: e
                });
            }
        }), i.refresh();
    },
    refresh: function(t) {
        var h = this, e = h.data.id, i = h.data.typeid, u = h.data.page, p = h.data.storelist, a = wx.getStorageSync("city");
        console.log("城市为" + a), console.log(e, i, p, u), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                type_id: e,
                type2_id: i,
                page: u,
                pagesize: 10,
                cityname: a
            },
            success: function(t) {
                for (var e in h.setData({
                    page: u + 1
                }), console.log(t), t.data.length < 10 ? h.setData({
                    refresh_top: !0
                }) : h.setData({
                    refresh_top: !1
                }), t.data) {
                    var i = t.data[e].coordinates.split(",");
                    t.data[e].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[e].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var a = Number(wx.getStorageSync("Location").latitude), o = Number(wx.getStorageSync("Location").longitude), c = i[0], n = i[1], r = a * Math.PI / 180, s = c * Math.PI / 180, g = r - s, l = o * Math.PI / 180 - n * Math.PI / 180, d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(g / 2), 2) + Math.cos(r) * Math.cos(s) * Math.pow(Math.sin(l / 2), 2)));
                    d *= 6378.137;
                    d = (d = Math.round(1e4 * d) / 1e4).toFixed(2);
                    t.data[e].distance = d;
                }
                p = p.concat(t.data), h.setData({
                    store: p,
                    storelist: p,
                    fjstorelist: p
                });
            }
        });
    },
    store: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            activeIndex: 0,
            refresh_top: !1,
            storelist: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.page), 0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});