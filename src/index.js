import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const arrayLikeMap = (arrayLike, fn) => {
    for (let i = 0; i < arrayLike.length; i++) {
        fn(arrayLike[i], i);
    }
    return arrayLike;
};

export default class Print extends React.Component {
    static propTypes = {
        insertHead: PropTypes.bool, // 是否植入本页面的head标签
        bodyStyle: PropTypes.bool, // 是否植入body标签中的style
        otherStyle: PropTypes.string, // 附加的样式将直接插入head最底部
        isIframe: PropTypes.bool, // 是否使用iframe插入，否则将使用新窗口
        iframeStyle: PropTypes.string, // 将被应用到iframe或者new window
        winStyle: PropTypes.string, // 将被应用到iframe或者new window
        title: PropTypes.string, // iframe或者新窗口的标题，将会在打印页的页眉和新窗口的title
        preventDefault: PropTypes.bool, // 是否替换Ctrl+P
        lazyRender: PropTypes.bool, // 是否只渲染在iframe或者新窗口上
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        insertHead: true,
        bodyStyle: false,
        otherStyle: undefined,
        isIframe: true,
        iframeStyle: 'position:absolute;width:0px;height:0px;',
        winStyle: 'toolbar=no,menubar=no',
        title: undefined,
        preventDefault: false,
        lazyRender: false,
    };

    constructor(props) {
        super(props);
        this.onPrint = () => {
            const {isIframe, lazyRender} = this.props;
            const _dom = lazyRender ? this.lazyRenderBox() : ReactDOM.findDOMNode(this);
            const dom = _dom ? _dom.innerHTML : null;
            const template = `<html>${this.getHead()}<body>${this.getBodyStyle()}${dom}</body></html>`;
            isIframe ? this.iframePrint(template) : this.winPrint(template);
        };
    }

    componentDidMount() {
        if (this.props.preventDefault) {
            this.prevent = (e) => {
                if (e.keyCode === 80 && (e.ctrlKey||e.metaKey)) {
                    e.preventDefault();
                    this.onPrint();
                }
            };
            document.addEventListener('keydown', this.prevent);
        }
    }

    componentWillUnmount() {
        this.iframe && document.body.removeChild(this.iframe);
        this.prevent && document.removeEventListener('keydown', this.prevent);
    }

    getHead = () => {
        const {insertHead, title, otherStyle} = this.props;
        const titleTemplate = title ? `<title>${title}</title>` : '';
        const otherStyleTemplate = otherStyle ? `<style>${otherStyle}</style>` : '';
        return `<head>${titleTemplate}${insertHead ? document.head.innerHTML : ''}${otherStyleTemplate}</head>`;
    };

    getBodyStyle = () => {
        const {bodyStyle} = this.props;
        if (bodyStyle) {
            let inlineStyle = '';
            const stylesDom = document.body.getElementsByTagName('style');
            arrayLikeMap(stylesDom, (item) => {
                inlineStyle += item.innerHTML;
            });
            return `<style>${inlineStyle}</style>`;
        }
        return '';
    };

    lazyRenderBox = () => {
        let box;
        if (this.box) {
            box = this.box;
        } else {
            box = document.createElement('div');
            this.box = box;
            box.setAttribute('style', 'display:none');
            document.body.appendChild(box);
        }
        ReactDOM.render(this.renderChild(), box);
        return box;
    };

    iframePrint = (template) => {
        let iframe;
        if (this.iframe) {
            iframe = this.iframe;
        } else {
            iframe = document.createElement('IFRAME');
            this.iframe = iframe;
            iframe.setAttribute('style', this.props.iframeStyle);
            document.body.appendChild(iframe);
        }
        const doc = iframe.contentWindow.document;
        doc.write(template);
        doc.close();
        iframe.onload = ()=>{
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }
    };

    winPrint = (template) => {
        const win = window.open('', '123', this.props.winStyle);
        win.document.write(template);
        win.print();
    };

    renderChild = () => {
        const {children, ...restProps} = this.props;
        return React.Children.only(children, child => cloneElement(child, {
            ...restProps,
        }));
    };

    render() {
        return !this.props.lazyRender ? (this.renderChild() || null) : null;
    }
}
