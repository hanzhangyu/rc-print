
# rc-print

Create a `iframe` or `new window` to print a part of page what you want. Considering the [a-x-/react-easy-print](https://github.com/a-x-/react-easy-print) if you don`t like to use these two methods

[![NPM version](https://img.shields.io/npm/v/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)
[![Build Status](https://www.travis-ci.org/hanzhangyu/rc-print.svg?branch=master)](https://www.travis-ci.org/hanzhangyu/rc-print)
[![Coverage Status](https://coveralls.io/repos/github/hanzhangyu/rc-print/badge.svg?branch=master)](https://coveralls.io/github/hanzhangyu/rc-print?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)

[中文前看这里](./README_zh-CN.md)

# 1. Install

```sh
npm install --save rc-print
```

#### How to run the demo:

```sh
git clone git@github.com:hanzhangyu/rc-print.git

npm install

npm start
```

then open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser.

#### How to run the test:

```sh
npm run test
```


# 2. Usage  

Use media query to hide the part which is no need to print in the `Print` component.

### demo1：
Print the `dom` which is rendered and inserted all the files of head
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
                        <p className="red"> first page</p>
                        <p className="green" >second page</p>
                        <p className="pink">third page </p>
                    </div>
                </Print>
            </div>
        );
    }
}
```
### demo2
The rendered DOM is displayed in the new window and printed immediately, and not inserted head and style in body. Use `otherStyle` to query media this time.
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
Doesn`t display the part which is need to be print. The part render async when printing.
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
| insertHead    | true              |    Insert the head tag             |
| bodyStyle     | false              |   Insert the style tag in the body (unrecommended method to write style)               | 
| otherStyle    | undefined              |  Other styles are inserted into the style tag which will be created in the last of head             |
| isIframe      | true     |   Use iframe if it`s true, otherwise new window will be used     |
| iframeStyle   | 'position:absolute;width:0px;height:0px;'   |   The style of iframe  |
| winStyle      | 'toolbar=no,menubar=no'          |   [The style of new window](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)          |
| title         | undefined                      |  The title of iframe or new window                      |
| preventDefault| false                      |  Replace the shortcut key of the browser's native print                    |
| lazyRender    | false                      |  async render                     |
# 4. Feature
Pick up the core code to separate with `react`, or find it. Besides, welcome to recommend.

# 5. LICENSE
MIT@[PaulHan](https://github.com/hanzhangyu).


