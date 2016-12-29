
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



let getDate = function(timestamp) {
    var t = new Date(timestamp);
    return t.toDateString();
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
    shippment_address: '',
    purchase_remarks: ''
}

let init_item = empty_item;

let btn_enable = true;
let view_form_dispatch = null;

//Convert to Redux-Form
let ViewOrderForm = reduxForm({
    form: 'ViewOrderForm',  // a unique identifier for this form
    onSubmit: function(value){

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
        handleBackClick() {
            if (panelComponent) panelComponent.showList();
        },
        handleEditClick() {

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


let OrderItem  = React.createClass({
	render: function() {
    	let item = this.props.item;
		return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.actual_price}</td>
                            <td>{getStatus(item.status)}</td>
                            <td><a href="#" onClick={ open_order_form.bind(this,item.id) } >{ Ri18n.order_view } </a></td>
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
	render: function() {

            let obj = this.state.items;
            let list = [];
                        
            Object.keys(obj).forEach(function(key) {
                list.push(obj[key]);
            });
            return (

                    <div>
                            <h2>{Ri18n.history}</h2>
                            <p>{Ri18n.purchase_list_detail}:</p>            
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>{Ri18n.item_name}</th>
                                    <th>{Ri18n.price}</th>
                                    <th>{Ri18n.date}</th>
                                    <th>{Ri18n.order_detail}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map(function(item, idx){
                                        if (item.status >= 3) return <OrderItem key = { 'pi' + idx } item={item} />;
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
                view_form_dispatch(change('ViewOrderForm', 'id', item.id));
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
                view_form_dispatch(change('ViewOrderForm', 'purchase_remarks', item.purchase_remarks));

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
        return (this.state.type == 1) ? <ViewOrderForm image_url={image_url} status={status} ordered_at={ordered_at} orderType={orderType} order_id={order_id} /> : <OrderList />;
	}
});


let order = [
    <OrderPanel />
];

export default order