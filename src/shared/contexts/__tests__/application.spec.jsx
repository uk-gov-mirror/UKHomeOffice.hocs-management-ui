import React from 'react';
import { ApplicationProvider, ApplicationConsumer } from '../application.tsx';
import ActionTypes from '../actions/types.ts';

describe('Application Provider', () => {

    it('should take configuration and add to component state', () => {
        const testConfig = {
            A: 'A',
            B: 'B'
        };
        const wrapper = shallow(<ApplicationProvider config={testConfig} />);
        expect(wrapper.state().A).toEqual('A');
        expect(wrapper.state().B).toEqual('B');
    });

    it('should provide a dispatch method', () => {
        const wrapper = shallow(<ApplicationProvider config={null} />);
        expect(wrapper.state().dispatch).toBeDefined();
        expect(typeof wrapper.state().dispatch).toEqual('function');
    });

});

describe('Application Consumer', () => {

    it('should export the consumer component', () => {
        expect(ApplicationConsumer).toBeDefined();
        expect(typeof ApplicationConsumer).toEqual('object');
    });

});

describe('Application context', () => {

    it('should default when passed an unsupported action', () => {
        const action = { type: 'SOME_UNSUPPORTED_ACTION' };
        const defaultState = {};
        const wrapper = shallow(<ApplicationProvider config={defaultState} />);
        wrapper.state().dispatch(action);
    });

    it('should handle the UNSET_ERROR action', () => {
        const action = {
            type: ActionTypes.UNSET_ERROR
        };
        const defaultState = {
            payload: 'ERROR'
        };
        const wrapper = shallow(<ApplicationProvider config={defaultState} />);
        wrapper.state().dispatch(action);
        expect(wrapper.state().error).toBeUndefined();
    });

    it('should handle the CLEAR_API_STATUS action', () => {
        const action = {
            type: ActionTypes.CLEAR_API_STATUS
        };
        const defaultState = {
            apiStatus: 'TEST_STATUS'
        };
        const wrapper = shallow(<ApplicationProvider config={defaultState} />);
        wrapper.state().dispatch(action);
        expect(wrapper.state().apiStatus).toBeUndefined();
    });

});