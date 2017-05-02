'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,$urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/app/operating/merchants/list');
            var setResolve  = function($urls){
                if(typeof $urls == 'function'){
                    return {
                        deps: ['$ocLazyLoad',$urls]
                    };
                }else{
                    return {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad){
                                return $ocLazyLoad.load($urls);
                            }]
                    };
                }
            };


            /*判断定制的路由是否存在,存在就开始加载*/
            if(CustomRoute){
                var rou_length  = CustomRoute.routes.length;
                for(var i = 0; i< rou_length;i++){
                    var config = {};
                    if( CustomRoute.routes[i].hasOwnProperty('url')) {config.url = CustomRoute.routes[i].url;}
                    if( CustomRoute.routes[i].hasOwnProperty('templateUrl')) {config.templateUrl = CustomRoute.routes[i].templateUrl+'?v='+CustomRoute.jsVersion;}
                    if( CustomRoute.routes[i].hasOwnProperty('template')) {config.template = CustomRoute.routes[i].template;}
                    if( CustomRoute.routes[i].hasOwnProperty('abstract')) {config.abstract = CustomRoute.routes[i].abstract;}
                    if( CustomRoute.routes[i].hasOwnProperty('ncyBreadcrumb')) {config.ncyBreadcrumb = CustomRoute.routes[i].ncyBreadcrumb;}
                    if( CustomRoute.routes[i].hasOwnProperty('params')) {config.params = CustomRoute.routes[i].params;}

                    if( CustomRoute.routes[i].hasOwnProperty('load')){
                        config.resolve = setResolve(CustomRoute.routes[i].load);
                    }

                    $stateProvider.state(CustomRoute.routes[i].rname,config);
                }
            }
        }
    ]
);