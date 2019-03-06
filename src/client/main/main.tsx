import { FunctionComponent } from 'react';
import { Stars } from './stars';
import { Profiles } from '../profiles';
import { Benefits } from '../benefits';
import { BenefitsList } from './benefitsList';

export const Main: FunctionComponent = () => {

  return (
    <Benefits.Consumer>
      {({ benefits }) => (
        <Profiles.Current>
          {({ setStars, balances: { wallet } }) => (
            <Stars numberOfStars={wallet} onSelected={setStars}>
              {(star, isActive) => (<BenefitsList benefits={benefits.filter(benefit => benefit.numberOfStars === star)} isActive={isActive} />)}
            </Stars>
          )}
        </Profiles.Current>
      )}
    </Benefits.Consumer>
  );
};
