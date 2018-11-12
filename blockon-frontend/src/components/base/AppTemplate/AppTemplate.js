import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Footer from 'components/base/Footer';
import './AppTemplate.scss';

const AppTemplate = ({ header, children, location }) => {
  return (
    <div className="AppTemplate">
      {header}
      <main
        className={classNames({
          auth: location.pathname.startsWith('/auth')
        })}
      >
        {children}
      </main>
      {location.pathname !== '/search' && <Footer />}
    </div>
  );
};

export default withRouter(AppTemplate);
