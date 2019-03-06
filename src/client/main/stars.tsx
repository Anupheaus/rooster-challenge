import { FunctionComponent, ReactElement } from 'react';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import './stars.less';

interface IProps {
  numberOfStars: number;
  onSelected(star: number): void;
  children(star: number, isActive: boolean): ReactElement;
}

function renderStar(numberOfStars: number, currentStar: number, selectStar: () => void, children: (star: number, isActive: boolean) => ReactElement) {
  const isActive = numberOfStars >= currentStar;

  return (
    <div key={currentStar} className="star">
      <a onClick={selectStar}>
        <Icon path={mdiStar} color={isActive ? '#fccc00' : '#0000003d'} size={7} />
      </a>
      <div className="star-benefits">
        {children(currentStar, isActive)}
      </div>
    </div>
  );
}

export const Stars: FunctionComponent<IProps> = ({ numberOfStars, onSelected, children }) => {

  return (
    <div className="stars-container">
      {Array.ofSize(5).map((_ignore, index) => renderStar(numberOfStars, index + 1, () => onSelected(index + 1), children))}
    </div>
  );
};
