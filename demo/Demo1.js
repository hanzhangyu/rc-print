import React, {Component} from 'react';
import Print from '../src';

export default class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            text: 'page',
        };
    }

    render() {
        const {text} = this.state;
        return (
            <div>
                <h3>This is Demo1&nbsp;&nbsp;<a href="https://github.com/hanzhangyu/rc-print/blob/master/demo/Demo1.js">code</a></h3>
                Open Iframe and inset Head which has wrapped the css file`s link to print something. <br />
                <button
                    onClick={() => {
                        this.refs.test.onPrint();
                    }}
                >print
                </button>
                <Print ref="test" title="this is Demo1`s title">
                    <div>
                        <p className="red">first {text}</p>
                        <button
                            onClick={() => {
                                this.setState({text: text === 'page' ? 'updated page' : 'page'});
                            }}
                        >update print content
                        </button>
                        <p className="green">second {text}</p>
                        <p className="pink">third {text}</p>
                    </div>
                </Print>
            </div>
        );
    }
}
