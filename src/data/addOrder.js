
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 


let OrderForm = React.createClass({
    getInitialState: function () {
        return { orderType: '0', name: '', price: '' }
    },
    handleChangeName: function (event) {
        this.setState({ name: event.target.value });
    },
    handleChangePrice: function (event) {
        this.setState({ price: event.target.value });
    },
    handleChangeOrderType: function (event) {
        this.setState({ orderType: event.target.value });
    },
    handleAddClick: function (event) {
        RStore.addOrder( { name: this.state.name, price: this.state.price });
        this.setState({ orderType: '0', name: '', price: '' });
        toastr.success('Item added');
    },
	render: function() {
		return (
            <div>

                <div className="form-group">
                    <label className="control-label">{ Ri18n.order_type }</label>
                    <div className="selectContainer">
                        <select className="form-control" name="color" value={this.state.orderType} onChange={ this.handleChangeOrderType }>
                            <option value="0">{ Ri18n.order_type_normal }</option>
                            <option value="1">{ Ri18n.order_type_find }</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.item_name }:</label>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" id="item_name" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.description }:</label>
                    <textarea className="form-control" rows="5" id="item_description"></textarea>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.url }:</label>
                    <input type="text" className="form-control" id="item_url" />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.image_url }:</label>
                    <input type="text" className="form-control" id="item_image_url" />
                </div>
                { (this.state.orderType == '1') ? (
                    <div>
                    <div className="form-group">
                        <label>{ Ri18n.original_price }:</label>
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <input type="text" value={this.state.price} onChange={this.handleChangePrice} className="form-control" name="price" />
                                <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{ Ri18n.highest_price }:</label>
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <input type="text" className="form-control" name="price" />
                                <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{ Ri18n.actual_price }:</label>
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <input type="text" className="form-control" name="price" />
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
                                <input type="text" value={this.state.price} onChange={this.handleChangePrice} className="form-control" name="price" />
                                <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                            </div>
                        </div>
                    </div>
                ) }
                <button onClick={ this.handleAddClick } className="btn btn-default">Add</button>
            </div>
);
	}
});


let order = [
    <OrderForm />
//<OrderForm item = { order_items } />
];

export default order