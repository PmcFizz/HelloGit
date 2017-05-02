
/**
Created by Dio on 17-9.
http://inhu.net
 */

(function() {
  "use strict";
  (function() {
    var NGUeditor;
    NGUeditor = angular.module("ng.ueditor", []);
    NGUeditor.directive("ueditor", [
      function() {
        return {
            restrict: "C",
            scope:false,
            require: "ngModel",
          link: function($S, element, attr, ctrl) {

            var _NGUeditor, _updateByRender;
            _updateByRender = false;

            _NGUeditor = (function() {
              function _NGUeditor() {
                this.bindRender();
                this.initEditor();
                return;
              }

              /**
               * 初始化编辑器
               * @return {[type]} [description]
               */

              _NGUeditor.prototype.initEditor = function() {
                var _UEConfig, _editorId, _self;
                _self = this;
                if (typeof UE === 'undefined') {
                  console.error("Please import the local resources of ueditor!");
                  return;
                }
                _UEConfig = $S.config ? $S.config : {};
                _editorId = attr.id ? attr.id : "_editor" + (Date.now());
                element[0].id = _editorId;
                this.editor = new UE.ui.Editor(_UEConfig);
                this.editor.render(_editorId);
                return this.editor.ready(function() {
                  _self.editorReady = true;
                  _self.editor.addListener("contentChange", function() {
                    ctrl.$setViewValue(_self.editor.getContent());
                    if (!_updateByRender) {
                      if (!$S.$$phase) {
                        $S.$apply();
                      }
                    }
                    _updateByRender = false;
                  });
                  if (_self.modelContent && _self.modelContent.length > 0) {
                    _self.setEditorContent();
                  }
                  if (typeof $S.ready === "function") {
                    $S.ready(_self.editor);
                  }
                  $S.$on("$destroy", function() {
                    if (!attr.id && UE.delEditor) {
                      UE.delEditor(_editorId);
                    }
                  });
                });
              };

              _NGUeditor.prototype.setEditorContent = function(content) {
                if (content == null) {
                  content = this.modelContent;
                }
                if (this.editor && this.editorReady) {
                  this.editor.setContent(content);
                }
              };

              _NGUeditor.prototype.bindRender = function() {
                var _self;
                _self = this;
                ctrl.$render = function() {
                  _self.modelContent = (ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
                  _updateByRender = true;
                  _self.setEditorContent();
                };
              };

              return _NGUeditor;

            })();

             var ngEditor = new _NGUeditor();
              UE.registerUI('button', function (res) {
                  //注册按钮执行时的command命令，使用命令默认就会带有回退操作
                  res.registerCommand('button', {
                      execCommand: function () {
                          $S.imgChoose({},function(data){
                              var imgs = data.rep.data.image;
                              var len  = imgs.length;
                              for(var i=0;i<len;i++){
                                  ngEditor.editor.execCommand( 'insertimage', {
                                      src:imgs[i].file_cdn_path
                                    /*  width:'100',
                                      height:'100'*/
                                  });
                              }
                          });
                      }
                  });

                  //创建一个button
                  var btn = new UE.ui.Button({
                      //按钮的名字
                      name: 'button',
                      //提示
                      title: '微信图片',
                      //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
                      cssRules: 'background-position: -726px -77px;',
                      //点击时执行的命令
                      onclick: function () {
                          //这里可以不用执行命令,做你自己的操作也可
                          res.execCommand('button');
                      }
                  });

                  return btn;
              }, [37]);
          }
        };
      }
    ]);
  })();

}).call(this);

//# sourceMappingURL=angular-ueditor.js.map
