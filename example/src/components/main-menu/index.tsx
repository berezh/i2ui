import React from 'react';
import './index.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';

type Props = RouteComponentProps;

export const Component: React.FC<Props> = (props) => {
    const {
        match: { path },
    } = props;
    const key = (path || '').replace(/[^a-z0-9]/gi, '');
    return (
        <div className="main-menu">
            <Link
                to="/tagcloud"
                className={classNames({
                    x: key === 'tagcloud',
                })}
            >
                TagCloud
            </Link>
            <Link
                to="/i2number"
                className={classNames({
                    x: key === 'i2number',
                })}
            >
                I2Number
            </Link>
            <Link
                to="/emphasizer"
                className={classNames({
                    x: key === 'emphasizer',
                })}
            >
                Emphasizer
            </Link>
        </div>
    );
};

export const MainMenu = withRouter(Component);
