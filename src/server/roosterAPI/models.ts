import { IProfile } from '../../shared/models';

export interface IRoosterBalance {
  childUsername: string;
  charityPotBalance: number;
  goalBalance: number;
  savingsBalance: number;
  totalBalance: number;
  walletBalance: number;
}

export interface IRoosterHeaders {
  'Content-Type': string;
  'x-access-token': string;
}

export namespace IRoosterBalance {

  export function transformToProfile({ childUsername, charityPotBalance, goalBalance, savingsBalance, totalBalance, walletBalance }: IRoosterBalance): IProfile {
    return {
      id: childUsername,
      balances: {
        charity: charityPotBalance,
        goal: goalBalance,
        savings: savingsBalance,
        total: totalBalance,
        wallet: walletBalance,
      },
      username: childUsername,
    };
  }

}
