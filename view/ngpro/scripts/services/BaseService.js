/**
*@author yubingyang
*@datetime 2017-01-16 13:59:43
*@instructions 创建业务服务需要的技术对象
*/
app.service('BaseService', ['$http','toaster',function($http,toaster) {
     this.ROOT_DATA_URL =  './';
     this.httpState = false;
     this.isFilter = false;
     var _this = this;

    /**
     *合并列表页搜索和分页查询对象
     *@param page json 分页对象
     *@param search json 搜索对象 {'搜索条件':'条件值'}
     *@return json 查询对象
     */
    this.search_data = function (page,search){
         var data = {};
         if(page) data.page = page;
         if(search) {
             for(var o in search){
                 if(search[o] !== ''){
                     data[o] = search[o];
                 }
             }
         }
         return data;
     };


    /**
     *获取list列表数据
     *@param url string url相对路径uri
     *@param page json 分页对象
     *@param search json 搜索对象 {'搜索条件':'条件值'}
     *@param successFun function 成功回调函数
     *@param errFun function 错误回调函数
     *@return 数据处理对象
     */
    this.getListData = function(url,page,search,successFun,errFun){
        var data = this.search_data(page,search);
        return this.http_get(url,data,successFun,errFun);
    };

    /**
     *http get方式请求
     *@param url string url相对路径uri
     *@param params json json对象请求参数
     *@param successFun function 成功回调函数
     *@param errFun function 错误回调函数
     *@return 数据处理对象
     */
    this.http_get = function(url,params,successFun,errFun){
        return http(url,{'params':params},'get',successFun,errFun);
    };

    /**
     *http post方式请求
     *@param url string url相对路径uri
     *@param params json json对象请求参数
     *@param successFun function 成功回调函数
     *@param errFun function 错误回调函数
     *@return 数据处理对象
     */
    this.http_post = function(url,params,successFun,errFun){
        return http(url,params,'post',successFun,errFun);
    };

    /**
     *http post方式请求(锁住按钮)
     *@param url string url相对路径uri
     *@param params json json对象请求参数
     *@param successFun function 成功回调函数
     *@param errFun function 错误回调函数
     *@return 数据处理对象
     */
    this.http_post_lock = function(url,params,successFun,errFun){
         this.isFilter = true;
         return this.http_post(url,params,successFun,errFun);
    }

    /**
     *@waring 不推荐使用 使用http_post代替
     *@author yubingyang
     *@datetime 2017-01-16 14:40:34
     *@param url 请求数据url
     *@param params 发起参数
     *@param successFun 成功回调函数
     *@param errFun 错误回调函数
     *@instructions 发起数据请求(这个接口不推荐使用，使用http_post代替)
     */
    this.http = function(url,params,successFun,errFun){
        return this.http_post(url,params,successFun,errFun);
    };

    /**
     *http 处理对象
     *@param http http请求对象
     *@param successFun function 成功回调函数
     *@param errFun function 错误回调函数
     *@return blooean 数据处理对象
     */
    var http = function(url,params,type,successFun,errFun){
        /*判断网络时候锁住*/
        if(_this.isFilter && _this.httpState){
            return false;
        }else{_this.httpState = true;}

        var _http = type=='post'?$http.post(_this.ROOT_DATA_URL+url,params):$http.get(_this.ROOT_DATA_URL+url,params);
        _http.success(function(res){
            _this.httpState = false;
            /*状态码*/
            res.errcode = parseInt(res.errcode);
            switch (res.errcode){
                case 1://业务逻辑错误（跟-2是一样的功能）
                    toaster.pop('error',res.errmsg);
                    break;
                case 3://没有登陆 或者登陆超时
                    window.location.href='/views/system/login.html';
                    break;
                case -2://业务逻辑错误
                    toaster.pop('error',res.errmsg);
                    break;
                case -3://服务器错误
                    toaster.pop('error',res.errmsg);
                    break;
                case -4://数据参数错误
                    toaster.pop('error',res.errmsg);
                    break;
                default :
                    successFun(res);
            }
        }).error(function(res){
            _this.httpState = false;
            errFun(res);
        });
    }
}]);