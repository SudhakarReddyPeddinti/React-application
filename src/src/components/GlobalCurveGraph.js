import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts';

class GlobalCurveGraph extends React.Component {
    constructor(props) {
        super(props);
        this.dataPresent = null;
    }

    componentWillReceiveProps(nextProps) {
        let dealer = nextProps.selectedAgent;
        if (Object.keys(dealer).length !== 0 && this.props.selectedAgent.dealerID !== dealer.dealerID) {
            this.props.actions.fetchDealerAvgData(dealer.dealerID);
            console.log("GlobalcurveGrpah :: fetchDealerAVGData call this.props.selectedAgent.dealerID != dealer.dealerID & dealer.length != 0");
            console.log("Action triggered using", dealer.dealerID);
            console.log("current data", this.props.selectedAgent);
            console.log("next data", dealer);
            calculateChartData();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.selectedAgent !== nextProps.selectedAgent;
    }

    calculateChartData() {
        let columns = [
            {
                'type': 'number',
                'label': 'X Value'
            },
            {
                'type': 'number',
                'label': 'All Dealer data'
            },
            {
                'type': 'number',
                'label': 'Ideal Value'
            },
            {
                'type': 'number',
                'label': 'Dealer 15'
            }
        ];

        let N = 100;
        let maxx = 414.99;
        let ideal = 45;
        let dealerAvg = nextProps.selectedAgent.dealerAvg;
        let mean = 46.31;
        let stdv = 44.14;

        let step = (maxx / N);
        let nearest = Math.round(ideal / step) * step;
        let nearest2 = Math.round(dealerAvg / step) * step;
        let nullArray = Array.apply(null, { length: N + 1 });
        let xAxis = nullArray.map((n, i, x) => {
            return Number(i) * step;
        });

        console.log('Step :: ', step);

        let pdf = xAxis.map((v) => {
            return this.NormalDensityZx(v, mean, stdv);
        });
        let idealPoint = xAxis.map((v, i, a) => {
            if (a[i] === nearest) {
                return pdf[i];
            } else {
                return null;
            }
        });
        let dealerPoint = xAxis.map((value, index, a) => {
            if (a[index] === nearest2) {
                return pdf[index];
            } else {
                return null;
            }
        });
        let rows = new Array();
        rows = nullArray.map((v, i, a) => {
            return [xAxis[i], pdf[i], idealPoint[i], dealerPoint[i]];
        });

        this.dataPresent = true;
        let options = {
            colors: ['#4592EE', '#36E5B5', '#0028EE'],
            series: {
                0: { pointShape: null, poitSize: 0 },
                1: { pointShape: 'circle', pointSize: 8 },
                2: { pointShape: 'circle', pointSize: 9 }
            }
        };

        this.setState({
            'options': options,
            'rows': rows,
            'columns': columns
        });
    }

    normalDensityZx(x, Mean, StdDev) {
        return Math.exp(-((x - Mean) * (x - Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    }

    render() {
        if (!this.dataPresent) {
            return null;
        }

        return (
            <div>
                {/*<div className={"my-pretty-chart-container"}>
                 <Chart chartType = "AreaChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "AreaChart"  width={"100%"} height={"300px"}  legend_toggle={true} />
            </div>*/}
            </div>
        );
    }
}

GlobalCurveGraph.propTypes = {
    selectedAgent: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default GlobalCurveGraph;