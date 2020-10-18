import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	};
};

const App = ({ searchField, onSearchChange, robots, onRequestRobots, isPending }) => {
	useEffect(() => {
		onRequestRobots();
	}, [onRequestRobots]);

	const filteredRobots = robots.filter((robots) => {
		return robots.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return isPending ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f2'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Cardlist robots={filteredRobots} />
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
