import React, { Component, props } from 'react';
import PieChart from './PieChart';
import _ from 'underscore';
import { Chart } from 'react-google-charts';

class DemoGraph extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dataPresent = null;
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        let agent = nextProps.selectedAgent;
        if (Object.keys(agent).length !== 0 && this.props.selectedAgent.dealerID !== agent.dealerID) {
            this.props.actions.fetchDealerAvgData(agent.dealerID);
        }

        if(Object.keys(nextProps.dealerAvg).length !== 0 && this.props.dealerAvg !== nextProps.dealerAvg){
            this.chartCalculations(nextProps.dealerAvg);
        }
    }

    chartCalculations(dealerAvg) {
        let arr = [12, 5, 7, 3, 3, 1, 8, 5, 2, 2, 4, 3, 2, 3, 4, 2, 4, 6, 6, 3, 4, 4, 4, 7, 2, 8, 7, 10, 7, 6, 3, 6, 7, 5, 6, 5, 6, 7, 8, 2, 10, 6, 5, 9, 16, 9, 11, 9, 13, 9, 11, 19, 13, 10, 12, 14, 21, 15, 17, 15, 17, 15, 17, 11, 10, 16, 14, 6, 16, 17, 15, 21, 33, 12, 22, 23, 24, 16, 24, 14, 25, 16, 14, 15, 9, 16, 19, 18, 12, 19, 27, 20, 16, 17, 9, 18, 15, 6, 14, 19, 12, 11, 10, 12, 8, 4, 12, 17, 6, 10, 9, 13, 12, 8, 14, 10, 5, 5, 5, 6, 8, 12, 10, 7, 9, 4, 6, 5, 5, 7, 8, 10, 6, 9, 7, 6, 1, 6, 9, 5, 5, 4, 6, 4, 4, 5, 9, 7, 2, 5, 4, 3, 2, 3, 1, 3, 6, 3, 4, 4, 3, 2, 3, 1, 4, 4, 1, 3, 2, 3, 3, 2, 5, 3, 1, 3, 4, 3, 1, 3, 2, 5, 2, 1, 3, 4, 3, 1, 1, 2, 1, 3, 1, 5, 2, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        let xAx = [45, 90, 135, 180, 225, 270, 315, 360, 405, 450, 495, 540, 585, 630, 675, 720, 765, 810, 855, 900, 945, 990, 1035, 1080, 1125, 1170, 1215, 1260, 1305, 1350, 1395, 1440, 1485, 1530, 1575, 1620, 1665, 1710, 1755, 1800, 1845, 1890, 1935, 1980, 2025, 2070, 2115, 2160, 2205, 2250, 2295, 2340, 2385, 2430, 2475, 2520, 2565, 2610, 2655, 2700, 2745, 2790, 2835, 2880, 2925, 2970, 3015, 3060, 3105, 3150, 3195, 3240, 3285, 3330, 3375, 3420, 3465, 3510, 3555, 3600, 3645, 3690, 3735, 3780, 3825, 3870, 3915, 3960, 4005, 4050, 4095, 4140, 4185, 4230, 4275, 4320, 4365, 4410, 4455, 4500, 4545, 4590, 4635, 4680, 4725, 4770, 4815, 4860, 4905, 4950, 4995, 5040, 5085, 5130, 5175, 5220, 5265, 5310, 5355, 5400, 5445, 5490, 5535, 5580, 5625, 5670, 5715, 5760, 5805, 5850, 5895, 5940, 5985, 6030, 6075, 6120, 6165, 6210, 6255, 6300, 6345, 6390, 6435, 6480, 6525, 6570, 6615, 6660, 6705, 6750, 6795, 6840, 6885, 6930, 6975, 7020, 7065, 7110, 7155, 7200, 7245, 7290, 7335, 7380, 7425, 7470, 7515, 7560, 7605, 7650, 7695, 7740, 7785, 7830, 7875, 7920, 7965, 8010, 8055, 8100, 8145, 8190, 8235, 8280, 8325, 8370, 8415, 8460, 8505, 8595, 8640, 8685, 8775, 8820, 8865, 8910, 8955, 9090, 9180, 9225, 9270, 9315, 9450, 9495, 9675, 9765, 9810, 9900, 9990, 10125, 10215, 10305, 10395, 10620, 10665, 10800, 10845, 10890, 11070, 11250, 11340, 11385, 11430, 11475, 11520, 11970, 12015, 12195, 12330, 12375, 12420, 12690, 12735, 12870, 13140, 13275, 13770, 13950, 14265, 14715, 15345, 16515, 16560, 16965, 17055, 18585, 18720, 19350, 19395, 20610, 22005, 22725, 24300, 24345, 24750, 25245, 26100, 29160, 29340, 30375, 31275, 32175, 32265, 32850, 32895, 33120, 33210, 33345, 33390, 33975, 34200, 34245, 34380, 34650, 34830, 35190, 35280, 36270, 37485, 39150, 41535];

        let ii = 0,
            jj = 45;
        let zeros = Array.apply(null, Array(41535 / 45)).map(Number.prototype.valueOf, 0);

        let zs = zeros.map(function() {
            let rv = 0;
            if (xAx[ii] == jj) {
                rv = arr[ii];
                ii++;
            }
            jj = jj + 45;
            return rv;
        });

        let smoothZs = this.smooth(Array.apply(null, Array(45)).map(Number.prototype.valueOf, 0).concat(zs), 45);

        let xlabels = _.range(45, 41535, 45);

        let nulls = Array.apply(null, Array(41535 / 45));
        let bucket = Math.ceil(dealerAvg.Average/45)-1;
        nulls[bucket] = zs[bucket];

        let mainData = xlabels.map(function(v, i) {
            return [v, zs[i], smoothZs[i], nulls[i]];
        });

        let columns = [{
                'label': 'Response Time',
                'type': 'number'
            },
            {
                'label': 'Dealers count',
                'type': 'number'
            },
            {
                'label': 'Trend',
                'type': 'number'
            },
            {
                'label': 'Dealers count',
                'type': 'number'
            }
        ];

        let options = {
            title: 'Dealership community metrics',
            crosshair: {
                trigger: 'both',
                orientation: 'vertical',
                color: 'black',
                selected: { color: 'blue' }
            },
            //  pointSize: 1,
            curveType: 'function',
            hAxis: {
                title: 'Response Time (in minutes)',
                gridlines: { count: 8 },
                scaleType: 'log'
                // minorGridlines: { count: 10 }
            },
            vAxis: {
                title: 'Number of Dealers',
                gridlines: { count: 8 },
                gridlineColor: '#F2F2F2',
                baselineColor: 'none',
                minValue: 0
            },
            series: {
                0: {color: 'grey'},
                1: {color: '#003AAF'},
                2: {pointShape: 'diamond',
                    pointSize: 10}
            }
        };

        this.dataPresent = true;

        this.state = {
            "data": mainData,
            "options": options,
            "columns": columns
        };
    }
    smooth(list, degree) {
        let win = degree * 2 - 1;
        let weight = _.range(0, win).map(function(x) { return 1.0; });
        let weightGauss = [];

        for (let i in _.range(0, win)) {
            i = i - degree + 1;
            let frac = i / win;
            let gauss = 1 / Math.exp((4 * (frac)) * (4 * (frac)));
            weightGauss.push(gauss);
        }

        weight = _(weightGauss).zip(weight).map(function(x) { return x[0] * x[1]; });
        let smoothed = _.range(0, (list.length + 1) - win).map(function(x) { return 0.0; });
        for (let i = 0; i < smoothed.length; i++) {
            smoothed[i] = _(list.slice(i, i + win)).zip(weight).map(function(x) { return x[0] * x[1]; }).reduce(function(memo, num) { return memo + num; }, 0) / _(weight).reduce(function(memo, num) { return memo + num; }, 0);
        }
        return smoothed;
    }
        
    render() {
        if (!this.dataPresent) {
            return null;
        }
        return ( 
            <div>
                <div className = {"my-pretty-chart-container"}>
                    <Chart chartType = "LineChart"
                        rows = {this.state.data}
                        columns = {this.state.columns}
                        options = {this.state.options}
                        graph_id = "LineChart"
                        width={"100%"} 
                        height={"400px"}
                        legend_toggle = {true}/> 
                </div>
            </div>
        );
    }
}

DemoGraph.propTypes = {
    globalChartData: React.PropTypes.object.isRequired,
    selectedAgent: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    dealerAvg: React.PropTypes.object.isRequired
};

export default DemoGraph;