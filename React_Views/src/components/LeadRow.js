import React, {Component, props} from 'react';
import PieChart from './PieChart';

class LeadRow extends React.Component{
render() {
    return (
        <tr>
            <td>{this.props.leadInfo.customerName}</td>
            <td>{this.props.leadInfo.year}</td>
            <td>{this.props.leadInfo.make}</td>
            <td>{this.props.leadInfo.model}</td>
            <td>{this.props.leadInfo.leadSource}</td>
            <td>{this.props.leadInfo.leadStatus}</td>
            <td>{this.props.leadInfo.leadType}</td>
            <td><PieChart data={this.props.leadInfo.predictionScore} key={this.props.leadInfo.globalCustomerId}/></td>
        </tr>
        );
    }
}

LeadRow.propTypes = {
    leadInfo: React.PropTypes.object.isRequired
};

export default LeadRow;