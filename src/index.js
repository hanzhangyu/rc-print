import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';

export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.onPrint = () => {
            let iframe;
            if (this.iframe) {
                iframe = this.iframe;
            } else {
                iframe = document.createElement('IFRAME');
                this.iframe = iframe;
                iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
                document.body.appendChild(iframe);
                const doc = iframe.contentWindow.document;
                doc.write(this.dom);
                doc.close();
            }
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
    }

    componentDidMount() {
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
