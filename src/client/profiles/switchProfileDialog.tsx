import { FunctionComponent, useState } from 'react';
import { useBound } from 'anux-react-utils';
import { IProfile } from '../../shared/models';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { RenderProfile } from './renderProfile';

interface IProps {
  profiles: IProfile[];
  onClose(): void;
  onSelectProfile(id: string): void;
}

export const SwitchProfileDialog: FunctionComponent<IProps> = ({ profiles, onClose, onSelectProfile }) => {
  const [state, setState] = useState({
    isOpen: true,
  });

  const { isOpen } = state;

  const handleClose = useBound(() => {
    setState({ ...state, isOpen: false });
    onClose();
  });

  const handleProfileSelected = useBound((id: string) => {
    onSelectProfile(id);
    handleClose();
  });

  return (
    <Dialog
      className="switch-profile-dialog"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          minWidth: '300px',
          backgroundColor: '#27a6e6',
        },
      }}
    >
      <DialogTitle>Switch Profile</DialogTitle>
      <DialogContent>
        {profiles.map(profile => (
          <RenderProfile key={profile.id} profile={profile} onSelected={handleProfileSelected} />
        ))}
      </DialogContent>
    </Dialog>
  );
};
