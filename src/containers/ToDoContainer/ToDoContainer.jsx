import { useState } from "react";
import ResetButton from "../../components/ResetButton/ResetButton";
import ToDoInput from "../../components/ToDoInput/ToDoInput";
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
                {todoList.map((item, index) => {
                    return <p key={item + index}>{item}</p>;
                })}
            </section>
        </section>
    );
};

export default ToDoContainer;
