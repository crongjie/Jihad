import React, { Component, PropTypes } from 'react'

import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'


class ROrderCopy extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let oThis = this;
    }

    render() {
        const list = this.props.list;
        return (
            <div className="form-group">
                    <label className="control-label">{ Ri18n.copy_from_old_order }</label>
                    <div className="selectContainer">
                        <select name="orderCopy" onChange={this.props.onChange}>
                            {
                                list.map(function(item, idx){
                                    return <option key = { 'roc' + idx } value={ item.id }>{ item.name }</option>;
                                })
                            }
                        </select>
                    </div>
            </div>
        )
    }
}

export default ROrderCopy;
