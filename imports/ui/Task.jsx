import React, { Component, PropTypes } from 'react';
// import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';


// Task component - represents a single todo item
export default class Task extends Component {

  toggleChecked() {
     // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);


    // Tasks refer to tasks.js ==> export const Tasks = new Mongo.Collection('tasks');

    // Tasks.update(this.props.task._id, {
    //   $set: { checked: !this.props.task.checked },
    // });
  }
 
  deleteThisTask() {
    // Tasks.remove(this.props.task._id);

    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

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

    // const taskClassName = this.props.task.checked ? 'checked' : '';
    

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

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
 

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
  showPrivateButton: React.PropTypes.bool.isRequired,
};