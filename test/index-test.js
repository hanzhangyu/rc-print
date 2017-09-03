import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Print from '../src';

describe('Test the Print`s index.js', function () {
    it('test the Print`s in the normal render', function () {
        const component = shallow(
            <Print
                className="test"
                title="this.is a title"
                isIframe={false}
            >
                <div className="content">
                    123
                </div>
            </Print>
        );

        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
        expect(component.hasClass('test')).toBe(false);
        expect(component.find('div').hasClass('content')).toBe(true);
        expect(component.type()).toEqual('div');
        // props
        expect(component.instance().props.insertHead).toEqual(true);
        expect(component.instance().props.bodyStyle).toEqual(false);
        expect(component.instance().props.otherStyle).toEqual(null);
        expect(component.instance().props.isIframe).toEqual(false);
        expect(component.instance().props.iframeStyle)
            .toEqual('position:absolute;width:0px;height:0px;');
        expect(component.instance().props.winStyle).toEqual('toolbar=no,menubar=no');
        expect(component.instance().props.title).toEqual('this.is a title');
        expect(component.instance().props.preventDefault).toEqual(false);
        expect(component.instance().props.lazyRender).toEqual(false);
    });
    it('test the Print`s in the lazy render', function () {
        const component = shallow(
            <Print
                className="test"
                title="this.is a title"
                lazyRender
            >
                <div className="content">
                    123
                </div>
            </Print>
        );

        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(0);
        expect(component.hasClass('test')).toBe(false);
        expect(component.type()).toEqual(null);
    });
});
