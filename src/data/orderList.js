
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 

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

let empty_item = {
    orderType: '0', 
    name: '', 
    price: '',
    description:'',
    actual_price: '',
    highest_price: '',
    extra_price: '',
    url: '',
    image_url: '',
    cm_date: '',
    cm_place: '',
    cm_circle: '',
    cm_priority: ''
};



let OrderPanel = React.createClass({
    getInitialState: function () {
        return { type: 0, item: empty_item }
    },
    showForm: function(item) {
        this.setState({type: 1, item: item});
    },
    showList: function() {
        this.setState({type: 0});
    },
    componentDidMount: function() {
        let oThis = this;
        panelComponent = oThis;
    },
	render: function() {
        return (this.state.type == 1) ? <OrderForm item = { this.state.item } /> : <OrderList />;
	}
});




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




let order = [
    <OrderPanel />
//<OrderForm item = { order_items } />
];

export default order