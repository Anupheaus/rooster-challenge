import { FunctionComponent, useState, ReactElement, useMemo } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { useBound } from 'anux-react-utils';
import Icon from '@mdi/react';
import { mdiAccountConvert, mdiWrench } from '@mdi/js';
import { SwitchProfileDialog } from './switchProfileDialog';
import { IProfile } from '../../shared/models';
import { SettingsDialog } from '../settingsDialog';
import './profileMenu.less';

interface IProps {
  profiles: IProfile[];
  isOpen: boolean;
  onClose(): void;
  onSelectProfile(id: string): void;
}

interface IAction {
  title: string;
  icon: ReactElement;
  action(): void;
}

export const ProfileMenu: FunctionComponent<IProps> = ({ profiles, isOpen, onClose, onSelectProfile }) => {
  const [state, setState] = useState({
    isSwitchingProfile: false,
    isShowingSettings: false,
  });

  const { isSwitchingProfile, isShowingSettings } = state;

  const hideProfileDialog = useBound(() => setState({ ...state, isSwitchingProfile: false }));
  const hideSettingsDialog = useBound(() => setState({ ...state, isShowingSettings: false }));

  const handleSelectingProfile = useBound((id: string) => {
    onSelectProfile(id);
    onClose();
  });

  const actions: IAction[] = [
    { title: 'Edit Benefits...', icon: <Icon path={mdiWrench} size={1} />, action: useBound(() => setState({ ...state, isShowingSettings: true })) },
    { title: 'Switch Profile...', icon: <Icon path={mdiAccountConvert} size={1} />, action: useBound(() => setState({ ...state, isSwitchingProfile: true })) },
  ];

  const drawerPaperProps = useMemo(() => ({
    style: {
      minWidth: '300px',
      backgroundColor: '#27a6e6',
    },
  }), []);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="right"
        PaperProps={drawerPaperProps}
      >
        <List className="profile-menu">
          {actions.map(({ title, action, icon }) => (
            <ListItem key={title} button className="profile-menu-item">
              <ListItemText primary={(
                <>
                  <div className="icon">{icon}</div>
                  <div className="title">{title}</div>
                </>
              )} onClick={action} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {isSwitchingProfile ? <SwitchProfileDialog onSelectProfile={handleSelectingProfile} onClose={hideProfileDialog} profiles={profiles} /> : null}
      {isShowingSettings ? <SettingsDialog onClose={hideSettingsDialog} /> : null}
    </>
  );
};
