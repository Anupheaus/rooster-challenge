import { FunctionComponent } from 'react';
import { IBenefit } from '../../shared/models';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import './benefitsList.less';

interface IProps {
  benefits: IBenefit[];
  isActive: boolean;
}

export const BenefitsList: FunctionComponent<IProps> = ({ benefits, isActive }) => {
  return (
    <div className="benefits-list">
      {benefits.map((benefit, index) => (
        <div key={index} className="benefit">
          <div className="benefit-status">{isActive ? <Icon path={mdiCheck} size={1} color="green" /> : <Icon path={mdiClose} size={1} color="red" />}</div>
          <div className="benefit-title">{benefit.title}</div>
        </div>
      ))}
    </div>
  );
};
