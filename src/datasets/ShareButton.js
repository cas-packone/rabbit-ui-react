import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification, UPDATE } from 'react-admin';
import { push } from 'react-router-redux';
import dataProviderFactory from '../dataProvider';

class ShareButton extends Component {
    state = {
        label: this.props.record.public?"Withdraw":'Share',
    }
    handleClick = event => {
        event.stopPropagation();
        const { push, record, showNotification } = this.props;
        const OP = {...record, public: !record.public };
        dataProviderFactory('space')(UPDATE, 'datasets', { id: record.id, data: OP })
           .then(() => {
                push('/datasets');
           })
           .catch((e) => {
               console.error(e);
               showNotification('Error', 'warning')
           });
    }

    render() {
        return <Button variant="contained" color="primary" onClick={this.handleClick} > {this.state.label} </Button>;
    }
}

ShareButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(ShareButton);