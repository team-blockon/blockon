import React from 'react';
import './InputWithLabel.scss';

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <div className="InputWithLabel auth">
      <div className="label">{label}</div>
      <input {...rest} />
    </div>
  );
};

export default InputWithLabel;
