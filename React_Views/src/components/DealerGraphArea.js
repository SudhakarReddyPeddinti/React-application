import React, {Component, props} from 'react';
import InfoPanel from './InfoPanel';
import BellCurveInfoPanel from './BellCurveInfoPanel';
import AgentStatInfoPanel from './AgentStatInfoPanel';
import LeadRow from './LeadRow';
import UserBellCurveGraph from './UserBellCurveGraph';
import LeadPanel from './LeadPanel';
import DemoPage from './DemoGraph';

class DealerGraphArea extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 drop-shadow" id="AgentStatInfoPanel">
          <h4>Agent Statistics - Dealer {this.props.appData.dealerAvgData.Dealer}</h4><hr/>
          <UserBellCurveGraph selectedAgent={this.props.appData.selectedAgent} actions={this.props.actions} dealerSpecificGraph={this.props.appData.dealerSpecificGraph}/>
          <AgentStatInfoPanel dealerSpecificGraph={this.props.appData.dealerSpecificGraph} />
        </div>
        <div className="col-md-12 drop-shadow" id="infoPanel"><InfoPanel selectedAgent={this.props.appData.selectedAgent}/></div>
       <div className="col-md-12 drop-shadow" id="CustomerInfoPanel"><h4>Top Lead Info</h4><LeadPanel leadData={this.props.appData.leadData}/></div> 
      </div>
    );
  }
}

DealerGraphArea.propTypes = {
  appData: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default DealerGraphArea;