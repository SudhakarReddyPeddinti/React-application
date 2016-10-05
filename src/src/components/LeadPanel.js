import React, {Component, props} from 'react';
import PieChart from './PieChart';
import LeadRow from './LeadRow';

class LeadPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.rows = []
    }

    componentWillReceiveProps(nextProps) {
      nextProps.dataValues.leadData.map(lead => {
            this.rows.push(<LeadRow leadInfo={lead} key={lead.autoLeadId}/>)
        });
    }

    render() {
        return (
            <div>
                <div className="table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Year</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Source</th>
                                <th>Status</th>
                                <th>Lead Type</th>
                                <th>Prediction Score</th>
                            </tr>
                        </thead>
                        <tbody>{this.rows}</tbody>
                    </table>
                </div>
            </div >
        );
    }
}
export default LeadPanel;