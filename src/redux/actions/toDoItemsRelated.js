import { actionTypes } from "./actionTypes";

export const addItems = (value, checked, id, user) => {
	return {
		type: actionTypes.ADD_ITEM,
		value,
		checked,
		id,
		user
	};
};

export const getAll = (items) => {
	return {
		type: actionTypes.GET_ALL,
		items,
	};
};

export const deleteItem = (id) => {
	return {
		type: actionTypes.DELETE_ITEM,
		id,
	};
};

export const editItem = (id,value) => {
	return {
		type:actionTypes.EDIT_ITEM,
		id,
		value,
	}
}

export const checkItem = (id) => {
	return {
		type: actionTypes.CHECK_ITEM,
		id,
	};
};

export const checkAll = (checked) => {
	return {
		type:actionTypes.CHECK_ALL,
		checked

	}
}


