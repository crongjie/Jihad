/*
RMemo - Memo Component
*/
import React from 'react'


let RMemo = React.createClass({
	render: function() {
    	let item = this.props.item;

		let component_items = [];
		if (_.isArray(this.props.item.items))  component_items = this.props.item.items;


		return (
			<div className="rj-textblock rj-textblock-green" ><h4>{ (item.title) ? item.title : 'Memo'}</h4>            
				{ 
					item.text.split('\n').map(function(line, idx){
						return <p key = { 'rmemotxt'+idx }>{line}</p>;
					})
				}
				{
                        component_items.map(function(itm, idx){
                            return <div key = { 'rmemoitm'+idx } >{itm}</div>;
                        })
                }
			</div>);
	}
});
  	
export default RMemo
