import React, {Component, props} from 'react';
import BellCurveGraph from './BellCurveGraph';
import InfoPanel from './InfoPanel';
import BellCurveInfoPanel from './BellCurveInfoPanel';
import AgentStatInfoPanel from './AgentStatInfoPanel';
import LeadRow from './LeadRow';
import UserBellCurveGraph from './UserBellCurveGraph';
import LeadPanel from './LeadPanel';
import GlobalCurveGraph from './GlobalCurveGraph';

class DealerGraphArea extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log("DealerGraphArea.js :: ", this.props.appData);
    return (
      <div className="row">
        {/* <div className="col-md-12 drop-shadow" id="BellCurve"><h4>All Dealers plot</h4><hr/><BellCurveGraph dataValues={this.props.appData}/></div> */}
        <div><GlobalCurveGraph globalChartData={this.props.appData.globalChartData} selectedAgent={this.props.appData.selectedAgent} dealerAvg={this.props.appData.dealerAvgData} actions={this.props.actions}/></div>
        <div className="col-md-12 drop-shadow" id="BellInfoPanel"><BellCurveInfoPanel /></div>
        <div className="col-md-12 drop-shadow" id="AgentStatInfoPanel">
          <h4>Agent Statistics</h4><hr/>
          <UserBellCurveGraph selectedAgent={this.props.appData.selectedAgent} actions={this.props.actions}/>
          <AgentStatInfoPanel dataValues={this.props.appData} />
        </div>
        <div className="col-md-12 drop-shadow" id="infoPanel"><InfoPanel dataValues={this.props.appData}/></div>
        {/*  <div className="col-md-12 drop-shadow" id="CustomerInfoPanel"><h4>Top Lead Info</h4><LeadPanel dataValues={this.props.appData}/></div> */}
      </div>
    );
  }
}

DealerGraphArea.propTypes = {
  appData: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default DealerGraphArea;