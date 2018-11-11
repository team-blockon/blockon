import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import * as MapAPI from 'lib/api/map';

import CoverSection from '../CoverSection';
import BlockonSection from '../BlockonSection';
import AppSection from '../AppSection';


const searchResult = value => {
    return new Promise((resolve, reject) => {
        MapAPI.getSubways(value).then(res => {
            const subways = res.data.documents;
            resolve(subways.map(document => document.place_name));
        });
    });
};

class LandingTemplate extends Component {
    state = {
        dataSource: [],
        agent: ''
    };

    handleSearch = async value => {
        const subways = await searchResult(value);

        if (subways.length > 0) {
            this.setState({ dataSource: subways });
        }
    };

    handlePressEnter = event => {
        const { history } = this.props;
        history.push(`/search?q=${event.target.value}`);
    };

    render() {
        const { dataSource, agent } = this.state;

        return(
            <Fragment>
                <CoverSection
                    dataSource={dataSource}
                    agent={agent}
                    handleSearch={this.handleSearch}
                    handlePressEnter={this.handlePressEnter}
                />
                <BlockonSection />
                <AppSection />
            </Fragment>
        )
    }
}

export default withRouter(LandingTemplate);