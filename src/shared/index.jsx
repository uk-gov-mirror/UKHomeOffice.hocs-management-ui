import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    render() {
        return 'hello world';
    }
}

App.propTypes = {
    config: PropTypes.object.isRequired
};

App.defaultProps = {
    config: {
        layout: {
            header: {},
            body: {},
            footer: {}
        }
    }
};

export default App;