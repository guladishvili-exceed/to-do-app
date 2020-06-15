import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ToDoApp from './components/ToDoApp'
import Nav from './components/Nav'
import Registration from './components/Registration'
import Login from "./components/Login";
import "./App.css";



class App extends Component {

	render() {

						return  <Router>
							<div className="App">
								<Nav />
								<Switch>
									<Route path={'/todoapp'} component={ToDoApp} />
									<Route path={'/registration'} component={Registration} />
									<Route path={'/login'} component={Login} />
								</Switch>
							</div>
						</Router>
					}
}

export default App;