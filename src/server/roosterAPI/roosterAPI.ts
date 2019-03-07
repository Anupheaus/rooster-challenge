import { injectValidToken } from './injectValidToken';
import { apiRequest } from './apiRequest';
import { IRoosterBalance } from './models';
import { HttpMethods } from 'anux-exchange';

class RoosterApi {

  public async getBalances(): Promise<IRoosterBalance[]>;
  @injectValidToken
  public async getBalances(token?: string): Promise<IRoosterBalance[]> {
    return apiRequest<IRoosterBalance[]>(HttpMethods.Get, '/balance', token);
  }

  public async boostWallet(id: string, value: number): Promise<void>;
  @injectValidToken
  public async boostWallet(id: string, value: number, token?: string): Promise<void> {
    const balances = await this.getBalances();
    const currentBalance = balances.find(balance => balance.childUsername === id);
    const adjustment = value - currentBalance.walletBalance;
    if (adjustment === 0) { return; }
    await apiRequest(HttpMethods.Post, '/boost', {
      amount: adjustment,
      reason: 'Stars Adjustment',
      username: id,
      location: 'Wallet',
    }, token);
  }

}

export const roosterApi = new RoosterApi();
