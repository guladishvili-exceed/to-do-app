import React, {Component,createRef} from "react";
import axios from "axios";

class registration extends Component {

	state = {
		username : '',
		password: '',
		confirmPassword:''
	}

	handleRegistration = () => {

		if (this.state.password !== this.state.confirmPassword || this.state.password.length === 0 || this.state.username.length === 0) {
			alert('Cofirmation password must match password you entered,Password field cant be empty,User field cant be empty ')
		} else {
			axios
				.post(`http://localhost:8080/addUser`, {
						username: this.state.username,
						password: this.state.password,
				})
				.then((res) => {
					alert('Registration went succesful')
					console.log('res',res)
					})
				.catch((err) => {
					alert('Username is taken')
					console.log("err", err);
				});
		}
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			{
				this.handleRegistration()
			}
		}
	}

	handleInputValue = (event) => {
		this.setState({username:event.target.value})
}

	handlePasswordValue = (event) => {
		this.setState({password:event.target.value})
}

PasswordValidation = (event) => {
		this.setState({confirmPassword:event.target.value})
}


	render() {
		return <div id={'registration'}>
			<p>Enter your Username</p>
			<input onKeyPress={this.handleKeyPress}  value={this.state.username} onChange={(event)=>this.handleInputValue(event)}  type={'text'} placeholder={'Enter your Username'} required />
			<p>Enter your Password</p>
			<input onKeyPress={this.handleKeyPress}  value={this.state.password} onChange={(event)=>this.handlePasswordValue(event)}  type={'password'} placeholder={'Enter your password '} required/>
			<p>Confirm Password</p>
			<input onKeyPress={this.handleKeyPress} value={this.state.confirmPassword} onChange={(event)=>this.PasswordValidation(event)}  type={'password'} placeholder={'Enter your password '} required/>
			<button onClick={() => this.handleRegistration()} className={'btn btn-info'}>Confirm Registration</button>
		</div>
	}
}




export default registration;