
import React from 'react'
import RStore from './RStore.js' 

var QRCode = require('qrcode.react');

let order_items = [];
let item_id = 0;

let OrderItem  = React.createClass({
	render: function() {
    	let item = this.props.item;
		return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><QRCode value={ 'RJQRCode - ' + item.id } /></td>
                        </tr>
        );
	}
});

let OrderForm = React.createClass({
    getInitialState: function () {
        return { name: '', price: '' }
    },
    handleChangeName: function (event) {
        this.setState({ name: event.target.value });
    },
    handleChangePrice: function (event) {
        this.setState({ price: event.target.value });
    },
    handleAddClick: function (event) {
        ++item_id;
        RStore.addOrder( { id: item_id, name: this.state.name, price: this.state.price });
        //order_items.push( { id: item_id, name: this.state.name, price: this.state.price })
        this.setState({ name: '', price: '' });
        toastr.success('Item added');
    },
	render: function() {
    	let list = this.props.item;
		return (
            <div>
                <div className="form-group">
                    <label>Item Name:</label>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" id="item_name" />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" rows="5" id="item_description"></textarea>
                </div>
                <div className="form-group">
                    <label>URL:</label>
                    <input type="text" className="form-control" id="item_url" />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" className="form-control" id="item_image_url" />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={this.state.price} onChange={this.handleChangePrice}  className="form-control" id="price" />
                </div>
                <button onClick={ this.handleAddClick } className="btn btn-default">Add</button>
            </div>
);
	}
});


let order = [
    <OrderForm item = { RStore.getOrders() } />
//<OrderForm item = { order_items } />
];

export default order