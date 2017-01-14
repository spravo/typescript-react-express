import React = require('react');

export class EmptyComponent extends React.Component<void, any> {
    public state = {};

    public componentDidMount() {
        console.log('EmptyComponent. props: [%o], state: [%o]', this.props, this.state);
    }

    public render() {
        return (
            <div>EmptyComponent</div>
        );
    }
}

export class NotFoundComponent extends EmptyComponent {
    public render() {
        return (
            <div className='text-center'>
                <h2>404 Page is not found</h2>
                <h3>Looks like something went wrong!</h3>
                <h4>We track these errors automatically, but if the problem persists feel free to contact us. In the meantime, try refreshing.</h4>
            </div>
        )
    }
}
