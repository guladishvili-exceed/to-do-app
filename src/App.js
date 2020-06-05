import React, { Component } from "react";
import "./App.css";
import CreatetodoList from "./components/CreateToDoListAndDisplay";

class App extends Component {
  state() {
    todos: [{}];
  }


  addTodo = (todo) => {
    this.setState({
      todos: [todo,...this.state.todos]
    })
  }

  render() {

    return <CreatetodoList onChange={() => this.addTodo()} />;
  }
}

export default App;
