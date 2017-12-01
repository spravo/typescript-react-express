import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';

interface IProps {
  content?: string;
  store: Redux.Store<any>;
  assets?: any;
  publicPath?: string;
}

export class Html extends React.Component<IProps, {}> {
  public static get defaultProps(): Partial<IProps> {
    return {
      content: '',
      publicPath: '/',
      assets: {},
    };
  }

  private normalizeAssets(assets: string | Array<string>) {
    return Array.isArray(assets) ? assets : [ assets ];
  }

  public render() {
    return (
      <html lang="en-us">
        <head>
          <title>Typescript-react-express</title>
            {
              /*this.normalizeAssets(_.values(this.props.assets))
                .filter(path => _.endsWith(path, '.css'))
                .map((path, key) => <link key={key} rel="stylesheet" href={this.props.publicPath + "/" + path} />)*/
            }
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__=${JSON.stringify(this.props.store.getState()).replace(/</g, '\\u003c')};` }} charSet="UTF-8" />
          {
            /*this.normalizeAssets(_.values(this.props.assets))
              .filter(path => _.endsWith(path, '.js'))
              .map((path, key) => <script key={key} type="text/javascript" src={this.props.publicPath + "/" + path} />)*/
          }
          <script type="text/javascript" src={this.props.publicPath + "/" + this.props.assets.vendor} />
          {this.normalizeAssets(this.props.assets.app).map(((path, key) => <script key={key} type="text/javascript" src={this.props.publicPath + "/" + path} />))}
          
        </body>
      </html>
    );
  }
}
