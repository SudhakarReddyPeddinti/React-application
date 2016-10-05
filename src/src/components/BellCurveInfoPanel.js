import React, {Component, props} from 'react';

class BellCurveInfoPanel extends React.Component{
    constructor(props, context) {
            super(props, context);
        }
     
render() {
    return (
            <div className="entryItems" >
                <div>Total Number of Dealers: <span className="entryValue">1717</span> </div> 
                <div>Ideal Response Time : <span className="entryValue">45 minutes</span> </div>
            </div>
        );
    }
}

export default BellCurveInfoPanel;