import React from 'react';
import './AppTemplate.scss';

const AppTemplate = ({ header, children }) => {
  return (
    <div className="AppTemplate">
      {header}
      <main>{children}</main>
    </div>
  );
};

export default AppTemplate;
