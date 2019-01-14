import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification, UPDATE, refreshView } from 'react-admin';
import dataProviderFactory from '../dataProvider';

class ShareButton extends Component {
    handleClick = event => {
        event.stopPropagation();
        const { record, showNotification } = this.props;
        const OP = {...record, public: !record.public };
        dataProviderFactory('space')(UPDATE, 'datasources', { id: record.id, data: OP })
           .then(() => {
                this.props.refreshView();
           })
           .catch((e) => {
               console.error(e);
               showNotification('Error', 'warning')
           });
    }

    render() {
        return <Button variant="contained" color="primary" onClick={this.handleClick} > {this.props.record.public?"Withdraw":'Share'} </Button>;
    }
}

ShareButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification, refreshView
})(ShareButton);