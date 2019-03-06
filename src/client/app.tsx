import { FunctionComponent } from 'react';
import { Profiles } from './profiles';
import { TitleBar } from './titleBar';
import { Benefits } from './benefits';
import { Main } from './main';

export const App: FunctionComponent = () => {
  return (
    <Profiles.Provider>
      <Benefits.Provider>
        <TitleBar />
        <Main />
      </Benefits.Provider>
    </Profiles.Provider>
  );
};
