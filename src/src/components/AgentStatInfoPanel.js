import React, {Component, props} from 'react';

class AgentStatInfoPanel extends React.Component{
    constructor(props, context) {
            super(props, context);
        }
     
render() {
    return (
            <div className="entryItems">
                <div>Agent ID: <span className="entryValue">1505</span></div> 
                <div>Number of customers attended: <span className="entryValue">2500</span></div>
                <div>Average Response Time: <span className="entryValue">7000</span></div>
                <div>Best Response Time: <span className="entryValue">700</span></div>
                <div>Worst Response Time: <span className="entryValue">7000</span></div>
            </div>
        );
    }
}

export default AgentStatInfoPanel;