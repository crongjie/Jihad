/*
RMemo - Memo Component
*/
import React from 'react'


let RMemo = React.createClass({
	render: function() {
    	let item = this.props.item;
		return (
			<div className="rj-textblock rj-textblock-green" ><h4>{ (item.title) ? item.title : 'Memo'}</h4>            
				{ 
					item.text.split('\r\n').map(function(line, idx){
						return <p key = { 'rdl'+idx }>{line}</p>;
					})
				}
			</div>);
	}
});
  	
export default RMemo
