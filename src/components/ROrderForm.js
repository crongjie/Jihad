import React, { Component, PropTypes } from 'react'

import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'
import QRCode from 'qrcode.react';


class ROrderForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let oThis = this;
        /*
        Promise.all([RStore.getUserInfo()]).then(function(userData) {
            //oThis.setState(userData[0]);
            oThis.props.setUserInfo(userData[0]);
        });*/
    }

    render() {
        const readOnlyOpt = {};
        if(this.props.name != '') {
            readOnlyOpt['readOnly'] = 'readOnly';
        }

        return (
            <div>
                <div className="form-group">
                    <label className="control-label">{ Ri18n.order_type }</label>
                    <div className="selectContainer">
                        <Field name="orderType" component="select">
                            <option value="0">{ Ri18n.order_type_normal }</option>
                            <option value="1">{ Ri18n.order_type_find }</option>
                            <option value="2">{ Ri18n.order_type_cm }</option>
                        </Field>
                    </div>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.item_name }:</label>
                    <Field name="name" component="input" type="text" className="form-control" />
                </div>
                { (this.props.orderType == '2') ? (
                        <div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_date }:</label>
                                <Field name="cm_date" component="input" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_place }:</label>
                                <Field name="cm_place" component="input" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_circle }:</label>
                                <Field name="cm_circle" component="input" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_priority }:</label>
                                <Field name="cm_priority" component="input" type="text" className="form-control" />
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    ) }
                <div className="form-group">
                    <label>{ Ri18n.url }:</label>
                    <Field name="url" component="input" type="text" className="form-control"  {...readOnlyOpt}  />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.image_url }:</label>
                    <Field name="image_url" component="input" type="text" className="form-control"  {...readOnlyOpt}  />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.description }:</label>
                    <Field name="description" component="textarea" rows="5"  type="text" className="form-control" {...readOnlyOpt}  />
                </div>
                { (this.props.orderType == '1' || this.props.orderType == '2') ? (
                        <div>
                            <div className="form-group">
                                <label>{ Ri18n.original_price }:</label>
                                <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <Field name="price" component="input" type="text" className="form-control" />
                                        <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.highest_price }:</label>
                                <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <Field name="highest_price" component="input" type="text" className="form-control" />
                                        <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.actual_price }:</label>
                                <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <Field name="actual_price" component="input" type="text" className="form-control" />
                                        <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>{ Ri18n.price }:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <Field name="price" component="input" type="text" className="form-control" />
                                    <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                </div>
                            </div>
                        </div>
                    ) }
                <button onClick={ this.props.handleAddClick } className="btn btn-default">Add</button>
            </div>
        )
    }
}

//export default ROrderForm
//Convert to Redux-Form
ROrderForm = reduxForm({
    form: 'ROrderForm',  // a unique identifier for this form
    onSubmit: function(value){
        //console.log('onSubmit');
        //console.log(value);

        if (value.name != '' && value.email != '' ) {
            RStore.setUserInfo(value);
            toastr.success('User Info Updated');
        }else{
            toastr.error('User Name Or Email is Empty!');
        }
    }
})(ROrderForm)

// Connect to Redux
function mapStateToProps(state) {
    const selector = formValueSelector('ROrderForm');
    return {
        name: selector(state, 'name'),
        orderType: selector(state, 'orderType')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserInfo(userInfo) {
            dispatch(change('ROrderForm', 'uid', userInfo.uid));
            dispatch(change('ROrderForm', 'name', userInfo.name));
            dispatch(change('ROrderForm', 'email', userInfo.email));
            dispatch(change('ROrderForm', 'desc', userInfo.desc));
            dispatch(change('ROrderForm', 'address', userInfo.address));
            dispatch(change('ROrderForm', 'point', userInfo.point));
            dispatch(change('ROrderForm', 'point_available', userInfo.point_available));

        },
        handleAddClick() {
            console.log('ROrderForm - submit(ROrderForm)');
            console.log(submit('ROrderForm'));
            console.log('ROrderForm - submit');
            console.log(submit);
            dispatch(submit('ROrderForm'));
        }

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ROrderForm);
