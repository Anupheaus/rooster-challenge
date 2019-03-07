import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useBound } from 'anux-react-utils';
import api from 'axios';
import { ProfilesContext } from './context';
import { IProfilesContext } from './models';
import { DisplayError } from '../error';
import { IProfile } from '../../shared/models';
import { Omit } from 'anux-common';

interface IState extends Omit<IProfilesContext, 'setCurrentProfile' | 'setStars'> {
  error: Error;
}

async function loadProfiles(setState: (value: React.SetStateAction<IState>) => void) {
  const { data: { data: profiles } } = await api.get('/profiles');
  setState(({ currentProfileId, ...restOfState }) => {
    const currentProfile = currentProfileId ? profiles.findById(currentProfileId) : undefined;
    currentProfileId = currentProfile ? currentProfile.id : profiles.length > 0 ? profiles[0].id : undefined;
    return {
      ...restOfState,
      profiles,
      currentProfileId,
    };
  });
}

function storeError(setState: (value: React.SetStateAction<IState>) => void) {
  return (error: Error) => setState(state => ({ ...state, error }));
}

async function saveProfile(profile: IProfile) {
  return api.post('/profiles', profile);
}

function calculateTotalBalance({ charity, goal, savings, wallet }: IProfile['balances']): IProfile['balances'] {
  return {
    charity,
    goal,
    savings,
    wallet,
    total: charity + goal + savings + wallet,
  };
}

function updateStarsInState(stars: number) {
  return (state: IState) => {
    let { profiles, currentProfileId: id } = state;
    if (!profiles) { return state; }
    profiles = profiles.update(profile => profile.id === id, profile => ({ ...profile, balances: calculateTotalBalance({ ...profile.balances, wallet: stars }) }));
    return {
      ...state,
      profiles,
    };
  };
}

export const Provider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<IState>({
    currentProfileId: undefined,
    profiles: undefined,
    error: undefined,
  });

  const { profiles, error, currentProfileId } = state;

  const currentProfile = (profiles || []).findById(currentProfileId);

  const setCurrentProfile = useBound((id: string) => setState(innerState => ({ ...innerState, currentProfileId: id })));

  const setStars = useBound((stars: number) => setState(updateStarsInState(stars)));

  useEffect(() => {
    loadProfiles(setState).catch(storeError(setState));
  }, []);

  const lastProfile = useRef(currentProfile);

  // save changes to the current profile
  useEffect(() => {
    if (currentProfile == null) { return; }
    if (lastProfile.current == null) { lastProfile.current = currentProfile; return; }
    lastProfile.current = currentProfile;
    saveProfile(currentProfile).catch(storeError(setState));
  }, [currentProfile]);

  if (profiles && !error) {
    return (
      <ProfilesContext.Provider value={{ ...state, setCurrentProfile, setStars }}>
        {children || null}
      </ProfilesContext.Provider>
    );
  } else if (!profiles && !error) {
    return (
      <div>loading...</div>
    );
  } else {
    return (
      <DisplayError value={error} />
    );
  }
};
