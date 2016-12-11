
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 


let open_order_form = function(obj, id){
    console.log(id);
}

let getItemName = function(type) {
    switch (type) {
        case '1': return Ri18n.order_type_find;
        case '2': return Ri18n.order_type_cm;
        default: return Ri18n.order_type_normal;
    }
} 


let getDate = function(timestamp) {
    var t = new Date(timestamp);
    return t.toDateString();
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
                            <td><button onClick={ open_order_form.bind(item.id) } className="btn btn-default">{Ri18n.order_view}</button></td>
                        </tr>
        );
	}
});

let OrderForm = React.createClass({
    getInitialState: function () {
        return { name: '', price: '' }
    },
	render: function() {
    	let list = this.props.item;
		return (
            <div>
                    <h2>{Ri18n.history}</h2>
                    <p>{Ri18n.purchase_list_detail}:</p>            
                    <table className="table">
                        <thead>
                        <tr>
                            <th>{Ri18n.item_name}</th>
                            <th>{Ri18n.order_type}</th>
                            <th>{Ri18n.price}</th>
                            <th>{Ri18n.date}</th>
                            <th>{Ri18n.order_detail}</th>
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
    <OrderForm item = { [] } />
//<OrderForm item = { order_items } />
];

export default order