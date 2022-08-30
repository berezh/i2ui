import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { CounterPage } from '../units/counter/pages';

export class Root extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={CounterPage} />
                    {/* <Route exact path="/tagcloud" component={TagPage} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}
