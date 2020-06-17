import React, {Component, createRef} from "react";

class itemList extends Component {
	state = {
		isEditMode: false
	}
	inputRef = createRef();
	btnRef = createRef();
	handleChange = (event) => {
		this.setState({input:event.currentTarget.value})
	}
	render() {
		const {isEditMode} = this.state;
		const {todoItem, submitEdit, deleteItem} = this.props;

		return <li>
			{
				isEditMode ? (
					<div>
						<input
							ref={this.inputRef}
							type={'text'}
						  defaultValue={todoItem.todo}
						/>
						<button
							onClick={() => {
								submitEdit(todoItem._id, this.inputRef.current.value);
								this.setState({isEditMode: !isEditMode})
							}}
							className={'btn btn-primary'}
						>
							Submit
						</button>
						<button
							onClick={() => {
								this.setState({isEditMode: !isEditMode})
							}}
							className={'btn btn-primary'}
						>Cancel
						</button>
					</div>
				) : (
					<div>
						<input ref={this.btnRef} onClick={() => this.props.checkSingleCheckBox(todoItem._id,todoItem.checked)} type={'checkbox'} checked={todoItem.checked}/>
						<label>
							{todoItem.todo}
						</label>
						<button onClick={() => {
							deleteItem(todoItem._id)
						} } className={'btn btn-primary'}>Delete
						</button>
						<button onClick={() => this.setState({isEditMode: !isEditMode})} className={'btn btn-primary'}>Edit
						</button>
					</div>
				)
			}
		</li>

	}

}


export default itemList;