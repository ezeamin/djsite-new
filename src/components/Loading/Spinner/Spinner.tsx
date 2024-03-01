import './Spinner.styles.css';

import type { SpinnerProps } from './Spinner.types';

const Spinner = (props: SpinnerProps): JSX.Element => {
  const { useTheme = false } = props;

  let className = 'bg-white';
  if (useTheme) className = 'dark:bg-white bg-gray-800';

  return (
    <div className="sk-cube-grid">
      <div className={`sk-cube sk-cube1 ${className}`} />
      <div className={`sk-cube sk-cube2 ${className}`} />
      <div className={`sk-cube sk-cube3 ${className}`} />
      <div className={`sk-cube sk-cube4 ${className}`} />
      <div className={`sk-cube sk-cube5 ${className}`} />
      <div className={`sk-cube sk-cube6 ${className}`} />
      <div className={`sk-cube sk-cube7 ${className}`} />
      <div className={`sk-cube sk-cube8 ${className}`} />
      <div className={`sk-cube sk-cube9 ${className}`} />
    </div>
  );
};
export default Spinner;
