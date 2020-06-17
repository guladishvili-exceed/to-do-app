import { actionTypes } from "./actions/actionTypes";

const initialState = {
	todos: [],
	currentPage: 1,
	pageCount: 1,
	itemsPerPage: 10
}

const reducer = (state =initialState, action) => {
	const { todos, numberPerPage} = state;
	switch (action.type) {
		case actionTypes.ADD_ITEM:
			return {
				...state,
				todos: [
					...todos,
					{
						todo: action.value,
						checked: action.checked,
						_id: action.id,
					},
				],
				currentPage: Math.ceil((todos.length + 1) / numberPerPage)
			};
		case actionTypes.GET_ALL:
			return {
				...state,
				todos: action.items,
			};

		case actionTypes.DELETE_ITEM:
			return {
				...state ,
				todos: todos.filter((item) => item._id !== action.id)
			}
		case actionTypes.EDIT_ITEM:
			const editedItems = todos.map((item) =>
				item._id !== action.id ? item : { ...item, todo: action.value }
			);
			return {
				...state,
				todos:editedItems,
			}

		case actionTypes.CHECK_ITEM:
			const checkItem = todos.map((item) =>
				item._id !== action.id ? item : { ...item, checked: !item.checked }
			);
			return {
				...state,
				todos:checkItem
			}

		case actionTypes.CHECK_ALL:
			const checkAll = todos.map((item) =>
				({ ...item, checked: action.checked })
			);
			return {
				...state,
				todos:checkAll
			}

		case actionTypes.RENDER_PAGE:


		default: return state;
	}
}

export default reducer;