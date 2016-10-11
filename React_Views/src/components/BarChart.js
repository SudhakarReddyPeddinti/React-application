import React from 'react'
import {render} from 'react-dom'
import {Chart} from 'react-google-charts'

class BarChart extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            options:{},
            data:[]
        };
    }

    componentDidMount() {
        let data = ([
       ['Lead Type', 'Yes', 'No'],
        ['Phone', 60, 40],
        ['Internet', 45, 55],
        ['Walkin', 80, 20],
        ['Import', 12, 88]
      ])

      let options = {
       width: 600, 
       
            title: 'Overall Sales Prediction Score',
            
        height: 300,
        legend: { position: 'top'},
        bar: { groupWidth: '25%' },
        isStacked: false
    };

    this.setState({
        'options' : options,
        'data'    : data
     });
     }

  render() {
    return (
    <div className={"my-pretty-chart-container"}>
      <Chart chartType = "ColumnChart" data = {this.state.data} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"300px"}  legend_toggle={true} />
    </div>
    )
  }
}

export default BarChart;