import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';


// Task component - represents a single todo item
export default class Task extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    // Tasks refer to tasks.js ==> export const Tasks = new Mongo.Collection('tasks');

    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }
 
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
  	// Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS

	//if then else statement shorthand 
		
		// Longhand:

		// const x = 20;
		// let answer;
		// if (x > 10) {
		//     answer = 'greater than 10';
		// } else {
		//     answer = 'less than 10';
		// }

		// shorthand: const answer = x > 10 ? 'greater than 10' : 'less than 10';

    const taskClassName = this.props.task.checked ? 'checked' : '';
    

		// &times the HTML code of symbol X
    return (
      <li className={taskClassName}>

        <button className="delete" onClick={this.deleteThisTask.bind(this)}>

          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 

        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};