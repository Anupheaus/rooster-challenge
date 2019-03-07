import { Router, routePrefix, route, HttpMethods, fromBody } from 'anux-exchange';
import { roosterApi } from '../roosterAPI/roosterAPI';
import { IProfile } from '../../shared/models';

@routePrefix('/profiles')
export class Profiles extends Router {

  @route(HttpMethods.Get, '/')
  public async get() {
    const balances = await roosterApi.getBalances();
    return this.list(balances.map(IProfile.fromBalance));
  }

  @route(HttpMethods.Post, '/')
  public async save(@fromBody { id, balances: { wallet: value } }: IProfile) {
    // simply boost the wallet value with the new wallet balance
    await roosterApi.boostWallet(id, value);
    return this.ok();
  }

}
