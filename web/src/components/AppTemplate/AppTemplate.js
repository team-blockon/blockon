import React from 'react';
import Footer from 'components/Footer';
import './AppTemplate.scss';

const AppTemplate = ({ header, children }) => {
  return (
    <div className="AppTemplate">
      {header}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppTemplate;
