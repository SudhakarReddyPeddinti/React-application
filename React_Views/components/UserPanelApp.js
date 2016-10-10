import React, {Component, PropTypes} from 'react';
import SearchBar from './OperatorSearch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/operatorPanelActions';
import { Link } from 'react-router';

class UserPanelApp extends Component {
    constructor(props, context) {
		super(props, context);
    }

     componentDidMount() {
         //this.props.actions.fetchCustomerData();
         this.props.actions.fetchDealerData();
         this.props.actions.fetchLeadData();
         this.props.actions.fetchGlobalChartData();
    }

    render() {
        console.log("UserPanelApp Render");
        //let panelStyle = {padding:'10px 5px', marginTop:"-1px"};
        let titleStyle = {fontWeight:'bold', fontFamily:'Roboto', fontSize:'18px'};
        let upstyle = {paddingLeft: 15};
        return (
            <div>
            <nav>
                <div className="row nav-wrapper grey darken-3" >
                    <div className="col-md-10 col-md-offset-1">
                         <div className="row">
                            <div style={titleStyle}>
                                <div className="col-md-2" style={upstyle}>
                                    <span>USER PANEL</span> 
                                </div>
                                <div className="col-md-10">
                                    <SearchBar Data={this.props.appState} Actions={this.props.actions}/>
                                </div>
                             </div>
                           {/* <div className="col-md-2 text-right" id="righticons">
                            <nav>
                                <Link to="/">Dealer</Link>
                                {" | "}
                                <Link to="Customer">Customer</Link>
                            </nav>
                            </div>*/}
                        </div>
                    </div>
                </div>
               {/* <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12"><SearchBar Data={this.props.appState} Actions={this.props.actions}/></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {      
      appState: state.toolbarAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

UserPanelApp.propTypes = {
    appState: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanelApp);