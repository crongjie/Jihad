import React, { Component, PropTypes } from 'react'

import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import RStore from '../data/RStore.js'
import Ri18n from '../Ri18n.js'


class RWelcomForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //let oThis = this;
    }

    render() {
        return (
            <div>{
                    (this.props.loggedIn) ?
                    <div>
                        <p>Welcome to JiBuy {this.props.name}~~~</p>
                        <div className="form-group">
                            <label>{ Ri18n.point }:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" readOnly value={this.props.point} className="form-control" name="point" />
                                    <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>{ Ri18n.point_available }:</label>
                            <div className="inputGroupContainer">
                                <div className="input-group">
                                    <input type="text" readOnly value={this.props.point_available} className="form-control" name="point" />
                                    <span className="input-group-addon">{ Ri18n.RJpoint }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <p>Welcome to JiBuy.</p>
            }</div>
        )
    }
}

export default RWelcomForm;
