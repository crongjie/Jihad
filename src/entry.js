
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import _ from 'lodash'
import pages from './data/pages.js'
import RPage from './RPage.js' 

  	
import reducers from './reducers'

const store = createStore(reducers);
/*
(function () {
	console.log('reducers');
  	console.log(reducers);
  	console.log(store);
})();*/

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)



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
        return (<h2>未實裝!</h2>);
	}
});


ReactDOM.render(
	<Provider store={store}>
		<Router history={ history }>
			<Route path={ BASE_URL +  "/" } component={ RPage } />
			<Route path={ BASE_URL +  "/:page" } component={ RPage } />
			<Route path="*" component={ RNotfound } />
		</Router>
	</Provider>
, document.getElementById("main"));



