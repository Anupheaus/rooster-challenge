import { IBenefit } from '../../shared/models';
import { Upsertable } from 'anux-common';

export interface IBenefitsContext {
  benefits: IBenefit[];
  upsertBenefit(benefit: Upsertable<IBenefit>): void;
  deleteBenefit(id: string): void;
}

export const BenefitsContext = React.createContext<IBenefitsContext>({
  benefits: [],
  upsertBenefit: undefined,
  deleteBenefit: undefined,
});
