import React, {Component, props} from 'react';

class BellCurveInfoPanel extends React.Component{
    constructor(props, context) {
            super(props, context);
        }
     
render() {
    return (
            <div className="entryItems" >
                <div>Total Number of agents: <span className="entryValue">1505</span> </div> 
                <div>Ideal Response Time - start value: <span className="entryValue">2500</span> </div>
                <div>Ideal Response Time - end value: <span className="entryValue">7000</span> </div>
            </div>
        );
    }
}

export default BellCurveInfoPanel;