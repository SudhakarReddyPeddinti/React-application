import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/operatorPanelActions';

class GlobalCurveGraph extends React.Component{
   constructor(props){
       super(props);
    }
    
//     NormalDensityZx (x, Mean, StdDev) {
//         return Math.exp(-((x-Mean) * (x-Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
//     }

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
//             },
//              {
//                 'type': 'number',
//                 'label': 'Dealer 15'
//             }
//         ];

//         let N = 100;
//         let maxx = 414.99;
//         let ideal = 45;
//         let dealerAvg = nextProps.selectedDealer.dealerAvg; 
//         let mean = 46.31;
//         let stdv = 44.14;

//         let step = (maxx / N);
//         let nearest = Math.round(ideal/step)*step;
//         let nearest2 = Math.round(dealerAvg/step)*step;
//         let nullArray = Array.apply(null, { length: N + 1 });
//         let xAxis = nullArray.map((n, i, x) => {
//             return Number(i) * step;
//         });

//         console.log('Step :: ', step);
        
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
//         let dealerPoint = xAxis.map((value, index, a) => {
//             if(a[index] === nearest2) {
//                 return pdf[index];
//             } else {
//                 return null;
//             }
//         });
//         let rows = new Array();
//         rows = nullArray.map((v, i, a) => {
//             return [xAxis[i], pdf[i], idealPoint[i], dealerPoint[i]];
//         });

//         this.dataPresent = true;
//         let options = {
//             colors: ['#4592EE', '#36E5B5', '#0028EE'],
//             series: {
//                 0: { pointShape: null, poitSize: 0 },
//                 1: { pointShape: 'circle', pointSize: 8 },
//                 2: { pointShape: 'circle', pointSize: 9}
//             }
//         };
        
//         this.setState({
//             'options': options,
//             'rows': rows,
//             'columns': columns
//         });
// }

render() {
    
        //     console.log(
        // this.props.globalChartData);
        
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
     globalChartData: React.propTypes.object.isRequired
//     status: React.propTypes.object.isRequired
 };

function mapStateToProps(state) {
  return {      
      completeStore: state.toolbarAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalCurveGraph);