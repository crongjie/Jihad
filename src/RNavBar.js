/*
RNavBar - Nav Bar Component
*/
import React from 'react'
import { Link } from 'react-router'

function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return ""+re.exec(window.location.pathname);
}

let BASE_URL = getBaseUrl();
if (_.endsWith(BASE_URL,'/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'


let RNavBar = React.createClass({
	render: function() {

    let { title, items } = this.props.data;


		return (
<div className="container">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">{title}</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
          {
            items.map(function(menuitem, idx) {
              if (menuitem.items) {
                return (<li  key = { 'mi' + idx } className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{menuitem.text} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                      {
                        menuitem.items.map(function(subitem, sidx){
                            if (subitem.type == 'separator') return <li key = { 'mi' + idx + '-'  + sidx } role="separator" className="divider"></li>;
                            else if (subitem.type == 'header') return <li key = { 'mi' + idx + '-'  + sidx } className="dropdown-header">{subitem.text}</li>;
                            else return <li key = { 'mi' + idx + '-'  + sidx }><Link to={ BASE_URL + subitem.url }>{subitem.text}</Link></li>
                        })
                      }
                  </ul>
                </li>)
              }else{
                return <li key = { 'mi' + idx }><Link to={ BASE_URL + menuitem.url }>{menuitem.text}</Link></li>
              }
            }) 
          }
          </ul></div></div></nav></div>
);
	}
});
  	
export default RNavBar