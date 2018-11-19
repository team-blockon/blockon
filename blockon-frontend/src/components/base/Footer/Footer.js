import React from 'react';
import { withRouter } from 'react-router-dom';
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
