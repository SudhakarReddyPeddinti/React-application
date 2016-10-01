import React, {Component, props} from 'react';
import OperatorList from './OperatorList';
import DealerGraphArea from './DealerGraphArea';
import * as actions from '../actions/operatorPanelActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DealerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.Actions.fetchGlobalChartData();
    console.log("AWS call requested");
  }

  render() {
    console.log("AWS :: Data received from props", this.props.appData);
    return (<div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="row">
          <div className="col-md-4 scroll" id="leftPanel"><OperatorList appData={this.props.appData.dealerData} filteredData={this.props.appData.filteredAgent} selectedDealer={this.props.appData.selectedDealer} activityActions={this.props.Actions}/></div>
          <div className="col-md-8" id="rightPanel"><DealerGraphArea appData={this.props.appData}/></div> 
          {/*<div className="col-md-4 scroll" id="leftPanel"><OperatorList /></div>
          <div className="col-md-8" id="rightPanel"><DealerGraphArea /></div> */}
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
    Actions: bindActionCreators(actions, dispatch)
  };
}

// ActivityView.propTypes = {
//     Model: React.PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(DealerPage);