import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader"
import TodoListTasks from "./TodoListTasks"
import TodoListFooter from "./TodoListFooter"

class TodolistApp extends React.Component {

    state = {
        tasks: [
        ],
        filterValue: "All",
    };
    componentDidMount = () => {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("state-" + this.props.id, stateAsString);
    }
    restoreState = () => {
        let stateAsString = localStorage.getItem("state-" + this.props.id);
        if (stateAsString) {
            let state = JSON.parse(stateAsString);
            state.tasks.forEach(t => {
                if (t.id >= this.nextItemId) {
                    this.nextItemId = t.id + 1;
                }
            })
            this.setState(state)
        }
    }

   
    nextItemId = 0;


    addTask = (newText) => {
        let newItem = {
            title: newText,
            isDone: false,
            priority: "low",
            id: this.nextItemId
        };

        this.nextItemId++;

        let newTasks = [...this.state.tasks, newItem];
        this.setState({
            tasks: newTasks
        },
            () => {
                this.saveState();
            }
        );
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeStatus = (status, taskId) => {
        let obj = {
            isDone: status
        }
        this.changeTask(taskId, obj)
    }
    changeTitle = (title, taskId) => {
        let obj = {
            title: title
        }
        this.changeTask(taskId, obj)
    }
    changeTask = (taskId, obj) => {
        let tasksCopy = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return { ...t, ...obj };
            }
            return t;
        });
        this.setState({
            tasks: tasksCopy
        });
    }


    render = () => {

        return (

            <div className="todoList">
                <TodoListHeader addTask={this.addTask} title={this.props.title} />
                <TodoListTasks
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    tasks={this.state.tasks.filter((t) => {
                        switch (this.state.filterValue) {
                            case "All": return true;
                            case "Completed": return t.isDone;
                            case "Active": return !t.isDone;
                            default: return true;
                        }
                    })} />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>

        );
    }
};

export default TodolistApp;


