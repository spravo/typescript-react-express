import React = require('react');
import { Router } from 'react-router';

import Sidebar from './Sidebar';

interface IContext {
    router?: History;
}

export default class AppContainer extends React.Component<any, void> implements React.ChildContextProvider<IContext> {
    public getChildContext() {
        return {
            router: this.props.router
        };
    }

    public static childContextTypes = {
        router: React.PropTypes.object
    };

    public render() {
        return (
            <div>
                <div>
                    <Sidebar />
                </div>
                {this.props.children}
            </div>
        )
    }
}
