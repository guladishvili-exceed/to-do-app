import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Nav  extends Component {
	render() {
		return (
			<nav>
				<h3>
					<ul className={'nav-links'}>
						<Link to={'/todoapp'}>
							<li>To Do App</li>
						</Link>
						<Link to={'/registration'}>
							<li>Registration</li>
						</Link>
						<Link to={'/login'}>
							<li>Log in </li>
						</Link>
					</ul>
				</h3>
			</nav>
		);
	}
}

export default Nav;