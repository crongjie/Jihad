import React, { Component, PropTypes } from 'react'

import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'
import QRCode from 'qrcode.react';

const empty_item = {
    orderType: '0', 
    status: '0',
    ordered_at: '',
    name: '', 
    price: '',
    quantity: '',
    description:'',
    actual_price: '',
    highest_price: '',
    extra_price: '',
    url: '',
    image_url: '',
    cm_date: '',
    cm_place: '',
    cm_circle: '',
    cm_priority: '',
    shippment_person: '',
    shippment_address: ''
}

let getStatus = function(status) {
    switch (status) {
        case 1: return '待購入';
        case 2: return '購入準備中';
        case 3: return '已購入,待發貨';
        case 4: return '發貨準備中';
        case 5: return '待確認收貨';
        case 6: return '已收貨';
        default: return '待確認';
    }
} 

let getOrderTypeName = function(type) {
    switch (type) {
        case '1': return Ri18n.order_type_find;
        case '2': return Ri18n.order_type_cm;
        case '3': return Ri18n.order_shippment;
        case '4': return Ri18n.order_shippment_dou;
        default: return Ri18n.order_type_normal;
    }
} 

let getDate = function(timestamp) {
    var t = new Date(timestamp);
    return t.toDateString();
} 

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
        const isReadOnly = (this.props.status >= 2);
        if(isReadOnly) {
            readOnlyOpt['readOnly'] = 'readOnly';
        }
        console.log('this.props.isEdit');
        console.log(this.props.isEdit);
        return (
            <div>
                <div className="form-group">
                    <label className="control-label">{ Ri18n.order_type }</label>
                    <div className="selectContainer">
                    { (isReadOnly)? 
                        <input type="text" value={getOrderTypeName(this.props.orderType)} readOnly className="form-control" />
                         :
                        <Field name="orderType" component="select" >
                            <option value="0">{ Ri18n.order_type_normal }</option>
                            <option value="1">{ Ri18n.order_type_find }</option>
                            <option value="2">{ Ri18n.order_type_cm }</option>
                            <option value="3">{ Ri18n.order_shippment }</option>
                            <option value="4">{ Ri18n.order_shippment_dou }</option>
                        </Field>
                    }
                    </div>
                </div>
                { (isReadOnly)?
                    <div>
                        <div className="form-group">
                            <QRCode value={ 'RJiBuyOrderInfo - ' + this.props.order_id } />
                        </div> 
                        <div className="form-group">
                            <label>{Ri18n.order_status}:</label>
                            <input type="text" value={getStatus(this.props.status)} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.order_date}:</label>
                            <input type="text" value={getDate(this.props.ordered_at)} readOnly className="form-control" />
                        </div>
                    </div> 
                    : ''
                }
                { (this.props.orderType == '3' || this.props.orderType == '4') ?
                    <div>
                        <div className="form-group">
                            <label>{  Ri18n.order_name }:</label>
                            <Field name="name" component="input" type="text" className="form-control" {...readOnlyOpt} />
                        </div>
                        <div className="form-group">
                            <label>{  Ri18n.shippment_person }:</label>
                            <Field name="shippment_person" component="input" type="text" className="form-control" {...readOnlyOpt} />
                        </div>
                        <div className="form-group">
                            <label>{  Ri18n.shippment_address }:</label>
                            <Field name="shippment_address" component="input" type="text" className="form-control" {...readOnlyOpt} />
                        </div>
                    </div>
                    :   
                    <div>             
                        <div className="form-group">
                            <label>{ Ri18n.item_name }:</label>
                            <Field name="name" component="input" type="text" className="form-control" {...readOnlyOpt} />
                        </div>
                        <div className="form-group">
                            <label>{ Ri18n.quantity }:</label>
                            <Field name="quantity" component="input" type="number" className="form-control"  {...readOnlyOpt}  />
                        </div>
                    </div>
                }
                { (this.props.orderType == '2') ? (
                        <div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_date }:</label>
                                <Field name="cm_date" component="input" type="text" className="form-control" {...readOnlyOpt} />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_place }:</label>
                                <Field name="cm_place" component="input" type="text" className="form-control" {...readOnlyOpt} />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_circle }:</label>
                                <Field name="cm_circle" component="input" type="text" className="form-control" {...readOnlyOpt} />
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.cm_priority }:</label>
                                <Field name="cm_priority" component="input" type="text" className="form-control" {...readOnlyOpt} />
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    ) }
                <div className="form-group">
                    <label>{ Ri18n.url }:</label>
                    <Field name="url" component="input" type="text" className="form-control" {...readOnlyOpt}  />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.image_url }:</label>
                    <Field name="image_url" component="input" type="text" className="form-control"  {...readOnlyOpt}  />
                </div>
                {
                    (this.props.image_url && this.props.image_url != '') ? 
                        <div className="form-group">
                            <img src={this.props.image_url} />
                        </div> : ''
                } 
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
                                        <Field name="price" component="input" type="number" className="form-control" {...readOnlyOpt} />
                                        <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{ Ri18n.highest_price }:</label>
                                <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <Field name="highest_price" component="input" type="number" className="form-control" {...readOnlyOpt} />
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
                                    <Field name="price" component="input" type="number" className="form-control" {...readOnlyOpt} />
                                    <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                                </div>
                            </div>
                        </div>
                    ) }
                    <div className="form-group">
                         <label>{ Ri18n.actual_price }:</label>
                         <div className="inputGroupContainer">
                            <div className="input-group">
                                <Field name="actual_price" component="input" type="text" className="form-control" readOnly />
                                <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                            </div>
                        </div>
                    </div>
                    {
                        ( this.props.status >= 3) ? 
                        <div className="form-group">
                            <label>{ Ri18n.purchase_remarks }:</label>
                            <Field name="purchase_remarks" component="textarea" rows="5"  type="text" className="form-control" readOnly  />
                        </div>
                        : ''
                    }
                    { 
                        (isReadOnly) ? 
                            <button onClick={ this.props.handleBackClick } className="btn btn-default">{ Ri18n.back }</button> 
                             : (
                                 (this.props.isEdit == "true") ?
                                    <div>
                                        <button onClick={ this.props.handleEditClick } className="btn btn-default">{ Ri18n.edit }</button>
                                        &nbsp;&nbsp;
                                        <button onClick={ this.props.handleBackClick } className="btn btn-default">{ Ri18n.back }</button>
                                    </div>
                                    : <button onClick={ this.props.handleAddClick } className="btn btn-default">{ Ri18n.add }</button> 
                             )
                    }
                
            </div>
        )
    }
}

export default ROrderForm;
