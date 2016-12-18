
import React from 'react'
import Ri18n from '../Ri18n.js'
import ROrderForm from '../components/ROrderForm.js'
import ROrderCopy from '../components/ROrderCopy.js'

import { Field, reduxForm, submit, change, formValueSelector, reset } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'

let empty_item = {
    orderType: '0', 
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

let btn_enable = true;
let add_form_dispatch = null;

//Convert to Redux-Form
let AddOrderForm = reduxForm({
    form: 'AddOrderForm',  // a unique identifier for this form
    onSubmit: function(value){
        if (btn_enable) {
            btn_enable = false;
            
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
                    //this.setState(empty_item);
                    //console.log('submit');
                    //console.log(this);
                    //console.log(value);
                    if (add_form_dispatch) add_form_dispatch(reset('AddOrderForm'));
                    toastr.success('已成功提交訂單');
                    if (orderCopyFormThis) orderCopyFormThis.reload();
            }else{
                toastr.error('請輸入訂單的物品名稱!');
            }

            btn_enable = true;
        }
        //console.log('onSubmit');
        //console.log(value);

    }
})(ROrderForm)

// Connect to Redux
function mapStateToProps(state) {
    const selector = formValueSelector('AddOrderForm');
    return {
        name: selector(state, 'name'),
        orderType: selector(state, 'orderType'),
        initialValues: empty_item
    };
}

function mapDispatchToProps(dispatch) {
    add_form_dispatch = dispatch;
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
        handleEditClick() {
            //console.log('ROrderForm - submit(ROrderForm)');
            //console.log(submit('ROrderForm'));
            //console.log('ROrderForm - submit');
            //console.log(submit);
            dispatch(submit('AddOrderForm'));
        },
        handleDeleteClick() {

        },
        handleAddClick() {
            dispatch(submit('AddOrderForm'));
        }

    };
}

AddOrderForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddOrderForm);

let orderCopyFormThis = null;

let OrderCopyCombo = React.createClass({
    onChange: function(e){
        //console.log('onChange');
        //console.log(e);
        //console.log(e.target.value);
        let id = e.target.value;
        if (id && id != ''){
            let value = this.state.items[id];
            if (value && value.name && value.name != '' && add_form_dispatch){
                	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
                if(window.confirm(Ri18n.copy_confirm)){
                    add_form_dispatch(change('AddOrderForm', 'orderType', value.orderType));
                    add_form_dispatch(change('AddOrderForm', 'name', value.name));
                    add_form_dispatch(change('AddOrderForm', 'price', value.price));
                    add_form_dispatch(change('AddOrderForm', 'description', value.description));
                    add_form_dispatch(change('AddOrderForm', 'highest_price', value.highest_price));
                    add_form_dispatch(change('AddOrderForm', 'extra_price', value.extra_price));
                    add_form_dispatch(change('AddOrderForm', 'url', value.url));
                    add_form_dispatch(change('AddOrderForm', 'image_url', value.image_url));
                    add_form_dispatch(change('AddOrderForm', 'cm_date', value.cm_date));
                    add_form_dispatch(change('AddOrderForm', 'cm_place', value.cm_place));
                    add_form_dispatch(change('AddOrderForm', 'cm_circle', value.cm_circle));
                    add_form_dispatch(change('AddOrderForm', 'cm_priority', value.cm_priority));
                    add_form_dispatch(change('AddOrderForm', 'shippment_person', value.shippment_person));
                    add_form_dispatch(change('AddOrderForm', 'shippment_address', value.shippment_address));
                }

            }
        }

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
        orderCopyFormThis = oThis;
    },
	render: function() {
       let obj = this.state.items;
        let list = [{ id: '', name: '' }];
                        
        Object.keys(obj).forEach(function(key) {
            list.push(obj[key]);
        });

		return (
                    <ROrderCopy list={list} onChange={ this.onChange }/>
        );
	}
});


let order = [
    <OrderCopyCombo />,
    <AddOrderForm />
//<OrderForm item = { order_items } />
];

export default order