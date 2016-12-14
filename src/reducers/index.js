import count from './count.js';  
import RGoogleInfo from './RGoogleInfo.js';  
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export default combineReducers({
    count, RGoogleInfo,
    // Add the reducer to your store on the `routing` key
    routing: routerReducer
  })