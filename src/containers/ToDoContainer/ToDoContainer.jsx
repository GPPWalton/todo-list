import { useState } from "react";
import ResetButton from "../../components/ResetButton/ResetButton";
import ToDoInput from "../../components/ToDoInput/ToDoInput";
import ToDoList from "../ToDoList/ToDoList";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
const ToDoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");
    const handleReset = () => {
        setTodoList([]);
    };
    const handleInput = event => {
        const { value } = event.target;
        setInput(value);
    };
    const handleAdd = () => {
        //append the the new input to the toDoList
        const newItem = { id: Date.now(), text: input };
        console.log(newItem);
        setTodoList(prevState => {
            return [...prevState, newItem];
        });
        //clear the input
        setInput("");
    };
    const handleDelete = id => {
        setTodoList(prevState => prevState.filter(item => item.id !== id));
    };
    return (
        <section>
            <header>
                <h1>My ToDo-List</h1>
                <ResetButton onReset={() => handleReset()} />
            </header>
            <section>
                <ToDoInput
                    input={input}
                    onInput={handleInput}
                    onAdd={handleAdd}
                />
                <ToDoList>
                    {todoList.map(item => {
                        return (
                            <ToDoItem
                                key={item.id}
                                taskData={item.text}
                                id={item.id}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
                </ToDoList>
            </section>
        </section>
    );
};

export default ToDoContainer;
