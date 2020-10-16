import React, { useEffect, useState } from 'react';
import Cardlist from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';

const App = () => {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchField] = useState('');

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setRobots(users));
	}, []);

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	};

	const filteredRobots = robots.filter((robots) => {
		return robots.name.toLowerCase().includes(searchfield.toLowerCase());
	});

	return !robots.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f2'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Cardlist robots={filteredRobots} />
		</div>
	);
};
export default App;
