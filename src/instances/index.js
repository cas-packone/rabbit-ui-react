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
    DateField,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    Filter,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import StartButton from './StartButton'

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

const InstanceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput source="space" reference="spaces" alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="dataset" reference="datasets" alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="engine" reference="dataengines" alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const InstanceList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<InstanceFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="owner" />
            <ReferenceField source="space" reference="spaces">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="dataset" reference="datasets" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="engine" reference="dataengines" >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="uri_elected" />
            <TextField source="remark" />
            <DateField source="created_time" />
            <NumberField source="status_name" />
            <StartButton label="Operation" />
        </Datagrid>
    </List>
));

const InstanceTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.instance.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const InstanceEdit = props => (
    <Edit title={<InstanceTitle />} {...props}>
        <SimpleForm>
            <TextField source="name" />
            <TextInput source="remark" />
        </SimpleForm>
    </Edit>
);

export const InstanceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" required />
            <ReferenceInput source="space" reference="spaces" required >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="dataset" reference="datasets" required >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="engine" reference="dataengines" required >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="uri_suffix" required />
            <TextInput source="remark" />
        </SimpleForm>
    </Create>
);