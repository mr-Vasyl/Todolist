import React from 'react';
import './App.css';
import TodolistApp from './TodolistApp';
import AddNewItemForm from './AddNewItemForm';

class App extends React.Component {
    nextItemId = 0;
    state = {
        todoLists: []
    }
    addTodoList = (title) => {
        let newItem = {
            title: title,
            id: this.nextItemId
        };

        this.nextItemId++;

        this.setState({
            todoLists: [...this.state.todoLists, newItem]
        }, () => {
            this.saveState();
        })
    }

    componentDidMount = () => {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todoLists", stateAsString);
    }
    restoreState = () => {
        let stateAsString = localStorage.getItem("todoLists");
        if (stateAsString) {
            let state = JSON.parse(stateAsString);

            state.todoLists.forEach(t => {
                if (t.id >= this.nextItemId) {
                    this.nextItemId = t.id + 1;
                }
            })
            this.setState(state)
        }
    }

    render = () => {

        let todoLists = this.state.todoLists.map(tl => < TodolistApp id={tl.id} title={tl.title} />)

        return (
            <>
                <div>
                    <b>New Todo List</b>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
};

export default App;


