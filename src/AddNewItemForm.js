import React from "react"

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    }

    onAddItemButtonClick = () => {
        let newText = this.state.title;
        if (newText !== "") {
            this.props.addItem(newText);
            this.setState({ error: false, title: '' });
        } else {
            this.setState({ error: true })
        }
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemButtonClick();
        }
    }
    onTitleChanged = (e) => {
        this.setState({ title: e.currentTarget.value })
    }

    render = () => {
        const inputClassName = this.state.error ? "error" : "";
        return (
            <div className="NewItemForm">
                <input type="text" placeholder="New Item name" className={inputClassName} onKeyPress={this.onKeyPress} onChange={this.onTitleChanged} value={this.state.title} />
                <button onClick={this.onAddItemButtonClick}>Add</button>
            </div>
        )
    }
}
export default AddNewItemForm;