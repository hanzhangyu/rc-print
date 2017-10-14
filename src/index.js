import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const arrayLikeMap = (arrayLike, fn) => {
    for (let i = 0; i < arrayLike.length; i++) {
        fn(arrayLike[i], i);
    }
};

// 只会缓存iframe，window模式自动缓存在新建窗口
const singletonCacheData = {
    iframe: null,
    update(iframe) {
        this.iframe = iframe;
    }
};

export default class Print extends React.Component {
    static propTypes = {
        insertHead: PropTypes.bool, // 是否植入本页面的head标签
        ignoreHeadJs: PropTypes.bool, // 当insertHead启用时是否屏蔽JS文件
        bodyStyle: PropTypes.bool, // 是否植入body标签中的style，插入body底部
        otherStyle: PropTypes.string, // 附加的样式将直接插入head最底部
        isIframe: PropTypes.bool, // 是否使用iframe插入，否则将使用新窗口
        iframeStyle: PropTypes.string, // 将被应用到iframe或者new window
        winStyle: PropTypes.string, // 将被应用到iframe或者new window
        title: PropTypes.string, // iframe或者新窗口的标题，将会在打印页的页眉和新窗口的title
        preventDefault: PropTypes.bool, // 是否替换Ctrl+P
        lazyRender: PropTypes.bool, // 是否只渲染在iframe或者新窗口上
        clearIframeCache: PropTypes.bool, // 是否清理dom缓存。否的情况下，如props为改变将保留并直接使用上次打印留下的dom
        singletonCache: PropTypes.bool, // 当clearIframeCache关闭时生效。类单例模式，当界面有多个打印组件时，最多允许保留一个缓存
        onStart: PropTypes.func, // 组件开始打印渲染
        onEnd: PropTypes.func, // 组件打印渲染完成
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
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
        onStart() {
        },
        onEnd() {
        },
    };

    constructor(props) {
        super(props);
        this.changed = true; // 不触发UI渲染
        this.onPrint = () => {
            const {isIframe, clearIframeCache, singletonCache, onStart} = this.props;
            onStart();

            if (isIframe) {
                if (clearIframeCache) { // 清理缓存模式
                    this.createIframe(null, (iframe) => {
                        // remove dom
                        document.body.removeChild(iframe);
                    });
                } else if (singletonCache) { // 单例模式缓存模式
                    if (this.changed || this.iframe !== singletonCacheData.iframe) { // 发生改变：1、数据改变；2、缓存对应的组件改变。
                        this.createIframe(singletonCacheData.iframe, (iframe) => {
                            this.iframe = iframe; // 保存本地用作对比
                            singletonCacheData.update(iframe);
                        });
                    } else {
                        this.iframePrint(singletonCacheData.iframe);
                    }
                } else if (this.changed) { // 普通缓存模式发生改变
                    this.createIframe(this.iframe, (iframe) => {
                        this.iframe = iframe;
                    });
                } else { // 普通缓存模式未改变
                    this.iframePrint(this.iframe);
                }
            } else {
                this.winCreateAndPrint();
            }

            // // lazyRender的遗留临时渲染节点不保留
            // if (this.box) {
            //     document.body.removeChild(this.box);
            //     this.box = null;
            // }
        };
    }

    componentDidMount() {
        if (this.props.preventDefault) {
            this.prevent = (e) => {
                if (e.keyCode === 80 && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    this.onPrint();
                }
            };
            document.addEventListener('keydown', this.prevent);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            // this.setState({changed: true});
            this.changed = true;
        }
    }

    componentWillUnmount() {
        this.iframe && document.body.removeChild(this.iframe);
        // this.box && document.body.removeChild(this.box); // 移除懒加载隐藏节点
        this.prevent && document.removeEventListener('keydown', this.prevent);
    }

    getHead = () => {
        const {insertHead, ignoreHeadJs, title, otherStyle} = this.props;
        const titleTemplate = title ? `<title>${title}</title>` : '';
        const otherStyleTemplate = otherStyle ? `<style>${otherStyle}</style>` : '';
        const headTagsTemplate = (() => {
            if (insertHead) {
                const innerHTML = document.head.innerHTML;
                return ignoreHeadJs ? innerHTML.replace(SCRIPT_REGEX, '') : innerHTML;
            }
            return '';
        })();
        return `${titleTemplate}${headTagsTemplate}${otherStyleTemplate}`;
    };

    getBodyStyle = () => {
        let inlineStyle = '';
        const stylesDom = document.body.getElementsByTagName('style');
        arrayLikeMap(stylesDom, (item) => {
            inlineStyle += item.innerHTML;
        });
        return inlineStyle;
    };

    writeTemplate = (doc) => {
        const {bodyStyle, lazyRender} = this.props;
        if (lazyRender) {
            doc.write('<html><head></head><body></body></html>');
            doc.head.innerHTML = this.getHead();
            ReactDOM.render(this.renderChild(), doc.body); // React的未来版本可能会异步地呈现组件
            if (bodyStyle) {
                const styleTag = document.createElement('style');
                styleTag.innerHTML = this.getBodyStyle();
                doc.body.appendChild(styleTag);
            }
        } else {
            const _dom = ReactDOM.findDOMNode(this);
            const dom = _dom ? _dom.innerHTML : null;
            doc.write(`<html>
                <head>${this.getHead()}</head>
                <body>${dom}${bodyStyle ? `<style>${this.getBodyStyle()}</style>` : ''}</body>
            </html>`);
        }
        doc.close();
    };

    createIframe = (iframeCache, callback) => {
        const {iframeStyle} = this.props;
        let iframe;
        if (iframeCache) {
            iframe = iframeCache;
        } else {
            // 新建iframe节点并添加至页面
            iframe = document.createElement('IFRAME');
            iframe.setAttribute('style', iframeStyle);
            document.body.appendChild(iframe);
        }
        iframe.onload = () => {
            this.iframePrint(iframe, callback);
        };
        this.writeTemplate(iframe.contentWindow.document);
    };

    iframePrint = (iframe, callback) => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        callback && callback(iframe);

        // wait for a new change
        this.changed = false;
        this.props.onEnd();
    };

    winCreateAndPrint = () => {
        const win = window.open('', '', this.props.winStyle);
        this.writeTemplate(win.document);
        win.onload = () => {
            win.print();

            // wait for a new change
            this.changed = false;
            this.props.onEnd();
        };
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
