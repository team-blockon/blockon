import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import CoverSection from '../CoverSection';
import BlockonSection from '../BlockonSection';
import AppSection from '../AppSection';

class LandingTemplate extends Component {
  render() {
    return (
      <Fragment>
        <CoverSection />
        <BlockonSection />
        <AppSection />
      </Fragment>
    );
  }
}

export default withRouter(LandingTemplate);
