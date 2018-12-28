import React from 'react';
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import drfProvider from 'ra-data-drf';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import MyLayout from './Layout';

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
  <Admin appLayout={MyLayout}  dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="space/datasources" list={ListGuesser} />
      <Resource name="space/datasets" list={ListGuesser} />
      <Resource name="space/dataengines" list={ListGuesser} />
      <Resource name="space/datainstances" list={ListGuesser} />
      <Resource name="space/spaces" list={ListGuesser} />
      <Resource name="user/profiles" list={ListGuesser} />
  </Admin>
);

export default App;
