
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 

var QRCode = require('qrcode.react');


let AccountForm = React.createClass({
    getInitialState: function () {
        return { name: '', email:'', point: 0, desc: '', address: '', isEdit: false }
    },
    handleChangeName: function (event) {
        this.setState({ name: event.target.value });
    },
    handleChangeEmail: function (event) {
        this.setState({ email: event.target.value });
    },
    handleChangeDesc: function (event) {
        this.setState({ desc: event.target.value });
    },
    handleChangeAddress: function (event) {
        this.setState({ address: event.target.value });
    },
    handleEditClick: function (event) {
        let user_info = RStore.getUserInfo();
        user_info.name = this.state.name;
        user_info.address = this.state.address;
        user_info.email = this.state.email;
        user_info.desc = this.state.desc;

        RStore.setUserInfo(user_info);
        toastr.success('User Info Updated');
    },
    componentDidMount: function(user_info) {
        this.setState(RStore.getUserInfo());
    },
	render: function() {
    	let list = this.props.item;
		return (
            <div>
                <div className="form-group">
                    <label>{ Ri18n.account_name }:</label>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control"  />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.email }:</label>
                    <input type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.account_address }:</label>
                    <input type="text" value={this.state.address} onChange={this.handleChangeAddress} className="form-control"  />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.description }:</label>
                    <textarea className="form-control" value={this.state.desc} onChange={this.handleChangeDesc}  rows="5" id="item_description"></textarea>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.point }:</label>
                    <div className="inputGroupContainer">
                        <div className="input-group">
                            <input type="text" readOnly value={this.state.point} className="form-control" name="point" />
                            <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                        </div>
                    </div>
                </div>
                <button onClick={ this.handleEditClick } className="btn btn-default">{ Ri18n.edit }</button>
            </div>
);
	}
});


let accountSettings = [
    <AccountForm />
];

export default accountSettings