require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let favImage = require('../images/favicon.png');

var TodoApp = React.createClass({
  getInitialState: function(){
		return {items: []};
	},
  deleteItem : function(index){
            var newData = this.state.items.slice(); //copy array
            newData.splice(index, 1); //remove element
            this.setState({
                items: newData
            });
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
        <TodoList items={this.state.items} onDelete={this.deleteItem}/>
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
  remove: function(e){
       this.props.onDelete(e);
    },
	render: function() {
		var createItem = function(itemText,i) {
			return (
				<TodoListItem key={i} value={i} onRemove = {this.remove}><div className="col-xs-10"><p>{itemText}</p></div></TodoListItem>
			);
		};
		return <ul className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">{this.props.items.map(createItem, this)}</ul>;
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
    if (this.state.isDone == false) {
        this.setState({isDone: true})
    }
    else {
        this.setState({isDone: false})
    }
  },
  RemoveHandler: function(){
                   this.props.onRemove(this.props.value);
            },
	render: function(){
    var itemClass = ["glyphicon glyphicon-ok ok","glyphicon glyphicon-remove remove"];
    var liStyle = {
                background: 'white',
                color: 'black'
            };
            if (this.state.isDone) {
                liStyle['background'] = 'green';
                liStyle['color'] = 'white';
                itemClass[0] = "glyphicon glyphicon-repeat ok";
                itemClass[1] = "";
            }
            else {
                liStyle['background'] = 'white';
                liStyle['color'] = 'black';
            }

		return (
			<li data-id={this.props.value} key={this.props.value} style={liStyle}>
        {this.props.children}
        <div className = "options col-xs-2 col-sm-2">
          <span className={itemClass[0]} onClick={this.done}></span>
          <span className={itemClass[1]} onClick={this.RemoveHandler}></span>
        </div>
      </li>
		);
	}
});

TodoApp.defaultProps = {};
export default TodoApp;
