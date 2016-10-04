import React, {Component, props} from 'react';
import Operator from './Operator';
import {chartDataID} from '../actions/operatorPanelActions';


class OperatorList extends React.Component{
     constructor(props, context) {
		super(props, context);
        this.actions = this.props.activityActions;
        this.className = "";
    }

    renderServer(operatorFirstName, operatorLastName, operatorStatus, operatorID, filteredText, selectedDealer, operator) {
        if (!operatorFirstName.toUpperCase().startsWith(filteredText.toUpperCase())) {
            return;
        }
        if (selectedDealer.userID === operatorID){
             this.className = "row operator-div shadow selected";
        } else {
             this.className = "row operator-div shadow";
        }
        return (<Operator operatorFirstName={operatorFirstName}  operatorLastName={operatorLastName} status={operatorStatus} actions={this.actions} dealer={operator} key={operatorID} className={this.className}/>);
    }

      renderOperators() {
        let operators = [];
        let count = 0;
        let selectedDealer;
        if (this.props.appData != null && this.props.appData != undefined && this.props.appData.length > 0)  {
           this.props.appData.map(operator => {
                   operators.push(this.renderServer(operator.firstName, operator.lastName, operator.currentStatus, operator.userID, this.props.filteredData, this.props.selectedDealer, operator))
                });
             }    
        return (<div className="row">{operators}</div>);
    }

render() {
    return (
        <div>
            {this.renderOperators()}
        </div>
        );
    }
}

export default OperatorList;