import count from './count.js';  
import RGoogleInfo from './RGoogleInfo.js';  
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    count, RGoogleInfo, 
    form: formReducer,
    // Add the reducer to your store on the `routing` key
    routing: routerReducer
  })