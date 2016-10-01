import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts'

class PieChart2 extends React.Component{
   constructor(props){
       super(props);
        // ToDo #1: Remove this state
       this.state={
       options:{},
       data:[]
     };
     this.datas;
   }
   
   componentDidMount() {

  let options = {
       title: 'Best Sales Prediction Score: Phone',
       legend:{
           position:'labeled',
           textStyle: {
               color: 'black', 
               fontSize: 12, 
               italic: 'True',
                bold: 'True'}
       },
       //backgroundColor: { fill:'transparent' },
       colors: ['#C2D1F0', '#3366CC'],
       pieHole: 0.70
    };

    let data = [
       ['Task', 'Hours per Day'],
          ['No',     11],
          ['Yes',      99]
    ];
    this.setState({
        'data' : data,
        'options' : options
     });
}

render() {
    
    return (
        <div>
            <div className={"my-pretty-chart-container"}>
                 <Chart chartType = "PieChart" data = {this.state.data} options = {this.state.options} graph_id = "PieChart2"  width={"140px"} height={"50px"}  legend_toggle={true} />
            </div>
        </div>
        );
    }
}

// Todo #2: PropValication

export default PieChart2;