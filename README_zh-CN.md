
# rc-print

创建 `iframe`或者 `新窗口`打印你想要的一部分。如果你不喜欢使用这两种方式不妨考虑下 [a-x-/react-easy-print](https://github.com/a-x-/react-easy-print)

[![NPM version](https://img.shields.io/npm/v/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)
[![Build Status](https://www.travis-ci.org/hanzhangyu/rc-print.svg?branch=master)](https://www.travis-ci.org/hanzhangyu/rc-print)
[![Coverage Status](https://coveralls.io/repos/github/hanzhangyu/rc-print/badge.svg?branch=master)](https://coveralls.io/github/hanzhangyu/rc-print?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)

# 1. 安装

```sh
npm install --save rc-print
```

#### 如何使用demo:
1. https://hanzhangyu.github.io/rc-print
2. local demo:
    
    ```sh
    git clone git@github.com:hanzhangyu/rc-print.git
    
    npm install
    
    npm start
    ```
    
    然后在浏览器打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)。

#### 如何单元测试:

```sh
npm run test
```


# 2. Usage  

在`Print`组件内不需要打印的请使用媒体查询隐藏。
> css
```css
@media print{
    .printHide{
        visibility: hidden;
    }
}
```
> js
```js
class demo extends Component {
    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        this.refs.test.onPrint();
                    }}
                >print
                </button>
                <Print
                    ref="test" insertHead
                >
                    <div>
                        <p>show</p>
                        <p className="printHide">hide</p>
                    </div>
                </Print>
            </div>
        );
    }
}
```

更多用法见 https://hanzhangyu.github.io/rc-print

# 3. Props
| 名称          | 默认值                      | 描述                      |
| -----------   | ----------------------------| --------------------------- |
| insertHead    | true              |   是否插入目前页面的head标签              |
| bodyStyle     | false              |    是否插入目前页面的body中的style标签（不推荐写在body中）               | 
| otherStyle    | undefined              |  其他的样式作为字符串插入head最后              |
| isIframe      | true     |   true使用iframe，否则使用新窗口     |
| iframeStyle   | 'position:absolute;width:0px;height:0px;'   |   iframe的样式   |
| winStyle      | 'toolbar=no,menubar=no'          |   [新窗口的初始样式](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)          |
| title         | undefined                      |  iframe或者新建窗口的title                     |
| preventDefault| false                      |  是否替换浏览器原生的打印快捷键                      |
| lazyRender    | false                      |  异步渲染                      |
# 4. Feature
提取核心代码与react分离，或者寻找类似的无依赖代码，欢迎推荐。

# 5. LICENSE
MIT@[PaulHan](https://github.com/hanzhangyu).


