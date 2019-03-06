import * as ReactObj from 'react';
import * as ReactDOMObj from 'react-dom';

declare global {
  // @ts-ignore
  const React: typeof ReactObj;
  // @ts-ignore
  const ReactDOM: typeof ReactDOMObj;
}
