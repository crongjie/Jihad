
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 
import ROrderForm from '../components/ROrderForm.js'

import { Field, reduxForm, submit, change, formValueSelector, reset } from 'redux-form'
import { connect } from 'react-redux'

var QRCode = require('qrcode.react');

let listComponent = null;
let panelComponent = null;
let formComponent = null;

let open_order_form = function(id){
    //console.log(id);
    listComponent.showForm(id);
}

let getItemName = function(type) {
    switch (type) {
        case '1': return Ri18n.order_type_find;
        case '2': return Ri18n.order_type_cm;
        default: return Ri18n.order_type_normal;
    }
} 

let getStatus = function(status) {
    switch (status) {
        case '1': return '';
        case '2': return '';
        default: return '待確認';
    }
} 


let getDate = function(timestamp) {
    var t = new Date(timestamp);
    return t.toDateString();
} 

let delete_order = function(id){
    Promise.all([RStore.deleteOrder(id)]).then(function(orderData) {
        if (listComponent && listComponent.reload) listComponent.reload();
    });
}


let empty_item = {
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

let init_item = empty_item;

let btn_enable = true;
let view_form_dispatch = null;

//Convert to Redux-Form
let ViewOrderForm = reduxForm({
    form: 'ViewOrderForm',  // a unique identifier for this form
    onSubmit: function(value){
        if (btn_enable) {
            btn_enable = false;
            /*
            if (value.name && value.name != '') {
                    let item = {
                        orderType: value.orderType, 
                        name: value.name, 
                        price: value.price, 
                        description:value.description, 
                        highest_price: value.highest_price, 
                        extra_price: value.extra_price, 
                        quantity: value.quantity,
                        url: value.url, 
                        image_url: value.image_url, 
                        cm_date: value.cm_date, 
                        cm_place: value.cm_place, 
                        cm_circle: value.cm_circle, 
                        cm_priority: value.cm_priority,
                        shippment_person: value.shippment_person,
                        shippment_address: value.shippment_address
                    };
                    RStore.addOrder(item);
                    if (view_form_dispatch) view_form_dispatch(reset('ViewOrderForm'));
                    toastr.success('已成功修改訂單');
            }else{
                toastr.error('請輸入訂單的物品名稱!');
            }
            */
            btn_enable = true;
        }
        //console.log('onSubmit');
        //console.log(value);

    }
})(ROrderForm)

// Connect to Redux
function mapStateToProps(state) {
    const selector = formValueSelector('ViewOrderForm');
    return {
        orderType: selector(state, 'orderType'),
        initialValues: init_item
    };
}

function mapDispatchToProps(dispatch) {
    view_form_dispatch = dispatch;
    return {
        /*
        setUserInfo(userInfo) {
            dispatch(change('ROrderForm', 'uid', userInfo.uid));
            dispatch(change('ROrderForm', 'name', userInfo.name));
            dispatch(change('ROrderForm', 'email', userInfo.email));
            dispatch(change('ROrderForm', 'desc', userInfo.desc));
            dispatch(change('ROrderForm', 'address', userInfo.address));
            dispatch(change('ROrderForm', 'point', userInfo.point));
            dispatch(change('ROrderForm', 'point_available', userInfo.point_available));

        },*/
        handleBackClick() {
            if (panelComponent) panelComponent.showList();
        },
        handleEditClick() {
            //console.log('ROrderForm - submit(ROrderForm)');
            //console.log(submit('ROrderForm'));
            //console.log('ROrderForm - submit');
            //console.log(submit);
            //dispatch(submit('ViewOrderForm'));
        },
        handleDeleteClick() {

        },
        handleAddClick() {
            //dispatch(submit('ViewOrderForm'));
        }

    };
}

ViewOrderForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewOrderForm);



/*

let OrderItem  = React.createClass({
	render: function() {
    	let item = this.props.item;
		return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{ getItemName(item.orderType) }</td>
                            <td>{item.price}</td>
                            <td>{getDate(item.ordered_at)}</td>
                            <td>{getStatus(item.status)}</td>
                            <td><button onClick={ open_order_form.bind(this,item.id) } className="btn btn-default">{Ri18n.order_view}</button></td>
                            <td><button onClick={ delete_order.bind(this,item.id) } className="btn btn-default">{Ri18n.order_delete}</button></td>
                        </tr>
        );
	}
});

let OrderList = React.createClass({
    showForm: function(itemId) {
        panelComponent.showForm(this.state.items[itemId]);
    },
    getInitialState: function () {
        return { items: {} }
    },
    reload: function() {
        let oThis = this;
        Promise.all([RStore.getOrders()]).then(function(orderData) {
             oThis.setState({ items: orderData[0] });
        });
    },
    componentDidMount: function() {
        let oThis = this;
        this.reload();
        listComponent = oThis;
    },
    handleChangeName: function (event) {
        this.setState({ name: event.target.value });
    },
    handleChangePrice: function (event) {
        this.setState({ price: event.target.value });
    },
    handleAddClick: function (event) {
        RStore.addOrder( { id: item_id, name: this.state.name, price: this.state.price });
        //order_items.push( { id: item_id, name: this.state.name, price: this.state.price })
        this.setState({ name: '', price: '' });
    },
	render: function() {

            let obj = this.state.items;
            let list = [];
                        
            Object.keys(obj).forEach(function(key) {
                list.push(obj[key]);
            });
            return (
                    <div>
                            <h2>{Ri18n.check_order}</h2>
                            <p>{Ri18n.order_list_detail}:</p>            
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>{Ri18n.item_name}</th>
                                    <th>{Ri18n.order_type}</th>
                                    <th>{Ri18n.price}</th>
                                    <th>{Ri18n.order_date}</th>
                                    <th>{Ri18n.order_status}</th>
                                    <th>{Ri18n.order_detail}</th>
                                    <th>{Ri18n.order_delete}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map(function(item, idx){
                                        return <OrderItem key = { 'pi' + idx } item={item} />;
                                    })
                                }
                                </tbody>
                            </table>
                    </div>
        );
	}
});
*/
let OrderItem  = React.createClass({
	render: function() {
    	let item = this.props.item;
		return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{getStatus(item.status)}</td>
                            <td><a href="#" onClick={ open_order_form.bind(this,item.id) } >{Ri18n.order_view}</a></td>
                            <td><a href="#" onClick={ delete_order.bind(this,item.id) } >{Ri18n.order_delete}</a></td>
                        </tr>
        );
	}
});

let OrderList = React.createClass({
    showForm: function(itemId) {
        panelComponent.showForm(this.state.items[itemId]);
    },
    getInitialState: function () {
        return { items: {} }
    },
    reload: function() {
        let oThis = this;
        Promise.all([RStore.getOrders()]).then(function(orderData) {
             oThis.setState({ items: orderData[0] });
        });
    },
    componentDidMount: function() {
        let oThis = this;
        this.reload();
        listComponent = oThis;
    },
    handleChangeName: function (event) {
        this.setState({ name: event.target.value });
    },
    handleChangePrice: function (event) {
        this.setState({ price: event.target.value });
    },
    handleAddClick: function (event) {
        RStore.addOrder( { id: item_id, name: this.state.name, price: this.state.price });
        //order_items.push( { id: item_id, name: this.state.name, price: this.state.price })
        this.setState({ name: '', price: '' });
    },
	render: function() {

            let obj = this.state.items;
            let list = [];
                        
            Object.keys(obj).forEach(function(key) {
                list.push(obj[key]);
            });
            return (
                    <div>
                            <h2>{Ri18n.check_order}</h2>
                            <p>{Ri18n.order_list_detail}:</p>            
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>{Ri18n.item_name}</th>
                                    <th>{Ri18n.status}</th>
                                    <th>{Ri18n.order_detail}</th>
                                    <th>{Ri18n.order_delete}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map(function(item, idx){
                                        return <OrderItem key = { 'pi' + idx } item={item} />;
                                    })
                                }
                                </tbody>
                            </table>
                    </div>
        );
	}
});

let OrderPanel = React.createClass({
    getInitialState: function () {
        return { type: 0, item: empty_item }
    },
    showForm: function(item) {
        init_item = item;
        this.setState({type: 1, item: item});
        if (view_form_dispatch && item) {
                view_form_dispatch(change('ViewOrderForm', 'status', item.status));
                view_form_dispatch(change('ViewOrderForm', 'ordered_at', item.ordered_at));

                view_form_dispatch(change('ViewOrderForm', 'orderType', item.orderType));
                view_form_dispatch(change('ViewOrderForm', 'name', item.name));
                view_form_dispatch(change('ViewOrderForm', 'price', item.price));
                view_form_dispatch(change('ViewOrderForm', 'description', item.description));
                view_form_dispatch(change('ViewOrderForm', 'highest_price', item.highest_price));
                view_form_dispatch(change('ViewOrderForm', 'extra_price', item.extra_price));
                view_form_dispatch(change('ViewOrderForm', 'url', item.url));
                view_form_dispatch(change('ViewOrderForm', 'image_url', item.image_url));
                view_form_dispatch(change('ViewOrderForm', 'cm_date', item.cm_date));
                view_form_dispatch(change('ViewOrderForm', 'cm_place', item.cm_place));
                view_form_dispatch(change('ViewOrderForm', 'cm_circle', item.cm_circle));
                view_form_dispatch(change('ViewOrderForm', 'cm_priority', item.cm_priority));
                view_form_dispatch(change('ViewOrderForm', 'shippment_person', item.shippment_person));
                view_form_dispatch(change('ViewOrderForm', 'shippment_address', item.shippment_address));
                view_form_dispatch(change('ViewOrderForm', 'quantity', item.quantity));
                view_form_dispatch(change('ViewOrderForm', 'actual_price', item.actual_price));

        }
    },
    showList: function() {
        this.setState({type: 0});
    },
    componentDidMount: function() {
        let oThis = this;
        panelComponent = oThis;
    },
	render: function() {
        const status = this.state.item.status;
        const ordered_at = this.state.item.ordered_at;
        const order_id = this.state.item.order_id;
        const image_url = this.state.item.image_url;
        const orderType = this.state.item.orderType;
        return (this.state.type == 1) ? <ViewOrderForm image_url={image_url} status={status} ordered_at={ordered_at} orderType={orderType} order_id={order_id} readOnly = "true" /> : <OrderList />;
	}
});

/*


let OrderForm = React.createClass({

    handleBackClick: function (event) {
        panelComponent.showList();
    },
    render: function () {
        let orderTypeName = getItemName(this.props.item.orderType);

        return (
            <div>
                <div className="form-group">
                    <QRCode value={ 'RJiBuyOrderInfo - ' + this.props.item.id } />
                </div>
                <div className="form-group">
                    <label className="control-label">{Ri18n.order_type}</label>
                    <input type="text" value={orderTypeName} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>{Ri18n.item_name}:</label>
                    <input type="text" value={this.props.item.name} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>{Ri18n.order_status}:</label>
                    <input type="text" value={getStatus(this.props.item.status)} readOnly className="form-control" />
                </div>
                <div className="form-group">
                    <label>{Ri18n.order_date}:</label>
                    <input type="text" value={getDate(this.props.item.ordered_at)} readOnly className="form-control" />
                </div>
                {(this.props.item.orderType == '2') ? (
                    <div>
                        <div className="form-group">
                            <label>{Ri18n.cm_date}:</label>
                            <input type="text" value={this.props.item.cm_date} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.cm_place}:</label>
                            <input type="text" value={this.props.item.cm_place} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.cm_circle}:</label>
                            <input type="text" value={this.props.item.cm_circle} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.cm_priority}:</label>
                            <input type="text" value={this.props.item.cm_priority} readOnly className="form-control" />
                        </div>
                    </div>
                ) : (
                        <div>
                        </div>
                    )}
                <div className="form-group">
                    <label>{Ri18n.url}:</label>
                    <input type="text" className="form-control" value={this.props.item.url} readOnly />
                </div>
                <div className="form-group">
                    <label>{Ri18n.image_url}:</label>
                    {
                        (this.props.item.image_url != '') ? 
                            <img src={this.props.item.image_url} /> : 
                            <input type="text" className="form-control" value={this.props.item.image_url} readOnly />
                    } 
                </div>
                <div className="form-group">
                    <label>{Ri18n.description}:</label>
                    <textarea className="form-control" rows="5" value={this.props.item.description} readOnly></textarea>
                </div>
                {(this.props.item.orderType == '1' || this.props.item.orderType == '2') ? (
                    <div>
                        <div className="form-group">
                            <label>{Ri18n.original_price}:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" value={this.props.item.price} readOnly className="form-control" name="price" />
                                    <span className="input-group-addon">{Ri18n.jap_dollar}</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.highest_price}:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" value={this.props.item.highest_price} readOnly className="form-control" name="price" />
                                    <span className="input-group-addon">{Ri18n.jap_dollar}</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>{Ri18n.actual_price}:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" className="form-control" name="price" value={this.props.item.actual_price} readOnly />
                                    <span className="input-group-addon">{Ri18n.jap_dollar}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="form-group">
                            <label>{Ri18n.price}:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" value={this.props.item.price} readOnly className="form-control" name="price" />
                                    <span className="input-group-addon">{Ri18n.jap_dollar}</span>
                                </div>
                            </div>
                        </div>
                    )}
                <button onClick={this.handleBackClick} className="btn btn-default">{Ri18n.back}</button>
            </div>
        );
    }
});

*/




let order = [
    <OrderPanel />
//<OrderForm item = { order_items } />
];

export default order