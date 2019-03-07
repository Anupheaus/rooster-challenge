import 'anux-common';
import { App } from './app';
import './index.less';

window.onload = () => {

  const page = document.querySelectorAll('page').item(0);
  if (!page) { throw new Error('Unable to find the page element to render this app into.'); }

  ReactDOM.render(
    <App />,
    page,
  );

};
