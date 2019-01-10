import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification, CREATE } from 'react-admin';
import { push } from 'react-router-redux';
import dataProviderFactory from '../dataProvider';

class StartButton extends Component {
    state = {
        label: 'Start',
        disabled: false,
    }
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const startOP = { packone: record.packone, operation: 'start' };
        this.setState({label: 'Starting'});
        this.setState({disabled: true});
        dataProviderFactory('packone')(CREATE, 'packoneoperations', { data: startOP })
           .then(() => {
               showNotification('Space started');
               push('/spaces');
               this.setState({label: 'Started'});
           })
           .catch((e) => {
               console.error(e);
               showNotification('Error: Space not started', 'warning')
           });
    }

    render() {
        return <Button variant="contained" color="primary" onClick={this.handleClick} disabled= {this.state.disabled} > {this.state.label} </Button>;
    }
}

StartButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(StartButton);