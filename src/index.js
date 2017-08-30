import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';

export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.onPrint = () => {
            const _dom = ReactDOM.findDOMNode(this);
            const dom = _dom ? _dom.innerHTML : null;
      //       const _dom= ReactDOM.findDOMNode(this);
      //       const dom =_dom?_dom.innerHTML:null
            let iframe  = window.open("", "newwin", "toolbar=no,fullscreen=yes,scrollbars=no,menubar=no");
            iframe.document.write(`<html><head>${document.head.innerHTML}</head><body>${dom}</body></html>`);
            iframe.print();
            iframe.close();
      //       let iframe;
      //       if (this.iframe) {
      //           iframe = this.iframe;
      //       } else {
      //           iframe = document.createElement('IFRAME');
      //           this.iframe = iframe;
      //           iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
      //           document.body.appendChild(iframe);
      //           const test=iframe.contentWindow;
      //           console.log(test)
      //           const doc = iframe.contentWindow.document;
      //           doc.write(dom);
      //           doc.close();
      //       }
      //       console.log(iframe)
      //       console.log(dom)
      //       iframe.contentWindow.focus();
      //       iframe.contentWindow.print();
        };
    }

    componentDidMount() {
        window.ddd=this.onPrint;
        this.dom = ReactDOM.findDOMNode(this).innerHTML;
    }

    componentWillUnmount() {
        document.body.removeChild(this.iframe);
    }

    renderChild = () => {
        const {children, ...restProps} = this.props;
        return React.Children.only(children, child => cloneElement(child, {
            ...restProps,
        }));
    };

    render() {
        return this.renderChild() || null;
    }
}
