import { FunctionComponent } from 'react';

interface IProps {
  value: Error;
}

export const DisplayError: FunctionComponent<IProps> = ({ value }) => {
  return (
    <div className="error">
      {value.message}
    </div>
  );
};
