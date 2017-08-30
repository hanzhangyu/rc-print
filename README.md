
# rc-print

Create `Singleton pattern` a iframe to print easily in react. remove the iframe automatically when component is unmounted.

> travis is comming soon

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

> test is coming soon


# 2. Usage  

使用ref调用
```js
class Test1 extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to print`s demo</h1>
                <button
                    onClick={() => {
                        this.refs.test.onPrint();
                    }}
                >
                    print
                </button>
                <Print ref="test">
                    <div>only print this block</div>
                </Print>
            </div>
        );
    }
}
```
# 2. LICENSE

MIT@[PaulHan](https://github.com/hanzhangyu).


