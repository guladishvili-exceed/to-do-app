import React from "react";
import {v4 as uuidv4} from "uuid";
class itemList extends React.Component  {



		render() {
		return <div className={"App"}>
			<div className="App-header">
				<h2>Welcome to To-Do List App</h2>
			</div>
			<input onChange={this.props.handleInputValue} name={''} type='text'/>
			<button onClick={() => this.props.addItem()} className={'btn btn-primary'}>Add</button>
			<ul>
				{this.props.todos.map((item) => <li key={uuidv4()}>
					<input type={'checkbox'}/>
					<label>{item.inputValue}</label>
					<input type={'text'} className={'hidden'}/>
					<button onClick={() => this.props.deleteItem(item.id)} className={'btn btn-primary'}>Delete</button>
					<button onClick={() => this.props.editItem()} className={'btn btn-primary'}>Edit</button>
				</li>)}
			</ul>
		</div>
		};
}



export default itemList;