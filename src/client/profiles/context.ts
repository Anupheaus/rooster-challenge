import { IProfilesContext } from './models';

export const ProfilesContext = React.createContext<IProfilesContext>({
  currentProfileId: undefined,
  profiles: [],
  setCurrentProfile: undefined,
  setStars: undefined,
});
