import React from 'react';
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import drfProvider from 'ra-data-drf';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import MyLayout from './Layout'
import customRoutes from './routes';

import {
  DatasetList,
  DatasetEdit,
  DatasetCreate,
  DatasetIcon,
} from './datasets';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = drfProvider('http://localhost:8080/api', httpClient);
const App = () => (
  <Admin appLayout={MyLayout} customRoutes={customRoutes} dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="space/datasources" options={{ label: 'Sources' }} list={ListGuesser} />
      <Resource
          name="space/datasets"
          options={{ label: 'Datasets' }}
          list={DatasetList}
          edit={DatasetEdit}
          create={DatasetCreate}
          icon={DatasetIcon}
        />
      <Resource name="space/dataengines" options={{ label: 'Engines' }}  list={ListGuesser} />
      <Resource name="space/datainstances" options={{ label: 'Instances' }}  list={ListGuesser} />
  </Admin>
);

export default App;
