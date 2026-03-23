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
        setTodoList(prevState => {
            return [...prevState, input];
        });
        //clear the input
        setInput("");
    };
    const handleDelete = index => {
        setTodoList(prevState => prevState.filter((_, i) => i !== index));
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
                    {todoList.map((item, index) => {
                        return (
                            <ToDoItem
                                key={item + index}
                                taskData={item}
                                index={index}
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
