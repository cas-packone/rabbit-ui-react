import React from 'react';
import './App.css';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import { Dashboard } from './dashboard';
import authProvider from './authProvider';
import dataProviderFactory from './dataProvider';
import MyLayout from './Layout'
import customRoutes from './routes';
import englishMessages from 'ra-language-english';
import chineseMessages from 'ra-language-chinese';

import {
  SourceList,
  SourceEdit,
  SourceCreate,
  SourceIcon,
} from './sources';

import {
  DatasetList,
  DatasetEdit,
  DatasetCreate,
  DatasetIcon,
} from './datasets';

import {
  SpaceList,
  SpaceEdit,
  SpaceCreate,
  SpaceIcon,
} from './spaces';

import {
  InstanceList,
  InstanceEdit,
  InstanceCreate,
} from './instances';

const messages = {
  en: englishMessages,
  zh: chineseMessages,
}

const i18nProvider = locale => messages[locale];

const App = () => (
  <Admin appLayout={MyLayout} customRoutes={customRoutes} dashboard={Dashboard} dataProvider={dataProviderFactory('space')} locale="zh" i18nProvider = {i18nProvider} authProvider={authProvider}>
      <Resource
          name="spaces"
          options={{ label: 'Spaces' }}
          list={SpaceList}
          edit={SpaceEdit}
          create={SpaceCreate}
          icon={SpaceIcon}
        />
      <Resource
          name="datasources"
          options={{ title: "Source", label: 'Sources' }}
          list={SourceList}
          edit={SourceEdit}
          create={SourceCreate}
          icon={SourceIcon}
        />
      <Resource
          name="datasets"
          options={{ label: 'Datasets' }}
          list={DatasetList}
          edit={DatasetEdit}
          create={DatasetCreate}
          icon={DatasetIcon}
        />
      <Resource
          name="datainstances"
          options={{ label: 'Instances' }}
          list={InstanceList}
          edit={InstanceEdit}
          create={InstanceCreate}
        />
      <Resource name="dataengines" />
      <Resource name="../cloud_adaptor/clusterblueprints" />
  </Admin>
);

export default App;
