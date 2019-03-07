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
