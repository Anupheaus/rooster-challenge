import { FunctionComponent } from 'react';
import './titleBar.less';
import { Profiles } from '../profiles';
import { RoundButton } from '../roundButton';
import Icon from '@mdi/react';
import { mdiSettings } from '@mdi/js';

function formatCurrency(value: number): string {
  return `£${value.toFixed(2)}`;
}

export const TitleBar: FunctionComponent = () => {
  return (
    <div className="title-bar">
      <Profiles.Current>
        {({ username, balances: { charity, goal, savings, total, wallet }, showProfileMenu }) => (
          <>
            <div className="username-container">
              <div>Reward Chart For</div>
              <div className="username">{username}</div>
            </div>
            <div className="buttons">
              <RoundButton className="charity-balance" size={90} backgroundColor={'rgb(49, 103, 160)'} label="Charity">{formatCurrency(charity)}</RoundButton>
              <RoundButton className="goal-balance" size={95} backgroundColor={'rgb(221, 79, 106)'} label="Goals">{formatCurrency(goal)}</RoundButton>
              <RoundButton className="savings-balance" size={90} backgroundColor={'rgb(252, 204, 0)'} label="Savings" color="black">{formatCurrency(savings)}</RoundButton>
              <RoundButton className="total-balance" size={100} backgroundColor={'rgb(49, 103, 160)'} label="Total">{formatCurrency(total)}</RoundButton>
              <RoundButton className="wallet-balance" size={95} backgroundColor={'rgb(109, 203, 223)'} label="Wallet" color="black">{formatCurrency(wallet)}</RoundButton>
              <RoundButton className="switch-user" size={120} backgroundColor={'rgb(252, 204, 0)'} onClick={showProfileMenu}>
                <Icon className="switch-user" path={mdiSettings} size={4} color="rgba(0, 0, 0, 0.4)" />
              </RoundButton>
              <RoundButton className="extra-1" size={90} backgroundColor={'rgba(221, 79, 106, 0.3)'} />
              <RoundButton className="extra-2" size={100} backgroundColor={'rgba(109, 203, 223, 0.4)'} />
              <RoundButton className="extra-3" size={70} backgroundColor={'rgba(49, 103, 160, 0.3)'} />
            </div>
          </>
        )}
      </Profiles.Current>
    </div>
  );
};
