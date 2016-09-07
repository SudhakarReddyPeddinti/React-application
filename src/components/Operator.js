import React, {Component, props} from 'react';
import MdAccountCircle from 'react-icons/lib/md/account-circle';

class Operator extends React.Component{
constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.class = "row operator-div shadow";
}

handleClick(id) {
    this.props.actions.chartDataID(id);
    // if (id){
    //     this.class = "row operator-div shadow selected";
    // } else {
    //     this.class = "row operator-div shadow";
    // }
    console.log(id);
}

render() {
    let spanStyle = {fontWeight: 'bold'};
    return (
        <div>
            <div onClick={()=>{this.handleClick(this.props.id)}} className={this.props.className}>
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