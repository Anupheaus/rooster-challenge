import api from 'axios';
import { injectValidToken } from './injectValidToken';
import { apiRequest } from './apiRequest';
import { IRoosterBalance } from './models';
import { IProfile } from '../../shared/models';

class RoosterApi {

  //#region Variables

  private _balances: IRoosterBalance[];

  //#endregion

  public async getProfiles(): Promise<IProfile[]> {
    await this.updateBalances();
    if (!this._balances) { return []; }
    return this._balances.map(IRoosterBalance.transformToProfile);
  }

  @injectValidToken
  private async updateBalances(token?: string): Promise<void> {
    if (this._balances) { return; }
    this._balances = await apiRequest<IRoosterBalance[]>(api.get, '/balance', token);
  }

}

export const roosterApi = new RoosterApi();
