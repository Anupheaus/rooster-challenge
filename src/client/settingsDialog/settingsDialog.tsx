import { FunctionComponent, useState, useMemo, ChangeEvent, ReactElement } from 'react';
import { useBound } from 'anux-react-utils';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, DialogActions, Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import './settingsDialog.less';
import { BenefitsList } from './benefitsList';

interface IProps {
  onClose(): void;
}

interface ITab {
  id: number;
  formation(addStars: (count: number) => ReactElement): ReactElement;
}

export const SettingsDialog: FunctionComponent<IProps> = ({ onClose }) => {
  const [state, setState] = useState({
    isOpen: true,
    currentTabId: 1,
  });

  const { isOpen, currentTabId } = state;

  const handleClose = useBound(() => {
    setState({ ...state, isOpen: false });
    onClose();
  });

  const tabs = useMemo<ITab[]>(() => [
    { id: 1, formation: addStars => addStars(1) },
    { id: 2, formation: addStars => addStars(2) },
    { id: 3, formation: addStars => <>{addStars(1)}<br />{addStars(2)}</> },
    { id: 4, formation: addStars => <>{addStars(2)}<br />{addStars(2)}</> },
    { id: 5, formation: addStars => <>{addStars(2)}<br />{addStars(3)}</> },
  ], []);

  const handleTabChanged = useBound((_event: ChangeEvent, value: number) => setState({ ...state, currentTabId: value }));

  return (
    <Dialog
      className="settings-dialog"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          minWidth: '400px',
          backgroundColor: '#27a6e6',
        },
      }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Tabs className="settings-dialog-tabs" value={currentTabId} onChange={handleTabChanged} variant="fullWidth">
          {tabs.map(({ id, formation }) => (
            <Tab key={id} className="settings-dialog-tab" value={id} icon={
              <div className="stars">
                {formation(count => <>{Array.ofSize(count).map((_ignore, index) => (
                  <Icon
                    key={index}
                    path={mdiStar}
                    size={1}
                    color="rgb(252, 204, 0)"
                  />
                ))}</>)}
              </div>
            } />
          ))}
        </Tabs>
        <BenefitsList stars={currentTabId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
