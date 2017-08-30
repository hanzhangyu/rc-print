import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Print from '../src';

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


ReactDOM.render(<Test1 />,
    document.querySelector('#root')
);
