import React, {Component, props} from 'react';
import OperatorList from './OperatorList';
import DealerGraphArea from './DealerGraphArea';
import * as actions from '../actions/operatorPanelActions';
import * as apiActions from '../actions/awsApiActions';
import DemoGraph from './DemoGraph';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BellCurveInfoPanel from './BellCurveInfoPanel';

class DealerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="row drop-shadow">
          <div className="col-md-12 drop-shadow chart"><DemoGraph globalChartData={this.props.appData.globalChartData} dealerAvg={this.props.appData.dealerAvgData} selectedAgent={this.props.appData.selectedAgent} actions={this.props.Actions}/></div>
          <div className="col-md-12 drop-shadow"><BellCurveInfoPanel dealerAvg={this.props.appData.dealerAvgData}/></div>
        </div>
        <div className="row">
          <div className="col-md-4" id="leftPanel"><OperatorList appData={this.props.appData.dealerData} filteredData={this.props.appData.filteredAgent} selectedAgent={this.props.appData.selectedAgent} activityActions={this.props.Actions}/></div>
          <div className="col-md-8" id="rightPanel"><DealerGraphArea appData={this.props.appData} actions={this.props.Actions}/></div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appData: state.toolbarAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(objectAssign({}, actions, apiActions), dispatch)
  };
}

DealerPage.propTypes = {
  appData: React.PropTypes.object.isRequired,
  Actions: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DealerPage);