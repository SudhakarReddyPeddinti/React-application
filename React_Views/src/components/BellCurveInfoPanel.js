import React, {Component, props} from 'react';

class BellCurveInfoPanel extends React.Component{
    constructor(props, context) {
            super(props, context);
            this.AvgValue=0;
        }
     
     componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.dealerAvg).length !== 0 && this.props.dealerAvg !== nextProps.dealerAvg){
            let ceilVal = Math.ceil(nextProps.dealerAvg.Average/45);
            this.AvgValue = ceilVal*45;
            }
        }

render() {
    return (
            <div className="row" id="bellInfopanel">
                <div className="col-md-6">
                    <div>Total Number of Dealers: <span className="entryValue">1716</span> </div> 
                    <div>Ideal Response Time: <span className="entryValue">45 minutes</span> </div>
                </div>
                <div className="col-md-6">
                    <div>Dealer ID: <span className="entryValue">{this.props.dealerAvg.Dealer}</span> </div> 
                    <div>Dealer Average Response Time: <span className="entryValue">{this.AvgValue} minutes</span> </div>
                </div>
            </div>
        );
    }
}

BellCurveInfoPanel.propTypes = {
    dealerAvg: React.PropTypes.object.isRequired
};

export default BellCurveInfoPanel;