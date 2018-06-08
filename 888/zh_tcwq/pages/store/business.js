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
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : t > e ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var o = i.sort(function(t, e) {
                return (t = Number(t.score)) > (e = Number(e.score)) ? -1 : t < e ? 1 : 0;
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
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : t > e ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var o = i.sort(function(t, e) {
                return (t = Number(t.score)) > (e = Number(e.score)) ? -1 : t < e ? 1 : 0;
            });
            console.log(o), this.setData({
                store2: o
            });
        }
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    onLoad: function(t) {
        console.log(t), t.typename && wx.setNavigationBarTitle({
            title: t.typename
        });
        var e = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var i = wx.getStorageSync("url");
        e.setData({
            url: i,
            id: t.id
        }), app.util.request({
            url: "entry/wxapp/StoreType2",
            cachetime: "0",
            data: {
                type_id: t.id
            },
            success: function(t) {
                console.log(t, e.data.infortype);
                var i = e.data.typeList.concat(t.data);
                console.log(i), e.setData({
                    typeList: i
                });
            }
        }), e.refresh();
    },
    refresh: function(t) {
        var e = this, i = e.data.id, a = e.data.typeid, o = e.data.page, c = e.data.storelist;
        console.log(i, a, c, o), app.util.request({
            url: "entry/wxapp/TypeStoreList",
            cachetime: "0",
            data: {
                storetype_id: i,
                storetype2_id: a,
                page: o,
                pagesize: 10
            },
            success: function(t) {
                for (var i in e.setData({
                    page: o + 1
                }), console.log(t), t.data.length < 10 ? e.setData({
                    refresh_top: !0
                }) : e.setData({
                    refresh_top: !1
                }), t.data) {
                    var a = t.data[i].coordinates.split(",");
                    t.data[i].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[i].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var n = Number(wx.getStorageSync("Location").latitude), r = Number(wx.getStorageSync("Location").longitude), s = a[0], g = a[1], d = n * Math.PI / 180, h = s * Math.PI / 180, l = d - h, u = r * Math.PI / 180 - g * Math.PI / 180, p = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(d) * Math.cos(h) * Math.pow(Math.sin(u / 2), 2)));
                    p *= 6378.137;
                    p = (p = Math.round(1e4 * p) / 1e4).toFixed(2);
                    t.data[i].distance = p;
                }
                c = c.concat(t.data), e.setData({
                    store: c,
                    storelist: c,
                    fjstorelist: c
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