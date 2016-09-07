import React from 'react'
import {render} from 'react-dom'
import {Chart} from 'react-google-charts'

class BarChart2 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            options:{},
            data:[]
        };
    }

    componentDidMount() {
        let data = ([
       ['Option', 'Value'],
        ['Yes', 60],
        ['No', 40]
      ])

      let options = {
       width: 150, 
       
            title: 'Overall Sales Prediction Score',
            
        height: 50,
        legend: { position: 'top'},
        bar: { groupWidth: '15%' },
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
      <Chart chartType = "BarChart" data = {this.state.data} options = {this.state.options} graph_id = "BarChart2"  width={"100%"} height={"100%"}  legend_toggle={true} />
    </div>
    )
  }
}

export default BarChart2;