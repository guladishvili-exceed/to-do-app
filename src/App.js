import React, {Component, createRef} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItems'
import "./App.css";

class App extends Component {
	state = {
		inputValue: '',
		todos: [],
		currentPage: 1,
		pageCount: 1,
		itemsPerPage: 10,
	};

	inpRef = createRef();

	setPageCount = () => {
		let {todos} = this.state;
		console.log('--------todos', todos);
		console.log('--------Math.ceil(todos.length / 5)', Math.ceil(todos.length / 10));

		this.setState({pageCount: Math.ceil(todos.length / 10)});
	}

	renderPagination = () => {
		let {pageCount} = this.state

		const paging = []
		
		console.log('--------pageCount', pageCount);

		for (let i = 1; i <= pageCount; i++) {
			paging.push(
				<button
					key={uuidv4()}
					className={'btn btn-info'}
					onClick={() => {
						this.setState({currentPage: i})
					}}>
					{i}
				</button>
			)
		}
		return paging
	}


	addItem = () => {
		let {todos} = this.state
		if (this.inpRef.current.value === '') {
			return alert('We dont do that here....')
		} else {
			this.setState({
				todos: [...todos, {inputValue: this.inpRef.current.value, id: uuidv4()}],
				pageCount: Math.ceil((todos.length + 1) / 10)
			})
			this.inpRef.current.value = ''
		}
	}
	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			{
				this.addItem()
			}
		}
	}

	deleteItem = (todoID) => {
		const todos = this.state.todos.filter((item => item.id !== todoID))
		this.setState({todos,
			pageCount: Math.ceil(todos.length / 10)})
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
		this.setState({todos: newArray})

	}

	render() {
		const {itemsPerPage, currentPage, todos} = this.state;
		const end = currentPage * itemsPerPage
		const start = end - itemsPerPage 
		const currentItems = todos.slice(start, end);
		return <div className={"App"}>
			<div className="App-header">
				<h2>Welcome to To-Do List App</h2>
			</div>
			<input ref={this.inpRef} onKeyPress={this.handleKeyPress} name={''} type='text'/>
			<button onClick={() => this.addItem()} className={'btn btn-primary'}>Add</button>
			<ul>
				{
					currentItems.map(todoItem => <ListItem
						key={todoItem.id}
						todoItem={todoItem}
						deleteItem={this.deleteItem}
						editItem={this.editItem}
						submitEdit={this.submitEdit}
					/>)
				}
				<div>
					{this.renderPagination()}
				</div>
			</ul>
		</div>
	};
}

export default App;

