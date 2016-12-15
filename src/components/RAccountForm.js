import React, { Component, PropTypes } from 'react'

import { Field, reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'
import QRCode from 'qrcode.react';

class RAccountForm extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let oThis = this;
        Promise.all([RStore.getUserInfo()]).then(function(userData) {
            //oThis.setState(userData[0]);

        });
    }

    render() {
        console.log('RAccountForm - render');
        console.log(this);
        return (
            <div>
                <div className="form-group">
                    <QRCode value={ 'RJiBuyUserInfo - ' + this.props.uid } />
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
                            <Field name="point" component="input" type="text" readOnly className="form-control" />
                            <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.point_available }:</label>
                    <div className="inputGroupContainer">
                        <div className="input-group">
                            <Field name="point_available" component="input" type="text" readOnly className="form-control" />
                            <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                        </div>
                    </div>
                </div>
                <button onClick={ this.props.handleEditClick } className="btn btn-default">{ Ri18n.edit }</button>
            </div>
        )
    }
}

//export default RAccountForm
//Convert to Redux-Form
RAccountForm = reduxForm({
    form: 'RAccountForm',  // a unique identifier for this form
    //fields: ['uid','name', 'email', 'address', 'desc', 'point', 'point_available']
    onSubmit: function(value){
        console.log('onSubmit');
        console.log(value);
    },       // submit function must be passed to onSubmit
    initialValues: { uid: 0, name: '', email:'', point: 0, point_available: 0, desc: '', address: '' }
})(RAccountForm)

// Connect to Redux
function mapStateToProps(state) {
  return {
    uid: state.RGoogleInfo.uid,
    initialValues: {
        name: state.RGoogleInfo.uid,
        email: state.RGoogleInfo.uid
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoggedIn(dispObj) {
       // console.log('setLoggedIn');
       // console.log(dispObj);
        dispatch(setLoggedIn(dispObj.loggedIn));
        dispatch(setUserInfo(dispObj.userInfo));
    },   
     handleEditClick() {
        console.log('RAccountForm - submit(RAccountForm)');
        console.log(submit('RAccountForm'));
        console.log('RAccountForm - submit');
        console.log(submit);
        dispatch(submit('RAccountForm'));
    }

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RAccountForm);
