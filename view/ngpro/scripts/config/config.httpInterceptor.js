'use strict';
/**
 * 配置http请求拦截器
 */
(function(app){
    app.factory('httpInterceptor', [ '$q', '$injector','toaster',function($q, $injector,toaster) {
        var httpInterceptor = {
            'responseError' : function(response) {
                //if (response.status == 401) {
                //    var rootScope = $injector.get('$rootScope');
                //    var state = $injector.get('$rootScope').$state.current.name;
                //    rootScope.stateBeforLogin = state;
                //    rootScope.$state.go("login");
                //    return $q.reject(response);
                //} else if (response.status === 404) {
                //    alert("404!");
                //    return $q.reject(response);
                //}
            },
            'response' : function(response) {
                //判断有没有解析的data
                var code = '';
                var cdata = '';
                if(response.data.hasOwnProperty('angular_ctrl_data')){
                    cdata = response.data.angular_ctrl_data;
                    code = cdata.code;
                    //判断返回的值是不是一个字符串
                }else{
                    try{
                        var obj = eval('(' + response.data + ')');
                        //判断是否有数据包
                        if(obj.hasOwnProperty('angular_ctrl_data')){
                            cdata = obj.angular_ctrl_data;
                            code = cdata.code;
                        }
                        // alert("str是json字符串");
                    }catch(e){}
                }

                //如果是需要处理的数据库则进行处理
                if(code){
                    var rootScope = $injector.get('$rootScope');
                    var state = $injector.get('$rootScope').$state.current.name;
                    rootScope.stateBeforLogin = state;

                    switch (code){
                        case 1001:
                            rootScope.$state.go("login");
                            return $q.reject(response);
                        case 1002:
                            toaster.pop('error', cdata.content, '');
                            return $q.reject(response);

                    }
                }
                return response;
            }
        }
        return httpInterceptor;
    }
    ]);
})(app);
