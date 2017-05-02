'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
    value('uiJqConfig', {}).
    directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', '$compile',function uiJqInjectingFunction(uiJqConfig, JQ_CONFIG, uiLoad, $timeout,$compile) {

        return {
            restrict: 'A',
            compile: function uiJqCompilingFunction(tElm, tAttrs) {
                if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
                    throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
                }
                var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

                return function uiJqLinkingFunction(scope, elm, attrs) {
                    function getOptions(){
                        var linkOptions = [];
                        if (attrs.uiOptions) {
                            var linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
                            /*如果是显示列表就做特殊处理 eayon 2016-12-17*/
                            if(tAttrs.uiJq == 'dataTable'){
                                /*设置分页样式*/
                                var attr = linkOptions[0];
                                attr.oLanguage ={
                                    'sLengthMenu': '每页显示 _MENU_ 条记录',
                                    'sInfo': ' _START_ - _END_ 条/共 _TOTAL_ 条数据',
                                    'sInfoEmpty': '没有数据',
                                    'sInfoFiltered': '(从 _MAX_ 条数据中检索)',
                                    'oPaginate': {
                                        'sFirst': '首页',
                                        'sPrevious': '前一页',
                                        'sNext': '后一页',
                                        'sLast': '尾页'
                                    },
                                    'sZeroRecords': '没有检索到数据'
                                }
                                //end

                                /*设置操作列*/
                                var is_oper = attr.hasOwnProperty('c_operate');
                                if(!is_oper || (attr.c_operate == true)){
                                    attr.columnDefs = [ {
                                        targets: -1,
                                        "mRender": function (data) {
                                            return '<a ui-sref="app.menus.edit({id:'+data.id+'})" class="active"><i class="fa fa-edit"></i></a>';
                                        },
                                        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                            $compile(nTd)(scope);
                                        },
                                        orderable: false
                                    } ];
                                    attr.columns.push({data:null});
                                };
                                //end

                                /*设置服务器模式*/
                                if(!attr.hasOwnProperty('serverside')) attr.serverside = true;
                                /*设置排序*/
                                if(!attr.hasOwnProperty('ordering'))  attr.ordering = false;
                                /*禁用默认搜索*/
                                attr.searching = true;

                                /*表格加载完成*/
                                $.fn.dataTable.defaults.initComplete = function() {
                                    var _this = this;
                                    var _id = _this.attr('id');
                                    var $wrapper = $('#' + _this.attr('id') + '_wrapper');
                                    var searchHTML = '<label>&nbsp;&nbsp;</label><label><span>搜索:</span>';
                                    var $filter = $('#' + _this.attr('id') + '_filter')
                                    var btn = $($wrapper.find('>.row>div').get(0));
                                    var $seach_root = $($wrapper.find('>.row>div').get(1));

                                    /*设置按钮*/
                                    if(attr.hasOwnProperty('btns')) {
                                        var len = attr.btns.length;
                                        for (var i = 0; i < len; i++) {
                                            var $btn = attr.btns[i];
                                            btn.html($compile($btn)(scope));
                                        }
                                    }
                                    //end

                                    /*设置搜索功能*/
                                    if(attr.hasOwnProperty('columns')){
                                        var $seach = $('<div class="col-sm-12 text-right"></div>');
                                        var len = attr.columns.length;
                                        var seach_item = {};
                                        for(var i = 0; i < len; i++){
                                            var $col = attr.columns[i];
                                            if($col.hasOwnProperty('search')){
                                                var s_id = 'seach_'+i+'_'+_id;
                                                var p =$col.search.hasOwnProperty('placeholder')?$col.search.placeholder:'输入内容';
                                                $seach.append($('<input type="text" class="input-sm form-control " id="'+s_id+'" placeholder="'+ p +'" >'));
                                                seach_item[i] = s_id;
                                            }
                                        }

                                        /*设置搜索提交按钮*/
                                        if(seach_item != []){
                                            var $go = $('<button class="btn btn-sm btn-default text-right" type="button">搜索</button>');
                                            $seach.append($go);
                                            $go.click(function(){
                                                var api =  _this.api();
                                                var is_seach = false;
                                                for(var x in seach_item){
                                                    var val = $('#'+seach_item[x]).val();
                                                    if(val != ''){
                                                        api.column(x).search(val);
                                                        is_seach = true;
                                                    }
                                                }
                                                if(is_seach) api.draw();
                                            });
                                        }
                                        //end

                                        $seach_root.html($compile($seach)(scope));
                                    }


                                   /* seach.append("我是搜索");*/

                                    /* $filter.append(searchHTML);
                                     $filter.on('keyup', '#sDate', function(e) {
                                     if (e.keyCode == 13 || (e.keyCode == 8 && (this.value.length == 0))) {
                                     _this.api().column('3')
                                     .search(this.value).column('3')
                                     .search(this.value).column('3')
                                     .search(this.value).draw();
                                     }
                                     });*/
                                }
                                //end

                                if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
                                    linkOptions[0] = angular.extend({}, options, linkOptions[0]);
                                }
                            }
                        } else if (options) {
                            linkOptions = [options];
                        }
                        return linkOptions;
                    }

                    // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                    if (attrs.ngModel && elm.is('select,input,textarea')) {
                        elm.bind('change', function() {
                            elm.trigger('input');
                        });
                    }

                    // Call jQuery method and pass relevant options
                    function callPlugin() {
                        $timeout(function() {
                            elm[attrs.uiJq].apply(elm, getOptions());
                        }, 0, false);
                    }

                    function refresh(){
                        // If ui-refresh is used, re-fire the the method upon every change
                        if (attrs.uiRefresh) {
                            scope.$watch(attrs.uiRefresh, function() {
                                callPlugin();
                            });
                        }
                    }

                    if ( JQ_CONFIG[attrs.uiJq] ) {
                        uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function() {
                            callPlugin();
                            refresh();
                        }).catch(function() {

                        });
                    } else {
                        callPlugin();
                        refresh();
                    }
                };
            }
        };
    }]);