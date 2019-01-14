import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    List,
    Create,
    SimpleForm,
    TextField,
    TextInput,
    NumberField,
    NumberInput,
    DateField,
    LongTextInput,
    Filter,
    NullableBooleanInput
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/FormatColorFill';
import ShareButton from './ShareButton'

export const SourceIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

const SourceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <NullableBooleanInput label="Public" source="public" alwaysOn />
    </Filter>
);

export const SourceList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<SourceFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField style={{maxWidth:"8em", overflow: "hidden", textOverflow: 'ellipsis'}} source="uri" />
            <NumberField source="sync_interval" />
            <TextField source="owner" />
            <TextField source="description" />
            <TextField source="remark" />
            <DateField source="modified_time" />
            <ShareButton label="Operation" />
        </Datagrid>
    </List>
));

const SourceTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.datasource.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const SourceEdit = props => (
    <Edit title={<SourceTitle />} {...props}>
        <SimpleForm>
            <TextField source="name" />
            <LongTextInput source="description" required />
            <LongTextInput source="remedy_script" />
            <NumberInput source="sync_interval" required />
            <TextInput source="remark" />
        </SimpleForm>
    </Edit>
);

export const SourceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" required />
            <TextInput source="uri" required />
            <LongTextInput source="description" required />
            <LongTextInput source="remedy_script" />
            <NumberInput source="sync_interval" required/>
            <TextInput source="remark" />
        </SimpleForm>
    </Create>
);