import React from "react";
import ListItem from './ListItems'

  class CreateToDoListAndDisplay extends React.Component {
    state() {
      text: "";
    }


    render() {
      return <div className="App">
        <div className="App-header">
          <h2>Welcome to To-Do List App</h2>
          <h3>Enter Your To-Do</h3>
        </div>
        <input  name={'text'}  placeholder={'What to do'} type="text"/>
        <button className="btn btn-info">Add</button>
        <ul>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
      </div>
    }
  }


export default CreateToDoListAndDisplay;