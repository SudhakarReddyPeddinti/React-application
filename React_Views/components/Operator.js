import React, {Component, props} from 'react';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import { Scrollbars } from 'react-custom-scrollbars';

class Operator extends React.Component{
constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.class = "row operator-div shadow";
}

handleClick(agent) {
    // Validate the selected Agent and the active Agent are not the same
    // before intiating the action to update the state. 
   this.props.actions.selectedAgent(agent);
}

render() {
     let spanStyle = {fontWeight: 'bold'};
     return (
        <div>
            <div onClick={()=>{this.handleClick(this.props.agent)}} className={this.props.className}>
                <div className="col-md-6 text-left contentFit"><MdAccountCircle size={35}/>
                    <span style={spanStyle}> {this.props.operatorFirstName} {this.props.operatorLastName}</span></div>
                <div className="col-md-6 overlay contentFit">Status: <span> {this.props.status}</span></div>
            </div>
        </div>
        );
    }
}

// Operator.propTypes = {
//     operatorName: React.propTypes.object.isRequired,
//     status: React.propTypes.object.isRequired
// }

export default Operator;