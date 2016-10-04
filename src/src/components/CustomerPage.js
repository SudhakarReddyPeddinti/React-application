import React, {Component, props} from 'react';
import OperatorList from './OperatorList';
import CustomerGraphArea from './CustomerGraphArea';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/operatorPanelActions';

class CustomerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="row">
                        <div className="col-md-4 scroll" id="leftPanel"><OperatorList appData={this.props.Data.customerData} filteredData={this.props.Data.filteredAgent} selectedID={this.props.Data.chartDataID} activityActions={this.props.Actions}/></div>
                        <div className="col-md-8" id="rightPanel"><CustomerGraphArea appData={this.props.Data}/></div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Data: state.toolbarAppState
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);