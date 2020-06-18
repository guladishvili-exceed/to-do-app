import React, {Component, createRef} from "react";
import {v4 as uuidv4} from 'uuid'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ListItem from './ListItems'
import axios from 'axios'

import {
	getAll,
	addItems,
	deleteItem,
	editItem,
	checkItem,
	checkAll,
	deleteAllChecked,
	setPageCount,
	changePage,
	previousPage,
	nextPage,
} from "../redux/actions/toDoItemsRelated";

class ToDoApp extends Component {

	inpRef = createRef()

	componentDidMount() {
		const {getAll,setPageCount} = this.props.actions;
		axios
			.get(`http://localhost:8080/${localStorage.getItem('username')}`)
			.then((res) => {
				getAll(res.data);
				setPageCount()
				console.log('--------res.data', res.data);
			})
			.catch((err) => {
				console.log("err", err);
			});

	}

	renderPagination = () => {
		let {changePage} = this.props.actions
		let {pageCount} = this.props
		const paging = []

		for (let i = 1; i <= pageCount; i++) {
			paging.push(
				<button
					key={uuidv4()}
					className={'btn btn-info'}
					onClick={() => {
						changePage(i)
					}}>
					{i}
				</button>
			)
		}
		return paging
	}


	addItem = () => {
		const {addItems, setPageCount,nextPage} = this.props.actions;
		let userName = localStorage.getItem('username')
		const {todos, currentPage, itemsPerPage} = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = (indexOfLastItem - itemsPerPage);
		const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);
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
					if (currentItems.length >= 10 ) {
							nextPage()
					}
					const {todo, checked, _id} = res.data;
					addItems(todo, checked, _id);
					setPageCount()
					console.log('res', res)
				})
				.catch((err) => {
					console.log("err", err);
				});
			this.inpRef.current.value = "";

		}
	}
	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			{
				this.addItem()
			}
		}
	}

	deleteItem = (id) => {
		const {deleteItem, setPageCount,previousPage} = this.props.actions;
		const {todos, currentPage, itemsPerPage} = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = (indexOfLastItem - itemsPerPage);
		const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);
		deleteItem(id);
		axios
			.delete(`http://localhost:8080/delete/${id}`)
			.then((res) => {
				if (currentItems.length  < currentPage) {
					previousPage()
				}
				setPageCount()
				console.log('res', res)
			})
			.catch((err) => {
				console.log("err", err);
			});
	}

	submitEdit = (id, value) => {
		const {editItem} = this.props.actions;
		editItem(id, value)
		axios
			.put(`http://localhost:8080/edit/${id}`, {
				todo: value,
			})
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});

	}

	checkSingleCheckBox = (id, checked) => {
		const {checkItem} = this.props.actions;
		checkItem(id)
		axios
			.put(`http://localhost:8080/edit/${id}`, {
				checked: !checked
			})
			.then(res => {
				console.log('res', res)
			})
			.catch((err) => {
				console.log("err", err);
			});


	}


	checkAllCheckBox = (checked) => {
		let {checkAll} = this.props.actions
		axios
			.put(`http://localhost:8080/checkEdit/`, {
				checked
			})
			.then((res) => {
				checkAll(checked)
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}


	deleteAllChecked = () => {
		const {deleteAllChecked, setPageCount} = this.props.actions
		deleteAllChecked()
		axios
			.delete('http://localhost:8080/deleteAllChecked')
			.then((res) => {

				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
		setPageCount()
		this.renderPagination()
	}


	render() {
		const {todos, currentPage, itemsPerPage} = this.props;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = (indexOfLastItem - itemsPerPage);
		const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);
		const complete = !todos.some(todo => todo.checked);
		return <div className={"App"}>
			<div className="App-header">
				<h2 id={'h1'}>Welcome to To-Do List App</h2>
			</div>
			<input ref={this.inpRef} onKeyPress={this.handleKeyPress} name={''} type='text'/>
			<button onClick={() => this.addItem()} className={'btn btn-primary'}>Add</button>
			<button onClick={() => this.checkAllCheckBox(complete)}
			        className={'btn btn-primary'}>{complete ? "Check All" : "Uncheck All"}</button>
			<button onClick={() => {
				this.deleteAllChecked()
			}} className={'btn btn-primary'}>Delete Checked
			</button>

			<ul>
				{
					currentItems.map(todoItem => {
						return <ListItem
							key={todoItem._id}
							todoItem={todoItem}
							deleteItem={this.deleteItem}
							submitEdit={this.submitEdit}
							checkSingleCheckBox={this.checkSingleCheckBox}
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

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
		numberPerPage: state.numberPerPage,
		currentPage: state.currentPage,
		pageCount: state.pageCount,
		itemsPerPage: state.itemsPerPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(
			{
				getAll,
				addItems,
				deleteItem,
				editItem,
				checkItem,
				checkAll,
				deleteAllChecked,
				setPageCount,
				changePage,
				previousPage,
				nextPage
			},
			dispatch
		),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp);