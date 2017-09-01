import React, {Component} from 'react';
import Print from '../src';

export default class Demo1 extends Component {
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
