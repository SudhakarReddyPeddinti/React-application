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

    // componentWillReceiveProps(nextProps) {
    //     let dealer = nextProps.selectedAgent;
    //     if (Object.keys(dealer).length !== 0 && this.props.selectedAgent !== nextProps.selectedAgent) {
    //         this.props.actions.fetchDealerSpecificData(dealer.userID, dealer.dealerID);
    //         console.log("fetchDealerSpcData called when selectedAgent is not empty & not same as previous");
    //         console.log("previous data", this.props.selectedAgent);
    //         console.log("next data", dealer);
    //     }
    // }

    // NormalDensityZx(x, Mean, StdDev) {
    //     return Math.exp(-((x - Mean) * (x - Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    // }

    //     componentWillReceiveProps(nextProps) {
    //         let columns = [
    //             {
    //                 'type': 'number',
    //                 'label': 'X Value'
    //             },
    //             {
    //                 'type': 'number',
    //                 'label': 'All Dealer data'
    //             },
    //              {
    //                 'type': 'number',
    //                 'label': 'Ideal Value'
    //             }
    //         ];
    //         console.log("LOC::: Render COmponent did mount", nextProps.dataValues.selectedAgent);

    //         let N = 100;
    //         let maxx = nextProps.dataValues.selectedAgent.max;
    //         let ideal = nextProps.dataValues.selectedAgent.min;
    //         let mean = nextProps.dataValues.selectedAgent.mean;
    //         let stdv = nextProps.dataValues.selectedAgent.stdv;

    //         let step = (maxx / N);
    //         let nearest = Math.round(ideal/step)*step;
    //         let nullArray = Array.apply(null, { length: N + 1 });
    //         let xAxis = nullArray.map((n, i, x) => {
    //             return Number(i) * step;
    //         });

    //         let pdf = xAxis.map((v) => {
    //             return this.NormalDensityZx(v, mean, stdv);
    //         });
    //         let idealPoint = xAxis.map((v, i, a) => {
    //             if(a[i] === nearest) {
    //                 return pdf[i];
    //             } else {
    //                 return null;
    //             }
    //         });
    //         let rows = new Array();
    //         rows = nullArray.map((v, i, a) => {
    //             return [xAxis[i], pdf[i], idealPoint[i]];
    //         });

    //         this.dataPresent = true;
    //         let options = {
    //             colors: ['#4592EE', '#36E5B5'],
    //             series: {
    //                 0: { pointShape: null, poitSize: 0 },
    //                 1: { pointShape: 'circle', pointSize: 5 }
    //             }
    //         };

    //         this.setState({
    //             'options': options,
    //             'rows': rows,
    //             'columns': columns
    //         });
    // }

    render() {
        // if (!this.dataPresent) {
        //         return null;
        //     }
        console.log("UserBellCurveGraph Render");
        return (
            <div>
                {/*  <div className={"my-pretty-chart-container"}>
                 <Chart chartType = "AreaChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "UserBellCurveGraph"  width={"100%"} height={"300px"}  legend_toggle={true} />
            </div> */}
            </div>
        );
    }
}

UserBellCurveGraph.propTypes = {
    selectedAgent: React.PropTypes.object.isRequired,
    // dealerSpecificGraph: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default UserBellCurveGraph;