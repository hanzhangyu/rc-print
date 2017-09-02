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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayLikeMap = function arrayLikeMap(arrayLike, fn) {
    for (var i = 0; i < arrayLike.length; i++) {
        fn(arrayLike[i], i);
    }
    return arrayLike;
};

var Print = function (_React$Component) {
    _inherits(Print, _React$Component);

    function Print(props) {
        _classCallCheck(this, Print);

        var _this = _possibleConstructorReturn(this, (Print.__proto__ || Object.getPrototypeOf(Print)).call(this, props));

        _this.getHead = function () {
            var _this$props = _this.props,
                insertHead = _this$props.insertHead,
                title = _this$props.title,
                otherStyle = _this$props.otherStyle;

            var titleTemplate = title ? '<title>' + title + '</title>' : '';
            var otherStyleTemplate = otherStyle ? '<style>' + otherStyle + '</style>' : '';
            return '<head>' + titleTemplate + (insertHead ? document.head.innerHTML : '') + otherStyleTemplate + '</head>';
        };

        _this.getBodyStyle = function () {
            var bodyStyle = _this.props.bodyStyle;

            if (bodyStyle) {
                var inlineStyle = '';
                var stylesDom = document.body.getElementsByTagName('style');
                arrayLikeMap(stylesDom, function (item) {
                    inlineStyle += item.innerHTML;
                });
                return '<style>' + inlineStyle + '</style>';
            }
            return '';
        };

        _this.lazyRenderBox = function () {
            var box = void 0;
            if (_this.box) {
                box = _this.box;
            } else {
                box = document.createElement('div');
                _this.box = box;
                box.setAttribute('style', 'display:none');
                document.body.appendChild(box);
            }
            _reactDom2['default'].render(_this.renderChild(), box);
            return box;
        };

        _this.iframePrint = function (template) {
            var iframe = void 0;
            if (_this.iframe) {
                iframe = _this.iframe;
            } else {
                iframe = document.createElement('IFRAME');
                _this.iframe = iframe;
                iframe.setAttribute('style', _this.props.iframeStyle);
                document.body.appendChild(iframe);
            }
            var doc = iframe.contentWindow.document;
            doc.write(template);
            doc.close();
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };

        _this.winPrint = function (template) {
            var win = window.open('', '123', _this.props.winStyle);
            win.document.write(template);
            win.print();
        };

        _this.renderChild = function () {
            var _this$props2 = _this.props,
                children = _this$props2.children,
                restProps = _objectWithoutProperties(_this$props2, ['children']);

            return _react2['default'].Children.only(children, function (child) {
                return (0, _react.cloneElement)(child, _extends({}, restProps));
            });
        };

        _this.onPrint = function () {
            var _this$props3 = _this.props,
                isIframe = _this$props3.isIframe,
                lazyRender = _this$props3.lazyRender;

            var _dom = lazyRender ? _this.lazyRenderBox() : _reactDom2['default'].findDOMNode(_this);
            var dom = _dom ? _dom.innerHTML : null;
            var template = '<html>' + _this.getHead() + '<body>' + _this.getBodyStyle() + dom + '</body></html>';
            isIframe ? _this.iframePrint(template) : _this.winPrint(template);
        };
        return _this;
    }

    _createClass(Print, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.preventDefault) {
                this.prevent = function (e) {
                    if (e.keyCode === 80 && e.ctrlKey) {
                        e.preventDefault();
                        _this2.onPrint();
                    }
                };
                document.addEventListener('keydown', this.prevent);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.iframe && document.body.removeChild(this.iframe);
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
    insertHead: _react.PropTypes.bool, // 是否植入本页面的head标签
    bodyStyle: _react.PropTypes.bool, // 是否植入body标签中的style
    otherStyle: _react.PropTypes.string, // 附加的样式将直接插入head最底部
    isIframe: _react.PropTypes.bool, // 是否使用iframe插入，否则将使用新窗口
    iframeStyle: _react.PropTypes.string, // 将被应用到iframe或者new window
    winStyle: _react.PropTypes.string, // 将被应用到iframe或者new window
    title: _react.PropTypes.string, // iframe或者新窗口的标题，将会在打印页的页眉和新窗口的title
    preventDefault: _react.PropTypes.bool, // 是否替换Ctrl+P
    lazyRender: _react.PropTypes.bool, // 是否只渲染在iframe或者新窗口上
    children: _react.PropTypes.node.isRequired
};
Print.defaultProps = {
    insertHead: true,
    bodyStyle: false,
    otherStyle: undefined,
    isIframe: true,
    iframeStyle: 'position:absolute;width:0px;height:0px;',
    winStyle: 'toolbar=no,menubar=no',
    title: undefined,
    preventDefault: false,
    lazyRender: false
};
exports['default'] = Print;