/**
 *控制器base类（可以直接使用，如果需要复写里面的方法可以直接在页面嵌套一个ctrl）
 *@author yubingyang
 *@datetime 2017-01-19 10:21:09
 *@instructions
 *@version v1.0
 */
app.controller('BaseCtrl', ['$scope','$modal','$state','$stateParams', '$http','toaster',function($scope,$modal,$state,$stateParams,$http,toaster) {
    var service = null;//数据服务对象

    /**
     * 配置文件
     */
    var config = {
        changeStatusHint:['开启成功','关闭成功'],//开关操作提示语
        dailogRepFun:[function(data){}],//弹窗回调函数
        listDataFilter:function(data){return data;},//列表数据返回之后的过滤函数
        detailFilter:function(data){return data;},//列表数据返回之后的过滤函数
        beforeEdit:function(data){return data;},//修改前的数据修改
        beforeAdd:function(data){return data;}//添加前的数据修改
    };

    /**
     * 配置ctrl
     * @param cfg 由子类调用赋值
     */
    $scope.config = function(cfg){
        service = cfg.hasOwnProperty('service')?cfg.service:null;
        config = mergeJsonObject(config,cfg);
    };

    /**
     * 列表页操作
     * @param options json对象 操作参数如下：
     * type: search(搜索) list(列表默认) refresh（刷新当前页）
     */
    $scope.actionList = function(options){
        setBeforeSearch(angular.copy($scope.search));
        /*判断是否要把分页和搜索制空*/
        if(options){
            $scope.getData.params[0] = options;
            if(options.type){
                switch (options.type){
                    case 'search':
                        $scope.page = {total_count:0};//初始化分页数据对象
                        break;
                    case 'refresh':
                        $scope.page = {total_count:0};//初始化分页数据对象
                        $scope.search = {};//初始化搜索数据对象
                        break;
                    case 'list':
                        break;
                }
            }
        }


        var dataAjax = service.getListData;
        if(options && options.hasOwnProperty('operation')){
            dataAjax = service[options.operation];
        }

        dataAjax($scope.page,$scope.search,function(res){
            if(res.data.hasOwnProperty('list')){
                $scope.datas = config.listDataFilter(res.data.list,res);
                $scope.page = res.data.page;
            }else{
                $scope.datas = config.listDataFilter(res.data);
            }

            if($scope.datas.length == 0){
                $scope.status = 2;
            }else{
                $scope.status = 1;
            }
        });
    };

    var setBeforeSearch = function(search){
        $scope.before_search = search;//保存一下当前的搜索条件内容
    };

    /**
     *获取详情（获取详情的id从路由中获取）
     *@param _service obj 临时服务覆盖通用服务
     *@param id 需要查询的数据的id（如果没有传的话 默认获取stateParams的）
     *@param options object json对象 参数包括  addFunName 执行操作的服务不填默认是detail
     */
    $scope.detail = function(id,options){
        var getData = function(){
            /*判断使用默认资源还是其他资源*/
            var dataAjax = service.details;
            if(options && options.hasOwnProperty('operation')){
                dataAjax = service[options.operation];
            }

            dataAjax(id?id:$stateParams.id,function(res){
                res.data = res.data==""?{}:res.data;
                $scope.data = config.detailFilter(res.data);
                /*判断有没有图片,有的话初始化配置*/
                if($scope.data.hasOwnProperty('imgInfo')){
                    $scope.cdnImgs = $scope.data.imgInfo;
                    $scope.cdn_img_url = $scope.data.imgInfo[0].file_cdn_path;
                }

                /*判断数据是不是空*/
                if(JSON.stringify($scope.data) == '{}'){$scope.status = 2;
                }else{$scope.status = 1;}
            });
        };
        getData();
    };

    /**
     *修改内容
     *@param isValid 表单isValid验证对象 页面直接调用 ng-submit="add(myForm.$valid)
     *@param options object json对象 参数包括  addFunName 执行操作的服务不填默认是edit
     */
    $scope.edit = function(isValid,options){
        if(isValid){
            /*判断使用默认资源还是其他资源*/
            var dataAjax = service.edit;
            if(options && options.hasOwnProperty('operation')){
                dataAjax = service[options.operation];
            }
            $scope.data = config.beforeEdit($scope.data);
            dataAjax($scope.data,function(res){
                $scope.showHint('success', '修改成功');
                successCallback(options);
            });
        }else{
            $scope.showHint('error', '请正确填写表单');
        }
    };

    /**
     * 添加内容
     * @param isValid 表单isValid验证对象 页面直接调用 ng-submit="add(myForm.$valid)"
     * @param options object json对象 参数包括  operation 执行添加操作的服务不填默认是add
     */
    $scope.add = function(isValid,options){
        if(isValid){
            /*判断使用默认资源还是其他资源*/
            var dataAjax = service.add;
            if(options && options.hasOwnProperty('operation')){
                dataAjax = service[options.operation];
            }
            $scope.data = config.beforeAdd($scope.data);
            dataAjax($scope.data,function(res){
                $scope.showHint('success', '添加成功');
                successCallback(options);
            });
        }else{
            $scope.showHint('error', '请正确填写表单');
        }
    };

    /**
     * 导出功能
     */
    $scope.export = function (options){
        var dataAjax = service.export;
        var data = angular.copy($scope.before_search);
        if(options && options.hasOwnProperty('operation')){
            dataAjax = service[options.operation];
        }

        /*判断是否是导出全部*/
        if(options && options.hasOwnProperty('exportAll') && options.exportAll == "1"){
           /* 导出全部目前不做处理，按照导出条件导出全部*/
        }else{
            /*导出部分*/
            if(options && options.hasOwnProperty('select')){
                var idArr = $scope.getChooseAll();
                console.log(idArr);
                if(idArr.length !=0){
                    data[options.select] = idArr.join(',');
                }else{
                    $scope.showHint('error','请选择需要导出的内容');
                    return;
                }
            }
        }

        /*拼接搜索条件*/
        var _data = [];
        for(o in data){
            if(data[o] !== ''){
                _data.push(o+'='+data[o]);
            }
        }
        _data = _data.join("&");

        dataAjax(_data,function(res){
           // $scope.showHint('success', '导出成功');
        });
    };

    $scope.print = function(options){
        html2canvas($(options.document)[0]).then(function(canvas) {
            var a = $(canvas);
            $('#print').append(a);
            window.print();
        });
    };

    /**
     *删除操作
     *@param ids string|array id拼接字符串 1,2,3,4
     */
    $scope.dels = function(ids){
        service.dels(ids,function(res){
            //删除成功
            $scope.showHint('success', '删除成功');
            /*重新请求数据*/
            $scope.actionList();

            /*不请求直接修改删除一个记录 页面不好看（废弃了）*/
            /*$scope.datas = $scope.refreshList($scope.datas,ids);
            if($scope.page && $scope.page.hasOwnProperty('total_count')){
                $scope.page.total_count = $scope.page.total_count-1;
            }*/
        });
    };

    /**
     * 批量删除
     * @param options json对象 参数集 hint:没有内容的提示语
     */
    $scope.delsAll = function(options){
        var ids = $scope.getChooseAll();
        if(!ids.length){
            $scope.showHint('error',options && options.hasOwnProperty('chooseHint')?options.chooseHint:'请选择要删除的内容');
        }else{
            var hint = options && options.hasOwnProperty('dailogHint')?options.dailogHint:'确定要删除该内容吗？'
            $scope.dailogInfo({hint:hint},function(){
                $scope.dels(ids);
            });
        }
    };

    /**
     *修改状态值
     *@param item obj ng-reapt列表对象
     */
    $scope.changeStatus = function(item){
        service.changeStatus(item.id,item.status,function(res){
            if(item.status == 1){
                $scope.showHint('success',config.changeStatusHint[0]);
                item.status = 2;
            }else{
                $scope.showHint('success',config.changeStatusHint[1]);
                item.status = 1;
            }
        });
    };

    /**
     * 弹窗显示
     * @param url string 需要加载的视图文件
     * @param data string （json字符串）需要传递的参数
     * @param funIndex string 数据回调后执行第几个回调方法
     * @param size string 弹窗的大小 sm 小 md 中 lg 大
     * @param resFun function 回调函数(如果要独立处理窗进行二次封装可以使用)
     */
    $scope.dailog = function(url,data,funIndex,size,resFun){
        var dailogData = {};//回调回来的数据
        var items = {
            req:{
                data:{}
            },//发送数据包
            rep:{
                data:{}
            }//接收数据包
        };

        var len = arguments.length;
        /*初始化data*/
        if(len > 1 && data != ''){
            /*判断是不是对象，是对象就不用转换*/
            if(typeof(data) == "object"){
                items.req.data = data;
            }else{
                try{
                    var data = eval('('+data+')');
                    items.req.data = data;
                }catch(e){
                    items.req.data = {};
                }
            }
        };

        /*开始发送*/
        var modalInstance = $modal.open({
            templateUrl: url,
            size:(len>3 && size !='')?size:'lg',
            controller:'DailogInstanceCtrl',//指定处理控制器
            resolve: {
                dailogData: function () {
                    return {
                        'data':items//传递参数
                    };
                }
            }
        });

        /*回调对象*/
        modalInstance.result.then(function (_dailogData){
            dailogData = _dailogData;
            /*判断是否要刷新页面*/
            if(dailogData.req.data.hasOwnProperty('is_reload') && dailogData.req.data.is_reload){
                $state.reload();
            }
            /*回调函数*/
            if(resFun){
                resFun(_dailogData);
            }

            /*执行内部配置项回调函数*/
            funIndex = (len>2 && funIndex)?funIndex:0;
            if(funIndex !== false){
                config.dailogRepFun[funIndex](dailogData);//执行配置函数
            }
        }, function () {
            //点击取消
        });
    };

    /**
     * 选择图片
     * @param num 选择的图片张数
     * @param funIndex执行第几个回调方法默认第一个
     */
    $scope.imgChoose  = function(options,fun){
        /*判断类型进行类型转化*/
        if(!options){
            options = {};
        }else if(typeof options == 'string'){
            try{
                options = eval('('+options+')');
            }catch(e){
                options = {};
            }
        }else if(typeof(options) == "object"){
            options = options;
        }

        var config ={
            num:options.hasOwnProperty('num')?options.num:1,
            isChoose:options.hasOwnProperty('is_choose')?options.is_choose:true,
            keyName:options.hasOwnProperty('keyName')?options.keyName:'',
            is_url:options.hasOwnProperty('is_url')?true:false
        };
        $scope.dailog('/views/operating/picture/img-manage.html',config,false,'lg',function(data){
            var images = data.rep.data.image;
            var num = data.req.data.num;
            var ids = '';//需要赋值的id拼接字符 1,2,3
            var urls = '';//需要赋值的url拼接字符

            $scope.cdnImgs = $scope.cdnImgs?$scope.cdnImgs:[];
            if(num == 1){
                $scope.cdnImgs[0] = images[0];
            }else{
                Array.prototype.push.apply($scope.cdnImgs, images);
            }

            /*获取id拼接数组*/
            var len = $scope.cdnImgs.length;
            var choosesId = [];
            var choosesUrl = [];
            for(var i=0;i<len;i++){
                choosesId.push($scope.cdnImgs[i].id);
                choosesUrl.push($scope.cdnImgs[i].file_cdn_path);
            }

            ids = choosesId.join(",");
            urls = choosesUrl.join(",");

            if(data.req.data.keyName){
                var val = data.req.data.is_url?urls:ids;
                $scope.data[data.req.data.keyName] = val;
            }

            /*已废弃，下面是兼容代码 开始*/
            $scope.cdn_img_url = images[0].file_cdn_path;//图片显示url
            /*已废弃，下面是兼容代码 结束*/

            data.rep.data.ids = ids;
            data.rep.data.ids = urls;
            if(fun) {fun(data);}
        });
    };

    $scope.initChoose = function(options){
        $scope.cdnImgs=options.value;
    };

    /**
     * 调用弹窗接口(已废弃)
     * @param ids string id拼接字符串 1,2,3
     * @param options object  json对象
     * @param fun 回调执行函数
     */
    $scope.dailogDel = function(ids,options,fun){
        $scope.dailog('/views/system/blocks/delete_dialog.html','',false,'sm',function(data){
            fun(data);
        });
    };

    /**
     * 显示删除提示框
     * @param ids string id拼接字符串
     * @param delFun function 回调函数
     */
    $scope.delsHint = function (options,delFun) {
        if(typeof(options) !='object'){
            options = {ids:options};
        }
        $scope.dailog('/views/system/blocks/delete_dialog.html',options,false,'sm',function(data){
            if(delFun){
                delFun(options.ids);
            }else{
                $scope.dels(options.ids);
            }
        });
    };

    /**
     * 展示信息弹窗
     * @param options 参数对象（还没有补充具体字段）
     * @param fun 回调函数
     */
    $scope.dailogInfo = function(options,fun){
        $scope.dailog('/views/system/blocks/dialog-info.html',options,false,'sm',function(data){
           fun(data);
        });
    };

    /**
     * 切换选项卡
     * @param index int 需要要显示的选项卡序号
     */
    $scope.tabSwitch = function(index){
        var len = $scope.tabs.length;
        for(var i=0;i<len;i++){
            $scope.tabs[i] = false;
        }
        $scope.tabs[index] = true;
    };

    /**
     * 页面显示提示
     * @param status string 提示类型 success 成功提示 error 错误提示 warning 警告提示
     * @param content 提示文字内容
     */
    $scope.showHint = function(status,content,hint){
        toaster.pop(status, content,hint);
    };

    /**
     * 删除信息之后刷新数据（已废弃，使用刷新全页面代替）
     *@datetime 2017-01-19 10:29:37
     *@param datas array 列表数据
     *@param ids String id拼接字字符串
     *@return Array 删除之后的datas
     */
    $scope.refreshList = function(datas,ids){
        ids = ids+'';//int类型转string
        var _datas = [];
        var idArr = ids.split(',');
        for(var j=0;j<datas.length;j++){
            var n=true;
            for(var i=0;i<idArr.length;i++){
                if(datas[j].id == idArr[i]){
                    n=false;
                    break;
                }
            }
            if(n){_datas.push(datas[j])};
        }
        return _datas;
    };

    /**
     * 通过id 修改某个key的值（已废弃，使用刷新全页面代替）
     * @param datas 数组
     * @param id 数组对象的id
     * @param name 需要修改的字段名
     * @param newValue 新的值
     * @returns Array 修改后的数组
     */
    $scope.refreshListForName = function(datas,id,name,newValue){
        for(var j=0;j<datas.length;j++){
            if(datas[j].id == id){
                datas[j][name] = newValue;
                break;
            }
        }
        return datas;
    };

    /**
     * 判断字符串是否已经操作了指定长度
     * @param text
     * @param sum
     */
    $scope.showOmit = function(text,sum){
        if(text.lenght >sum){
            return true;
        }
        return false;
    };

    /**
     * 合并两个json对象
     * @param jsonbject1
     * @param jsonbject2
     * @returns obj 合并之后的json对象
     */
    var mergeJsonObject = function (jsonbject1, jsonbject2) {
        var resultJsonObject={};
        for(var attr in jsonbject1){
            resultJsonObject[attr]=jsonbject1[attr];
        }
        for(var attr in jsonbject2){
            resultJsonObject[attr]=jsonbject2[attr];
        }
        return resultJsonObject;
    };

    /**
     * 清空搜索条件
     */
    $scope.cleanSearch = function(options){
        if(options && options.hasOwnProperty('params')){
            var len  = options.params.length;
            for(var i=0;i<len;i++){
                $scope['search'][options.params[i]] = '';
            }
        }else{
            $scope.search = {};
        }
    };

    /**
     * 固定列表页的点击事件
     * @param id 当前点击的对象
     * @param arr 需要处理的数组（如果不传默认是$scope.datas）
     */
    $scope.activeClick = function(id,arr){
        var arr = arr?arr:$scope.datas;
        var len = arr.length;
        for(var i=0;i<len;i++){
            if(arr[i].id == id){
                arr[i].activeClick = true;
            }else{
                arr[i].activeClick = false;
            }
        }
        return arr;
    };

    /**
     * 制空列表
     */
    $scope.setEmptyList = function(){
        $scope.datas=[];
    };

    /**
     * 制空详情
     */
    $scope.setEmptyData = function(){
        $scope.data={};
    };

    /**
     * 全选所有
     */
    $scope.setChooseAll = function(){
        var len = $scope.datas.length;
        for(var i=0;i<len;i++){
            $scope.datas[i].view_select_active = true;
        }
    };

    /**
     * 获取被选中的元素
     * @returns 选中的id数组
     */
    $scope.getChooseAll = function(){
        var len = $scope.datas.length;
        var ids = [];
        for(var i=0;i<len;i++){
            if($scope.datas[i].view_select_active == true){
                ids.push($scope.datas[i].id);
            }
        }
        return ids;
    };

    /**
     * 取消全选
     */
    $scope.cleanChooseAll = function(){
        var len = $scope.datas.length;
        for(var i=0;i<len;i++){
            $scope.datas[i].view_select_active = false;
        }
    };

    /**
     *点击全选和取消全选的选择框
     */
    $scope.chooseAllChange = function(select){
       select?$scope.setChooseAll():$scope.cleanChooseAll();
    };

    /**
     * 如果要清除记录可以先调用clean（还没有通过测试）
     */
    $scope.clean= function(){
        $scope.select_ids = [];//被选中内容
    };

    /**
     * 发起数据操作成功时候的回调操作
     * @param options object 操作参数
     * options={
     * callback:''//路由名字
     * }
     */
    var successCallback  = function(options){
        /*判断要进行的操作，分三类操作：
         * 1，刷新当前页
         * 2，弹窗类型的，关闭弹窗
         * 3，回到指定页面
         */
        var callback = (options && options.callback)?options.callback:false;
        //指定操作
        if(callback){
            $state.go(callback, {}, {reload: true});
            //弹窗操作
        }else if($scope.__proto__.hasOwnProperty('dailogData')){
            $scope.dailogData.rep.data = $scope.data;
            $scope.ok();
            //默认刷新页面
        }else{
            $state.reload();
        }
    };

    /**
     * 判断当前请求是否可以操作
     * return boolean true 通过 false 不通过
     */
    var filterOperation = function(){
        return {
            idAllow:!$scope.httpState,
            lock:function(){
                $scope.httpState = true;
            },
            unlock:function(){
                $scope.httpState = false;
            }
        }
    };


    /**
     * 初始化基本参数
     */
    (function(){
        $scope.data = {};//模块数据对象
        $scope.datas = [];
        /*初始化列表数据*/
        $scope.page = {total_count:0};//初始化分页数据对象
        $scope.search = {};//初始化搜索数据对象
        $scope.before_search = {};//点击搜索之后的数据保存下来做导出
        $scope.cdnImgs = [];//图片选择器展示图片
        $scope.getData={callback:$scope.actionList,params:[{}]};//搜索和分页触发时候的回调

        /*tab选项卡初始化默认最多显示10个选项卡*/
        $scope.tabs = [true,false,false,false,false,false,false,false,false,false];

        //页面上传图片的图片显示
        $scope.cdn_img_url = '';
        //数据加载状态
        $scope.status =0;
    })();
}]);

/**
 * 弹窗辅助控制器
 */
app.controller('DailogInstanceCtrl', ['$scope', '$modalInstance', 'dailogData',function ModalInstanceCtrl($scope, $modalInstance, dailogData){
    $scope.dailogData = dailogData.data;
    $scope.ok = function () {
        $modalInstance.close($scope.dailogData);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

/*控制器服务（已废弃，保留兼容版本）*/
app.service('BaseCtrl',['$http',function($http){
    /**
     *删除信息之后刷新数据
     *@datetime 2017-01-19 10:29:37
     *@param datas array 列表数据
     *@param ids String id拼接字字符串
     *@return Array 删除之后的datas
     */
    this.refreshList = function(datas,ids){
        ids = ids+'';//int类型转string
        var _datas = [];
        var idArr = ids.split(',');
        for(var j=0;j<datas.length;j++){
            var n=true;
            for(var i=0;i<idArr.length;i++){
                if(datas[j].id == idArr[i]){
                    n=false;
                    break;
                }
            }
            if(n){_datas.push(datas[j])};
        }
        return _datas;
    };
}]);