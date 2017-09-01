
# rc-print

创建 `iframe`或者 `新窗口`打印你想要的一部分。如果你不喜欢使用这两种方式不妨考虑下 [a-x-/react-easy-print](https://github.com/a-x-/react-easy-print)

> travis is comming soon

# 1. 安装

```sh
npm install --save rc-print
```

#### 如何使用demo:

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

### demo1：
将渲染出的dom使用iframe打印出来，并且会插入head的所有文件
```js
class Demo1 extends Component {
    render() {
        return (
            <div>
                <h3>This is Demo1</h3>
                Open Iframe and inset Head which has wrapped the css file`s link to print something. <br />
                <button
                    onClick={() => {
                        this.refs.test.onPrint();
                    }}
                >print
                </button>
                <Print ref="test" title="this is Demo1`s title">
                    <div>
                        <p className="red">first page</p>
                        <p className="green">second page</p>
                        <p className="pink">third page</p>
                    </div>
                </Print>
            </div>
        );
    }
}
```
### demo2
将渲染出的dom使用显示在新窗口并立即打印。不插入head也不插入body中的style标签，此时媒体查询可以使用`otherStyle`
```js
class Demo2 extends Component {
    render() {
        const otherStyle = `
            @media print{
                .green{
                    font-size:32px;,
                }
            }
        `;
        return (
            <div>
                <h3>This is Demo2</h3>
                Open a new window and don`t inset Head to print something. <br />
                <button
                    onClick={() => {
                        this.refs.test.onPrint();
                    }}
                >print
                </button>
                <Print
                    ref="test" isIframe={false} insertHead={false} title="this is Demo2`s title"
                    otherStyle={otherStyle}
                >
                    <div>
                        <p className="red">first line, we don`t have color</p>
                        <p className="green">second line, I have bigger font-size in the print`s
                            review page because of media query</p>
                        <p className="pink" style={{textDecoration: 'underline'}}>third line, I have underline but my
                            underline is come from inline style</p>
                    </div>
                </Print>
            </div>
        );
    }
}
```
### demo3
不显示需要打印的内容，当点击当点击打印的时候，异步渲染
```js
function Demo3() {
    let printDom = null;
    return (
        <div>
            <h3>This is Demo3</h3>
            Open a new window and you can only see the content in the print`s page. <br />
            <button
                onClick={() => {
                    printDom.onPrint();
                }}
            >print
            </button>
            <Print
                ref={myPrint => printDom = myPrint} isIframe={false} lazyRender
                title="this is Demo3`s title"
            >
                <div>
                    <p className="red">first page, you can only see us in the print`s page</p>
                    <p className="green">second page, you can only see us in the print`s page</p>
                    <p className="pink">third page, you can only see us in the print`s page</p>
                </div>
            </Print>
        </div>
    );
}
```
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


