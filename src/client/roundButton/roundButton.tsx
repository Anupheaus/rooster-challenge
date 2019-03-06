import { FunctionComponent } from 'react';
import { useClasses, useStyle, useBound } from 'anux-react-utils';
import './roundButton.less';

interface IProps {
  label?: string;
  className?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  onClick?(): void;
}

export const RoundButton: FunctionComponent<IProps> = ({ children, label, onClick, className, size = 70, backgroundColor = '#FFFFFF40', color = 'white' }) => {
  const style = useStyle({
    '--size': size,
    '--backgroundColor': backgroundColor,
    '--color': color,
  });
  className = useClasses(['round-button', className, onClick ? 'has-click-handler' : undefined]);

  const handleClick = useBound(() => {
    if (onClick) { onClick(); }
  });

  return (
    <div className={className} style={style} onClick={handleClick}>
      {label ? <div className="label">{label}</div> : null}
      <div className="content">{children == null ? null : children}</div>
    </div>
  );
};
