import { Router, route, HttpMethods } from 'anux-exchange';

export class Default extends Router {

  @route(HttpMethods.Get, '/')
  public get() {
    return this.view('index', { title: 'RoosterMoney Coding Challenge' });
  }

}
