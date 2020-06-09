import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItems'
import "./App.css";

class App extends Component {
	state = {
		isEditMode:false,
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
	editItem = () => {
		this.setState({
			isEditMode: !this.state.isEditMode
		})
	}

	render() {
		return (

			<ListItem
				todos={this.state.todos}
				addItem={this.addItem}
				handleInputValue = {this.handleInputValue}
				deleteItem={this.deleteItem}
				editItem = {this.editItem}/>
		)
	}
}

export default App;