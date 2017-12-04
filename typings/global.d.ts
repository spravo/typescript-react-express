
interface NodeModule {
  hot: {
    accept: Function;
  };
}

interface IGlobalVar {
  __CLIENT__: boolean;
  __SERVER__: boolean;
  __DEV__: boolean;
  __TEST__: boolean;
}

declare namespace NodeJS {
  interface Global extends IGlobalVar {  }
}

interface Window extends IGlobalVar {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  __PRELOADED_STATE__: any;
}
