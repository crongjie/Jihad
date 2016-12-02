
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import _ from 'lodash'


import pages from './data/pages.js'
import RPage from './RPage.js' 

function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return ""+re.exec(window.location.pathname);
}

let BASE_URL = getBaseUrl();
if (_.endsWith(BASE_URL,'/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'



/*
		<Route path="/" component={ RPage } data={pages.home} / >
		<Route path="/react_router" component={ RPage } data={pages.react_router} />
		<Route path="/react_router_redux" component={ RPage } data={pages.react_router_redux} />
		*/
let RNotfound = React.createClass({
	render: function() {
        return (<h2>{BASE_URL} route not found!</h2>);
	}
});
  	


ReactDOM.render(
	<Router history={ browserHistory }>
		<Route path={ BASE_URL +  "/" } component={ RPage }  / >
		<Route path={ BASE_URL +  "/:page" } component={ RPage }  / >
		<Route path="*" component={ RNotfound }  / >
	</Router>
, document.getElementById("main"));