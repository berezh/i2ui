import React from 'react';
import './index.scss';
import { Layout } from 'react-html-layout';
import { MainMenu } from '../main-menu';

interface Props {
    children?: React.ReactNode;
    sidebar?: React.ReactNode;
    gitFileUrl?: string;
}

export const MasterPage: React.FC<Props> = (props) => {
    const { children, sidebar, gitFileUrl } = props;
    return (
        <Layout header={<MainMenu />} leftSidebar={sidebar} leftSidebarStyle={{ width: 300 }}>
            <div className="master-page">
                {gitFileUrl ? (
                    <div className="master-page__sub-header">
                        <a href={gitFileUrl} target="_blank" rel="noreferrer">
                            <img src="images\github-32.png"></img>
                            Source Code
                        </a>
                    </div>
                ) : null}
                <div className="master-page__body">{children}</div>
            </div>
        </Layout>
    );
};
