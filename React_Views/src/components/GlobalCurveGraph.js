import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts';

class GlobalCurveGraph extends React.Component {
    constructor(props) {
        super(props);
        this.dataPresent = null;
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        let dealer = nextProps.selectedAgent;
        if (Object.keys(dealer).length !== 0 && this.props.selectedAgent.dealerID !== dealer.dealerID) {
            this.props.actions.fetchDealerAvgData(dealer.dealerID);
        }

        if (this.props.dealerAvg !== nextProps.dealerAvg) {
            console.log("Setting state");

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

            // let N = 100;
            // let maxx = 1321514;
            // let ideal = 45;
            // let dealerAvg = nextProps.dealerAvg.Average;
            // let mean = 5461.07220629885;
            // let stdv = 32115.6110379342;

            let maxx = nextProps.globalChartData.MaxValue;
            let N = (maxx / 45);
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
                return this.normalDensityZx(v, mean, stdv);
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
                backgroundColor: { fill:'transparent' },
                // hAxis: {
                //     scaleType: 'log',
                //     minorGridlines: { count: 10 }
                // },
                series: {
                    0: { pointShape: null, poitSize: 0 },
                    1: { pointShape: 'circle', pointSize: 8 },
                    2: { pointShape: 'circle', pointSize: 9 }
                }

            };

            this.setState({
                "options": options,
                "rows": rows,
                "columns": columns
            });
        }
    }

    normalDensityZx(x, Mean, StdDev) {
        return Math.exp(-((x - Mean) * (x - Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    }

    render() {
        //console.log("GlobalCurveGraph :: Render : columns", this.state.columns);
        if (!this.dataPresent) {
            return null;
        }
        return (
            <div>
                <div className={"my-pretty-chart-container"}>
                    <Chart chartType = "AreaChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "AreaChart"  width={"100%"} height={"300px"}  legend_toggle={true} />
                </div>
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