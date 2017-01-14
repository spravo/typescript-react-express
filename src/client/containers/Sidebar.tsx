import React = require('react');

const style = {
    sidebar: {
        width: 200,
        height: '100%',
        background: '#eee',
        position: 'fixed'
    }
}

export default class SidebarContainer extends React.Component<any, void> {
    public render() {
        return (
            <div className='sidebar' style={style.sidebar}>
            </div>
        )
    }
}
