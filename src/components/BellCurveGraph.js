import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts'

class BellCurveGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            options: {}
        };
        this.chartData = [];
        this.dataPresent = null;
    }
    
    NormalDensityZx (x, Mean, StdDev, startRange, endRange) {
        // if (x>starRange || x<endRange){
        //     return null;
        // }
        return Math.exp(-((x-Mean) * (x-Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    }

    SelectedNormalDensityZx (x2, Mean, StdDev, startRange, endRange) {
        if(x2<startRange || x2>endRange){
            return null;
        }
        console.log(x2<2500);
        return Math.exp(-((x2-Mean) * (x2-Mean)) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
    }
    componentWillReceiveProps(nextProps) {
        let columns = [{
            'type': 'number',
            'label': 'X Value'
            },
            {
                'type': 'number',
                'label': 'Ideal range'
            },
             {
                'type': 'number',
                'label': 'Y Value'
            }];

        console.log("Bell Curve Will Receive Props");

        let N = 100;
        let scale = (41499 / N);
        let numArray = Array.apply(null, { length: N + 1 }).map((n, i, x) => {
            return Number(i) * scale;
        });

        let somearray = numArray.map((v) => {
            let startRange = 2500;
            let endRange = 7000;
            return [v, this.SelectedNormalDensityZx(v, 4631, 4414, startRange, endRange), this.NormalDensityZx(v, 4631, 4414, startRange, endRange)];
        });
        let rows = somearray;
        this.dataPresent = true;
        let options = {
            colors: ['#006CEE', '#4592EE']
        };

        this.setState({
            'options': options,
            'rows': rows,
            'columns': columns
        });
        console.log(this.refs.graph);

    }
    render() {
        if (!this.dataPresent) {
            return null;
        }
        return (
            <div>
                <div className={"my-pretty-chart-container"}>
                    <Chart ref="graph" chartType = "AreaChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "AreaChart"  width={"100%"} height={"300px"}  legend_toggle={true} />
                </div>
            </div>
        );
    }
}

export default BellCurveGraph;