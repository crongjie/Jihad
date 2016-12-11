
import React from 'react'
import RStore from './RStore.js' 
import Ri18n from '../Ri18n.js' 

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
}
let btn_enable = true;

let OrderForm = React.createClass({
    
    getInitialState: function () {
        return empty_item;
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

    handleChange_description: function (event) {
        this.setState({ description: event.target.value });
    },
    handleChange_actual_price: function (event) {
        this.setState({ actual_price: event.target.value });
    },
    handleChange_highest_price: function (event) {
        this.setState({ highest_price: event.target.value });
    },
    handleChange_original_price: function (event) {
        this.setState({ original_price: event.target.value });
    },

    handleChange_cm_date: function (event) {
        this.setState({ cm_date: event.target.value });
    },
    handleChange_cm_place: function (event) {
        this.setState({ cm_place: event.target.value });
    },
    handleChange_cm_circle: function (event) {
        this.setState({ cm_circle: event.target.value });
    },
    handleChange_cm_priority: function (event) {
        this.setState({ cm_priority: event.target.value });
    },
    handleChange_url: function (event) {
        this.setState({ url: event.target.value });
    },
    handleChange_image_url: function (event) {
        this.setState({ image_url: event.target.value });
    },

    handleChangeCMDate: function (event) {
        this.setState({ cm_date: event.target.value });
    },
    handleAddClick: function (event) {
        if (btn_enable) {
            btn_enable = false;
            if (this.state.name != '') {
                let item = {
                    orderType: this.state.orderType, 
                    name: this.state.name, 
                    price: this.state.price, 
                    description:this.state.description, 
                    actual_price: this.state.actual_price, 
                    highest_price: this.state.highest_price, 
                    extra_price: this.state.extra_price, 
                    url: this.state.url, 
                    image_url: this.state.image_url, 
                    cm_date: this.state.cm_date, 
                    cm_place: this.state.cm_place, 
                    cm_circle: this.state.cm_circle, 
                    cm_priority: this.state.cm_priority
                };
                RStore.addOrder(item);
                this.setState(empty_item);
                toastr.success('Item added');
            }else{
                toastr.error('Please input item name!'); 
            }

            btn_enable = true;
        }

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
                            <option value="2">{ Ri18n.order_type_cm }</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>{ Ri18n.item_name }:</label>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                </div>
                { (this.state.orderType == '2') ? (
                    <div>
                        <div className="form-group">
                            <label>{ Ri18n.cm_date }:</label>
                            <input type="text" value={this.state.cm_date} onChange={this.handleChange_cm_date} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{ Ri18n.cm_place }:</label>
                            <input type="text" value={this.state.cm_place} onChange={this.handleChange_cm_place} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{ Ri18n.cm_circle }:</label>
                            <input type="text" value={this.state.cm_circle} onChange={this.handleChange_cm_circle} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{ Ri18n.cm_priority }:</label>
                            <input type="text" value={this.state.cm_priority} onChange={this.handleChange_cm_priority} className="form-control" />
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                ) }
                <div className="form-group">
                    <label>{ Ri18n.url }:</label>
                    <input type="text" className="form-control" value={this.state.url} onChange={ this.handleChange_url } />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.image_url }:</label>
                    <input type="text" className="form-control" value={this.state.image_url} onChange={ this.handleChange_image_url } />
                </div>
                <div className="form-group">
                    <label>{ Ri18n.description }:</label>
                    <textarea className="form-control" rows="5" value={this.state.description} onChange={ this.handleChange_description }></textarea>
                </div>
                { (this.state.orderType == '1' || this.state.orderType == '2') ? (
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
                                <input type="text" value={this.state.highest_price} onChange={this.handleChange_highest_price} className="form-control" name="price" />
                                <span className="input-group-addon">{ Ri18n.jap_dollar }</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{ Ri18n.actual_price }:</label>
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <input type="text" className="form-control" name="price" value={this.state.actual_price} onChange={this.handleChange_actual_price}  />
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