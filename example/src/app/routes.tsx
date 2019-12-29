import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { TagPage, NumberPage, EmphasizerPage } from '../pages';

export class Root extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={TagPage} />
                    <Route exact path="/tagcloud" component={TagPage} />
                    <Route exact path="/i2number" component={NumberPage}></Route>
                    <Route exact path="/emphasizer" component={EmphasizerPage}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
