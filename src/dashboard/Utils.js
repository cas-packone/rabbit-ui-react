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

export const getPublicDatasetPieData = (list=null) => {
    var pub=1;
    var pri=1;
    
    if (list){
        list.map(item => {
            if (item.public){
                pub=item.size
            }else{
                pri=item.size
            }
        });
    }
    return [{
        label: 'Public',
        value: pub,
    },{
        label: 'Private',
        value: pri,
    }
    ];
}

export const getBarData = (list=null, label='', keyKey=null, value_key=null) => {
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
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data
            }
        ]
    }
}