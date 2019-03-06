import { FunctionComponent, ReactElement, useState } from 'react';
import { useBound } from 'anux-react-utils';
import { IProfile } from '../../shared/models';
import { ProfilesContext } from './context';
import { ProfileMenu } from './profileMenu';

interface ICurrentChildrenType extends IProfile {
  showProfileMenu(): void;
  setStars(stars: number): void;
}

interface IProps {
  children(profile: ICurrentChildrenType): ReactElement;
}

export const Current: FunctionComponent<IProps> = ({ children }) => {
  const [{ isShowingProfileMenu }, setState] = useState({
    isShowingProfileMenu: false,
  });

  const showProfileMenu = useBound(() => setState({ isShowingProfileMenu: true }));
  const hideProfileMenu = useBound(() => setState({ isShowingProfileMenu: false }));

  return (
    <ProfilesContext.Consumer>
      {({ currentProfileId, profiles, setCurrentProfile, setStars }) => (
        <>
          {children({ ...profiles.findById(currentProfileId), showProfileMenu, setStars })}
          <ProfileMenu profiles={profiles} isOpen={isShowingProfileMenu} onClose={hideProfileMenu} onSelectProfile={setCurrentProfile} />
        </>
      )}
    </ProfilesContext.Consumer>
  );
};
