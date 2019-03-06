import { FunctionComponent } from 'react';
import './benefitsList.less';
import { Benefits } from '../benefits';
import { BenefitsListItem } from './benefitsListItem';
import { IBenefit } from '../../shared/models';

interface IProps {
  stars: number;
}

export const BenefitsList: FunctionComponent<IProps> = ({ stars }) => {
  const createBenefit = (): IBenefit => ({
    id: Math.uniqueId(),
    title: '',
    numberOfStars: stars,
  });

  return (
    <Benefits.Consumer numberOfStars={stars}>
      {({ benefits, upsertBenefit, deleteBenefit }) => {
        const newBenefit = createBenefit();
        return (
          <div className="settings-dialog-benefits">
            {benefits.map(benefit => (
              <BenefitsListItem
                key={benefit.id}
                benefit={benefit}
                upsert={upsertBenefit}
                onDelete={() => deleteBenefit(benefit.id)}
              />
            ))}
            <BenefitsListItem
              key={newBenefit.id}
              benefit={newBenefit}
              upsert={upsertBenefit}
              canDelete={false}
            />
          </div>
        );
      }}
    </Benefits.Consumer>
  );
};
