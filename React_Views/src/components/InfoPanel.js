import React, {Component, props} from 'react';
import AccessTime from 'react-icons/lib/md/access-time';
import MailOutline from 'react-icons/lib/md/mail-outline';
import Phone from 'react-icons/lib/md/call';

class InfoPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
       return (
            <div className="row" >
                <div className="col-sm-3 col-md-3">
                    <img src="http://www.ossline.com/media/User-Icon.png"
                        alt="" className="img-rounded img-responsive" />
                </div>
                <div className="col-sm-6 col-md-6">
                    <div className="row" id="midInfo">
                        <blockquote id="blockquoteId">
                            <h4><span>{this.props.selectedAgent.firstName}</span> <span>{this.props.selectedAgent.lastName}</span></h4> 
                            <span className="status active">status: <strong>{this.props.selectedAgent.currentStatus}</strong></span>

                            <div> <p><MailOutline color="gray"/>{this.props.selectedAgent.emailAddress}</p>
                                <p><Phone color="gray"/>{this.props.selectedAgent.cellPhone}</p></div>
                        </blockquote>
                    </div>
                </div>
                <div className="col-sm-3 col-md-3" id="lastInfo">
                    <p>Clocked-in <AccessTime/></p>
                    <p>08/25/16 09:37:15 AM</p>
                </div>
            </div>
        );
    }
}

InfoPanel.propTypes = {
    selectedAgent: React.PropTypes.object.isRequired
};

export default InfoPanel;