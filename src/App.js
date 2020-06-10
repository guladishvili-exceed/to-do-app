import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItems'
import Pagination from './components/Pagination'
import "./App.css";

class App extends Component {
	state = {
		inputValue: '',
		todos: [],
		currentPage:1,
		pageCount:1,
	};

	setPageCount = () => {
			let {todos} = this.state
		  this.setState({pageCount: Math.ceil(todos.length / 5)})
			console.log('--------this.state.pageCount', this.state.pageCount );
	}

	renderPagination = () => {
		return <Pagination />
	}

	handleInputValue = (event) => {
		this.setState({inputValue: event.target.value});
	}
	addItem = () => {
		let {inputValue, todos} = this.state
		this.setState({todos: [...todos, {inputValue, id: uuidv4()}]})
		this.setPageCount()
		this.renderPagination()

	}
	deleteItem = (todoID) => {
		const todos = this.state.todos.filter((item => item.id !== todoID))
		this.setState({todos})
	}

	submitEdit = (id, value) => {
		let {todos} = this.state
		let newArray = todos.map(item => {
			if (item.id === id) {
				return {
					...item,
					inputValue: value,
				}
			}
			return item;
		})
		this.setState({todos:newArray})

	}

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
						editItem={this.editItem}
						submitEdit={this.submitEdit}
					/>)
				}
			</ul>
		</div>
	};
}

export default App;

