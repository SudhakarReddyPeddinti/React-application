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
       pieHole: 0.80
    };

    this.setState({
        'options' : options
     });
}

    componentWillReceiveProps(nextProps){
            if (nextProps.dataValues.chartDataID){
                this.datas = nextProps.dataValues.customerData.filter(operator => operator.userID === nextProps.dataValues.chartDataID);
            }
            if(this.datas){
                let yes = this.datas[0].salesPredictionScore;
                let no = 1-this.datas[0].salesPredictionScore;

                let data = ([
                ['Opinion', 'Percentage'],
                ['Yes',     yes],
                ['No',      no]
                ]);
            
                console.log(this.datas[0]);

                this.setState({
                        'data':data
                    })
            }
    }

render() {
    if(!this.datas){
        return null;
    }
    return (
        <div>
            <div className={"my-pretty-chart-container"}>
                 <Chart chartType = "PieChart" data = {this.state.data} options = {this.state.options} graph_id = "PieChart"  width={"100%"} height={"180px"}  legend_toggle={true} />
            </div>
        </div>
        );
    }
}

// Todo #2: PropValication

export default PieChart;