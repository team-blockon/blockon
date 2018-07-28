import React from "react";
import "./InputWithLabel.scss";

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <div class="InputWithLabel">
      <div class="label">{label}</div>
      <input {...rest} />
    </div>
  );
};

export default InputWithLabel;
