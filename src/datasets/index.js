import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    EditButton,
    List,
    Create,
    SimpleForm,
    TextField,
    TextInput,
    NumberField,
    ChipField,
    DateField,
    ReferenceField,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    Filter,
    NullableBooleanInput
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';

export const DatasetIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

const DatasetFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput source="source" reference="space/datasources" alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <NullableBooleanInput label="Public" source="public" alwaysOn />
    </Filter>
);

export const DatasetList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }} filters={<DatasetFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="source" reference="space/datasources">
                <TextField source="name" />
            </ReferenceField>
            <TextField style={{maxWidth:"8em", overflow: "hidden", textOverflow: 'ellipsis'}} source="uri" />
            <ChipField label="Type" source="type_name" />
            <NumberField label="Size (M)" source="size" />
            <TextField source="owner" />
            <DateField source="modified_time" />
            <TextField source="remark" />
            <EditButton />
        </Datagrid>
    </List>
));

const DatasetTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.dataset.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const DatasetEdit = props => (
    <Edit title={<DatasetTitle />} {...props}>
        <SimpleForm>
            <TextField source="name" />
            <LongTextInput source="description" />
            <TextInput source="remark" />
        </SimpleForm>
    </Edit>
);

export const DatasetCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="source" reference="space/datasources">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" required />
            <TextInput source="uri" required />
            <TextInput source="type" required />
            <TextInput source="size" required />
            <LongTextInput source="description" required />
            <LongTextInput source="remedy_script" />
            <TextInput source="remark" />
        </SimpleForm>
    </Create>
);