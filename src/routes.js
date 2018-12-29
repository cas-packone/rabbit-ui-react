import React from 'react';
import { Route } from 'react-router-dom';
import Setting from './setting/Setting';
import Analysis from './analysis/Analysis';

export default [
    <Route exact path="/setting" component={Setting} />,
    <Route exact path="/analysis" component={Analysis} />,
];