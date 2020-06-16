import React, {Component, createRef} from "react";
import {v4 as uuidv4} from 'uuid';
import ListItem from './ListItems'
import axios from 'axios'



class ToDoApp extends Component {
	state = {
		username:'',
		inputValue: '',
		todos: [],
		currentPage: 1,
		pageCount: 1,
		itemsPerPage: 10,
	};

	inpRef = createRef();



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
			.get(`http://localhost:8080/${localStorage.getItem('username')}`)
			.then((res) => {
				this.setState({todos: res.data})
				console.log('--------res.data', res.data);
				this.setPageCount()
			})
			.catch((err) => {
				console.log("err", err);
			});
	}



	addItem = () => {
		let {todos} = this.state
		let userName = localStorage.getItem('username')
		console.log('--------userName', userName);
		if (this.inpRef.current.value === '') {
			return alert('We dont do that here....')
		} else {
			axios
				.post(`http://localhost:8080/add`, {
					username: userName,
					todo: this.inpRef.current.value,
					checked: false,
				})
				.then((res) => {
					this.setState({
						todos:[...todos,{ username:res.data.username,todo:res.data.todo,_id:res.data._id,checked:false}]
					})
					console.log('res', res)
				})
				.catch((err) => {
					console.log("err", err);
				});
			this.setPageCount()
		}
		this.inpRef.current.value = ''
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

	checkBoxRouteUpdate = () => {
		axios
			.put(`http://localhost:8080/checkEdit/`, {
				checked: this.state.todos.every(todo => todo.checked)
			}).then((res) => {
			console.log("res", res);
		})
			.catch((err) => {
				console.log("err", err);
			});
	}

	checkAllCheckBox = () => {
		let {todos} = this.state
		let newArray = [...todos]
		if (newArray.length !==0) {
			newArray.map(item => {
				return item.checked = !item.checked
			})
			this.checkBoxRouteUpdate()
			this.setState({todos: newArray})

		}
	}

	checkSingleCheckBox = (id) => {
		let {todos} = this.state
		let newArray = [...todos]
		newArray.forEach(item => {
			if (item._id === id) {
				item.checked = !item.checked
				axios
					.put(`http://localhost:8080/edit/${id}`,{
						checked:item.checked
					})
					.then(res => {
						this.setState({todos: newArray})
						console.log('res',res)
					})
					.catch((err) => {
						console.log("err", err);
					});
			}
		})

	}

	deleteAllChecked = () => {
		const todos = this.state.todos.filter((item => item.checked !== true))
		axios
			.delete('http://localhost:8080/deleteAllChecked')
			.then((res) => {
				this.setState({ todos,
					pageCount: Math.ceil(todos.length / 10)})
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}


	render() {
		const {itemsPerPage, currentPage, todos} = this.state;
		const end = currentPage * itemsPerPage
		const start = end - itemsPerPage
		const currentItems = todos.slice(start, end);
		return <div className={"App"}>
			<div className="App-header">
				<h2 id={'h1'}>Welcome to To-Do List App</h2>
			</div>
			<input ref={this.inpRef} onKeyPress={this.handleKeyPress} name={''} type='text'/>
			<button onClick={() => this.addItem()} className={'btn btn-primary'}>Add</button>
			<button  onClick={() => this.checkAllCheckBox()}
			         className={'btn btn-primary'}>{this.state.todos.some(todo => todo.checked) ? "Uncheck All" : "Check All"}</button>
			<button onClick={() => {this.deleteAllChecked()}} className={'btn btn-primary'}>Delete Checked</button>

			<ul>
				{
					currentItems.map(todoItem => {
						return <ListItem
							key={todoItem._id}
							todoItem={todoItem}
							deleteItem={this.deleteItem}
							editItem={this.editItem}
							submitEdit={this.submitEdit}
							checkSingleCheckBox = {this.checkSingleCheckBox}
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

export default ToDoApp;