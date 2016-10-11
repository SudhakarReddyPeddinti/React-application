import React, {Component, props} from 'react';

class AgentStatInfoPanel extends React.Component{
    constructor(props, context) {
            super(props, context);
            this.AvgValue = 0;
        }
     
         componentWillReceiveProps(nextProps){
            if(this.props.dealerSpecificGraph !== nextProps.dealerSpecificGraph){
                let step = nextProps.dealerSpecificGraph.MaxValue/100;
                this.AvgValue = Math.round(Math.round(nextProps.dealerSpecificGraph.UserAverage/step)*step);
            }
         }

render() {
    return (
            <div className="entryItems">
                <div>User ID: <span className="entryValue">{this.props.dealerSpecificGraph.UserID}</span></div>
                <div>User Average Response Time: <span className="entryValue">{this.AvgValue}</span></div>
            </div>
        );
    }
}

AgentStatInfoPanel.propTypes = {
    dealerSpecificGraph: React.PropTypes.object.isRequired
};

export default AgentStatInfoPanel;