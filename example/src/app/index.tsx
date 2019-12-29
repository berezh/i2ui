import React, { Component } from 'react';
import { Root } from './routes';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from '../redux';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

export { App };
