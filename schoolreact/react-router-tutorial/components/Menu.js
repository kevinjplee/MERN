// JavaScript source code
import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
	const activeStyle = {
		color:'green',
		
	};

	const myStyle = {
		color:'grey',
		
	};

	return (
		<div>
			<ul>
				<li><NavLink exact to ="/" activeStyle = {activeStyle}> Home </NavLink></li>
				<li><NavLink exact to ="/about" activeStyle = {myStyle}> About </NavLink></li>
				<li><NavLink to ="/about/foo" activeStyle = {activeStyle}> About Foo </NavLink></li>
				<li><NavLink to ="/posts" activeStyle= {myStyle}> Posts </NavLink></li>
			</ul>
			<hr/>
		</div>
	);
};

export default Menu;