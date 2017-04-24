require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let favImage = require('../images/favicon.png');

var TodoApp = React.createClass({
  getInitialState: function(){
		return {items: []};
	},
	updateItems: function(newItem){
		var allItems = this.state.items.concat([newItem]);
		this.setState({items: allItems});
	},
	render: function(){
		return (
			<div>
				<TodoHeader/>
        <TodoForm onFormSubmit={this.updateItems}/>
        <TodoList items={this.state.items}/>
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
  getInitialState: function() {
		return {item: ''};
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onFormSubmit(this.state.item);
		this.setState({item: ''});
		React.findDOMNode(this.refs.item).focus();
		return;
	},
	onChange: function(e){
		this.setState({
			item: e.target.value
		});
	},
	render: function(){
		return (
		  <form className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6" onSubmit={this.handleSubmit}>
				<input type='text' ref='item' onChange={this.onChange} value={this.state.item} className="col-xs-10 col-sm-10" />
				<button type='submit' className="col-xs-2 col-sm-2"><span className="glyphicon glyphicon-plus"></span></button>
			</form>
		);
	}
});

var TodoList = React.createClass({
	render: function() {
		var createItem = function(itemText) {
			return (
				<TodoListItem><p className="col-xs-10">{itemText}</p></TodoListItem>
			);
		};
		return <ul className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">{this.props.items.map(createItem)}</ul>;
	}
});

var TodoListItem = React.createClass({
  /*constructor(props) {
  super(props);
  this.state = {
    //done: props.initialColor
    done: false;
  };
},*/
  getInitialState: function() {
                return  {isDone: false}
            },
  done: function() {
    this.setState({isDone: true})
  },
	render: function(){
    var liStyle = {
                background: 'silver',
                color: 'black'
            };
            if (this.state.isDone) {
                liStyle['background'] = 'green';
                liStyle['color'] = 'white';
            }
		return (
			<li style={liStyle}>
        {this.props.children}

        <div className = "options col-xs-2 col-sm-2">
          <span className="glyphicon glyphicon-ok ok" onClick={this.done}></span>
          <span className="glyphicon glyphicon-pencil edit"></span>
          <span className="glyphicon glyphicon-remove remove"></span>
        </div>
      </li>
		);
	}
});

TodoApp.defaultProps = {};
export default TodoApp;
