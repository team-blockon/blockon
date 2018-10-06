import React from 'react';
import { withRouter } from 'react-router-dom';
import Footer from 'components/base/Footer';
import './AppTemplate.scss';

const AppTemplate = ({ header, children, location }) => {
  return (
    <div className="AppTemplate">
      {header}
      <main>{children}</main>
      {location.pathname !== '/search' && <Footer />}
    </div>
  );
};

export default withRouter(AppTemplate);
