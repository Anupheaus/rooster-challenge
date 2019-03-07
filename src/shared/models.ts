import { IRoosterBalance } from '../server/roosterAPI/models';

export interface IProfile {
  id: string;
  username: string;
  balances: {
    charity: number;
    goal: number;
    savings: number;
    total: number;
    wallet: number;
  };
}

export interface IBenefit {
  id: string;
  title: string;
  numberOfStars: number;
}

export namespace IProfile {

  export function fromBalance({ childUsername, charityPotBalance, goalBalance, savingsBalance, totalBalance, walletBalance }: IRoosterBalance): IProfile {
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

  export function formatName(name: string): string {
    return name.replace(/\d/gi, '');
  }

}
