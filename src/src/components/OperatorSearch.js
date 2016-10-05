import React, {Component} from 'react';

class OperatorSearch extends React.Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
     this.props.Actions.handleFilterUserInput(this.refs.filterTextInput.value);
     console.log("Filtered Input");
     console.log(this.props.Data);
  }

render() {
    let inlineStyle = {padding:'10px 0'};
    return (
        <div>
                    <div className="input-group" id="adv-search">
                        <input type="text" className="form-control" placeholder="Search Agent.." ref="filterTextInput" onChange={()=>this.handleChange()}/>
                    <div className="input-group-btn">
                        <div className="btn-group" role="group">
                            <div className="dropdown dropdown-lg">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="glyphicon glyphicon-filter"></span></button>
                                        <div className="dropdown-menu dropdown-menu-right" role="menu">
                                            <form className="form-horizontal" role="form">
                                                <div className="row" style={inlineStyle}>
                                                    <div className="col-md-6">
                                                        <input className="form-control filterfields" placeholder="Firstname" type="text" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input className="form-control filterfields" placeholder="Lastname" type="text" />
                                                    </div>
                                                </div>
                                                <div className="row" style={inlineStyle}>
                                                    <div className="col-md-12">
                                                        <input className="form-control filterfields" placeholder="email" type="text" />
                                                    </div>
                                                </div>
                                                <div className="row" style={inlineStyle}>
                                                    <div className="col-md-12">
                                                        <button type="submit" className="btn btn-primary">Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </div>
                        </div>
                    </div>
            </div>
    );
}
}

export default OperatorSearch;