import React, {Component, createRef} from "react";


class itemList extends Component {
	state = {
		isEditMode: false
	}
	inputRef = createRef();

	editValue = () => {
		// this.props.todoItem.inputValue = this.inputRef.current.value

		console.log('--------this.inputRef.current.value', this.inputRef.current.value);
		this.setState({isEditMode: false})
	}

	render() {
		const {isEditMode} = this.state;

		return <div>
			<li>
				{
					isEditMode ? (
						<div>
							<input defaultValue={this.props.todoItem.inputValue} ref={this.inputRef} type={'text'}/>
							<button onClick={() => {
								this.props.editItem(this.props.todoItem.id)
							}} className={'btn btn-primary'}>Submit
							</button>
							<button onClick={() => this.setState({isEditMode: !isEditMode})} className={'btn btn-primary'}>Cancel
							</button>
						</div>
					) : (
						<div>
							<input type={'checkbox'}/>
							<label>
								{this.props.todoItem.inputValue}
							</label>
							<button onClick={() => this.props.deleteItem(this.props.todoItem.id)} className={'btn btn-primary'}>Delete
							</button>
							<button onClick={() => this.setState({isEditMode: !isEditMode})} className={'btn btn-primary'}>Edit
							</button>
						</div>
					)
				}


			</li>
		</div>

	}

}


export default itemList;