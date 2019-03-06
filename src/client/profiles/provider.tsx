import { FunctionComponent, useState, useEffect } from 'react';
import { useBound } from 'anux-react-utils';
import { ProfilesContext } from './context';
import { IProfilesContext } from './models';
import api from 'axios';
import { DisplayError } from '../error';
import { IProfile } from '../../shared/models';
import { IListResponse } from 'anux-exchange';
import { Omit } from 'anux-common';

interface IState extends Omit<IProfilesContext, 'setCurrentProfile' | 'setStars'> {
  error: Error;
}

async function loadProfiles({ currentProfileId, ...restOfState }: IState, setState: (value: React.SetStateAction<IState>) => void): Promise<void> {
  const { data: { data: profiles } } = await api.get<IListResponse<IProfile>>('/profiles');
  const currentProfile = currentProfileId ? profiles.findById(currentProfileId) : undefined;
  currentProfileId = currentProfile ? currentProfile.id : profiles.length > 0 ? profiles[0].id : undefined;
  setState({ ...restOfState, currentProfileId, profiles });
}

function updateStarsInState(stars: number) {
  return (state: IState) => {
    let { profiles, currentProfileId: id } = state;
    profiles = profiles.update(profile => profile.id === id, profile => ({ ...profile, balances: { ...profile.balances, wallet: stars } }));
    return {
      ...state,
      profiles,
    };
  };
}

export const Provider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<IState>({
    currentProfileId: undefined,
    profiles: [],
    error: undefined,
  });

  const { profiles, error } = state;

  const setCurrentProfile = useBound((id: string) => setState(innerState => ({ ...innerState, currentProfileId: id })));

  const setStars = useBound((stars: number) => setState(updateStarsInState(stars)));

  useEffect(() => {
    loadProfiles(state, setState).catch((e: Error) => setState({ ...state, error: e }));
  }, []);

  if (profiles.length > 0 && !error) {
    return (
      <ProfilesContext.Provider value={{ ...state, setCurrentProfile, setStars }}>
        {children || null}
      </ProfilesContext.Provider>
    );
  } else if (profiles.length === 0 && !error) {
    return (
      <div>loading...</div>
    );
  } else {
    return (
      <DisplayError value={error} />
    );
  }
};
