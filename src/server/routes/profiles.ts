import { Router, routePrefix, route, HttpMethods } from 'anux-exchange';
import { roosterApi } from '../roosterAPI/roosterAPI';

@routePrefix('/profiles')
export class Profiles extends Router {

  @route(HttpMethods.Get, '/')
  public async get() {
    return this.list(await roosterApi.getProfiles());
  }

}
