import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification, CREATE, refreshView } from 'react-admin';
import dataProviderFactory from '../dataProvider';

class StartButton extends Component {
    state = {
        operation: this.props.record.status_name==='running'? 'stop':"start",
        disabled: false,
    }
    handleClick = event => {
        event.stopPropagation();
        const { record, showNotification } = this.props;
        const startOP = { instance: record.id, operation: this.state.operation};
        this.setState({operation: this.state.operation+"ing"});
        this.setState({disabled: true});
        dataProviderFactory('space')(CREATE, 'datainstanceoperations', { data: startOP })
           .then(() => {
               showNotification('Instance started');
               this.props.refreshView();
           })
           .catch((e) => {
               console.error(e);
               showNotification('Error: Instance not started', 'warning')
           });
    }

    render() {
        return <Button variant="contained" color="primary" onClick={this.handleClick} disabled= {this.state.disabled} > {this.state.operation} </Button>;
    }
}

StartButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification, refreshView
})(StartButton);