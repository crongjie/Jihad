import React, { Component, PropTypes } from 'react'

import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'
import QRCode from 'qrcode.react';

class RAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = { id: 0, name: '', email:'', point: 0, point_available: 0, desc: '', address: '', isEdit: false };
    }

    handleEditClick() {
        console.log('RAccountForm - this');
        console.log(this);
    }
    componentDidMount() {
        let oThis = this;
        Promise.all([RStore.getUserInfo()]).then(function(userData) {
            oThis.setState(userData[0]);
        });

        console.log('RAccountForm - props');
        console.log(this.props);
    }

    render() {

        return (
            <div>
                <div className="form-group">
                    <QRCode value={ 'RJiBuyUserInfo - ' + this.state.id } />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.account_name }:</label>
                    <Field name="name" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.email }:</label>
                    <Field name="email" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.account_address }:</label>
                    <Field name="address" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.description }:</label>
                    <Field name="desc" component="textarea" type="text" rows="5" className="form-control" />
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
        )
    }
}

//export default RAccountForm

export default reduxForm({
    form: 'RAccountForm'  // a unique identifier for this form
})(RAccountForm)