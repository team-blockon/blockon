import React from 'react';
import InputWithLabel from '../InputWithLabel';
import './InputEmail.scss';

const InputEmail = ({ sendAuthEmail, ...rest }) => {
  return (
    <div className="InputEmail">
      <InputWithLabel {...rest} />
      <button onClick={sendAuthEmail}>인증</button>
    </div>
  );
};

export default InputEmail;
