import React, {Component, props} from 'react';
import {Chart} from 'react-google-charts'

class PieChart extends React.Component{
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
       colors: ['#3366CC', '#C2D1F0'],
       pieHole: 0.75
    };

    let data 

    this.setState({
        'options' : options
     });
}

render() {
    if(!this.props.data){
        return null;
    } 

    let yes = this.props.data;
    let no = 1-this.props.data;
 
    let data = ([
                ['Opinion', 'Percentage'],
                ['Yes',     yes],
                ['No',      no]
                ]);

    return (
        <div>
            <div className={"my-pretty-chart-container"}>
                 <Chart chartType = "PieChart" data = {data} options = {this.state.options} graph_id = {this.props.key}  width={"140px"} height={"50px"} legend_toggle={true} />
            </div>
        </div>
        );
    }
}

// PieChart.propTypes = {
//     data: React.Protypes.object.isRequired,
//     key: React.Proptypes.object.isRequired
// };

export default PieChart;