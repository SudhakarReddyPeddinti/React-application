import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts';

class GlobalCurveGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let dealer = nextProps.selectedAgent;
        if (Object.keys(dealer).length !== 0 && this.props.selectedAgent.dealerID !== dealer.dealerID) {
            this.props.actions.fetchDealerAvgData(dealer.dealerID);
            console.log("GlobalcurveGrpah :: fetchDealerAVGData call this.props.selectedAgent.dealerID != dealer.dealerID & dealer.length != 0");
            console.log("Action triggered using", dealer.dealerID);
            console.log("current selectedAgent", this.props.selectedAgent);
            console.log("next selectedAgent", dealer);
        }

        if (this.props.dealerAvg !== nextProps.dealerAvg) {
            this.calculateChartData(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.selectedAgent.dealerID !== nextProps.selectedAgent.dealerID;
    }

    calculateChartData(nextProps) {
        console.log("GlobalCurve :: componentWillReceiveProps : nextProps", nextProps);
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
            }
        ];


        let N = 100;
        let maxx = nextProps.globalChartData.MaxValue;
        let ideal = 45;
        let dealerAvg = nextProps.dealerAvg.Average;
        let mean = nextProps.globalChartData.Mean;
        let stdv = nextProps.globalChartData.StandardDeviation;

        let step = (maxx / N);
        let nearest = Math.round(ideal / step) * step;
        let nullArray = Array.apply(null, { length: N + 1 });
        let xAxis = nullArray.map((n, i, x) => {
            return Number(i) * step;
        });

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
        let rows = new Array();
        rows = nullArray.map((v, i, a) => {
            return [xAxis[i], pdf[i], idealPoint[i]];
        });

        this.dataPresent = true;
        let options = {
            colors: ['#4592EE', '#36E5B5', '#0028EE'],
            series: {
                0: { pointShape: null, poitSize: 0 },
                1: { pointShape: 'circle', pointSize: 8 }
            }
        };
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
                <div className={"my-pretty-chart-container"}>
                    <Chart chartType = "AreaChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "AreaChart"  width={"100%"} height={"300px"}  legend_toggle={true} />
                </div>*/}
            </div>
        );
    }
}

GlobalCurveGraph.propTypes = {
    selectedAgent: React.PropTypes.object.isRequired,
    dealerAvg: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default GlobalCurveGraph;