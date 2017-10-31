var menuTree = [];
menuTree = {

   a: {
      href: '',
      text: '运营设置',
      isshow: false,
      key: 'a',
      child: [{
         href: '/data-center/workbench',
         text: '工作台',
         class: 'icon-zhongduan',
         isshow: false,
         key: 'ai',
         child: []
      }, {
         href: '',
         text: '商家管理',
         class: 'icon-dailishang newicon-font',
         isshow: true,
         key: 'aa',
         child: [{
            href: '/shop/index',
            text: '商家信息',
            isshow: false,
            key: 'aaa'
         }]
      }, {
         href: '/document/image',
         text: '图片管理',
         class: 'icon-wenjiaguanli newicon-font',
         isshow: false,
         key: 'ac',
         child: []
      }]
   },

   b: {
      href: '',
      text: '微信设置',
      isshow: false,
      key: 'b',
      child: [{
         href: '',
         text: '素材管理',
         class: 'icon-sucai newicon-font',
         isshow: true,
         key: 'ba',
         child: [{
            href: '/wxmaterial/news-list',
            text: '图文素材',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'baa'
         }, {
            href: '/wxmaterial/text-list',
            text: '文本素材',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'bab'
         }, {
            href: '/wxmaterial/image-list',
            text: '图片素材',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'bac'
         }, {
            href: '/wxmaterial/wx-voice-list',
            text: '语音素材',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'bad'
         }]
      }, {
         href: '',
         text: '回复管理',
         class: 'icon-huifu newicon-font',
         isshow: true,
         key: 'bb',
         child: [{
            href: '/weixin/keyword-reply-list',
            text: '关键词回复',
            key: 'bba'
         }, {
            href: '/weixin/default-reply-edit',
            text: '默认回复',
            key: 'bbb'
         }, {
            href: '/weixin/attention-reply-edit',
            text: '关注后回复',
            key: 'bbc'
         }]
      }, {
         href: '/weixin/diymenu',
         text: '自定义菜单',
         class: 'icon-zidingyicaidan newicon-font',
         isshow: false,
         key: 'bc'
      }, {
         href: '',
         text: '消息管理',
         class: 'icon-huifu newicon-font',
         isshow: true,
         key: 'bd',
         child: [{
               href: '/weixin/message-list',
               text: '用户消息',
               key: 'bda'
            },
            //          {href: '/wx-message-mutil/group-message', text: '消息群发', key: 'bdb'},
            {
               href: '/wx-message-mutil/wx-group-list',
               text: '微信群发',
               key: 'bdc'
            }
         ]
      }]
   },

   c: {
      href: '',
      text: '微营销',
      isshow: false,
      key: 'c',
      child: [{
         href: '',
         text: '推广活动',
         class: 'icon-tuiguangguanli newicon-font',
         isshow: true,
         key: 'eb',
         child: [{
            href: '/market-activity/list',
            text: '大转盘',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'ebc'
         }, {
            href: '/market-activity/smashegg-list',
            text: '砸金蛋',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'ebc'
         }, {
            href: '/poster/list',
            text: '海报营销',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'ebd'
         }]
      }, {
         href: '/market-activity/vote-list',
         text: '投票活动',
         class: 'icon-tuiguang',
         isshow: false,
         key: 'ec',
         child: []
      }, {
         href: '',
         text: '定制开发',
         class: 'icon-tuiguangguanli newicon-font',
         isshow: true,
         key: 'ec',
         child: [{
            href: '/marketing-jt/customize-list',
            text: '定制活动',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'eca'
         }]
      }, {
         href: '',
         text: '场景活动',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: true,
         key: 'ed',
         child: [{
            href: '/reserve/list',
            text: '预约活动',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'eda'
         }]
      }]
   },

   d: {
      href: '',
      text: '微杂志',
      isshow: false,
      key: 'd',
      child: [{
         href: '/magazine/list',
         text: '杂志管理',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: false,
         key: 'oa'
      }, {
         href: '/magazine/category-list',
         text: '分类管理',
         class: 'icon-mingxi newicon-font',
         isshow: false,
         key: 'ob'
      }, {
         href: '/magazine/form',
         text: '表单数据',
         class: 'icon-shuju newicon-font',
         isshow: false,
         key: 'oc'
      }]
   },

   e: {
      href: '',
      text: '楼盘管理',
      isshow: false,
      key: 'e',
      child: [{
         href: '',
         text: '楼盘管理',
         class: 'icon-dailishang newicon-font',
         isshow: true,
         key: 'fa',
         child: [{
            href: '/house/list-view',
            text: '楼盘列表',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'faa'
         }, {
            href: '/house-type/list-view',
            text: '楼盘户型管理',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'fab'
         }, {
            href: '/house-type-class/list-view',
            text: '户型类别设置',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'fac'
         }, {
            href: '/news/list',
            text: '资讯列表',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'fad'
         }, {
            href: '/project/list',
            text: '项目动态',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'fae'
         }]
      }]
   },

   f: {
      href: '',
      text: '客户管理',
      isshow: false,
      key: 'f',
      child: [{
         href: '',
         text: '客户管理',
         class: 'icon-users',
         isshow: true,
         key: 'ga',
         child: [{
            href: '/customer/list-view',
            text: '客户列表',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'gaa'
         }]
      }, {
         href: '/customer/tag-list-view',
         text: '标签管理',
         class: 'icon-tags',
         isshow: false,
         key: 'gb'
      }]
   },

   g: {
      href: '',
      text: '经纪人管理',
      isshow: false,
      key: 'g',
      child: [{
         href: '',
         text: '关于经纪人',
         class: 'icon-gonggaofuzhi newicon-font',
         isshow: true,
         key: 'ha',
         child: [{
            href: '/broker/list-view',
            text: '经纪人列表',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'haa'
         }, {
            href: '/agency/list',
            text: '经纪人数据配置',
            class: 'icon-yaodianshi newicon-font',
            isshow: false,
            key: 'hab'
         }]
      }, {
         href: '',
         text: '在销楼盘管理',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: true,
         key: 'hb',
         child: [{
            href: '/market-house/list-view',
            text: '在销楼盘列表',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'hba'
         }, {
            href: '/market-house/index-img-upload',
            text: '首页图片上传',
            class: 'icon-yaodianshi newicon-font',
            isshow: false,
            key: 'hbb'
         }, {
            href: '/market-house/activity-rule',
            text: '关于乐享家',
            class: 'icon-yaodianshi newicon-font',
            isshow: true,
            key: 'hbc'
         }]
      }, {
         href: '',
         text: '推荐管理',
         class: 'icon-calculator',
         isshow: true,
         key: 'hc',
         child: [{
            href: '/commission/list',
            text: '推荐记录',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'hca'
         }]
      }, {
         href: '/commission/fed-back-list',
         text: '意见反馈',
         class: 'icon-huifu newicon-font',
         isshow: true,
         key: 'hd'
      }]
   },

   h: {
      href: '',
      text: '权限管理',
      isshow: false,
      key: 'h',
      child: [{
         href: '',
         text: '权限管理',
         class: 'icon-object-group',
         isshow: true,
         key: 'ia',
         child: [{
               href: '/employee/staff-list-view',
               text: '员工管理',
               class: 'icon-dailishang newicon-font',
               isshow: false,
               key: 'iaa'
            },
            {
               href: '/power/power-set',
               text: '权限设置',
               class: 'icon-dailishang newicon-font',
               isshow: false,
               key: 'iab'
            }
         ]
      }, {
         href: '',
         text: '基础设置',
         class: 'icon-share-alt',
         isshow: true,
         key: 'ib',
         child: [{
            href: '/power/role-list-view',
            text: '角色管理',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'iba'
         }, {
            href: '/power/department-manager',
            text: '部门管理',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'ibb'
         }, {
            href: '/power/area-manager',
            text: '区域管理',
            class: 'icon-dailishang newicon-font',
            isshow: false,
            key: 'ibc'
         }]
      }]
   },

   i: {
      href: '',
      text: '数据统计',
      isshow: false,
      key: 'i',
      child: [{
         href: '/data-center/index',
         text: '活跃数据统计',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: false,
         key: 'ja'
      }, {
         href: '',
         text: '员工业务排名',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: true,
         key: 'jb'
      }, {
         href: '',
         text: '活动统计',
         class: 'icon-yingyongtuiguang newicon-font',
         isshow: true,
         key: 'jc'
      }]
   }

};
console.log(menuTree.b);