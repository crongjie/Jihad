/*
RExample - Example Component
*/
import React from 'react'

let RExample = React.createClass({
	render: function() {
    let item = this.props.item;
		return (<div className="rj-textblock rj-textblock-blue" ><h4>{ (item.title) ? item.title : ''}</h4>{item}</div>);
	}
});
  	
export default RExample
