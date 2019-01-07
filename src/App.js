import React from 'react';
import './App.css';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { Dashboard } from './dashboard';
import authProvider from './authProvider';
import dataProviderFactory from './dataProvider';
import MyLayout from './Layout'
import customRoutes from './routes';

import {
  DatasetList,
  DatasetEdit,
  DatasetCreate,
  DatasetIcon,
} from './datasets';

const App = () => (
  <Admin appLayout={MyLayout} customRoutes={customRoutes} dashboard={Dashboard} dataProvider={dataProviderFactory('space')} authProvider={authProvider}>
      <Resource name="spaces" options={{ label: 'Spaces' }} list={ListGuesser} />
      <Resource name="datasources" options={{ label: 'Sources' }} list={ListGuesser} />
      <Resource
          name="datasets"
          options={{ label: 'Datasets' }}
          list={DatasetList}
          edit={DatasetEdit}
          create={DatasetCreate}
          icon={DatasetIcon}
        />
      <Resource name="datainstances" options={{ label: 'Instances' }}  list={ListGuesser} />
  </Admin>
);

export default App;
