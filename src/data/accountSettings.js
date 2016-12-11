
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 
import RGoogleInfo from '../RGoogleInfo.js' 

var QRCode = require('qrcode.react');

let AccountForm = React.createClass({
    getInitialState: function () {
        return { id: 0, name: '', email:'', point: 0, point_available: 0, desc: '', address: '', isEdit: false }
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
        if (this.state.name != '' && this.state.email != '' ) {
            let user_info = {
                point: this.state.point,
                point_available: this.state.point_available
            };
            user_info.name = this.state.name;
            user_info.address = this.state.address;
            user_info.email = this.state.email;
            user_info.desc = this.state.desc;

            RStore.setUserInfo(user_info);
            toastr.success('User Info Updated'); 
        }else{
            toastr.error('User Name Or Email is Empty!'); 
        }

    },
    componentDidMount: function(user_info) {
        let oThis = this;
        Promise.all([RStore.getUserInfo()]).then(function(userData) {

             oThis.setState(userData[0]);
        });
    },
	render: function() {
		return (
            <div>
                <div className="form-group">
                    <QRCode value={ 'RJiBuyUserInfo - ' + this.state.id } />
                </div>
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
                <div className="form-group">
                    <label>{ Ri18n.point_available }:</label>
                    <div className="inputGroupContainer">
                        <div className="input-group">
                            <input type="text" readOnly value={this.state.point_available} className="form-control" name="point" />
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
    <AccountForm />, <RGoogleInfo / >
];

export default accountSettings