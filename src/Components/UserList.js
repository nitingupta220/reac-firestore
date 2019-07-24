import React from 'react';

const UserCard = (props) => {
	return (
		<div>
			<h3>Name: {props.fullname}</h3>
			<p>Email: {props.email}</p>
		</div>
	);
};

export default UserCard;
