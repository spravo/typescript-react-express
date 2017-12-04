import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import Helmet from 'react-helmet';

interface IProps {
  content?: string;
  store: Redux.Store<any>;
  assets?: any;
  publicPath?: string;
}

export class Html extends React.Component<IProps, {}> {
  public static get defaultProps (): Partial<IProps> {
    return {
      content: '',
      publicPath: '/',
      assets: {},
    };
  }

  public render () {
    const __PRELOADED_STATE__ = JSON.stringify(this.props.store.getState()).replace(/</g, '\\u003c');
    const head = Helmet.rewind();

    return (
      <html lang='en'>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          {this.renderCSS(this.props.assets.app)}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{ __html: this.props.content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__=${__PRELOADED_STATE__};` }}
            charSet='UTF-8'
          />
          {this.renderJS(this.props.assets.vendor)}
          {this.renderJS(this.props.assets.app)}
        </body>
      </html>
    );
  }

  private normalizeAssets (assets: string | string[]) {
    return Array.isArray(assets) ? assets : [ assets ];
  }

  private renderJS (asset: string | string[]) {
    return this.normalizeAssets(asset)
      .filter((path) => _.endsWith(path, '.js'))
      .map((path, key) => <script key={key} type='text/javascript' src={this.props.publicPath + path} />);
  }

  private renderCSS (asset: string | string[]) {
    return this.normalizeAssets(asset)
      .filter((path) => _.endsWith(path, '.css'))
      .map((path, key) => <link key={key} rel='stylesheet' href={this.props.publicPath + path} />);
  }
}

export const DOCTYPE = '<!DOCTYPE html>';
