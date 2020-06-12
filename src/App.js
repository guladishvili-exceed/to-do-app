import React, {Component, createRef} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItems'
import axios from 'axios'
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
	btnRef = createRef();

	setPageCount = () => {
		let {todos} = this.state;
		this.setState({pageCount: Math.ceil(todos.length / 10)});
	}

	renderPagination = () => {
		let {pageCount} = this.state

		const paging = []

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

	componentDidMount() {
		axios
			.get("http://localhost:8080/")
			.then((res) => {
				this.setState({todos: res.data})
				console.log('--------this.state.todos', this.state.todos);
				this.setPageCount()
			})
			.catch((err) => {
				console.log("err", err);
			});
	}

	addItem = () => {
		let {todos} = this.state
		if (this.inpRef.current.value === '') {
			return alert('We dont do that here....')
		} else {
			axios
				.post(`http://localhost:8080/add`, {
					todo: this.inpRef.current.value,
					checked: false,
				})
				.then((res) => {
					this.setState({
						todos:[...todos,{todo:res.data.todo,_id:res.data._id,checked:false}]
					})
					console.log('id',res.data._id);
				})
				.catch((err) => {
					console.log("err", err);
				});
			this.setPageCount()
		}
		this.inpRef.current.value = ''
		console.log('--------this.state.todos', this.state.todos);
	}
	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			{
				this.addItem()
			}
		}
	}

	deleteItem = (id) => {
		const todos = this.state.todos.filter((item => item._id !== id))
		axios
			.delete(`http://localhost:8080/delete/${id}`)
			.then((res) => {
				this.setState({
					todos,
					pageCount: Math.ceil(todos.length / 10)
				})
			})
			.catch((err) => {
				console.log("err", err);
			});
	}

	submitEdit = (id, value) => {
		let {todos} = this.state
		todos.map(((item,i) => {
			if (item._id === id) {
				return axios
					.put(`http://localhost:8080/edit/${id}`, {
						todo: value,
					})
					.then((res) => {
						this.setState({
							todos:[...todos.slice(0,i),{todo:value,_id:id},...todos.slice(i+1)]
						})
						console.log("res", res);
					})
					.catch((err) => {
						console.log("err", err);
					});
			}
		}))
	}

	updateSingleCheckBox = (id) => {
		axios
			.put(`http://localhost:3000/edit/${id}`, {
				checked: this.btnRef.checked
			})
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	// updateAllCheckboxRequest = () =>{
	// 	axios
	// 		.put(`http://localhost:3000/checkEdit/`,{
	// 			checked : this.isAllCheckboxesChecked()
	// 		})
	// 		.then((res) => {
	// 			console.log("res", res);
	// 		})
	// 		.catch((err) => {
	// 			console.log("err", err);
	// 		});
	//
	// }



	render() {


		const {itemsPerPage, currentPage, todos} = this.state;

		console.log('--------todos', todos);


		const end = currentPage * itemsPerPage
		const start = end - itemsPerPage
		const currentItems = todos.slice(start, end);
		return <div className={"App"}>
			<div className="App-header">
				<h2>Welcome to To-Do List App</h2>
			</div>
			<input ref={this.inpRef} onKeyPress={this.handleKeyPress} name={''} type='text'/>
			<button onClick={() => this.addItem()} className={'btn btn-primary'}>Add</button>
			<button  className={'btn btn-primary'}>Check All</button>
			<ul>
				{
					currentItems.map(todoItem => {
						return <ListItem
							key={todoItem._id}
							todoItem={todoItem}
							deleteItem={this.deleteItem}
							editItem={this.editItem}
							submitEdit={this.submitEdit}
							deleteData = {this.deleteData}
						/>
					})
				}
				<div>
					{this.renderPagination()}
				</div>
			</ul>
		</div>
	};
}

export default App;

