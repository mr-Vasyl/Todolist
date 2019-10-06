import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';


class TodoListHeader extends React.Component {


    render = () => {

        return (
            <div className="todoList-header">
                <TodoListTitle  title={this.props.title}/>
                <AddNewItemForm addItem={this.props.addTask} />
            </div>


        );
    }
}
export default TodoListHeader;