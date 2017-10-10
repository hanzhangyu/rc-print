import React, {Component} from 'react';
import Print from '../src';

export default class Demo2 extends Component {
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
                        <img src="https://camo.githubusercontent.com/fce224679f9178f0677b752fe3e54892ad0d7e12/68747470733a2f2f636f766572616c6c732e696f2f7265706f732f6769746875622f68616e7a68616e6779752f72632d7072696e742f62616467652e7376673f6272616e63683d6d6173746572" alt="imgTest" />
                        <img src="https://camo.githubusercontent.com/c32e739600277c1fbd63a5920bf5b4049ee76da4/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72632d7072696e742e7376673f7374796c653d666c6174" alt="imgTest" />
                        <img src="https://camo.githubusercontent.com/1b1c928991e90341a964a62667fe72ced61c7619/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6e726d2e7376673f7374796c653d666c61742d737175617265" alt="imgTest" />
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
