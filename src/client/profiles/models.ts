import { IProfile } from '../../shared/models';

export interface IProfilesContext {
  currentProfileId: string;
  profiles: IProfile[];
  setCurrentProfile(id: string): void;
  setStars(star: number): void;
}
