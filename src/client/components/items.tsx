import * as React from 'react';
import { Store, bindActionCreators} from 'redux';
import * as ReactRedux from 'react-redux';
import * as reactRouter from 'react-router';
import Helmet from 'react-helmet';

import { fetchUsers } from '../reducers';

class Items extends React.Component<any, any> {
  public static fetchData (store: Store<any>, match: reactRouter.match<any>) {
    return store.dispatch(fetchUsers());
  }

  public constructor () {
    super();
    this.renderItems = this.renderItems.bind(this);
  }

  public componentDidMount () {
    this.props.fetchUsers();
  }

  public render () {
    return (
      <div>
        <Helmet title='Items' />
        {this.props.items.map(this.renderItems)}
      </div>
    );
  }

  private renderItems (item) {
    return (
      <div key={item.id} >
        <span>{item.name}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUsers }, dispatch);
const mapStateToProps = (state) => ({items: state.items});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Items);
