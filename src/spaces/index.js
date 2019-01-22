import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    EditButton,
    List,
    Create,
    SimpleForm,
    RadioButtonGroupInput,
    TextField,
    TextInput,
    CheckboxGroupInput,
    ChipField,
    DateField,
    ReferenceArrayInput,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    Filter,
    BooleanField
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Cloud';
import StartButton from './StartButton';

export const SpaceIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

const SpaceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const SpaceList = withStyles(listStyles)(({ classes, ...props }) => (
    <List title="Data Spaces" {...props} sort={{ field: 'name', order: 'ASC' }} filters={<SpaceFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField label="Enabled" source="enabled" />
            <TextField source="owner" />
            <DateField source="created_time" />
            <TextField source="remark" />
            <TextField source="status" />
            <StartButton label="Operation" />
        </Datagrid>
    </List>
));

const Title = translate(({ record, translate }) => (
    <span>
        {translate('resources.space.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const SpaceEdit = props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextField source="name" />
            <TextInput source="remark" />
            <BooleanField label="Enabled" source="enabled" />
            <TextField source="owner" />
            <DateField source="created_time" />
            <TextField source="remark" />
            <TextField source="status" />
        </SimpleForm>
    </Edit>
);

export const SpaceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" required />
            <ReferenceArrayInput label="Data Engines" source="engines" reference="dataengines">
                <CheckboxGroupInput optionText="name" optionValue="id" required />
            </ReferenceArrayInput>
            <ReferenceInput label="Cluster Blueprint" source="cluster_blueprint" reference="../cloud_adaptor/clusterblueprints">
                <SelectInput optionText="name" optionValue="id" required/>
            </ReferenceInput>
            <TextInput source="remark" />
        </SimpleForm>
    </Create>
);