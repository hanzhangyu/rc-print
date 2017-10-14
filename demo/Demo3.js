import React from 'react';
import Print from '../src';
import IUImg from './IU01.jpg';

export default function Demo3() {
    let printDom = null;
    return (
        <div>
            <h3>This is Demo3&nbsp;&nbsp;<a href="https://github.com/hanzhangyu/rc-print/blob/master/demo/Demo3.js">code</a></h3>
            Open a new window and you can only see the content in the print`s page. <br />
            <button
                onClick={() => {
                    printDom.onPrint();
                }}
            >print
            </button>
            <Print
                ref={myPrint => printDom = myPrint} lazyRender isIframe={false}
                title="this is Demo3`s title"
            >
                <div>
                    <p className="red">first page, you can only see us in the print`s page</p>
                    <img src={IUImg} alt="imgTest" />
                    <p className="green">second page, you can only see us in the print`s page</p>
                    <p className="pink">third page, you can only see us in the print`s page</p>
                </div>
            </Print>
        </div>
    );
}
