import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import logo from 'static/images/logo-footer.png';
import './Footer.scss';

const Footer = ({ location }) => {
  return (
    <footer>
      <div className="copyright">
        Copyright &copy; BLOCKON. All rights reserved.
      </div>
    </footer>
  );
};

export default withRouter(Footer);
