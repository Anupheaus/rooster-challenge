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
