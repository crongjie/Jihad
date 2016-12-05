
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
    },
	render: function() {
    	let list = this.props.item;
		return (
            <div>
                    <h2>Ordered Item</h2>
                    <p>You have ordered the following item:</p>            
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>QR Code</th>
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


let order = [
    <OrderForm item = { RStore.getOrders() } />
//<OrderForm item = { order_items } />
];

export default order