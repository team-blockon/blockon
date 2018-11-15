import React from 'react';
import classNames from 'classnames';
import './StepBadge.scss';

const StepBadge = ({ className, children }) => {
  return <span className={classNames('StepBadge', className)}>{children}</span>;
};

export default StepBadge;
