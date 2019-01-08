import React, { Component, Fragment } from 'react';
import { Responsive, Title } from 'react-admin';
import { get } from '../authProvider'

import Indicator from './Indicator';
import MonthLine from './MonthLine';
import { getLineData, getPublicDatasetPieData, getBarData } from './Utils';
import Pie from './Pie';
import Bar from './Bar'
import DollarIcon from '@material-ui/icons/AttachMoney';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state={
        space:{},
        dataset:{},
        instance:{}
    };

    componentDidMount(props){
        get('space/state')
            .then(({space, dataset, instance}) => {
                this.setState({space, dataset, instance});
        });
    };

    render() {
        const {space, dataset, instance} = this.state;
        return (
            <Fragment>
                <Title title="Rabbit Dashboard" />
                <Responsive
                    medium={
                        <div style={styles.flex}>
                            <div style={styles.leftCol}>
                                <div style={styles.flex}>
                                    <Indicator icon={DollarIcon} label='Space Count' value={space.total_cnt} />
                                    <Indicator icon={DollarIcon} label='Dataset Count' value={dataset.total_cnt} />
                                    <Indicator icon={DollarIcon} label='Instance Count' value={instance.total_cnt} />
                                </div>
                                <div style={styles.flex}>
                                    <Pie data={getPublicDatasetPieData(dataset.public_size)} label='Public/Private Dataset Size' />
                                    <MonthLine data={getLineData(dataset.month_size, ' Monthly Dataset Size', 'modified_time__month', 'size')} label='Dataset Size'/>
                                </div>
                                <div style={styles.flex}>
                                    <Bar data={getBarData(instance.dataset_cnt, 'Instance Count Per Dataset', 'dataset__name', 'cnt')} label='Instance Count Per Dataset' />
                                    <Bar data={getBarData(dataset.owner_size, 'Dataset Size Per Owner', 'owner__username', 'size')} label='Dataset Size Per Owner' />
                                    {/* <Bar data={getBarData(instance.owner_cnt, 'Instance Count Per Owner', 'owner__username', 'cnt')} label='Instance Count Per Owner' /> */}
                                </div>
                            </div>
                        </div>
                    }
                />
            </Fragment>
        );
    }
}

export default Dashboard;
