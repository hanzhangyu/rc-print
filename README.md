
# rc-print

Create a `iframe` or `new window` to print a part of page what you want. Considering the [a-x-/react-easy-print](https://github.com/a-x-/react-easy-print) if you don`t like to use these two methods

[![NPM version](https://img.shields.io/npm/v/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)
[![Build Status](https://www.travis-ci.org/hanzhangyu/rc-print.svg?branch=master)](https://www.travis-ci.org/hanzhangyu/rc-print)
[![Coverage Status](https://coveralls.io/repos/github/hanzhangyu/rc-print/badge.svg?branch=master)](https://coveralls.io/github/hanzhangyu/rc-print?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/rc-print.svg?style=flat)](https://npmjs.org/package/rc-print)

[中文请看这里](./README_zh-CN.md)

# 1. Install

```sh
npm install --save rc-print
```

#### How to run the demo:
1.  https://hanzhangyu.github.io/rc-print
2. local demo:
    
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
| insertHead    | true              |    Insert the head tag             |
| ignoreHeadJs    | true              |    Ignore the js files when `insertHead` is enabled             |
| bodyStyle     | false              |   Insert the style tag in the body (unrecommended method to write style)               | 
| otherStyle    | undefined              |  Other styles are inserted into the style tag which will be created in the last of head             |
| isIframe      | true     |   Use iframe if it`s true, otherwise new window will be used     |
| iframeStyle   | 'position:absolute;width:0px;height:0px;'   |   The style of iframe  |
| winStyle      | 'toolbar=no,menubar=no'          |   [The style of new window](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)          |
| title         | undefined                      |  The title of iframe or new window                      |
| preventDefault| false                      |  Replace the shortcut key of the browser's native print                    |
| lazyRender    | false                      |  async render, rendering when printing only                     |
| clearIframeCache    | false                      |  Clean up the DOM cache.if props changes, it will retain and directly use the DOM left in the last print when choose false                      |
| singletonCache    | true                      |  Works when clearIframeCache is false. Like Singleton pattern, only one cache will be save when there is multiple component which has a true singletonCache props                |
| onStart    | function(){}                      |  Begin to print                      |
| onEnd    | function(){}                      |  Render print page finish       |
# 4. Feature
Pick up the core code to separate with `react`, or find it. Besides, welcome to recommend.

# 5. LICENSE
MIT@[PaulHan](https://github.com/hanzhangyu).


