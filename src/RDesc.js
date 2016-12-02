/*
RDesc - Description Component
*/
import React from 'react'


let RDesc = React.createClass({
	render: function() {
    let item = this.props.item;

		return (
          <div className="rj-textblock rj-textblock-red"> 
            <h4>{ item.title }</h4><br />
            { 
              item.text.split('\r\n').map(function(line, idx){
                return <p key = { 'rdl'+idx }>{line}</p>;
              })
            }
            <br />
            {(( item.url ) ? 
            <div className="panel panel-info">
              <div className="panel-heading"><h3 className="panel-title">URL</h3></div>
              <div className="panel-body"><a href={ item.url }>{ item.url }</a></div>
            </div> : '')}
          </div>
    );
	}
});
  	
export default RDesc
