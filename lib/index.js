'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
var arrayLikeMap = function arrayLikeMap(arrayLike, fn) {
    for (var i = 0; i < arrayLike.length; i++) {
        fn(arrayLike[i], i);
    }
};

// 只会缓存iframe，window模式自动缓存在新建窗口
var singletonCacheData = {
    iframe: null,
    update: function update(iframe) {
        this.iframe = iframe;
    }
};

var Print = function (_React$Component) {
    _inherits(Print, _React$Component);

    function Print(props) {
        _classCallCheck(this, Print);

        var _this = _possibleConstructorReturn(this, (Print.__proto__ || Object.getPrototypeOf(Print)).call(this, props));

        _this.getHead = function () {
            var _this$props = _this.props,
                insertHead = _this$props.insertHead,
                ignoreHeadJs = _this$props.ignoreHeadJs,
                title = _this$props.title,
                otherStyle = _this$props.otherStyle;

            var titleTemplate = title ? '<title>' + title + '</title>' : '';
            var otherStyleTemplate = otherStyle ? '<style>' + otherStyle + '</style>' : '';
            var headTagsTemplate = function () {
                if (insertHead) {
                    var innerHTML = document.head.innerHTML;
                    return ignoreHeadJs ? innerHTML.replace(SCRIPT_REGEX, '') : innerHTML;
                }
                return '';
            }();
            return '' + titleTemplate + headTagsTemplate + otherStyleTemplate;
        };

        _this.getBodyStyle = function () {
            var inlineStyle = '';
            var stylesDom = document.body.getElementsByTagName('style');
            arrayLikeMap(stylesDom, function (item) {
                inlineStyle += item.innerHTML;
            });
            return inlineStyle;
        };

        _this.writeTemplate = function (doc) {
            var _this$props2 = _this.props,
                bodyStyle = _this$props2.bodyStyle,
                lazyRender = _this$props2.lazyRender;

            if (lazyRender) {
                doc.write('<html><head></head><body><div></div></body></html>');
                doc.head.innerHTML = _this.getHead();
                _reactDom2['default'].render(_this.renderChild(), doc.body.getElementsByTagName('div')[0]); // React的未来版本可能会异步地呈现组件
                if (bodyStyle) {
                    var styleTag = document.createElement('style');
                    styleTag.innerHTML = _this.getBodyStyle();
                    doc.body.appendChild(styleTag);
                }
            } else {
                var _dom = _reactDom2['default'].findDOMNode(_this);
                var dom = _dom ? _dom.innerHTML : null;
                doc.write('<html>\n                <head>' + _this.getHead() + '</head>\n                <body>' + dom + (bodyStyle ? '<style>' + _this.getBodyStyle() + '</style>' : '') + '</body>\n            </html>');
            }
            doc.close();
        };

        _this.createIframe = function (iframeCache, callback) {
            var iframeStyle = _this.props.iframeStyle;

            var iframe = void 0;
            if (iframeCache) {
                iframe = iframeCache;
            } else {
                // 新建iframe节点并添加至页面
                iframe = document.createElement('IFRAME');
                iframe.setAttribute('style', iframeStyle);
                document.body.appendChild(iframe);
            }
            iframe.onload = function () {
                _this.iframePrint(iframe, callback);
            };
            _this.writeTemplate(iframe.contentWindow.document);
        };

        _this.iframePrint = function (iframe, callback) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            callback && callback(iframe);

            // wait for a new change
            _this.changed = false;
            _this.props.onEnd();
        };

        _this.winCreateAndPrint = function () {
            var win = window.open('', '', _this.props.winStyle);
            _this.writeTemplate(win.document);
            win.onload = function () {
                win.print();

                // wait for a new change
                _this.changed = false;
                _this.props.onEnd();
            };
        };

        _this.renderChild = function () {
            var _this$props3 = _this.props,
                children = _this$props3.children,
                restProps = _objectWithoutProperties(_this$props3, ['children']);

            return (0, _react.cloneElement)(_react2['default'].Children.only(children), _extends({}, restProps));
        };

        _this.changed = true; // 不触发UI渲染
        _this.onPrint = function () {
            var _this$props4 = _this.props,
                isIframe = _this$props4.isIframe,
                clearIframeCache = _this$props4.clearIframeCache,
                singletonCache = _this$props4.singletonCache,
                onStart = _this$props4.onStart;

            onStart();

            if (isIframe) {
                if (clearIframeCache) {
                    // 清理缓存模式
                    _this.createIframe(null, function (iframe) {
                        // remove dom
                        document.body.removeChild(iframe);
                    });
                } else if (singletonCache) {
                    // 单例模式缓存模式
                    if (_this.changed || _this.iframe !== singletonCacheData.iframe) {
                        // 发生改变：1、数据改变；2、缓存对应的组件改变。
                        _this.createIframe(singletonCacheData.iframe, function (iframe) {
                            _this.iframe = iframe; // 保存本地用作对比
                            singletonCacheData.update(iframe);
                        });
                    } else {
                        _this.iframePrint(singletonCacheData.iframe);
                    }
                } else if (_this.changed) {
                    // 普通缓存模式发生改变
                    _this.createIframe(_this.iframe, function (iframe) {
                        _this.iframe = iframe;
                    });
                } else {
                    // 普通缓存模式未改变
                    _this.iframePrint(_this.iframe);
                }
            } else {
                _this.winCreateAndPrint();
            }

            // // lazyRender的遗留临时渲染节点不保留
            // if (this.box) {
            //     document.body.removeChild(this.box);
            //     this.box = null;
            // }
        };
        return _this;
    }

    _createClass(Print, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.preventDefault) {
                this.prevent = function (e) {
                    if (e.keyCode === 80 && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        _this2.onPrint();
                    }
                };
                document.addEventListener('keydown', this.prevent);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps !== this.props) {
                // this.setState({changed: true});
                this.changed = true;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.iframe && document.body.removeChild(this.iframe);
            // this.box && document.body.removeChild(this.box); // 移除懒加载隐藏节点
            this.prevent && document.removeEventListener('keydown', this.prevent);
        }
    }, {
        key: 'render',
        value: function render() {
            return !this.props.lazyRender ? this.renderChild() || null : null;
        }
    }]);

    return Print;
}(_react2['default'].Component);

Print.propTypes = {
    insertHead: _propTypes2['default'].bool, // 是否植入本页面的head标签
    ignoreHeadJs: _propTypes2['default'].bool, // 当insertHead启用时是否屏蔽JS文件
    bodyStyle: _propTypes2['default'].bool, // 是否植入body标签中的style，插入body底部
    otherStyle: _propTypes2['default'].string, // 附加的样式将直接插入head最底部
    isIframe: _propTypes2['default'].bool, // 是否使用iframe插入，否则将使用新窗口
    iframeStyle: _propTypes2['default'].string, // 将被应用到iframe或者new window
    winStyle: _propTypes2['default'].string, // 将被应用到iframe或者new window
    title: _propTypes2['default'].string, // iframe或者新窗口的标题，将会在打印页的页眉和新窗口的title
    preventDefault: _propTypes2['default'].bool, // 是否替换Ctrl+P
    lazyRender: _propTypes2['default'].bool, // 是否只渲染在iframe或者新窗口上
    clearIframeCache: _propTypes2['default'].bool, // 是否清理dom缓存。否的情况下，如props为改变将保留并直接使用上次打印留下的dom
    singletonCache: _propTypes2['default'].bool, // 当clearIframeCache关闭时生效。类单例模式，当界面有多个打印组件时，最多允许保留一个缓存
    onStart: _propTypes2['default'].func, // 组件开始打印渲染
    onEnd: _propTypes2['default'].func, // 组件打印渲染完成
    children: _propTypes2['default'].node.isRequired
};
Print.defaultProps = {
    insertHead: true,
    ignoreHeadJs: true,
    bodyStyle: false,
    otherStyle: undefined,
    isIframe: true,
    iframeStyle: 'position:absolute;width:0px;height:0px;',
    winStyle: 'toolbar=no,menubar=no',
    title: undefined,
    preventDefault: false,
    lazyRender: false,
    clearIframeCache: false,
    singletonCache: true,
    onStart: function onStart() {},
    onEnd: function onEnd() {}
};
exports['default'] = Print;