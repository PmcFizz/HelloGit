/**
 * @author yubingyang
 * @instructions 表单页面（包括表格页）使用的插件 包括 分页 选择 查询 表单过滤器
 * @time 2017/1/16
 */

(function(app){
    /**日期控制器*/
    app.controller('DatepickerCtrl', ['$scope', function($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            gotoCurrent: true,
            class: 'datepicker'
        };

        $scope.dt = dateToString(new Date());
        //  $scope.initDate = new Date();
        //  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'yyyy-MM-dd';

        function dateToString(now) {
            var year = now.getFullYear();
            var month = (now.getMonth() + 1).toString();
            var day = (now.getDate()).toString();
            var hour = (now.getHours()).toString();
            var minute = (now.getMinutes()).toString();
            var second = (now.getSeconds()).toString();
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            if (hour.length == 1) {
                hour = "0" + hour;
            }
            if (minute.length == 1) {
                minute = "0" + minute;
            }
            if (second.length == 1) {
                second = "0" + second;
            }
            var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return dateTime;
        }
    }]);
    /**
     *点击删除按钮的触发事件（已经废弃,保留版本兼容）
     *@author yubingyang
     *@datetime 2017-01-17 14:07:56
     *@instructions
     */
    app.controller('DelCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log){
        $scope.items = {};
        $scope.open = function (ids) {
            var modalInstance = $modal.open({
                templateUrl: '/views/system/blocks/delete_dialog.html',
                size:'sm',
                controller:'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return {
                            'items':$scope.items,//页面参数
                            'ret':''
                        };
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                // alert(ids);
                $scope.dels(ids);//发起删除
            }, function () {});
        };
    }]);
    /**
     * 图片选择控制器(已废弃，版本兼容保留)
     * @instructions 父类需要强制复写函数 choose_img(item,index) 接收回调值
     */
    app.controller('ChooseImageCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log){
        $scope.items = {};
        $scope.open = function (num,index) {
            var num = arguments.length >0?num:1;
            $scope.items = {num:num};
            var modalInstance = $modal.open({
                templateUrl:'/views/operating/picture/img-manage.html',
                size:'lg',
                controller:'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return {
                            'items':$scope.items,//页面参数
                            'ret':['image']
                        };
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.choose_img(selectedItem,index);
            }, function () {});
        };
    }]);
    /**
     * 时间选择插件
     */
    app.directive('customTimeChoose', function(){
        return {
            restrice: 'A',
            controller: function($scope){

            },
            require:'ngModel',
            link: function($scope, elem, attrs, ngModel){
                var  modelName = '';
                /*获取监听的model*/
                if(attrs.hasOwnProperty('ngModel')){
                    modelName = attrs.ngModel;
                }

                var fromLabel = 'YYYY-MM-DD HH:mm:ss';

                var timePicker = true;
                if(attrs.hasOwnProperty('options')){
                    attrs.options = eval("("+attrs.options+")");
                    if(attrs.options.hasOwnProperty('format')){
                        fromLabel = attrs.options.format;
                    }

                    if(attrs.options.hasOwnProperty('timePicker')){
                        timePicker = attrs.options.timePicker;
                    }
                }

                (function($){
                    var options = {};
                    options.singleDatePicker = true;
                    options.showISOWeekNumbers = true;
                    options.autoUpdateInput=false;
                    options.showDropdowns = true;
                    options.timePicker = timePicker;
                    options.timePicker24Hour = true;
                    options.modelName = modelName;
                    options.modelId = attrs.id;
                    options.locale ={
                        format: fromLabel,
                        applyLabel : '确定',
                        cancelLabel : '取消',
                        fromLabel : '起始时间',
                        toLabel : '结束时间',
                        weekLabel : '周',
                        customRangeLabel : '自定义',
                        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                            '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                        firstDay : 1
                    };

                    $('#'+attrs.id).daterangepicker(options, function (start, end, label) {});

                    $('#'+attrs.id).on('apply.daterangepicker',function(ev, picker) {
                        var attr = options.modelName.split(".");
                        switch(attr.length){
                            case 2:
                                $('#'+ options.modelId).val(picker.startDate.format(options.locale.format)).trigger("change");
                                break;
                            default :
                                $('.ui-time-choose').val( picker.startDate.format(options.locale.format) - picker.endDate.format(options.locale.format));
                        }
                    });
                })(jQuery);
            }
        }
    });
    /**
     * 修改富文本框
     *@datetime 2017-01-18 15:01:39
     *@param
     *@return
     */
    app.directive('customWysiwygBind', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // view -> model
                element.bind('blur', function() {
                    scope.$apply(function() {
                        ctrl.$setViewValue(element.html());
                    });
                });

                // model -> view
                ctrl.$render = function() {
                    element.html(ctrl.$viewValue);
                };
            }
        };
    });
    /**
     * 分页指令
     */
    app.directive('customPage', function(){
        return {
            restrice: 'A',
            controller: function($scope, pagerConfig){
                //定义分页对象
                if(!$scope.page){
                    $scope.page= {
                        total_count:0
                    };
                }
                // 共多少条
                $scope.page.total_count = 0;
                $scope.pagesContent = [];
                // 偏移数
                $scope.offsetPage = 0;
                // 一页多少条
                $scope.page.page_size = 20;
                // 一页多少条
                $scope.page.current_page = 1;
                // 一个多少页
                $scope.totalPages = 0;
                $scope.this_page = 0;
                $scope.$watch('page.total_count', function(){
                    $scope.totalPages = Math.ceil($scope.page.total_count / $scope.page.page_size);
                    resetPageList();
                    if ($scope.pageContent[$scope.this_page]) {
                        $scope.pageContent[$scope.this_page].active = true;
                    }
                },true);
                /*  $scope.$watch('page.page_size', function(val){
                    $scope.totalPages = Math.ceil($scope.page.total_count / $scope.page.page_size);
                    resetPageList();
                    if ($scope.pageContent[$scope.this_page]) {
                        $scope.pageContent[$scope.this_page].active = true;
                    }
                });*/

                var resetPageList = function(){
                    $scope.pageContent = [];
                    var last = Math.min(Number($scope.offsetPage) + Number($scope.listSizes), $scope.totalPages);

                    for (var i = $scope.offsetPage; i < last; i ++) {
                        $scope.pageContent.push({
                            text: i,
                            indexPage: i,
                            active: false
                        })
                    }
                }

                var getOffset = function(index){
                    var offset = Math.min(index, $scope.totalPages - $scope.listSizes);
                    if (offset <= 0) {
                        offset = 0;
                    }
                    return offset;
                };

                $scope.selectPage = function(index){

                    if (index < 0 || index >= $scope.totalPages) {
                        return;
                    }
                    if ($scope.pageContent[$scope.this_page-$scope.offsetPage]) {
                        $scope.pageContent[$scope.this_page-$scope.offsetPage].active = false;
                    }
                    $scope.this_page = index;
                    $scope.page.current_page =index+1;
                    // 如果page.current_page 小于 offsetPage 或者 page.current_page 大于 offsetPage加listsizes

                    if ($scope.this_page < $scope.offsetPage || $scope.this_page >= $scope.offsetPage + $scope.pageContent.length) {
                        $scope.offsetPage = getOffset(index);
                        resetPageList();
                    }

                    if ($scope.pageContent[$scope.this_page-$scope.offsetPage]) {
                        $scope.pageContent[$scope.this_page-$scope.offsetPage].active = true;
                    }
                    /*发起数据请求*/
                    if($scope.getData.callback){
                        $scope.getData.callback();
                    }
                };

                $scope.next = function(){
                    if ($scope.isLast()) {
                        return;
                    }
                    $scope.selectPage($scope.this_page + 1);
                };
                $scope.provie = function(){
                    if ($scope.isFirst()) return;
                    $scope.selectPage($scope.this_page - 1);
                }
                $scope.first = function(){
                    $scope.selectPage(0);
                }
                $scope.last = function(){
                    $scope.selectPage($scope.totalPages - 1);
                }
                $scope.isFirst = function(){
                    return $scope.this_page <= 0;
                };
                $scope.isLast = function(){
                    return $scope.this_page >= $scope.totalPages - 1;
                }
                $scope.getText = function(key) {
                    return pagerConfig.text[key];
                };
            },
            link: function(scope, ele, attrs){
                scope.listSizes = attrs.listsizes;
            },

            templateUrl: '/views/system/blocks/page.html'
        }
    });
    /**
     * 列表选择器指令
     */
    app.directive('customSearch',function(){
        return {
            restrice: 'A',
            controller: function($scope){
                $scope.search_submit = function(){
                    /*发起数据请求*/
                    if($scope.getData.callback){
                        $scope.getData.params.type = 'search';
                        $scope.getData.callback($scope.getData.params);
                    }
                }
            },
            link: function(scope, ele, attrs){

            }
        }
    });
    /**
     * 列表搜索指令
     */
    app.directive('customGridSelect',function(){
        return {
            restrice: 'A',
            controller: function($scope){
                var selectedAll = false;
                $scope.select_ids = [];
                $scope.selected_item = function(id){
                    var n = $scope.select_ids.indexOf(id);
                    if(n != -1){
                        $scope.select_ids.splice(n, 1);
                        return false;
                    }else{
                        $scope.select_ids.push(id);
                        return true;
                    }
                };

                $scope.selected_delAll = function(){
                    if(!$scope.datas) return;
                    $scope.select_ids = [];
                    if (selectedAll) {
                        selectedAll = false;
                    } else {
                        selectedAll = true;
                    }
                    for (var i = 0; i < $scope.datas.length; i++) {
                        $scope.datas[i].select_stats = selectedAll;
                        if (selectedAll == true) {
                            $scope.select_ids.push($scope.datas[i].id);
                        }
                    }
                }
            }
        }
    });
    /**
     * 生成多行文本框
     *@author yubingyang
     *@datetime 2017-01-17 17:19:53
     */
    app.directive('customTextbox', function(){
        return {
            restrice: 'A',
            controller: function($scope, pagerConfig){
            },
            link: function(scope, ele, attrs){

            },
            templateUrl: '/views/system/blocks/text-box.html'
        }
    });
    /**
     * 分页接口 全局变量
     */
    app.constant('pagerConfig', {
        text: {
            'first': '首页',
            'provie': '上一页',
            'next': '下一页',
            'last': '尾页'
        }
    });
    /**
     * 状态值转文字(已废弃)
     */
    app.filter('statusText', function() {
        return function(input) {
            var args = Array.prototype.slice.call(arguments);
            for(var i=1;i< args.length;i++){
                if(args[i].indexOf("=>")>0){
                    var arg = args[i].split("=>");
                    if(input== arg[0]){
                        return arg[1];
                    }
                }else{
                    if(input == (i-1)){
                        return args[i];
                    }
                }
            }
            return input;
        };
    });
    /**
     * 判断当前列表的点击对象已经点击就显示class
     */
    app.filter('classShow',function(){
        return function(input){
            var args = Array.prototype.slice.call(arguments);
            if(input && args.length>1){
                return args[1];
            }else{
                return '';
            }
        }
    });
})(app);






