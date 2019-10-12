import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import ReduxThunk from 'redux-thunk'

ReactDOM.render(
  //configurando a a plicação com redux
  <Provider store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}>
    <Router>
      <App />
    </Router> 
  </Provider>, document.getElementById('root'));
