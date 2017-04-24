require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let favImage = require('../images/favicon.png');

var TodoApp = React.createClass({
	render: function(){
		return (
			<div>
				<TodoHeader/>
        <TodoForm/>
			</div>
		);
	}
});

var TodoHeader = React.createClass({
	render: function(){
		return (
			<h1>To Do List</h1>
		);
	}
});

var TodoForm = React.createClass({
	render: function(){
		return (
		  <form className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">
				<input type='text' className="col-xs-10 col-sm-10" />
				<button type='submit' className="col-xs-2 col-sm-2"><span class="glyphicon glyphicon-plus"></span></button>
			</form>
		);
	}
});

TodoApp.defaultProps = {};
export default TodoApp;
