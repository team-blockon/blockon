import React, {Fragment} from 'react';
import './InputWithLabel.scss';

const InputWithLabel = ({ label, sendAuthEmail, ...rest }) => {
  let inputContainer;
  if (label==="이메일")
    inputContainer =
      <Fragment>
        <input className="inputWithBtn" {...rest} />
        <button onClick={sendAuthEmail}>인증</button>
      </Fragment>;
  else
    inputContainer = <input {...rest} />;

  return (
    <div className="InputWithLabel">
      <div className="label">{label}</div>
      <div className="inputContainer">{inputContainer}</div>
    </div>
  );
};

export default InputWithLabel;
