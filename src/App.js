import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItems'
import "./App.css";

class App extends Component {
	state = {
		todos: [],
	};
	handleInputValue = (event) => {
		this.setState({inputValue: event.target.value, id: uuidv4()});
	}
	addItem = () => {
		let {inputValue, todos, id} = this.state
		this.setState({todos: [...todos, {inputValue, id}]})

	}
	deleteItem = (todoID) => {
		const todos = this.state.todos.filter((item => item.id !== todoID))
		this.setState({todos})
	}

	editItem = (todoID) => {
		const todos = this.state.todos.forEach((item => item.id === todoID))
		console.log('-----todo',todos)

	};

	render() {
		return <div className={"App"}>
			<div className="App-header">
				<h2>Welcome to To-Do List App</h2>
			</div>
			<input onChange={this.handleInputValue} name={''} type='text'/>
			<button onClick={() => this.addItem()} className={'btn btn-primary'}>Add</button>
			<ul>
				{
					this.state.todos.map(todoItem => <ListItem
						key={todoItem.id}
						todoItem={todoItem}
						deleteItem={this.deleteItem}
						editItem = {this.editItem}
					/>)
				}
			</ul>

		</div>
	};
}

export default App;