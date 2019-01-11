import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
    fetchEnd,
    fetchStart,
    showNotification,
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    SelectInput,
    LongTextInput,
    ReferenceInput,
    CREATE,
    REDUX_FORM_NAME
} from 'react-admin';
import { push } from 'react-router-redux';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import dataProvider from '../dataProvider';

class LoadButton extends Component {
    state = {
        error: false,
        showDialog: false,
        dataset: {}
    };

    handleClick = event => {
        event.stopPropagation();
        this.setState({ showDialog: true });
        this.setState({ dataset: this.props.record });
    };
    
    handleFormClick = event => {
        event.stopPropagation();
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        const { submit } = this.props;

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit('dataset-load');
    };

    handleSubmit = values => {
        const { push, change, fetchStart, fetchEnd, showNotification } = this.props;

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider('space')(CREATE, 'datainstances', { data: {...values, dataset: this.state.dataset.id} })
            .then(({ data }) => {
                // Update the main react-admin form (in this case, the comments creation form)
                change(REDUX_FORM_NAME, 'datainstance_id', data.id);
                this.setState({ showDialog: false });
                push('/datainstances');
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                fetchEnd();
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting } = this.props;

        return (
            <Fragment>
                <Button onClick={this.handleClick} label="ra.action.load" 
                    variant="contained" color="primary">
                    <IconContentAdd />
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClick={this.handleFormClick}
                    onClose={this.handleCloseClick}
                    aria-label="Load dataset"
                >
                    <DialogTitle>Create data instance: Load dataset {this.state.dataset.name} into data engine</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="dataset-load"
                            resource="datainstances"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            onClick={this.handleFormClick}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >
                            <TextInput source="name" required />
                            <ReferenceInput source="space" reference="spaces" required >
                                <SelectInput optionText="name" />
                            </ReferenceInput>
                            <ReferenceInput source="engine" reference="dataengines" required >
                                <SelectInput optionText="name" />
                            </ReferenceInput>
                            <TextInput source="uri_suffix" label="Suffix of the final uri" required />
                            <LongTextInput
                                source="remedy_script"
                            />
                            <TextInput source="remark" />
                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            saving={isSubmitting}
                            onClick={this.handleSaveClick}
                        />
                        <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('dataset-load')(state)
});

const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit
};

export default connect(mapStateToProps, mapDispatchToProps, push)(
    LoadButton
);