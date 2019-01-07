import React, { Component, Fragment } from 'react';
import { Responsive, Title } from 'react-admin';
import { get } from '../authProvider'

import Indicator from './Indicator';
import MonthLine, { getLineData } from './MonthLine';
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
                console.log(this.state.dataset.month_size)
        });
    };

    render() {
        const {space, dataset, instance, lineData} = this.state;
        return (
            <Fragment>
                <Title title="Rabbit Dashboard" />
                <Responsive
                    medium={
                        <div style={styles.flex}>
                            <div style={styles.leftCol}>
                                <div style={styles.flex}>
                                    <Indicator icon={DollarIcon} value={space.total_cnt} />
                                    <Indicator icon={DollarIcon} value={dataset.total_cnt} />
                                    <Indicator icon={DollarIcon} value={instance.total_cnt} />
                                </div>
                                <div style={styles.singleCol}>
                                    <MonthLine data={getLineData(dataset.month_size, ' Monthly Dataset Size', 'modified_time__month', 'size')} label='Dataset Size'/>
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
