import React, { Component } from 'react';
import firebase from '../firestore';
import UserCard from './UserList';

class User extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			fullname: '',
			data: []
		};
	}

	componentDidMount () {
		this.getUsers();
	}
	updateInput = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	addUser = (e) => {
		e.preventDefault();
		const db = firebase.firestore();

		db.collection('users').add({
			fullname: this.state.fullname,
			email: this.state.email
		});
		this.getUsers();
		this.setState({
			fullname: '',
			email: ''
		});
	};
	getUsers = () => {
		const boards = [];
		const db = firebase.firestore();
		db.collection('users').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const { fullname, email } = doc.data();
				boards.push({
					key: doc.id,
					email,
					fullname
				});
				// console.log(doc);
				this.setState({
					data: boards
				});
			});
		});
	};

	render () {
		const { data } = this.state;
		return (
			<form onSubmit={this.addUser}>
				<input
					type="text"
					name="fullname"
					placeholder="Full name"
					onChange={this.updateInput}
					value={this.state.fullname}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={this.updateInput}
					value={this.state.email}
				/>
				<button type="submit" disabled={!this.state.fullname && !this.state.email}>
					Submit
				</button>
				<br />
				Added Users:
				<div>{data.map((link) => <UserCard key={link.key} {...link} />)}</div>
			</form>
		);
	}
}

export default User;
