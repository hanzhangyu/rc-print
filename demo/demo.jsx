require('./demo.css')
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Print from '../src';

class Test1 extends Component {
    constructor() {
        super();
        this.state = {
            pause: false,
            running: true,
        };
    }
    render() {
        return (
            <div>
                <h1>Welcome to Timer`s demo</h1>
                <h3>state</h3>
                123
                qwe
                <button>print</button>
                <Print ref="test">
                    <div className="test">
                        <div className="test2">123eeeee</div>
                        <div className="test2">dddddd</div>
                    </div>
                </Print>
            </div>
        );
    }
}


ReactDOM.render(<Test1 />,
    document.querySelector('#root')
);
