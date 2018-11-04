import React from 'react';
import './Loading.scss';

const Loading = ({ title, subtitle }) => {
  return (
    <div className="Loading">
      <div className="loader" />
      <div className="loadingText">
        <div className="title">{title}</div>
        {subtitle}
      </div>
    </div>
  );
};

export default Loading;
