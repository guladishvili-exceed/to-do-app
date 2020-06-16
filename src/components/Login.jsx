import React, {Component} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Login extends Component {
	state = {
		username:'',
		password:'',
	}

	handleInputValue = (event) => {
		this.setState({username:event.target.value})
	}

	handlePasswordValue = (event) => {
		this.setState({password:event.target.value})
	}

	handleLogIn = () => {
		const { username, password } = this.state
		if (password.length === 0 || username.length === 0 ) {
			alert('Incorrect Login!')
		} else {
			axios
				.post(`http://localhost:8080/logIn`, {
					username: username,
					password: password,
				})
				.then((res) => {
					this.setState({username: username,password: password})
					localStorage.setItem('username',this.state.username)
					this.props.history.push("/todoapp");
					console.log(this.state.username)
					console.log('res',res)
				})
				.catch((err) => {
					console.log("err", err);
				});
		}
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			{
				this.handleLogIn()
			}
		}
	}



	render() {
		return <div id={'registration'}>
			<p>Enter your Username</p>
			<input onKeyPress={this.handleKeyPress} onChange={(event) => this.handleInputValue(event)} type={'text'} placeholder={'Enter your Username'}/>
			<p>Enter your Password</p>
			<input onKeyPress={this.handleKeyPress} onChange={(event) => this.handlePasswordValue(event)} type={'password'} placeholder={'Enter your password '}/>
			<button onClick={() => {this.handleLogIn()}} className={'btn btn-info'}>Log in </button>
			</div>
	}
}




export default withRouter(Login);