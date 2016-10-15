import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts';

class UserBellCurveGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {}
        };
        this.dataPresent = null;
    }

    componentWillReceiveProps(nextProps) {
        let dealer = nextProps.selectedAgent;
        if (Object.keys(dealer).length !== 0 && this.props.selectedAgent !== nextProps.selectedAgent) {
            this.props.actions.fetchDealerSpecificData(dealer.userID, dealer.dealerID);
        }
        if (this.props.dealerSpecificGraph !== nextProps.dealerSpecificGraph){
            let columns = [
                {
                    'type': 'number',
                    'label': 'X Value'
                },
                {
                    'type': 'number',
                    'label': ''
                },
                 {
                    'type': 'number',
                    'label': 'User Average'
                },
                 {
                    'type': 'number',
                    'label': 'User Average',
                    'role': 'tooltip'
                }
            ];

            let N = 100;
            let maxx = nextProps.dealerSpecificGraph.MaxValue;
            let dealerAvg = nextProps.dealerSpecificGraph.UserAverage;
            let mean = nextProps.dealerSpecificGraph.Mean;
            let stdv = nextProps.dealerSpecificGraph.StandardDeviation;

            let step = (maxx / N);
            let nearest = Math.round(dealerAvg/step)*step;
            let nullArray = Array.apply(null, { length: N + 1 });
            let xAxis = nullArray.map((n, i, x) => {
                return Number(i) * step;
            });

            let pdf = xAxis.map((v) => {
                return this.NormalDensityZx(v, mean, stdv);
            });
            let dealerAvgPoint = xAxis.map((v, i, a) => {
                if(a[i] === nearest) {
                    return pdf[i];
                } else {
                    return null;
                }
            });
            let rows = new Array();
            rows = nullArray.map((v, i, a) => {
                return [xAxis[i], pdf[i], dealerAvgPoint[i], xAxis[i]];
            });

            this.dataPresent = true;
            let options = {
                colors: ['#0840AF', '#36E5B5'],
                series: {
                    0: { pointShape: null, poitSize: 0 },
                    1: { pointShape: 'line', pointSize: 5 }
                },
                crosshair: {
                trigger: 'both',
                orientation: 'vertical',
                color: 'black',
                selected: { color: 'blue' }
            },
                hAxis: {
                    title: 'Response Time (in minutes)', 
                    gridlines: {count: 5}
                },
                vAxis: {
                    title: 'user performance probabilistic value',
                    textPosition: 'none'
                }
            };

            this.setState({
                'options': options,
                'rows': rows,
                'columns': columns
            });
        }

    }

    NormalDensityZx(x, Mean, StdDev) {
        return Math.exp(-((x - Mean) * (x - Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    }

    render() {
        if (!this.dataPresent) {
                return null;
            }
        return (
            <div>
                <div className={"my-pretty-chart-container"}>
                    <Chart chartType = "LineChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "UserBellCurveGraph"  width={"100%"} height={"300px"}  legend_toggle={true} />
                </div> 
            </div>
        );
    }
}

UserBellCurveGraph.propTypes = {
    selectedAgent: React.PropTypes.object.isRequired,
    dealerSpecificGraph: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default UserBellCurveGraph;