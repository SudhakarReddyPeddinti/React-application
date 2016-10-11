import React, {Component, props} from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';

class CustomerGraphArea extends React.Component{
    constructor(props, context) {
            super(props, context);
        }
    
render() {
    return (
        <div className="row">
           {/* <div className="col-md-12 drop-shadow" id="BarChart"><BarChart /></div>
            <div className="col-md-12 drop-shadow">
                <div className="row">
                    <div className="col-md-6 customerInfo">
                        <div className="entryItems" >
                            <div>Name: <span className="entryValue">Jamie Watson</span></div> 
                            <div>Phone: <span className="entryValue">+1 816-859-4443</span></div>
                            <div>Location: <span className="entryValue">Charlotte st, Kansas city, MO</span></div>
                            <div>Contacted by: <span className="entryValue">James Hale</span></div>
                            <div>Last contacted: <span className="entryValue">08/28/2016</span></div>
                        </div>
                    </div>
                    <div className="col-md-6" id="PieChart"><PieChart dataValues={this.props.appData}/></div>
                </div>
            </div> */}
        </div>
        );
    }
}

export default CustomerGraphArea;