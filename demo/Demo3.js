import React, {Component} from 'react';
import Print from '../src';

export default function Demo3() {
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
