import { FunctionComponent, ReactElement } from 'react';
import { IBenefitsContext, BenefitsContext } from './context';

interface IProps {
  numberOfStars?: number;
  children(benefits: IBenefitsContext): ReactElement;
}

export const Consumer: FunctionComponent<IProps> = ({ numberOfStars, children }) => {
  return (
    <BenefitsContext.Consumer>
      {({ benefits, ...rest }) => children({
        benefits: benefits.filter(item => numberOfStars == null || item.numberOfStars === numberOfStars),
        ...rest,
      })}
    </BenefitsContext.Consumer>
  );
};
