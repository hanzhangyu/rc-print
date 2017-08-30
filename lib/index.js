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

var Print = function (_React$Component) {
    _inherits(Print, _React$Component);

    function Print(props) {
        _classCallCheck(this, Print);

        var _this = _possibleConstructorReturn(this, (Print.__proto__ || Object.getPrototypeOf(Print)).call(this, props));

        _this.renderChild = function () {
            var _this$props = _this.props,
                children = _this$props.children,
                restProps = _objectWithoutProperties(_this$props, ['children']);

            return _react2['default'].Children.only(children, function (child) {
                return (0, _react.cloneElement)(child, _extends({}, restProps));
            });
        };

        _this.onPrint = function () {
            var iframe = void 0;
            if (_this.iframe) {
                iframe = _this.iframe;
            } else {
                iframe = document.createElement('IFRAME');
                _this.iframe = iframe;
                iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
                document.body.appendChild(iframe);
                var doc = iframe.contentWindow.document;
                doc.write(_this.dom);
                doc.close();
            }
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
        return _this;
    }

    _createClass(Print, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.dom = _reactDom2['default'].findDOMNode(this).innerHTML;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(this.iframe);
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderChild() || null;
        }
    }]);

    return Print;
}(_react2['default'].Component);

exports['default'] = Print;