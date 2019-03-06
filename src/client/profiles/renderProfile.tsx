import { IProfile } from '../../shared/models';
import { FunctionComponent } from 'react';
import { useBound } from 'anux-react-utils';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import './renderProfile.less';

interface IProps {
  profile: IProfile;
  onSelected(id: string): void;
}

export const RenderProfile: FunctionComponent<IProps> = ({ profile, onSelected }) => {
  const { username, id } = profile;

  const handleClick = useBound(() => onSelected(id));

  return (
    <div className="profile" onClick={handleClick}>
      <Icon path={mdiAccount} size={1}></Icon>
      {username}
    </div>
  );
};
