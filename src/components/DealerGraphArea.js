import React, {Component, props} from 'react';
import BellCurveGraph from './BellCurveGraph';
import InfoPanel from './InfoPanel';
import BellCurveInfoPanel from './BellCurveInfoPanel';
import AgentStatInfoPanel from './AgentStatInfoPanel';
import PieChart from './PieChart';
import PieChart2 from './PieChart2';
import PieChart3 from './PieChart3';
import BarChart2 from './BarChart2';
import PieChart4 from './PieChart4';
import PieChart5 from './PieChart5';
import PieChart6 from './PieChart6';
import PieChart7 from './PieChart7';
import PieChart8 from './PieChart8';
import PieChart9 from './PieChart9';
import PieChart10 from './PieChart10';
import PieChart11 from './PieChart11';

class DealerGraphArea extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 drop-shadow" id="BellCurve"><BellCurveGraph dataValues={this.props.appData}/></div>
                <div className="col-md-12 drop-shadow" id="BellInfoPanel"><BellCurveInfoPanel dataValues={this.props.appData}/></div>
                <div className="col-md-12 drop-shadow" id="infoPanel"><InfoPanel dataValues={this.props.appData}/></div>
                <div className="col-md-12 drop-shadow" id="AgentStatInfoPanel">
                    <h4>Agent Statistics</h4><hr/>
                    <AgentStatInfoPanel dataValues={this.props.appData}/>
                </div>
                <div className="col-md-12 drop-shadow" id="CustomerInfoPanel">
                    <h4>Top 10 Lead Info</h4>
                <table className="table table-hover">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Vehicle Name</th>
              <th>Vehicle Model</th>
              <th>Vehicle year</th>
              <th>Sales Prediction Score</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <tr>
              <td>2314</td>
              <td>John Mentor</td>
              <td>Active</td>
              <td>Cadillac</td>
              <td>CTS</td>
              <td>2012</td>
              <td><PieChart2/></td>
            </tr>
            <tr>
              <td>2121</td>
              <td>Dwayne Johnson</td>
              <td>Inactive</td>
              <td>Lincon</td>
              <td>Aviator</td>
              <td>2016</td>
              <td><PieChart3/></td>
            </tr>
            <tr>
              <td>3611</td>
              <td>Ron Kuberts</td>
              <td>Active</td>
              <td>Acura</td>
              <td>RS-X</td>
              <td>2011</td>
              <td><PieChart11/></td>
            </tr>
            <tr>
              <td>1210</td>
              <td>Mark Wilbert</td>
              <td>Active</td>
              <td>Ford</td>
              <td>Fusion</td>
              <td>1998</td>
              <td><PieChart4 /></td>
            </tr>
            <tr>
              <td>1051</td>
              <td>Lara Medel</td>
              <td>Inactive</td>
              <td>Mercedes-Benz</td>
              <td>GL-Class</td>
              <td>2017</td>
              <td><PieChart5/></td>
            </tr>
            <tr>
              <td>6061</td>
              <td>Robert Redmond</td>
              <td>Inactive</td>
              <td>Toyota</td>
              <td>Camry</td>
              <td>2001</td>
              <td><PieChart6/></td>
            </tr>
            <tr>
              <td>1367</td>
              <td>Carl Carlos</td>
              <td>Active</td>
              <td>Ford</td>
              <td>Mustang</td>
              <td>2015</td>
              <td><PieChart7/></td>
            </tr>
             <tr>
              <td>3823</td>
              <td>Meghan Fox</td>
              <td>Active</td>
              <td>Tesla</td>
              <td>Model 3</td>
              <td>2016</td>
              <td><PieChart8/></td>
            </tr>
            <tr>
              <td>5921</td>
              <td>Vin Deisel</td>
              <td>Active</td>
              <td>Dodge</td>
              <td>Challenger</td>
              <td>1991</td>
              <td><PieChart9/></td>
            </tr>
            <tr>
              <td>1011</td>
              <td>Mark Deamon</td>
              <td>Inactive</td>
              <td>BMW</td>
              <td>560d</td>
              <td>2014</td>
              <td><PieChart10/></td>
            </tr>
          </tbody>
        </table>   
                </div>
            </div>
        );
    }
}

export default DealerGraphArea;