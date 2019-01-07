import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import { Line } from 'react-chartjs';

const styles = {
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

export const getLineData = (list=null, label='', keyKey=null, value_key=null) => {
    var labels=[];
    var data=[];
    if (list){
        list.map(item => {
            labels.push(item[keyKey]);
            data.push(item[value_key]);
        });
    }
    return {
        labels,
        datasets: [
            {
                label,
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data
            }
        ]
    }
}

const MonthLine = ({ data, label, translate, classes }) => (
    <div className={classes.main}>
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.'+label)}
            </Typography>
            <Typography variant="headline" component="h2">
                <Line data={data} redraw width="600" height="250"/>
            </Typography>
        </Card>
    </div>
);

export default translate(withStyles(styles)(MonthLine));
