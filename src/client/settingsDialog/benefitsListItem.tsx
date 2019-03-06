import { FunctionComponent, ChangeEvent } from 'react';
import { IBenefit } from '../../shared/models';
import { Button, TextField } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { Upsertable } from 'anux-common';
import { useBound, useStyle } from 'anux-react-utils';

interface IProps {
  benefit: IBenefit;
  canDelete?: boolean;
  upsert(benefit: Upsertable<IBenefit>);
  onDelete?(): void;
}

export const BenefitsListItem: FunctionComponent<IProps> = ({ benefit: { title, ...rest }, upsert, canDelete = true, onDelete }) => {
  const handleTitleChanged = useBound((event: ChangeEvent) => {
    const changedTitle: string = event.target['value'];
    if (changedTitle == null || changedTitle.length === 0) {
      if (canDelete) { onDelete(); }
    } else {
      upsert({ ...rest, title: changedTitle });
    }
  });
  const handleDelete = useBound(() => onDelete ? onDelete() : void 0);
  const style = useStyle({ visibility: canDelete ? 'visible' : 'hidden' });

  return (
    <div className="benefits-list-item">
      <TextField className="title" defaultValue={title} onBlur={handleTitleChanged} />
      <Button className="delete" onClick={handleDelete} disabled={!canDelete}><Icon path={mdiDelete} size={1} style={style} /></Button>
    </div>
  );
};
