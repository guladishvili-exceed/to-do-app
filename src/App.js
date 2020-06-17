import React, {Component} from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ToDoApp from './components/ToDoApp'
import Nav from './components/Nav'
import Registration from './components/Registration'
import Login from "./components/Login";
import reducer from "./redux/rootReducer";
import "./App.css";

export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // chrome devtools thing
);

class App extends Component {

	render() {

						return  <Provider store={store}>
							<Router>
							<div className="App">
								<Nav />
								<Switch>
									<Route path={'/todoapp'} component={ToDoApp} />
									<Route path={'/registration'} component={Registration} />
									<Route path={'/login'} component={Login} />
								</Switch>
							</div>
						</Router>
						</Provider>
					}
}

export default App;